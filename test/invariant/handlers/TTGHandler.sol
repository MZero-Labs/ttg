// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.23;

import { console2 } from "../../../lib/forge-std/src/Test.sol";
import { CommonBase } from "../../../lib/forge-std/src/Base.sol";
import { StdCheats } from "../../../lib/forge-std/src/StdCheats.sol";
import { StdUtils } from "../../../lib/forge-std/src/StdUtils.sol";

import { IEmergencyGovernor } from "../../../src/interfaces/IEmergencyGovernor.sol";
import { IPowerToken } from "../../../src/interfaces/IPowerToken.sol";

import { HolderStore } from "../stores/HolderStore.sol";
import { ProposalStore } from "../stores/ProposalStore.sol";
import { TimestampStore } from "../stores/TimestampStore.sol";

import { TestUtils } from "../../utils/TestUtils.sol";

contract TTGHandler is CommonBase, StdCheats, StdUtils, TestUtils {
    IPowerToken internal _powerToken;

    IEmergencyGovernor internal _emergencyGovernor;

    HolderStore internal _holderStore;
    ProposalStore internal _proposalStore;
    TimestampStore internal _timestampStore;

    constructor(
        IEmergencyGovernor emergencyGovernor_,
        IPowerToken powerToken_,
        HolderStore holderStore_,
        ProposalStore proposalStore_,
        TimestampStore timestampStore_
    ) {
        _emergencyGovernor = emergencyGovernor_;
        _powerToken = powerToken_;
        _holderStore = holderStore_;
        _proposalStore = proposalStore_;
        _timestampStore = timestampStore_;
    }

    modifier warpToNextEpoch() {
        _warpToNextEpoch();
        _timestampStore.setCurrentTimestamp(block.timestamp);
        _;
    }

    modifier warpToVoteEpoch() {
        if (_isTransferEpoch(_currentEpoch())) {
            console2.log("Warping to next vote epoch...");
            _warpToNextVoteEpoch();
            console2.log("Warped to vote epoch %s", _currentEpoch());
        }
        _timestampStore.setCurrentTimestamp(block.timestamp);
        _;
    }

    modifier warpToTransferEpoch() {
        if (_isVotingEpoch(_currentEpoch())) {
            console2.log("Warping to next transfer epoch...");
            _warpToNextTransferEpoch();
            console2.log("Warped to transfer epoch %s", _currentEpoch());
        }
        _timestampStore.setCurrentTimestamp(block.timestamp);
        _;
    }

    function emergencyGovernorAddToList(uint256 addToListSeed_, uint256 powerHolderIndexSeed_) external {
        address powerHolder_ = _holderStore.getPowerHolder(powerHolderIndexSeed_);

        console2.log("POWER holder %s is proposing emergency vote to add himself to list...", powerHolder_);
        _proposalStore.emergencyGovernorAddToList(addToListSeed_, powerHolder_);
        _timestampStore.setCurrentTimestamp(block.timestamp);
    }

    function voteOnEmergencyGovernorProposal(uint256 proposalIdSeed_, uint256 supportSeed_) external {
        _proposalStore.voteOnEmergencyGovernorProposal(proposalIdSeed_, supportSeed_, _holderStore.powerHolders());
        _timestampStore.setCurrentTimestamp(block.timestamp);
    }

    function executeEmergencyGovernorProposal(uint256 proposalIdSeed_) external {
        _proposalStore.executeEmergencyGovernorProposal(proposalIdSeed_);
        _timestampStore.setCurrentTimestamp(block.timestamp);
    }
}
