// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.23;

import { EmergencyGovernor } from "../../src/EmergencyGovernor.sol";

contract EmergencyGovernorHarness is EmergencyGovernor {
    constructor(
        address voteToken_,
        address zeroGovernor_,
        address registrar_,
        address standardGovernor_,
        uint16 thresholdRatio_
    ) EmergencyGovernor(voteToken_, zeroGovernor_, registrar_, standardGovernor_, thresholdRatio_) {}

    function setProposal(uint256 proposalId_, uint256 voteStart_, uint256 thresholdRatio_) external {
        setProposal(proposalId_, voteStart_, false, address(0), thresholdRatio_, 0, 0);
    }

    function setProposal(
        uint256 proposalId_,
        uint256 voteStart_,
        bool executed_,
        address proposer_,
        uint256 thresholdRatio_,
        uint256 noWeight_,
        uint256 yesWeight_
    ) public {
        _proposals[proposalId_] = Proposal({
            voteStart: uint16(voteStart_),
            executed: executed_,
            proposer: proposer_,
            thresholdRatio: uint16(thresholdRatio_),
            noWeight: noWeight_,
            yesWeight: yesWeight_
        });
    }

    function revertIfInvalidCalldata(bytes memory callData_) external pure {
        _revertIfInvalidCalldata(callData_);
    }
}
