// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "test/shared/SPOG_Base.t.sol";
import {ERC20GodMode} from "test/mock/ERC20GodMode.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IGovernor} from "@openzeppelin/contracts/governance/Governor.sol";
import {ISPOG} from "src/interfaces/ISPOG.sol";

contract SPOG_change is SPOG_Base {
    bytes32 internal inflator;
    bytes internal elevenAsCalldataValue;
    uint8 internal yesVote;
    uint8 internal noVote;

    event NewDoubleQuorumProposal(uint256 indexed proposalId);
    event DoubleQuorumFinalized(bytes32 indexed identifier);

    function setUp() public override {
        inflator = "inflator";
        elevenAsCalldataValue = abi.encode(11);
        yesVote = 1;
        noVote = 0;

        super.setUp();
    }

    /*//////////////////////////////////////////////////////////////
                                HELPERS
    //////////////////////////////////////////////////////////////*/

    function proposeInflatorChange(string memory proposalDescription)
        private
        returns (uint256, address[] memory, uint256[] memory, bytes[] memory, bytes32)
    {
        address[] memory targets = new address[](1);
        targets[0] = address(spog);
        uint256[] memory values = new uint256[](1);
        values[0] = 0;
        bytes[] memory calldatas = new bytes[](1);
        bytes memory callData = abi.encodeWithSignature("change(bytes32,bytes)", inflator, elevenAsCalldataValue);
        string memory description = proposalDescription;
        calldatas[0] = callData;

        bytes32 hashedDescription = keccak256(abi.encodePacked(description));
        uint256 proposalId = governor.hashProposal(targets, values, calldatas, hashedDescription);

        // create proposal
        deployScript.cash().approve(address(spog), deployScript.tax());

        // Check the event is emitted
        expectEmit();
        emit NewDoubleQuorumProposal(proposalId);

        uint256 spogProposalId = governor.propose(targets, values, calldatas, description);
        assertTrue(spogProposalId == proposalId, "spog proposal id does not match vote governor proposal id");

        return (proposalId, targets, values, calldatas, hashedDescription);
    }

    function test_Revert_Change_WhenNotCalledFromGovernance() public {
        vm.expectRevert(ISPOG.OnlyGovernor.selector);
        spog.change(inflator, elevenAsCalldataValue);
    }

    function test_Revert_Change_WhenPassingAnIncorrectParamsToChange() public {
        bytes32 incorrectParams = "tax";

        address[] memory targets = new address[](1);
        targets[0] = address(spog);
        uint256[] memory values = new uint256[](1);
        values[0] = 0;
        bytes[] memory calldatas = new bytes[](1);

        calldatas[0] = abi.encodeWithSignature("change(bytes32,bytes)", incorrectParams, elevenAsCalldataValue);
        string memory description = "Change tax which should not be possible to change with double quorum";

        (bytes32 hashedDescription, uint256 proposalId) =
            getProposalIdAndHashedDescription(targets, values, calldatas, description);

        // vote on proposal
        deployScript.cash().approve(address(spog), deployScript.tax());
        governor.propose(targets, values, calldatas, description);

        // fast forward to an active voting period
        vm.roll(block.number + governor.votingDelay() + 1);

        // vote holders vote on proposal
        governor.castVote(proposalId, yesVote);

        // value holders vote on proposal
        governor.castVote(proposalId, yesVote);

        // fast forward to end of voting period
        vm.roll(block.number + deployScript.time() + 1);

        // another way to get custom error selector:
        vm.expectRevert(abi.encodeWithSelector(ISPOG.InvalidParameter.selector, incorrectParams));
        governor.execute(targets, values, calldatas, hashedDescription);

        // assert that tax was not modified
        (uint256 tax,,) = spog.spogData();
        assertFalse(tax == 11, "Tax should not have been changed");
    }

    function test_Revert_Change_WhenValueHoldersDoNotVote() public {
        (
            uint256 proposalId,
            address[] memory targets,
            uint256[] memory values,
            bytes[] memory calldatas,
            bytes32 hashedDescription
        ) = proposeInflatorChange("Change inflator variable in spog");

        assertTrue(governor.votingDelay() == governor.votingDelay(), "voting delay should be 1");
        // fast forward to an active voting period
        vm.roll(block.number + governor.votingDelay() + 1);

        // vote holders vote on proposal and no votes from value holders
        governor.castVote(proposalId, yesVote);

        // fast forward to end of voting period
        vm.roll(block.number + deployScript.time() + 1);

        // Check that execute function is reverted if value quorum is not reached
        vm.expectRevert(abi.encodeWithSelector(ISPOG.ValueGovernorDidNotApprove.selector, proposalId));
        governor.execute(targets, values, calldatas, hashedDescription);

        (, uint256 inflatorFirstCheck,) = spog.spogData();

        // assert that inflator has not been changed
        assertFalse(inflatorFirstCheck == 11, "Reward should not have been changed");
    }

    function test_Revert_Change_WhenVoteHoldersDoNotAgree() public {
        (
            uint256 proposalId,
            address[] memory targets,
            uint256[] memory values,
            bytes[] memory calldatas,
            bytes32 hashedDescription
        ) = proposeInflatorChange("Change inflator variable in spog");

        // fast forward to an active voting period
        vm.roll(block.number + governor.votingDelay() + 1);

        // value holders vote `Yes` on proposal, vote holders vote `No`
        // TODO: it's not possible anymore
        // governor.castVote(proposalId, yesVote);
        governor.castVote(proposalId, noVote);

        // fast forward to end of voting period
        vm.roll(block.number + deployScript.time() + 1);

        assertFalse(governor.state(proposalId) == IGovernor.ProposalState.Succeeded);

        // Check that execute function is reverted if vote quorum is not reached
        vm.expectRevert("Governor: proposal not successful");
        governor.execute(targets, values, calldatas, hashedDescription);

        (, uint256 inflatorFirstCheck,) = spog.spogData();

        // assert that inflator has not been changed
        assertFalse(inflatorFirstCheck == 11, "Reward should not have been changed");
    }

    function test_Change_SPOGProposalToChangeVariableInSpog() public {
        (
            uint256 proposalId,
            address[] memory targets,
            uint256[] memory values,
            bytes[] memory calldatas,
            bytes32 hashedDescription
        ) = proposeInflatorChange("Change inflator variable in spog");

        // fast forward to an active voting period
        vm.roll(block.number + governor.votingDelay() + 1);

        // vote and value holders vote on proposal
        governor.castVote(proposalId, yesVote);

        // fast forward to end of voting period
        vm.roll(block.number + deployScript.time() + 1);

        bytes32 identifier = keccak256(abi.encodePacked(inflator, elevenAsCalldataValue));
        // check that DoubleQuorumFinalized event was triggered
        expectEmit();
        emit DoubleQuorumFinalized(identifier);
        governor.execute(targets, values, calldatas, hashedDescription);

        (, uint256 inflatorFirstCheck,) = spog.spogData();

        // assert that inflator been changed
        assertTrue(inflatorFirstCheck == 11, "Reward should have been changed");
    }

    function test_Change_ChangeCashToken_SPOGProposalToChangeVariableInSpog() public {
        ERC20GodMode newCashInstance = new ERC20GodMode(
            "New Cash",
            "NCASH",
            18
        );
        bytes32 cash = "cash";
        bytes memory newCash = abi.encode(address(newCashInstance));

        // create proposal to change variable in spog
        address[] memory targets = new address[](1);
        targets[0] = address(spog);
        uint256[] memory values = new uint256[](1);
        values[0] = 0;
        bytes[] memory calldatas = new bytes[](1);

        calldatas[0] = abi.encodeWithSignature("change(bytes32,bytes)", cash, newCash);
        string memory description = "Change cash variable in spog";

        (bytes32 hashedDescription, uint256 proposalId) =
            getProposalIdAndHashedDescription(targets, values, calldatas, description);

        // create proposal
        deployScript.cash().approve(address(spog), deployScript.tax());
        governor.propose(targets, values, calldatas, description);

        // fast forward to an active voting period
        vm.roll(block.number + governor.votingDelay() + 1);

        // vote and value holders vote on proposal
        governor.castVote(proposalId, yesVote);

        // fast forward to end of voting period
        vm.roll(block.number + deployScript.time() + 1);

        bytes32 identifier = keccak256(abi.encodePacked(cash, newCash));
        // check that DoubleQuorumFinalized event was triggered
        expectEmit();
        emit DoubleQuorumFinalized(identifier);
        governor.execute(targets, values, calldatas, hashedDescription);

        (,, IERC20 cashFirstCheck) = spog.spogData();

        // assert that cash has been changed
        assertTrue(address(cashFirstCheck) == address(newCashInstance), "Cash token was not changed");
    }
}
