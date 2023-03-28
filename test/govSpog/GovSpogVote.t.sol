// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "forge-std/console.sol";
import {BaseTest} from "test/Base.t.sol";

import "src/core/SPOG.sol";
import {SPOGDeployScript} from "script/SPOGDeploy.s.sol";
import {GovSPOG} from "src/core/GovSPOG.sol";
import {SPOGVotes} from "src/tokens/SPOGVotes.sol";
import {IList} from "src/interfaces/IList.sol";
import {List} from "src/periphery/List.sol";
import {IGovernor} from "@openzeppelin/contracts/governance/Governor.sol";
import {Vault} from "src/periphery/Vault.sol";

contract GovSPOGTest is BaseTest {
    SPOG public spog;
    SPOGVotes public spogVote;
    GovSPOG public govSPOGVote;
    SPOGDeployScript public deployScript;
    List public list;
    Vault public vault;

    function setUp() public {
        deployScript = new SPOGDeployScript();
        deployScript.run();

        spog = deployScript.spog();
        spogVote = SPOGVotes(address(deployScript.vote()));
        govSPOGVote = deployScript.govSPOGVote();

        // mint spogVote to address(this) and self-delegate
        deal({
            token: address(spogVote),
            to: address(this),
            give: 100e18,
            adjust: true
        });
        spogVote.delegate(address(this));

        // deploy list and change admin to spog
        list = new List("My List");
        list.changeAdmin(address(spog));

        vault = deployScript.vault();
    }

    /******** Helpers ********/

    function proposeAddingNewListToSpog(
        string memory proposalDescription
    )
        private
        returns (
            uint256,
            address[] memory,
            uint256[] memory,
            bytes[] memory,
            bytes32
        )
    {
        address[] memory targets = new address[](1);
        targets[0] = address(spog);
        uint256[] memory values = new uint256[](1);
        values[0] = 0;
        bytes[] memory calldatas = new bytes[](1);
        calldatas[0] = abi.encodeWithSignature("addNewList(address)", list);
        string memory description = proposalDescription;

        bytes32 hashedDescription = keccak256(abi.encodePacked(description));
        uint256 proposalId = govSPOGVote.hashProposal(
            targets,
            values,
            calldatas,
            hashedDescription
        );

        // vote on proposal
        deployScript.cash().approve(address(spog), deployScript.tax());
        spog.propose(
            IGovSPOG(address(govSPOGVote)),
            targets,
            values,
            calldatas,
            description
        );

        return (proposalId, targets, values, calldatas, hashedDescription);
    }

    /******** Test Functions ********/

    function test_StartOfNextVotingPeriod() public {
        uint256 votingPeriod = govSPOGVote.votingPeriod();
        uint256 startOfNextVotingPeriod = govSPOGVote.startOfNextVotingPeriod();

        assertTrue(startOfNextVotingPeriod > block.number);
        assertEq(startOfNextVotingPeriod, block.number + votingPeriod);
    }

    function test_CanOnlyVoteOnAProposalAfterItsVotingDelay() public {
        // propose adding a new list to spog
        (uint256 proposalId, , , , ) = proposeAddingNewListToSpog(
            "Add new list to spog"
        );
        uint8 yesVote = 1;

        // revert happens when voting on proposal before voting period has started
        vm.expectRevert("Governor: vote not currently active");
        govSPOGVote.castVote(proposalId, yesVote);

        // check proposal is pending. Note voting is not active until voteDelay is reached
        assertTrue(
            govSPOGVote.state(proposalId) == IGovernor.ProposalState.Pending,
            "Proposal is not in an pending state"
        );

        // fast forward to an active voting period
        vm.roll(block.number + govSPOGVote.votingDelay() + 1);

        // cast vote on proposal
        govSPOGVote.castVote(proposalId, yesVote);

        // check that proposal has 1 vote
        (uint256 noVotes, uint256 yesVotes) = govSPOGVote.proposalVotes(
            proposalId
        );

        console.log("noVotes: ", noVotes);
        console.log("yesVotes: ", yesVotes);

        // spogVote balance of voter
        uint256 spogVoteBalance = spogVote.balanceOf(address(this));

        assertTrue(
            yesVotes == spogVoteBalance,
            "Proposal does not have expected yes vote"
        );
        assertTrue(noVotes == 0, "Proposal does not have 0 no vote");
    }

    function test_CanVoteOnMultipleProposalsAfterItsVotingDelay() public {
        /********** Proposal 1 and 2 **********/
        // propose adding a new list to spog
        (uint256 proposalId, , , , ) = proposeAddingNewListToSpog(
            "Add new list to spog"
        );
        (uint256 proposalId2, , , , ) = proposeAddingNewListToSpog(
            "Another new list to spog"
        );

        uint8 noVote = 0;
        uint8 yesVote = 1;

        // revert happens when voting on proposal before voting period has started
        vm.expectRevert("Governor: vote not currently active");
        govSPOGVote.castVote(proposalId, yesVote);

        vm.expectRevert("Governor: vote not currently active");
        govSPOGVote.castVote(proposalId2, noVote);

        // check proposal is pending. Note voting is not active until voteDelay is reached
        assertTrue(
            govSPOGVote.state(proposalId) == IGovernor.ProposalState.Pending,
            "Proposal is not in an pending state"
        );

        assertTrue(
            govSPOGVote.state(proposalId2) == IGovernor.ProposalState.Pending,
            "Proposal2 is not in an pending state"
        );

        // fast forward to an active voting period
        vm.roll(block.number + govSPOGVote.votingDelay() + 1);

        // cast vote on proposal
        govSPOGVote.castVote(proposalId, yesVote);
        govSPOGVote.castVote(proposalId2, noVote);

        // check that proposal has 1 vote
        (uint256 noVotes, uint256 yesVotes) = govSPOGVote.proposalVotes(
            proposalId
        );
        (uint256 noVotes2, uint256 yesVotes2) = govSPOGVote.proposalVotes(
            proposalId2
        );

        // spogVote balance of voter
        uint256 spogVoteBalance = spogVote.balanceOf(address(this));

        assertTrue(
            yesVotes == spogVoteBalance,
            "Proposal does not have expected yes vote"
        );
        assertTrue(noVotes == 0, "Proposal does not have 0 no vote");

        assertTrue(
            noVotes2 == spogVoteBalance,
            "Proposal2 does not have expected no vote"
        );
        assertTrue(yesVotes2 == 0, "Proposal2 does not have 0 yes vote");

        /********** Proposal 3 **********/
        // Add another proposal and voting can only happen after vote delay
        (uint256 proposalId3, , , , ) = proposeAddingNewListToSpog(
            "Proposal3 for new list to spog"
        );

        vm.expectRevert("Governor: vote not currently active");
        govSPOGVote.castVote(proposalId3, noVote);

        assertTrue(
            govSPOGVote.state(proposalId3) == IGovernor.ProposalState.Pending,
            "Proposal3 is not in an pending state"
        );

        // fast forward to an active voting period
        vm.roll(block.number + govSPOGVote.votingDelay() + 1);

        // cast vote on proposal
        govSPOGVote.castVote(proposalId3, noVote);

        (uint256 noVotes3, uint256 yesVotes3) = govSPOGVote.proposalVotes(
            proposalId3
        );

        assertTrue(
            noVotes3 == spogVoteBalance,
            "Proposal3 does not have expected no vote"
        );
        assertTrue(yesVotes3 == 0, "Proposal3 does not have 0 yes vote");
    }

    function test_VoteTokenSupplyInflatesAfterEachVotingPeriod() public {
        (
            uint256 proposalId,
            address[] memory targets,
            uint256[] memory values,
            bytes[] memory calldatas,
            bytes32 hashedDescription
        ) = proposeAddingNewListToSpog("new list to spog");
        uint8 yesVote = 1;

        uint256 spogVoteSupplyBefore = spogVote.totalSupply();

        uint256 vaultVoteTokenBalanceBefore = spogVote.balanceOf(
            address(vault)
        );

        // fast forward to an active voting period. Inflate vote token supply
        vm.roll(block.number + govSPOGVote.votingDelay() + 1);

        govSPOGVote.castVote(proposalId, yesVote);

        uint256 spogVoteSupplyAfterFirstPeriod = spogVote.totalSupply();
        uint256 amountAddedByInflation = (spogVoteSupplyBefore *
            deployScript.inflator()) / 100;

        assertEq(
            spogVoteSupplyAfterFirstPeriod,
            spogVoteSupplyBefore + amountAddedByInflation,
            "Vote token supply didn't inflate correctly"
        );

        // check that vault has received the vote inflationary supply
        uint256 vaultVoteTokenBalanceAfterFirstPeriod = spogVote.balanceOf(
            address(vault)
        );
        assertEq(
            vaultVoteTokenBalanceAfterFirstPeriod,
            vaultVoteTokenBalanceBefore + amountAddedByInflation,
            "Vault did not receive the accurate vote inflationary supply"
        );

        // fast forward to end of voting period
        vm.roll(block.number + deployScript.voteTime() + 1);

        // execute proposal
        govSPOGVote.execute(targets, values, calldatas, hashedDescription);

        uint256 spogVoteSupplyAfterSecondPeriod = spogVote.totalSupply();
        uint256 amountAddedByInflation2 = (spogVoteSupplyAfterFirstPeriod *
            deployScript.inflator()) / 100;

        assertEq(
            spogVoteSupplyAfterSecondPeriod,
            spogVoteSupplyAfterFirstPeriod + amountAddedByInflation2,
            "Vote token supply didn't inflate correctly in the second period"
        );

        // check that vault has received the vote inflationary supply in the second period
        uint256 vaultVoteTokenBalanceAfterSecondPeriod = spogVote.balanceOf(
            address(vault)
        );
        assertEq(
            vaultVoteTokenBalanceAfterSecondPeriod,
            vaultVoteTokenBalanceAfterFirstPeriod + amountAddedByInflation2,
            "Vault did not receive the accurate vote inflationary supply in the second period"
        );
    }
}