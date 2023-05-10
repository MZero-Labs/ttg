// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ISPOG} from "src/interfaces/ISPOG.sol";
import {ISPOGGovernor} from "src/interfaces/ISPOGGovernor.sol";
import {ISPOGVotes} from "src/interfaces/tokens/ISPOGVotes.sol";
import {BaseVault} from "src/periphery/vaults/BaseVault.sol";
import {IVoteVault} from "src/interfaces/vaults/IVoteVault.sol";

import {IERC20PricelessAuction} from "src/interfaces/IERC20PricelessAuction.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

/// @title Vault
/// @notice contract that will hold the SPOG assets. It has rules for transferring ERC20 tokens out of the smart contract.
contract VoteVault is IVoteVault, BaseVault {
    using SafeERC20 for IERC20;

    IERC20PricelessAuction public immutable auctionContract;

    constructor(ISPOGGovernor _governor, IERC20PricelessAuction _auctionContract) BaseVault(_governor) {
        auctionContract = _auctionContract;
    }

    /// @notice Sell unclaimed vote tokens
    /// @param epoch Epoch to view unclaimed tokens
    function unclaimedVoteTokensForEpoch(uint256 epoch) public view returns (uint256) {
        address token = address(governor.votingToken());
        return epochTokenDeposit[token][epoch] - epochTokenTotalWithdrawn[token][epoch];
    }

    /// @notice Sell unclaimed vote tokens
    /// @param epoch Epoch to sell tokens from
    /// @param paymentToken Token to accept for payment
    /// @param duration The duration of the auction
    function sellUnclaimedVoteTokens(uint256 epoch, address paymentToken, uint256 duration) external onlySPOG {
        uint256 currentEpoch = governor.currentEpoch();
        require(epoch < currentEpoch, "Vault: epoch is not in the past");

        address token = address(governor.votingToken());
        address auction = Clones.cloneDeterministic(address(auctionContract), bytes32(epoch));

        uint256 unclaimed = unclaimedVoteTokensForEpoch(epoch);
        // TODO: introduce error
        if (unclaimed == 0) {
            return;
        }
        IERC20(token).approve(auction, unclaimed);

        IERC20PricelessAuction(auction).initialize(token, paymentToken, duration, address(this), unclaimed);

        // emit VoteTokenAuction(token, epoch, auction, unclaimed);
    }

    /// @dev Claim Vote token inflation rewards by vote holders
    function claimVoteTokenRewards(uint256 epoch) external {
        require(epoch <= governor.currentEpoch(), "Vault: epoch is not in the past");
        address rewardToken = address(governor.votingToken());

        _checkParticipation(epoch);

        // vote holders claim their epoch vote rewards
        _withdrawTokenRewards(epoch, rewardToken, RewardsSharingStrategy.ALL_PARTICIPANTS_PRO_RATA);
    }

    /// @dev Claim Value token inflation rewards by vote holders
    function claimValueTokenRewards(uint256 epoch) external {
        require(epoch < governor.currentEpoch(), "Vault: epoch is not in the past");
        address valueToken = address(ISPOG(governor.spogAddress()).valueGovernor().votingToken());

        _checkParticipation(epoch);

        // vote holders claim their epoch value rewards
        _withdrawTokenRewards(epoch, valueToken, RewardsSharingStrategy.ACTIVE_PARTICIPANTS_PRO_RATA);
    }

    // @notice Update vote governor after `RESET` was executed
    // @param newVoteGovernor New vote governor
    function updateGovernor(ISPOGGovernor newGovernor) external onlySPOG {
        governor = newGovernor;

        // emit VoteGovernorUpdated(address(newVoteGovernor), address(newVoteGovernor.votingToken()));
    }

    // TODO potentially modifier ?
    function _checkParticipation(uint256 epoch) private view {
        // withdraw rewards only if voted on all proposals in epoch
        uint256 numOfProposalsVotedOnEpoch = governor.accountEpochNumProposalsVotedOn(msg.sender, epoch);
        uint256 totalProposalsEpoch = governor.epochProposalsCount(epoch);
        require(
            numOfProposalsVotedOnEpoch == totalProposalsEpoch,
            "Vault: unable to withdraw due to not voting on all proposals"
        );
    }

    fallback() external {
        revert("Vault: non-existent function");
    }
}