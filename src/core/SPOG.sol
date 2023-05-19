// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {EnumerableMap} from "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IList} from "src/interfaces/IList.sol";
import {IGovernor} from "@openzeppelin/contracts/governance/IGovernor.sol";

import {ISPOG} from "src/interfaces/ISPOG.sol";
import {ISPOGVotes} from "src/interfaces/tokens/ISPOGVotes.sol";

import {SPOGStorage, SPOGGovernorBase} from "src/core/SPOGStorage.sol";
import {IVoteToken} from "src/interfaces/tokens/IVoteToken.sol";
import {IValueToken} from "src/interfaces/tokens/IValueToken.sol";

import {IProtocolConfigurator} from "src/interfaces/IProtocolConfigurator.sol";
import {ProtocolConfigurator} from "src/config/ProtocolConfigurator.sol";

import {IVoteVault} from "src/interfaces/vaults/IVoteVault.sol";
import {IValueVault} from "src/interfaces/vaults/IValueVault.sol";

/// @title SPOG
/// @dev Contracts for governing lists and managing communal property through token voting.
/// @dev Reference: https://github.com/TheThing0/SPOG-Spec/blob/main/README.md
/// @notice A SPOG, "Simple Participation Optimized Governance," is a governance mechanism that uses token voting to maintain lists and manage communal property. As its name implies, it primarily optimizes for token holder participation. A SPOG is primarily used for **permissioning actors** and should not be used for funding/financing decisions.
contract SPOG is ProtocolConfigurator, SPOGStorage, ERC165 {
    using SafeERC20 for IERC20;
    using EnumerableMap for EnumerableMap.AddressToUintMap;

    // vault for vote holders voting inflation rewards
    IVoteVault public immutable voteVault;
    // vault for value holders assets rewards
    IValueVault public immutable valueVault;

    // List of methods that can be executed by SPOG governance
    mapping(bytes4 => bool) public governedMethods;

    uint256 private constant inMasterList = 1;
    uint256 public constant EMERGENCY_REMOVE_TAX_MULTIPLIER = 12;
    uint256 public constant RESET_TAX_MULTIPLIER = 12;

    // List of addresses that are part of the masterlist
    // Masterlist declaration. address => uint256. 0 = not in masterlist, 1 = in masterlist
    EnumerableMap.AddressToUintMap private masterlist;

    // Indicator that token rewards were already minted for an epoch, epoch number => bool
    mapping(uint256 => bool) private epochRewardsMinted;

    /// @notice Create a new SPOG
    /// @param _initSPOGData The data used to initialize spogData
    /// @param _voteVault The address of the `Vault` contract for vote holders
    /// @param _valueVault The address of the `Vault` contract for value holders
    /// @param _time The duration of a voting epochs for governors and auctions in blocks
    /// @param _voteQuorum The fraction of the current $VOTE supply voting "YES" for actions that require a `VOTE QUORUM`
    /// @param _valueQuorum The fraction of the current $VALUE supply voting "YES" required for actions that require a `VALUE QUORUM`
    /// @param _valueFixedInflationAmount The fixed inflation amount for the $VALUE token
    /// @param _voteGovernor The address of the `SPOGGovernor` which $VOTE token is used for voting
    /// @param _valueGovernor The address of the `SPOGGovernor` which $VALUE token is used for voting
    constructor(
        bytes memory _initSPOGData,
        IVoteVault _voteVault,
        IValueVault _valueVault,
        uint256 _time,
        uint256 _voteQuorum,
        uint256 _valueQuorum,
        uint256 _valueFixedInflationAmount,
        SPOGGovernorBase _voteGovernor,
        SPOGGovernorBase _valueGovernor
    )
        SPOGStorage(
            _initSPOGData,
            _voteGovernor,
            _valueGovernor,
            _time,
            _voteQuorum,
            _valueQuorum,
            _valueFixedInflationAmount
        )
    {
        if (_voteVault == IVoteVault(address(0)) || _valueVault == IValueVault(address(0))) {
            revert ISPOG.VaultAddressCannotBeZero();
        }

        voteVault = _voteVault;
        valueVault = _valueVault;

        _initGovernedMethods();
    }

    /// @dev Getter for finding whether a list is in a masterlist
    /// @return Whether the list is in the masterlist
    function isListInMasterList(address list) external view override returns (bool) {
        return masterlist.contains(list);
    }

    /*//////////////////////////////////////////////////////////////
                            MASTERLIST FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    // functions for adding lists to masterlist and appending/removing addresses to/from lists through VOTE

    /// @notice Add a new list to the master list of the SPOG
    /// @param list The list address of the list to be added
    function addNewList(IList list) external override onlyVoteGovernor {
        if (list.admin() != address(this)) {
            revert ListAdminIsNotSPOG();
        }
        // add the list to the master list
        masterlist.set(address(list), inMasterList);
        emit NewListAdded(address(list));
    }

    /// @notice Append an address to a list
    /// @param _address The address to be appended to the list
    /// @param _list The list to which the address will be appended
    function append(address _address, IList _list) external override onlyVoteGovernor {
        // require that the list is on the master list
        if (!masterlist.contains(address(_list))) {
            revert ListIsNotInMasterList();
        }

        // append the address to the list
        _list.add(_address);
        emit AddressAppendedToList(address(_list), _address);
    }

    // create function to remove an address from a list
    /// @notice Remove an address from a list
    /// @param _address The address to be removed from the list
    /// @param _list The list from which the address will be removed
    function remove(address _address, IList _list) external override onlyVoteGovernor {
        _removeFromList(_address, _list);
        emit AddressRemovedFromList(address(_list), _address);
    }

    // create function to remove an address from a list immediately upon reaching a `VOTE QUORUM`
    /// @notice Remove an address from a list immediately upon reaching a `VOTE QUORUM`
    /// @param _address The address to be removed from the list
    /// @param _list The list from which the address will be removed
    // TODO: IMPORTANT: right now voting period and logic is the same as for otherfunctions
    // TODO: IMPORTANT: implement immediate remove
    function emergencyRemove(address _address, IList _list) external override onlyVoteGovernor {
        _removeFromList(_address, _list);
        emit EmergencyAddressRemovedFromList(address(_list), _address);
    }

    /*//////////////////////////////////////////////////////////////
                            CONFIG GOVERNANCE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function changeConfig(bytes32 configName, address configAddress, bytes4 interfaceId)
        public
        override(IProtocolConfigurator, ProtocolConfigurator)
        onlyVoteGovernor
    {
        return super.changeConfig(configName, configAddress, interfaceId);
    }

    /*//////////////////////////////////////////////////////////////
                            GOVERNANCE INTERFACE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    // reset current vote governance, only value governor can do it
    // @param newVoteGovernor The address of the new vote governance
    function reset(SPOGGovernorBase newVoteGovernor) external onlyValueGovernor {
        // TODO: check that newVoteGovernor implements SPOGGovernor interface, ERC165 ?

        IVoteToken newVoteToken = IVoteToken(address(newVoteGovernor.votingToken()));
        IValueToken valueToken = IValueToken(address(valueGovernor.votingToken()));
        if (address(valueToken) != newVoteToken.valueToken()) revert ValueTokenMistmatch();

        // Update vote governance in the vault
        // TODO: how to avoid this ?
        IVoteVault(voteVault).updateGovernor(newVoteGovernor);

        voteGovernor = newVoteGovernor;
        // Important: initialize SPOG address in the new vote governor
        voteGovernor.initSPOGAddress(address(this));

        // Take snapshot of value token balances at the moment of reset
        // Update reset snapshot id for the voting token
        uint256 resetSnapshotId = valueToken.snapshot();
        newVoteToken.initReset(resetSnapshotId);

        emit SPOGResetExecuted(address(newVoteToken), address(newVoteGovernor));
    }

    /// @notice Create a new proposal.
    // Similar function sig to propose in Governor.sol so that it is compatible with tools such as Snapshot and Tally
    /// @dev Calls `propose` function of the vote or value and vote governors (double quorum)
    /// @param targets The targets of the proposal
    /// @param values The values of the proposal
    /// @param calldatas The calldatas of the proposal
    /// @param description The description of the proposal
    /// @return proposalId The ID of the proposal
    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public override returns (uint256) {
        // allow only 1 SPOG change with no value per proposal
        if (targets.length != 1 || targets[0] != address(this) || values[0] != 0) {
            revert InvalidProposal();
        }

        bytes4 executableFuncSelector = bytes4(calldatas[0]);
        if (!governedMethods[executableFuncSelector]) {
            revert NotGovernedMethod(executableFuncSelector);
        }

        _payFee(executableFuncSelector);

        // Inflate Vote and Value token supply unless method is reset or emergencyRemove
        if (executableFuncSelector != this.reset.selector && executableFuncSelector != this.emergencyRemove.selector) {
            _inflateRewardTokens();
        }

        // Only $VALUE governance proposals
        if (executableFuncSelector == this.reset.selector) {
            valueGovernor.turnOnEmergencyVoting();
            uint256 valueProposalId = valueGovernor.propose(targets, values, calldatas, description);
            valueGovernor.turnOffEmergencyVoting();

            emit NewValueQuorumProposal(valueProposalId);
            return valueProposalId;
        }

        // $VALUE and $VOTE governance proposals
        // If we request to change config parameter, value governance should vote too
        if (executableFuncSelector == this.change.selector) {
            uint256 voteProposalId = voteGovernor.propose(targets, values, calldatas, description);
            uint256 valueProposalId = valueGovernor.propose(targets, values, calldatas, description);

            // proposal ids should match
            if (valueProposalId != voteProposalId) {
                revert ValueVoteProposalIdsMistmatch(voteProposalId, valueProposalId);
            }

            emit NewDoubleQuorumProposal(voteProposalId);
            return voteProposalId;
        }

        // Only $VOTE governance proposals
        uint256 proposalId;

        // prevent proposing a list that can be changed before execution
        if (executableFuncSelector == this.addNewList.selector) {
            address listParams = _extractAddressTypeParamsFromCalldata(calldatas[0]);
            if (IList(listParams).admin() != address(this)) {
                revert ListAdminIsNotSPOG();
            }
        }

        // Register emergency proposal with vote governor
        if (executableFuncSelector == this.emergencyRemove.selector) {
            voteGovernor.turnOnEmergencyVoting();

            proposalId = voteGovernor.propose(targets, values, calldatas, description);
            voteGovernor.registerEmergencyProposal(proposalId);

            voteGovernor.turnOffEmergencyVoting();

            emit NewEmergencyProposal(proposalId);
        } else {
            proposalId = voteGovernor.propose(targets, values, calldatas, description);
            emit NewVoteQuorumProposal(proposalId);
        }

        return proposalId;
    }

    /// @notice Execute a proposal
    /// @dev Calls `execute` function of the vote governors, possibly checking value governor quorum (double quorum)
    /// @param targets The targets of the proposal
    /// @param values The values of the proposal
    /// @param calldatas The calldatas of the proposal
    /// @param descriptionHash The description hash of the proposal
    /// @return proposalId The ID of the proposal
    function execute(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) external override returns (uint256) {
        bytes4 executableFuncSelector = bytes4(calldatas[0]);

        // $VALUE governance proposals
        if (executableFuncSelector == this.reset.selector) {
            uint256 valueProposalId = valueGovernor.hashProposal(targets, values, calldatas, descriptionHash);
            valueGovernor.execute(targets, values, calldatas, descriptionHash);
            return valueProposalId;
        }

        // $VOTE governance proposals
        uint256 proposalId = voteGovernor.hashProposal(targets, values, calldatas, descriptionHash);
        // Check that both value and vote governance approved parameter change
        if (executableFuncSelector == this.change.selector) {
            if (valueGovernor.state(proposalId) != IGovernor.ProposalState.Succeeded) {
                revert ValueGovernorDidNotApprove(proposalId);
            }
        }

        voteGovernor.execute(targets, values, calldatas, descriptionHash);
        return proposalId;
    }

    /*//////////////////////////////////////////////////////////////
                            PUBLIC FUNCTION
    //////////////////////////////////////////////////////////////*/

    /// @notice sell unclaimed $vote tokens
    /// @param epoch The epoch for which to sell unclaimed $vote tokens
    function sellUnclaimedVoteTokens(uint256 epoch) public {
        voteVault.sellUnclaimedVoteTokens(epoch, address(spogData.cash), voteGovernor.votingPeriod());
    }

    /// @notice returns number of vote token rewards for an epoch with active proposals
    function voteTokenInflationPerEpoch() public view returns (uint256) {
        return (voteGovernor.votingToken().totalSupply() * spogData.inflator) / 100;
    }

    /// @notice returns number of value token rewards for an epoch with active proposals
    function valueTokenInflationPerEpoch() public view returns (uint256) {
        return valueFixedInflationAmount;
    }

    /*//////////////////////////////////////////////////////////////
                            UTILITY FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @dev check SPOG interface support
    /// @param interfaceId The interface ID to check
    function supportsInterface(bytes4 interfaceId) public view override(IERC165, ERC165) returns (bool) {
        return interfaceId == type(ISPOG).interfaceId || super.supportsInterface(interfaceId);
    }

    /*//////////////////////////////////////////////////////////////
                            PRIVATE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function _initGovernedMethods() private {
        // TODO: review if there is better, more efficient way to do it
        governedMethods[this.append.selector] = true;
        governedMethods[this.changeTax.selector] = true;
        governedMethods[this.remove.selector] = true;
        governedMethods[this.addNewList.selector] = true;
        governedMethods[this.change.selector] = true;
        governedMethods[this.emergencyRemove.selector] = true;
        governedMethods[this.reset.selector] = true;
        governedMethods[this.changeConfig.selector] = true;
    }

    /// @notice pay tax from the caller to the SPOG
    /// @param funcSelector The executable function selector
    function _payFee(bytes4 funcSelector) private {
        uint256 fee;

        // Pay flat fee for all the operations except emergency remove and reset
        if (funcSelector == this.emergencyRemove.selector) {
            fee = EMERGENCY_REMOVE_TAX_MULTIPLIER * spogData.tax;
        } else if (funcSelector == this.reset.selector) {
            fee = RESET_TAX_MULTIPLIER * spogData.tax;
        } else {
            fee = spogData.tax;
        }

        // transfer the amount from the caller to the SPOG
        spogData.cash.safeTransferFrom(msg.sender, address(this), fee);
        // approve amount to be sent to the vault
        spogData.cash.approve(address(valueVault), fee);

        // deposit the amount to the vault
        uint256 epoch = valueGovernor.currentEpoch();
        valueVault.depositRewards(epoch, address(spogData.cash), fee);
    }

    /// @notice inflate Vote and Value token supplies
    /// @dev Called once per epoch when the first reward-accruing proposal is submitted ( except reset and emergencyRemove)
    function _inflateRewardTokens() private {
        uint256 nextEpoch = voteGovernor.currentEpoch() + 1;

        // Epoch reward tokens already minted, silently return
        if (epochRewardsMinted[nextEpoch]) return;

        epochRewardsMinted[nextEpoch] = true;

        // Mint and deposit Vote and Value rewards to vault
        _mintRewardsAndDepositToVault(nextEpoch, voteGovernor.votingToken(), voteTokenInflationPerEpoch());
        _mintRewardsAndDepositToVault(nextEpoch, valueGovernor.votingToken(), valueTokenInflationPerEpoch());
    }

    /// @notice mint reward token into the vault
    /// @param epoch The epoch for which rewards become claimable
    /// @param token The reward token, only vote or value tokens
    /// @param amount The amount to mint and deposit into the vault
    function _mintRewardsAndDepositToVault(uint256 epoch, ISPOGVotes token, uint256 amount) private {
        token.mint(address(this), amount);
        token.approve(address(voteVault), amount);
        voteVault.depositRewards(epoch, address(token), amount);
    }

    function _removeFromList(address _address, IList _list) private {
        // require that the list is on the master list
        if (!masterlist.contains(address(_list))) {
            revert ListIsNotInMasterList();
        }

        // remove the address from the list
        _list.remove(_address);
    }

    /// @notice extract address params from the call data
    /// @param callData The call data with selector in first 4 bytes
    /// @dev used to inspect params before allowing proposal
    function _extractAddressTypeParamsFromCalldata(bytes memory callData)
        internal
        pure
        returns (address targetParams)
    {
        assembly {
            // byte offset to represent function call data. 4 bytes funcSelector plus address 32 bytes
            let offset := 36
            // add offset so we pick from start of address params
            let addressPosition := add(callData, offset)
            // load the address params
            targetParams := mload(addressPosition)
        }
    }

    fallback() external {
        revert("SPOG: non-existent function");
    }
}
