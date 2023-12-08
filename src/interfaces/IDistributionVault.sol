// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.23;

import { IStatefulERC712 } from "../../lib/common/src/interfaces/IStatefulERC712.sol";
import { IERC6372 } from "../abstract/interfaces/IERC6372.sol";

/// @title A contract enabling pro rate distribution of arbitrary tokens to holders of the Zero Token.
interface IDistributionVault is IERC6372, IStatefulERC712 {
    /******************************************************************************************************************\
    |                                                      Errors                                                      |
    \******************************************************************************************************************/

    /// @notice Revert message when the Zero Token address set at deployment is address(0).
    error InvalidZeroTokenAddress();

    /**
     * @notice Revert message when a query for past values is for a timepoint greater or equal to the current clock.
     * @param  timepoint The timepoint being queried.
     * @param  clock     The current timepoint.
     */
    error NotPastTimepoint(uint256 timepoint, uint256 clock);

    /// @notice Revert message when a token transfer, from this contract, fails.
    error TransferFailed();

    /******************************************************************************************************************\
    |                                                      Events                                                      |
    \******************************************************************************************************************/

    /**
     * @notice Emitted when `account` claims `token` distribution between inclusive epochs `startEpoch` and `endEpoch`.
     * @param  token      The address of the token being claimed.
     * @param  account    The address of the account claiming the distribution.
     * @param  startEpoch The starting epoch number as a clock value.
     * @param  endEpoch   The ending epoch number as a clock value.
     * @param  amount     The total amount of token claimed by `account`.
     */
    event Claim(address indexed token, address indexed account, uint256 startEpoch, uint256 endEpoch, uint256 amount);

    /**
     * @notice Emitted when `token` is distributed pro rata to all holders at epoch `epoch`.
     * @param  token  The address of the token being distributed.
     * @param  epoch  The epoch number as a clock value.
     * @param  amount The total amount of token being distributed.
     */
    event Distribution(address indexed token, uint256 indexed epoch, uint256 amount);

    /******************************************************************************************************************\
    |                                              Interactive Functions                                               |
    \******************************************************************************************************************/

    /**
     * @notice Allows a caller to claim `token` distribution between inclusive epochs `startEpoch` and `endEpoch`.
     * @param  token       The address of the token being claimed.
     * @param  startEpoch  The starting epoch number as a clock value.
     * @param  endEpoch    The ending epoch number as a clock value.
     * @param  destination The address the account where the claimed token will be sent.
     * @return claimed     The total amount of token claimed by `account`.
     */
    function claim(
        address token,
        uint256 startEpoch,
        uint256 endEpoch,
        address destination
    ) external returns (uint256 claimed);

    /**
     * @notice Allows a signer to claim `token` distribution between inclusive epochs `startEpoch` and `endEpoch`.
     * @param  account     The purported address of the signing account.
     * @param  token       The address of the token being claimed.
     * @param  startEpoch  The starting epoch number as a clock value.
     * @param  endEpoch    The ending epoch number as a clock value.
     * @param  destination The address of the account where the claimed token will be sent.
     * @param  deadline    The last block number where the signature is still valid.
     * @param  signature   A byte array signature.
     * @return claimed     The total amount of token claimed by `account`.
     */
    function claimBySig(
        address account,
        address token,
        uint256 startEpoch,
        uint256 endEpoch,
        address destination,
        uint256 deadline,
        bytes memory signature
    ) external returns (uint256 claimed);

    /**
     * @notice Allows for the `token` distribution of an unaccounted for balance of the token.
     * @param  token  The address of the token being distributed.
     * @return amount The total amount of additional token accounted in this distribution event.
     */
    function distribute(address token) external returns (uint256 amount);

    /******************************************************************************************************************\
    |                                               View/Pure Functions                                                |
    \******************************************************************************************************************/

    /// @notice Returns the EIP712 typehash used in the encoding of the digest for the claimBySig function.
    function CLAIM_TYPEHASH() external view returns (bytes32 typehash);

    /**
     * @notice Returns the total amount of `token` eligible for distribution to holder at the end of epoch `epoch`.
     * @param  token  The address of some token.
     * @param  epoch  The epoch number as a clock value.
     * @return amount The total amount of token eligible for distribution to holder at the end of the epoch.
     */
    function distributionOfAt(address token, uint256 epoch) external view returns (uint256 amount);

    /**
     * @notice Returns the amount of `token` `account` can claim between inclusive epochs `startEpoch` and `endEpoch`.
     * @param  token      The address of some token.
     * @param  account    The address of some account.
     * @param  startEpoch The starting epoch number as a clock value.
     * @param  endEpoch   The ending epoch number as a clock value.
     * @return claimable  The amount of token that `account` has yet to claim for these epochs, if any.
     */
    function getClaimable(
        address token,
        address account,
        uint256 startEpoch,
        uint256 endEpoch
    ) external view returns (uint256 claimable);

    /**
     * @notice Returns whether `account` has already claimed their `token` distribution for `epoch`.
     * @param  token   The address of some token.
     * @param  account The address of some account.
     * @param  epoch   The epoch number as a clock value.
     * @return Whether `account` has already claimed `token` rewards for `epoch`.
     */
    function hasClaimed(address token, uint256 epoch, address account) external view returns (bool);

    /**
     * @notice Returns the name of the contract.
     * @return The contract name.
     */
    function name() external view returns (string memory);

    /**
     * @notice Returns the address of the Zero Token holders must have in order to be eligible for distributions.
     * @return The Zero Token address.
     */
    function zeroToken() external view returns (address);
}
