// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

import "src/interfaces/tokens/IVoteToken.sol";
import "src/interfaces/tokens/IValueToken.sol";
import "src/interfaces/IList.sol";
import "src/interfaces/ISPOG.sol";

import "src/config/ProtocolConfigurator.sol";

/// @title SPOG
/// @notice Contracts for governing lists and managing communal property through token voting.
/// @dev Reference: https://github.com/MZero-Labs/SPOG-Spec/blob/main/README.md
/// @notice SPOG, "Simple Participation Optimized Governance," is a governance mechanism that uses token voting to maintain lists and manage communal property.
/// @notice SPOG is used for **permissioning actors**  and optimized for token holder participation.
contract SPOG is ProtocolConfigurator, ERC165, ISPOG {
    using SafeERC20 for IERC20;
    using EnumerableMap for EnumerableMap.AddressToUintMap;

    struct Configuration {
        address payable governor;
        address voteVault;
        address valueVault;
        address cash;
        uint256 tax;
        uint256 taxLowerBound;
        uint256 taxUpperBound;
        uint256 inflator;
        uint256 valueFixedInflation;
    }

    /// @dev Indicator that list is in master list
    uint256 private constant inMasterList = 1;

    /// @notice Multiplier in cash for `emergency` proposal
    uint256 public constant EMERGENCY_TAX_MULTIPLIER = 12;

    /// @notice Multiplier in cash for `reset` proposal
    uint256 public constant RESET_TAX_MULTIPLIER = 12;

    /// @notice Vault for vote holders vote and value inflation rewards
    ISPOGVault public override voteVault;

    /// @notice Vault for value holders assets
    ISPOGVault public immutable override valueVault;

    /// @notice Cash token used for proposal fee payments
    IERC20 public immutable override cash;

    /// @notice Fixed inflation rewards per epoch for value holders
    uint256 public immutable override valueFixedInflation;

    /// @notice Inflation rate per epoch for vote holders
    uint256 public immutable override inflator;

    /// @notice Governor, upgradable via `reset` by value holders
    ISPOGGovernor public override governor;

    /// @notice Tax value for proposal cash fee
    uint256 public override tax;

    /// @notice Tax range: lower bound for proposal cash fee
    uint256 public override taxLowerBound;

    /// @notice Tax range: upper bound for proposal cash fee
    uint256 public override taxUpperBound;

    /// @dev List of addresses that are part of the masterlist
    /// @dev (address => uint256) 0 = not in masterlist, 1 = in masterlist
    EnumerableMap.AddressToUintMap private _masterlist;

    /// @notice Indicator if token rewards were minted for an epoch,
    /// @dev (epoch number => bool)
    mapping(uint256 => bool) private _epochRewardsMinted;

    /// @dev Modifier check if caller is governor address
    modifier onlyGovernance() {
        if (msg.sender != address(governor)) revert OnlyGovernor();

        _;
    }

    /// @notice Constructs a new SPOG instance
    /// @param config The configuration data for the SPOG
    constructor(Configuration memory config) {
        // Sanity checks
        if (config.governor == address(0)) revert ZeroGovernorAddress();
        if (config.voteVault == address(0) || config.valueVault == address(0)) revert ZeroVaultAddress();
        if (config.cash == address(0)) revert ZeroCashAddress();
        if (config.tax == 0) revert ZeroTax();
        if (config.tax < config.taxLowerBound || config.tax > config.taxUpperBound) revert TaxOutOfRange();
        if (config.inflator == 0) revert ZeroInflator();
        if (config.valueFixedInflation == 0) revert ZeroValueInflation();

        // Set configuration data
        governor = ISPOGGovernor(config.governor);
        // Initialize governor
        governor.initSPOGAddress(address(this));

        voteVault = ISPOGVault(config.voteVault);
        valueVault = ISPOGVault(config.valueVault);
        cash = IERC20(config.cash);
        tax = config.tax;
        taxLowerBound = config.taxLowerBound;
        taxUpperBound = config.taxUpperBound;
        inflator = config.inflator;
        valueFixedInflation = config.valueFixedInflation;
    }

    /// @notice Add a new list to the master list of the SPOG
    /// @param list The list address of the list to be added
    function addList(address list) external override onlyGovernance {
        if (IList(list).admin() != address(this)) revert ListAdminIsNotSPOG();

        // add the list to the master list
        _masterlist.set(list, inMasterList);
        emit ListAdded(list);
    }

    /// @notice Append an address to a list
    /// @param list The list to which the address will be appended
    /// @param account The address to be appended to the list
    function append(address list, address account) public override onlyGovernance {
        if (!_masterlist.contains(list)) revert ListIsNotInMasterList();

        // add the address to the list
        IList(list).add(account);
        emit AddressAppendedToList(list, account);
    }

    /// @notice Remove an address from a list
    /// @param list The list from which the address will be removed
    /// @param account The address to be removed from the list
    function remove(address list, address account) public override onlyGovernance {
        if (!_masterlist.contains(list)) revert ListIsNotInMasterList();

        // remove the address from the list
        IList(list).remove(account);
        emit AddressRemovedFromList(list, account);
    }

    /// @notice Change the protocol configs
    /// @param configName The name of the config contract to be changed
    /// @param configAddress The address of the new config contract
    /// @param interfaceId The interface identifier, as specified in ERC-165
    function changeConfig(bytes32 configName, address configAddress, bytes4 interfaceId)
        public
        override(IProtocolConfigurator, ProtocolConfigurator)
        onlyGovernance
    {
        super.changeConfig(configName, configAddress, interfaceId);
    }

    /// @notice Emergency version of existing methods
    /// @param emergencyType The type of emergency method to be called (See enum in ISPOG)
    /// @param callData The data to be used for the target method
    /// @dev Emergency methods are encoded much like change proposals
    // TODO: IMPORTANT: right now voting period and logic is the same as for other functions
    // TODO: IMPORTANT: implement immediate remove
    function emergency(uint8 emergencyType, bytes calldata callData) external override onlyGovernance {
        EmergencyType _emergencyType = EmergencyType(emergencyType);

        if (_emergencyType == EmergencyType.Remove) {
            (address list, address account) = abi.decode(callData, (address, address));
            remove(list, account);
        } else if (_emergencyType == EmergencyType.Append) {
            (address list, address account) = abi.decode(callData, (address, address));
            append(list, account);
        } else if (_emergencyType == EmergencyType.ChangeConfig) {
            (bytes32 configName, address configAddress, bytes4 interfaceId) =
                abi.decode(callData, (bytes32, address, bytes4));
            super.changeConfig(configName, configAddress, interfaceId);
        } else {
            revert EmergencyMethodNotSupported();
        }

        emit EmergencyExecuted(emergencyType, callData);
    }

    /// @notice Reset current governor, spesial value governance method
    /// @param newGovernor The address of the new governor
    /// @param newVoteVault The address of the new vault for inflation rewards
    function reset(address newGovernor, address newVoteVault) external override onlyGovernance {
        // TODO: check that newGovernor implements SPOGGovernor interface, ERC165 ?
        // TODO: checks should be in governor itself
        // IVoteToken newVote = IVoteToken(address(_newGovernor.vote()));
        // IValueToken valueToken = IValueToken(address(_newGovernor.value()));
        // if (address(valueToken) != newVoteToken.valueToken()) revert ValueTokenMistmatch();

        voteVault = ISPOGVault(newVoteVault);
        governor = ISPOGGovernor(payable(newGovernor));
        // Important: initialize SPOG address in the new vote governor
        governor.initSPOGAddress(address(this));

        // Take snapshot of value token balances at the moment of reset
        // Update reset snapshot id for the voting token
        uint256 resetSnapshotId = IValueToken(address(governor.value())).snapshot();
        IVoteToken(address(governor.vote())).initReset(resetSnapshotId);

        emit ResetExecuted(newGovernor, newVoteVault, resetSnapshotId);
    }

    /// @notice Change the tax rate which is used to calculate the proposal fee
    /// @param newTax The new tax rate
    function changeTax(uint256 newTax) external override onlyGovernance {
        if (newTax < taxLowerBound || newTax > taxUpperBound) revert TaxOutOfRange();

        emit TaxChanged(tax, newTax);
        tax = newTax;
    }

    /// @notice Change the tax range which is used to calculate the proposal fee
    /// @param newTaxLowerBound The new lower bound of the tax range
    /// @param newTaxUpperBound The new upper bound of the tax range
    function changeTaxRange(uint256 newTaxLowerBound, uint256 newTaxUpperBound) external override onlyGovernance {
        // TODO: add adequate sanity checks
        emit TaxRangeChanged(taxLowerBound, newTaxLowerBound, taxUpperBound, newTaxUpperBound);

        taxLowerBound = newTaxLowerBound;
        taxUpperBound = newTaxUpperBound;
    }

    /// @notice Charge fee for calling a governance function
    /// @param account The address of the caller
    /// @param func The function selector of proposal function
    function chargeFee(address account, bytes4 func) external override onlyGovernance {
        uint256 fee = _getFee(func);

        // transfer the amount from the caller to the SPOG
        // slither-disable-next-line arbitrary-send-erc20
        cash.safeTransferFrom(account, address(this), fee);
        // approve amount to be sent to the vault
        cash.approve(address(valueVault), fee);

        // deposit the amount to the vault
        valueVault.deposit(governor.currentEpoch(), address(cash), fee);
    }

    /// @notice Inflate vote and value tokens and deposit rewards into vote vault
    /// @dev Called once per epoch by governor when the first reward-accruing proposal is submitted,
    /// @dev RESET and emergency proposals do not trigger this function
    function inflateRewardTokens() external override onlyGovernance {
        uint256 nextEpoch = governor.currentEpoch() + 1;

        // Epoch reward tokens already minted, silently return
        if (_epochRewardsMinted[nextEpoch]) return;

        _epochRewardsMinted[nextEpoch] = true;

        // Mint and deposit Vote and Value rewards to vault
        // TODO: move denominator into constant, figure out correct precision
        // TODO: figure out how to use epoch correctly here
        // uint256 voteInflation = (governor.vote().getPastTotalSupply(nextEpoch - 1) * inflator) / 100;
        uint256 voteInflation = governor.vote().totalSupply() * inflator / 100;
        _mintRewardsAndDepositToVault(nextEpoch, governor.vote(), voteInflation);
        _mintRewardsAndDepositToVault(nextEpoch, governor.value(), valueFixedInflation);
    }

    /// @notice Getter for finding whether a list is in a masterlist
    /// @param list The list address to check
    /// @return Whether the list is in the masterlist
    function isListInMasterList(address list) external view override returns (bool) {
        return _masterlist.contains(list);
    }

    /// @notice Check is proposed change is supported by governance
    /// @param selector The function selector to check
    /// @return Whether the function is supported by governance
    function isGovernedMethod(bytes4 selector) external pure override returns (bool) {
        /// @dev ordered by frequence of usage
        if (selector == this.append.selector) return true;
        if (selector == this.addList.selector) return true;
        if (selector == this.changeConfig.selector) return true;
        if (selector == this.remove.selector) return true;
        if (selector == this.changeTax.selector) return true;
        if (selector == this.changeTaxRange.selector) return true;
        if (selector == this.emergency.selector) return true;
        if (selector == this.reset.selector) return true;

        return false;
    }

    /// @notice Get fee for calling a governance function
    /// @dev TODO: Is it still up to date info?
    /// @dev Pay flat fee for all the operations except emergency and reset
    function _getFee(bytes4 func) internal view returns (uint256) {
        if (func == this.emergency.selector) {
            return EMERGENCY_TAX_MULTIPLIER * tax;
        }
        if (func == this.reset.selector) {
            return RESET_TAX_MULTIPLIER * tax;
        }
        return tax;
    }

    /// @notice mint reward token into the vault
    /// @param epoch The epoch for which rewards become claimable
    /// @param token The reward token, only vote or value tokens
    /// @param amount The amount to mint and deposit into the vault
    function _mintRewardsAndDepositToVault(uint256 epoch, ISPOGVotes token, uint256 amount) private {
        token.mint(address(this), amount);
        token.approve(address(voteVault), amount);
        voteVault.deposit(epoch, address(token), amount);
    }

    /// @dev check SPOG interface support
    /// @param interfaceId The interface ID to check
    function supportsInterface(bytes4 interfaceId) public view override(IERC165, ERC165) returns (bool) {
        return interfaceId == type(ISPOG).interfaceId || super.supportsInterface(interfaceId);
    }

    /// TODO: do we really need this ?
    fallback() external {
        revert("SPOG: non-existent function");
    }
}
