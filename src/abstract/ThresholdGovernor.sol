// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.21;

import { PureEpochs } from "../libs/PureEpochs.sol";

import { IGovernor } from "./interfaces/IGovernor.sol";
import { IThresholdGovernor } from "./interfaces/IThresholdGovernor.sol";

import { BatchGovernor } from "./BatchGovernor.sol";

abstract contract ThresholdGovernor is IThresholdGovernor, BatchGovernor {
    uint16 internal _thresholdRatio;

    constructor(
        string memory name_,
        address registrar_,
        address voteToken_,
        uint16 thresholdRatio_
    ) BatchGovernor(name_, registrar_, voteToken_) {
        _setThresholdRatio(thresholdRatio_);
    }

    /******************************************************************************************************************\
    |                                      External/Public Interactive Functions                                       |
    \******************************************************************************************************************/

    function execute(
        address[] memory,
        uint256[] memory,
        bytes[] memory callDatas_,
        bytes32
    ) external payable returns (uint256 proposalId_) {
        if (msg.value != 0) revert InvalidValue();

        // Proposals have voteStart=N and voteEnd=N+1, and can be executed only during epochs N and N+1.
        uint256 firstPotentialVoteStart_ = PureEpochs.currentEpoch() - 1;

        proposalId_ = _tryExecute(callDatas_[0], firstPotentialVoteStart_, firstPotentialVoteStart_ - 1);
    }

    function propose(
        address[] memory targets_,
        uint256[] memory values_,
        bytes[] memory callDatas_,
        string memory description_
    ) external returns (uint256 proposalId_) {
        (proposalId_, ) = _propose(targets_, values_, callDatas_, description_);
    }

    /******************************************************************************************************************\
    |                                       External/Public View/Pure Functions                                        |
    \******************************************************************************************************************/

    function getProposal(
        uint256 proposalId_
    )
        external
        view
        returns (
            uint16 voteStart_,
            uint16 voteEnd_,
            bool executed_,
            ProposalState state_,
            uint16 thresholdRatio_,
            uint256 noVotes_,
            uint256 yesVotes_,
            address proposer_
        )
    {
        Proposal storage proposal_ = _proposals[proposalId_];

        voteStart_ = proposal_.voteStart;
        voteEnd_ = proposal_.voteEnd;
        executed_ = proposal_.executed;
        state_ = state(proposalId_);
        thresholdRatio_ = proposal_.thresholdRatio;
        noVotes_ = proposal_.noWeight;
        yesVotes_ = proposal_.yesWeight;
        proposer_ = proposal_.proposer;
    }

    function quorum(uint256 timepoint_) external view returns (uint256 quorum_) {
        // NOTE: This will only be correct for the first epoch of a proposals lifetime.
        return (_thresholdRatio * _getTotalSupply(timepoint_ - 1)) / ONE;
    }

    function state(uint256 proposalId_) public view override(BatchGovernor, IGovernor) returns (ProposalState state_) {
        Proposal storage proposal_ = _proposals[proposalId_];

        if (proposal_.executed) return ProposalState.Executed;

        uint256 voteStart_ = proposal_.voteStart;

        if (voteStart_ == 0) revert ProposalDoesNotExist();

        uint256 currentEpoch_ = PureEpochs.currentEpoch();

        if (currentEpoch_ < voteStart_) return ProposalState.Pending;

        uint256 totalSupply_ = _getTotalSupply(voteStart_ - 1);
        uint256 thresholdRatio_ = proposal_.thresholdRatio;

        // If proposal is currently succeeding, it has either succeeded or expired.
        if (proposal_.yesWeight * ONE >= thresholdRatio_ * totalSupply_) {
            return currentEpoch_ <= proposal_.voteEnd ? ProposalState.Succeeded : ProposalState.Expired;
        }

        bool canSucceed_ = (totalSupply_ - proposal_.noWeight) * ONE >= thresholdRatio_ * totalSupply_;

        // If proposal can succeed while voting is open, it is active.
        if (canSucceed_ && currentEpoch_ <= proposal_.voteEnd) return ProposalState.Active;

        return ProposalState.Defeated;
    }

    function thresholdRatio() external view returns (uint16 thresholdRatio_) {
        return _thresholdRatio;
    }

    function votingDelay() external pure returns (uint256 votingDelay_) {
        return 0;
    }

    function votingPeriod() external pure returns (uint256 votingPeriod_) {
        return 2;
    }

    /******************************************************************************************************************\
    |                                          Internal Interactive Functions                                          |
    \******************************************************************************************************************/

    function _createProposal(uint256 proposalId_, uint256 voteStart_) internal override returns (uint256 voteEnd_) {
        voteEnd_ = voteStart_ + 1;

        _proposals[proposalId_] = Proposal({
            voteStart: uint16(voteStart_),
            voteEnd: uint16(voteEnd_),
            executed: false,
            proposer: msg.sender,
            thresholdRatio: _thresholdRatio,
            quorumRatio: 0,
            noWeight: 0,
            yesWeight: 0
        });
    }

    function _setThresholdRatio(uint16 newThresholdRatio_) internal {
        if (newThresholdRatio_ > ONE) revert InvalidThresholdRatio();

        emit ThresholdRatioSet(_thresholdRatio = newThresholdRatio_);
    }
}