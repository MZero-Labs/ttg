// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.23;

import { IBatchGovernor } from "../../../../../src/abstract/interfaces/IBatchGovernor.sol";
import { IGovernor } from "../../../../../src/abstract/interfaces/IGovernor.sol";

import { IEmergencyGovernor } from "../../../../../src/interfaces/IEmergencyGovernor.sol";
import { IEmergencyGovernorDeployer } from "../../../../../src/interfaces/IEmergencyGovernorDeployer.sol";
import { IPowerToken } from "../../../../../src/interfaces/IPowerToken.sol";
import { IPowerTokenDeployer } from "../../../../../src/interfaces/IPowerTokenDeployer.sol";
import { IStandardGovernor } from "../../../../../src/interfaces/IStandardGovernor.sol";
import { IStandardGovernorDeployer } from "../../../../../src/interfaces/IStandardGovernorDeployer.sol";
import { IZeroGovernor } from "../../../../../src/interfaces/IZeroGovernor.sol";

import { ResetIntegrationBaseSetup } from "../ResetIntegrationBaseSetup.t.sol";

contract ResetToZeroHolders_IntegrationTest is ResetIntegrationBaseSetup {
    function test_resetToZeroHolders() external {
        address[] memory targets_ = new address[](1);
        targets_[0] = address(_zeroGovernor);

        uint256[] memory values_ = new uint256[](1);

        bytes[] memory callDatas_ = new bytes[](1);
        callDatas_[0] = abi.encodeWithSelector(_zeroGovernor.resetToZeroHolders.selector);

        string memory description_ = "Reset to Zero holders";

        _warpToNextEpoch();

        uint256 voteStart_ = _currentEpoch();
        uint256 proposalId_ = _hashProposal(callDatas_[0], voteStart_, address(_zeroGovernor));

        vm.expectEmit();
        emit IGovernor.ProposalCreated(
            proposalId_,
            _dave,
            targets_,
            values_,
            new string[](targets_.length),
            callDatas_,
            voteStart_,
            voteStart_ + _zeroGovernor.votingPeriod(),
            description_
        );

        vm.prank(_dave);
        _zeroGovernor.propose(targets_, values_, callDatas_, description_);

        (, , IGovernor.ProposalState activeState_, , , , , ) = _zeroGovernor.getProposal(proposalId_);

        assertEq(uint256(activeState_), 1);

        uint8 yesSupport_ = uint8(IBatchGovernor.VoteType.Yes);

        uint256 daveZeroWeight_ = _zeroToken.getVotes(_dave);

        vm.expectEmit();
        emit IGovernor.VoteCast(_dave, proposalId_, yesSupport_, daveZeroWeight_, "");

        vm.prank(_dave);
        assertEq(_zeroGovernor.castVote(proposalId_, yesSupport_), daveZeroWeight_);

        uint256 eveZeroWeight_ = _zeroToken.getVotes(_eve);

        vm.expectEmit();
        emit IGovernor.VoteCast(_eve, proposalId_, yesSupport_, eveZeroWeight_, "");

        vm.prank(_eve);
        assertEq(_zeroGovernor.castVote(proposalId_, yesSupport_), eveZeroWeight_);

        (, , IGovernor.ProposalState succeededState_, , , , , ) = _zeroGovernor.getProposal(proposalId_);
        assertEq(uint256(succeededState_), 4);

        IPowerToken nextPowerToken_ = IPowerToken(IPowerTokenDeployer(_registrar.powerTokenDeployer()).nextDeploy());

        address nextStandardGovernor_ = IStandardGovernorDeployer(_registrar.standardGovernorDeployer()).nextDeploy();

        address nextEmergencyGovernor_ = IEmergencyGovernorDeployer(_registrar.emergencyGovernorDeployer())
            .nextDeploy();

        vm.expectEmit();
        emit IGovernor.ProposalExecuted(proposalId_);

        vm.expectEmit();
        emit IZeroGovernor.ResetExecuted(
            address(_zeroToken),
            nextStandardGovernor_,
            nextEmergencyGovernor_,
            address(nextPowerToken_)
        );

        _zeroGovernor.execute(targets_, values_, callDatas_, keccak256(bytes(description_)));

        assertEq(_registrar.powerToken(), address(nextPowerToken_));
        assertEq(_registrar.standardGovernor(), nextStandardGovernor_);
        assertEq(_registrar.emergencyGovernor(), nextEmergencyGovernor_);

        assertEq(nextPowerToken_.balanceOf(_alice), 0);
        assertEq(nextPowerToken_.balanceOf(_bob), 0);
        assertEq(nextPowerToken_.balanceOf(_carol), 0);
        assertEq(nextPowerToken_.balanceOf(_dave), nextPowerToken_.pastBalanceOf(_dave, START_EPOCH));
        assertEq(nextPowerToken_.balanceOf(_eve), nextPowerToken_.pastBalanceOf(_eve, START_EPOCH));
        assertEq(nextPowerToken_.balanceOf(_frank), nextPowerToken_.pastBalanceOf(_frank, START_EPOCH));

        (, , IGovernor.ProposalState executedState_, , , , , ) = _zeroGovernor.getProposal(proposalId_);
        assertEq(uint256(executedState_), 7);

        address[] memory powerUsers_ = new address[](3);
        powerUsers_[0] = _dave;
        powerUsers_[1] = _dave;
        powerUsers_[2] = _eve;

        _revertIfGovernorsAreNotFunctional(
            IStandardGovernor(nextStandardGovernor_),
            IEmergencyGovernor(nextEmergencyGovernor_),
            powerUsers_
        );
    }
}
