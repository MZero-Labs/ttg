// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import { IDualGovernorQuorum } from "../../src/governor/IDualGovernor.sol";

import { SPOGBaseTest } from "../shared/SPOGBaseTest.t.sol";

import "forge-std/console.sol";

contract InflationTest is SPOGBaseTest {
    function test_UserVoteInflationAfterVotingOnAllProposals() public {
        // set up proposals
        (uint256 proposalId, , , , ) = proposeAddingAnAddressToList(makeAddr("Alpha"));
        (uint256 proposalId2, , , , ) = proposeAddingAnAddressToList(makeAddr("Beta"));
        (uint256 proposalId3, , , , ) = proposeAddingAnAddressToList(makeAddr("Omega"));

        // cannot vote in epoch 0
        vm.expectRevert(IDualGovernorQuorum.ProposalIsNotInActiveState.selector);
        governor.castVote(proposalId, yesVote);

        // voting period started
        vm.roll(governor.startOf(governor.currentEpoch() + 1));

        uint256 aliceVotes = vote.getVotes(alice);
        uint256 aliceStartBalance = vote.balanceOf(alice);
        assertEq(aliceStartBalance, aliceVotes, "Votes and balances are equal, Alice uses self-delegation");

        // alice votes on proposal 1
        vm.prank(alice);
        governor.castVote(proposalId, yesVote);

        uint256 aliceVotesAfterFirstVote = vote.getVotes(alice);
        assertEq(aliceVotesAfterFirstVote, aliceVotes, "No inflation yet, Alice has not voted on all proposals");

        // alice and bobs vote token balance should be the same as before voting
        assertEq(vote.balanceOf(alice), amountToMint, "Alice should have same vote balance");
        assertEq(vote.balanceOf(bob), amountToMint, "Bob should have same vote balance");

        // alice votes on proposal 2 and 3
        vm.startPrank(alice);
        governor.castVote(proposalId2, yesVote);
        governor.castVote(proposalId3, noVote);
        vm.stopPrank();

        assertEq(
            vote.balanceOf(alice),
            amountToMint,
            "Alice should have same vote balance, she didn't claim inflation yet"
        );

        uint256 aliceVotesAfterAllProposals = vote.getVotes(alice);
        uint256 votesAfterVoting = aliceVotes + (registrar.inflator() * aliceVotes) / 100;

        assertEq(
            aliceVotesAfterAllProposals,
            votesAfterVoting,
            "Alice should have more votes after voting on all proposals"
        );

        vm.prank(alice);
        uint256 inflation = vote.claimInflation();
        assertEq(inflation, (aliceStartBalance * registrar.inflator()) / 100, "Alice should have accrued inflation");

        assertEq(vote.balanceOf(alice), aliceStartBalance + inflation, "Alice should have more vote tokens");
    }

    function test_UsersVoteInflationForMultipleEpochs() public {
        vm.startPrank(address(governor));
        vote.mint(bob, amountToMint * 1);
        vote.mint(carol, amountToMint * 2);
        vm.stopPrank();

        uint256 aliceStartVotes = vote.getVotes(alice);
        uint256 bobStartVotes = vote.getVotes(bob);
        uint256 carolStartVotes = vote.getVotes(carol);

        assertEq(vote.balanceOf(alice), 100e18);
        assertEq(vote.balanceOf(bob), 200e18);
        assertEq(vote.balanceOf(carol), 300e18);

        // epoch - set up proposals
        (uint256 proposal1Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Alpha"));

        // voting period started
        vm.roll(governor.startOf(governor.currentEpoch() + 1));

        // alice votes on proposal 1
        vm.prank(alice);
        governor.castVote(proposal1Id, yesVote);

        // bob votes on proposal 1
        vm.prank(bob);
        governor.castVote(proposal1Id, yesVote);

        uint256 aliceVotesAfterFirstVote = vote.getVotes(alice);
        uint256 bobVotesAfterFirstVote = vote.getVotes(bob);
        assertEq(bobVotesAfterFirstVote, (bobStartVotes * (100 + registrar.inflator())) / 100);
        assertEq(aliceVotesAfterFirstVote, (aliceStartVotes * (100 + registrar.inflator())) / 100);
        assertEq(vote.getVotes(carol), carolStartVotes);

        // fast forward to end of voting period
        vm.roll(governor.startOf(governor.currentEpoch() + 1));

        // set up proposals
        (uint256 proposal2Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Beta"));

        // voting period started
        vm.roll(governor.startOf(governor.currentEpoch() + 1));

        // alice votes on proposal 1
        vm.prank(alice);
        governor.castVote(proposal2Id, yesVote);

        // fast forward to end of voting period
        vm.roll(governor.startOf(governor.currentEpoch() + 1));

        assertEq(vote.getVotes(alice), (aliceVotesAfterFirstVote * (100 + registrar.inflator())) / 100);
        assertEq(vote.getVotes(bob), bobVotesAfterFirstVote);
        // carol has no inflation, didn't vote on proposals
        assertEq(vote.getVotes(carol), carolStartVotes);

        vm.prank(alice);
        uint256 aliceInflation = vote.claimInflation();

        vm.prank(bob);
        uint256 bobInflation = vote.claimInflation();

        vm.prank(carol);
        uint256 carolRewards = vote.claimInflation();

        assertEq(aliceInflation, 44e18, "Alice: Invalid inflation");
        assertEq(bobInflation, 40e18, "Bob: Invalid inflation");
        assertEq(carolRewards, 0, "Carol: Invalid inflation");

        assertEq(vote.balanceOf(alice), 144e18, "Alice: Invalid balance");
        assertEq(vote.balanceOf(bob), 240e18, "Bob: Invalid balance");
        assertEq(vote.balanceOf(carol), 300e18, "Carol: Invalid balance");
    }

    function test_UsersVoteInflationUpgradeOnDelegation() public {
        uint256 aliceStartVotes = vote.getVotes(alice);

        assertEq(vote.balanceOf(alice), 100e18);

        // epoch - set up proposals
        (uint256 proposal1Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Alpha"));

        // voting period started
        vm.roll(governor.startOf(governor.currentEpoch() + 1));
        // alice votes on proposal 1

        vm.prank(alice);
        governor.castVote(proposal1Id, yesVote);

        uint256 aliceVotesAfterFirstVote = vote.getVotes(alice);
        assertEq(aliceVotesAfterFirstVote, (aliceStartVotes * (100 + registrar.inflator())) / 100);

        uint256 bobVotes = vote.getVotes(bob);
        assertEq(bobVotes, 100e18);

        // alice delegates her voting power with inflation to bob
        vm.prank(alice);
        vote.delegate(bob);

        // alice claims her voting inflation
        vm.prank(alice);
        uint256 aliceInflation = vote.claimInflation();

        assertEq(aliceInflation, 20e18, "Alice: Invalid inflation");
        assertEq(vote.getVotes(bob), 220e18);
        assertEq(vote.balanceOf(alice), 120e18, "Alice: Invalid balance");

        // alice balances increased, but delegate voting power did not, it already accounted for
        assertEq(vote.getVotes(bob), 220e18);

        // bob attempts to claim inflation
        vm.prank(bob);
        uint256 bobInflation = vote.claimInflation();
        assertEq(bobInflation, 0, "Bob: Invalid inflation");
        assertEq(vote.balanceOf(bob), 100e18, "Bob: Invalid balance");

        assertEq(vote.totalSupply(), vote.totalVotes());
    }

    function test_UsersVoteInflationWorksWithTransfer() public {
        assertEq(vote.balanceOf(alice), 100e18);

        // epoch - set up proposals
        (uint256 proposal1Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Alpha"));

        // voting period started
        // TODO no +1 here
        vm.roll(governor.startOf(governor.currentEpoch() + 1) + 1);

        // alice votes on proposal 1
        vm.prank(alice);
        governor.castVote(proposal1Id, yesVote);
        assertEq(vote.getVotes(alice), 120e18);

        // bob transfers tokens to alice
        vm.prank(bob);
        vote.transfer(alice, 10e18);

        vm.prank(alice);
        uint256 aliceInflation = vote.claimInflation();
        assertEq(aliceInflation, 20e18, "Alice: Invalid inflation value");

        assertEq(vote.getVotes(alice), 130e18);
        assertEq(vote.balanceOf(alice), 130e18);
        assertEq(vote.balanceOf(bob), 90e18);
        assertEq(vote.getVotes(bob), 90e18);

        // bob votes too
        vm.prank(bob);
        governor.castVote(proposal1Id, yesVote);
        assertEq(vote.getVotes(bob), 108e18);

        vm.prank(bob);
        uint256 bobInflation = vote.claimInflation();
        assertEq(bobInflation, 18e18, "Bob: Invalid inflation");

        assertEq(vote.getVotes(alice), 130e18);
        assertEq(vote.getVotes(bob), 108e18);
        assertEq(vote.balanceOf(alice), 130e18);
        assertEq(vote.balanceOf(bob), 108e18);
    }

    function test_UserGetRewardOnlyOncePerEpochIfRedelegating() public {
        assertEq(vote.balanceOf(alice), 100e18);

        // epoch - set up proposals
        (uint256 proposal1Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Alpha"));

        // voting period started
        vm.roll(governor.startOf(governor.currentEpoch() + 1));

        // alice votes on proposal 1
        vm.prank(alice);
        governor.castVote(proposal1Id, yesVote);
        assertEq(vote.getVotes(alice), 120e18);

        // redelegate voting power to bob
        vm.prank(alice);
        vote.delegate(bob);
        assertEq(vote.getVotes(bob), 220e18, "Bob voting power includes alice initial voting power + inflation");

        vm.prank(bob);
        governor.castVote(proposal1Id, yesVote);

        assertEq(
            vote.getVotes(bob),
            240e18,
            "Bob voting power includes alice initial voting power + inflation + his inflation for voting"
        );

        vm.prank(bob);
        uint256 bobInflation = vote.claimInflation();
        assertEq(bobInflation, 20e18, "Bob: Invalid inflation");

        vm.prank(alice);
        uint256 aliceInflation = vote.claimInflation();
        assertEq(aliceInflation, 20e18, "Alice: Invalid inflation");

        assertEq(vote.balanceOf(alice), 120e18);
        assertEq(vote.balanceOf(bob), 120e18);
        assertEq(vote.getVotes(bob), vote.balanceOf(bob) + vote.balanceOf(alice));
    }

    function test_UserDoesNotGetDelayedRewardWhileRedelegating() public {
        assertEq(vote.balanceOf(alice), 100e18);

        // epoch - set up proposals
        (uint256 proposal1Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Alpha"));

        // voting period started
        vm.roll(governor.startOf(governor.currentEpoch() + 1));

        // redelegate voting power to bob
        vm.prank(alice);
        vote.delegate(bob);
        assertEq(vote.getVotes(bob), 200e18, "Bob voting power includes alice initial voting power");

        vm.prank(bob);
        governor.castVote(proposal1Id, yesVote);

        assertEq(
            vote.getVotes(bob),
            220e18,
            "Bob voting power includes alice initial voting power + reward for voting"
        );

        vm.prank(bob);
        uint256 bobInflation = vote.claimInflation();
        assertEq(bobInflation, 20e18, "Bob: Invalid inflation");

        vm.prank(alice);
        uint256 aliceRewards1 = vote.claimInflation();
        assertEq(aliceRewards1, 0, "Alice: Invalid inflation");

        vm.prank(alice);
        governor.castVote(proposal1Id, yesVote);
        uint256 aliceRewards2 = vote.claimInflation();
        assertEq(aliceRewards2, 0, "Alice: Invalid inflation");

        assertEq(vote.balanceOf(alice), 100e18, "Alice balance was not updated");
    }

    function test_VotingPowerForDelegates() public {
        // all users self-delegate at the beginning
        assertEq(vote.getVotes(alice), 100e18);
        assertEq(vote.getVotes(bob), 100e18);
        assertEq(vote.getVotes(carol), 100e18);
        uint256 extraTotalVotes = vote.totalVotes() - 300e18;

        // epoch - set up proposals
        (uint256 proposal1Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Alpha"));

        // voting period started
        // TODO no +1 here
        vm.roll(governor.startOf(governor.currentEpoch() + 1) + 1);

        // alice votes on proposal 1
        vm.prank(alice);
        governor.castVote(proposal1Id, yesVote);
        assertEq(vote.getVotes(alice), 120e18);

        vm.prank(alice);
        uint256 aliceInflation = vote.claimInflation();
        assertEq(aliceInflation, 20e18, "Alice: Invalid inflation");

        vm.prank(bob);
        vote.transfer(carol, 50e18);

        // bob votes on proposal 1
        vm.prank(bob);
        governor.castVote(proposal1Id, yesVote);

        // takes into account voting power at the beginning of epoch
        assertEq(vote.getVotes(bob), 60e18);

        vm.prank(bob);
        uint256 bobInflation = vote.claimInflation();
        assertEq(bobInflation, 10e18, "Bob: Invalid inflation");

        // carol votes on proposal 1
        vm.prank(carol);
        governor.castVote(proposal1Id, yesVote);

        // takes into account voting power at the beginning of epoch
        assertEq(vote.getVotes(carol), 170e18);

        vm.prank(carol);
        uint256 carolRewards = vote.claimInflation();
        assertEq(carolRewards, 20e18, "Carol: Invalid inflation");

        assertEq(
            vote.balanceOf(alice) + vote.balanceOf(bob) + vote.balanceOf(carol),
            vote.totalVotes() - extraTotalVotes
        );
    }

    // TODO: make sure test is still needed
    function test_VotingInflationWithRedelegationInTheSameEpoch() public {
        // epoch - set up proposals
        (uint256 proposal1Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Alpha"));

        // voting period started
        vm.roll(governor.startOf(governor.currentEpoch() + 1));

        vm.prank(alice);
        vote.delegate(bob);

        vm.prank(bob);
        governor.castVote(proposal1Id, yesVote);

        // start new epoch
        vm.roll(governor.startOf(governor.currentEpoch() + 1));

        vm.prank(alice);
        uint256 aliceInflation = vote.claimInflation();
        assertEq(aliceInflation, 0e18, "Alice: Invalid inflation");
    }

    function test_UsersVoteInflationForMultipleEpochsWithRedelegation() public {
        // epoch - set up proposals
        (uint256 proposal1Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Alpha"));

        /// EPOCH 1

        // voting period started
        vm.roll(governor.startOf(governor.currentEpoch() + 1));

        // alice votes on proposal 1
        vm.prank(alice);
        governor.castVote(proposal1Id, yesVote);
        assertEq(vote.getVotes(alice), 120e18);

        // bob votes on proposal 1
        vm.prank(bob);
        governor.castVote(proposal1Id, yesVote);
        assertEq(vote.getVotes(bob), 120e18);

        // carol votes on proposal 1
        vm.prank(carol);
        governor.castVote(proposal1Id, yesVote);
        assertEq(vote.getVotes(carol), 120e18, "Carol: Invalid votes");

        // fast forward to end of voting period
        vm.roll(governor.startOf(governor.currentEpoch() + 1));

        /// EPOCH 2

        (uint256 proposal2Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Beta"));

        // voting period started
        vm.roll(governor.startOf(governor.currentEpoch() + 1));

        // alice votes on proposal 2
        vm.prank(alice);
        governor.castVote(proposal2Id, yesVote);
        assertEq(vote.getVotes(alice), 144e18);

        vm.prank(alice);
        uint256 aliceInflation = vote.claimInflation();
        assertEq(aliceInflation, 44e18, "Alice: Invalid inflation");

        assertEq(vote.getVotes(bob), 120e18);

        vm.prank(alice);
        vote.delegate(bob);
        assertEq(vote.getVotes(bob), 264e18);

        // carol redelegates to bob

        vm.prank(carol);
        vote.delegate(bob);
        assertEq(vote.getVotes(bob), 384e18);

        // carol votes on proposal 2
        vm.prank(carol);
        governor.castVote(proposal2Id, yesVote);

        assertEq(vote.getVotes(carol), 0e18);

        vm.prank(carol);
        uint256 carolRewards = vote.claimInflation();
        // carol doesn't get inflation for this epoch, she voted after re-delegation
        // @note compare carol to alice, alice got inflation for 2 epochs, carol only 1
        assertEq(carolRewards, 20e18, "Carol: Invalid inflation");
        assertEq(vote.balanceOf(carol), 120e18, "Carol: Invalid balance");

        assertEq(
            vote.getVotes(bob),
            vote.balanceOf(bob) + 20e18 + vote.balanceOf(alice) + vote.balanceOf(carol),
            "Bob: Invalid votes"
        );

        assertEq(vote.getVotes(bob), 384e18);

        // bob votes on proposal 2
        // 120 from bob, 144 from alice, 120 from carol
        vm.prank(bob);
        governor.castVote(proposal2Id, yesVote);

        // 144 from bob, 144 from alice, 120 from carol
        // alice and carol delegated during this epoch, do they votes do not account for voting power inflation
        assertEq(vote.getVotes(bob), 408e18);

        vm.prank(carol);
        carolRewards = vote.claimInflation();
        // carol doesn't get inflation for bob voting
        assertEq(carolRewards, 0e18, "Carol: Invalid inflation");

        // fast forward to end of voting period
        vm.roll(governor.startOf(governor.currentEpoch() + 1));

        // epoch - set up proposals
        (uint256 proposal3Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Omega"));

        // voting period started
        vm.roll(block.number + governor.votingDelay() + 1);

        /// EPOCH 3

        // alice votes on proposal 3
        vm.prank(alice);
        governor.castVote(proposal3Id, yesVote);
        assertEq(vote.getVotes(alice), 0);

        // no inflation for alice, her voting power is 0
        vm.prank(alice);
        aliceInflation = vote.claimInflation();
        assertEq(aliceInflation, 0, "Alice: Invalid inflation");

        assertEq(vote.getVotes(bob), 408e18);

        // bob votes on proposal 3
        vm.prank(bob);
        governor.castVote(proposal3Id, yesVote);
        assertEq(vote.getVotes(bob), 4896e17);

        vm.prank(bob);
        uint256 bobInflation = vote.claimInflation();
        assertEq(bobInflation, 728e17, "Bob: Invalid inflation");

        assertEq(vote.balanceOf(bob), (100e18 * 120 * 120 * 120) / 100 / 100 / 100);
        assertEq(vote.balanceOf(alice), (100e18 * 120 * 120) / 100 / 100);

        vm.prank(alice);
        aliceInflation = vote.claimInflation();
        assertEq(aliceInflation, 288e17, "Alice: Invalid inflation");
        assertEq(vote.balanceOf(alice), (100e18 * 120 * 120 * 120) / 100 / 100 / 100);

        vm.prank(carol);
        carolRewards = vote.claimInflation();
        assertEq(carolRewards, 24e18, "Carol: Invalid inflation");

        // carol missed 1 epoch on redelegation
        assertEq(vote.balanceOf(carol), (100e18 * 120 * 120) / 100 / 100);

        // Main assumption of our voting system
        assertEq(
            vote.getVotes(bob),
            vote.balanceOf(bob) + vote.balanceOf(alice) + vote.balanceOf(carol),
            "Bob: Invalid votes"
        );
    }

    function test_UsersVoteInflationForMultipleEpochsWithTransfers() public {
        // epoch - set up proposals
        (uint256 proposal1Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Alpha"));

        /// EPOCH 1

        // voting period started
        // TODO no +1 here
        vm.roll(governor.startOf(governor.currentEpoch() + 1) + 1);

        // alice votes on proposal 1
        vm.prank(alice);
        governor.castVote(proposal1Id, yesVote);
        assertEq(vote.getVotes(alice), 120e18);

        vm.prank(bob);
        vote.transfer(alice, 10e18);
        assertEq(vote.getVotes(alice), 130e18);

        vm.prank(bob);
        vote.transfer(carol, 10e18);
        assertEq(vote.getVotes(carol), 110e18);

        // bob votes on proposal 1
        vm.prank(bob);
        governor.castVote(proposal1Id, yesVote);

        // we account for min (balance at the start of epoch,  at the moment of voting)
        assertEq(vote.getVotes(bob), 96e18);

        // carol votes on proposal 1
        vm.prank(carol);
        governor.castVote(proposal1Id, yesVote);

        // carol gets 20 reward for voting, bob new voting power is not accounted for
        assertEq(vote.getVotes(carol), 130e18, "Carol: Invalid votes");

        vm.prank(alice);
        uint256 aliceInflation = vote.claimInflation();
        assertEq(aliceInflation, 20e18, "Alice: Invalid inflation");
        assertEq(vote.balanceOf(alice), 130e18);

        vm.prank(bob);
        uint256 bobInflation = vote.claimInflation();
        assertEq(bobInflation, 16e18, "Bob: Invalid inflation");
        assertEq(vote.balanceOf(bob), 96e18);

        vm.prank(carol);
        uint256 carolInflation = vote.claimInflation();
        assertEq(carolInflation, 20e18, "Carol: Invalid inflation");
        assertEq(vote.balanceOf(carol), 130e18);

        // Main invariant of system
        assertEq(
            vote.getVotes(alice) + vote.getVotes(bob) + vote.getVotes(carol),
            vote.balanceOf(alice) + vote.balanceOf(bob) + vote.balanceOf(carol),
            "Invalid total votes and balances"
        );

        // Attempt to claim again - no inflation
        vm.prank(alice);
        aliceInflation = vote.claimInflation();
        assertEq(aliceInflation, 0, "Alice: Invalid inflation");

        vm.prank(bob);
        bobInflation = vote.claimInflation();
        assertEq(bobInflation, 0, "Bob: Invalid inflation");

        vm.prank(carol);
        carolInflation = vote.claimInflation();
        assertEq(carolInflation, 0, "Carol: Invalid inflation");

        // fast forward to end of voting period
        vm.roll(block.number + governor.votingPeriod() + 1);

        /// EPOCH 2

        (uint256 proposal2Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Beta"));

        // voting period started
        vm.roll(block.number + governor.votingDelay() + 1);

        // alice votes on proposal 2
        vm.prank(alice);
        governor.castVote(proposal2Id, yesVote);
        assertEq(vote.getVotes(alice), 156e18);

        vm.prank(alice);
        aliceInflation = vote.claimInflation();
        assertEq(aliceInflation, 26e18, "Alice: Invalid inflation");

        // bob votes on proposal 2
        vm.startPrank(bob);
        governor.castVote(proposal2Id, yesVote);
        bobInflation = vote.claimInflation();
        vm.stopPrank();

        assertEq(bobInflation, 192e17, "Bob: Invalid inflation");
        assertEq(vote.getVotes(bob), 1152e17);

        // carol votes on proposal 2
        vm.prank(carol);
        governor.castVote(proposal2Id, yesVote);
        assertEq(vote.getVotes(carol), 156e18);

        vm.prank(carol);
        carolInflation = vote.claimInflation();
        assertEq(carolInflation, 26e18, "Carol: Invalid inflation");

        // Main invariant of system
        assertEq(
            vote.getVotes(alice) + vote.getVotes(bob) + vote.getVotes(carol),
            vote.balanceOf(alice) + vote.balanceOf(bob) + vote.balanceOf(carol),
            "Invalid total votes and balances"
        );
    }

    function test_0x52_issue() public {
        // epoch - set up proposals
        (uint256 proposal1Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Alpha"));

        address delegatee = createUser("delegatee");

        vm.prank(alice);
        vote.delegate(delegatee);

        // voting period started
        // TODO no +1 here
        vm.roll(governor.startOf(governor.currentEpoch() + 1) + 1);

        vm.prank(alice);
        vote.delegate(alice);

        vm.prank(bob);
        vote.delegate(delegatee);

        uint256 delegateeVotesBeforeVoting = vote.getVotes(delegatee);

        vm.prank(delegatee);
        governor.castVote(proposal1Id, yesVote);

        assertEq(vote.getVotes(delegatee), delegateeVotesBeforeVoting, "Incorrect inflation of voting power");

        vm.prank(alice);
        uint256 aliceInflation = vote.claimInflation();
        assertEq(aliceInflation, 0, "No inflation for alice");

        vm.prank(bob);
        uint256 bobInflation = vote.claimInflation();
        assertEq(bobInflation, 0, "No inflation for bob");
    }

    function test_0x52_issue_transfers() public {
        // epoch - set up proposals
        (uint256 proposal1Id, , , , ) = proposeAddingAnAddressToList(makeAddr("Alpha"));

        address delegatee = createUser("delegatee");

        vm.prank(alice);
        vote.delegate(delegatee);

        // voting period started
        // TODO no +1 here
        vm.roll(governor.startOf(governor.currentEpoch() + 1) + 1);

        uint256 aliceBalance = vote.balanceOf(alice);
        vm.prank(alice);
        vote.transfer(carol, aliceBalance);

        vm.prank(bob);
        vote.delegate(delegatee);

        uint256 delegateeVotesBeforeVoting = vote.getVotes(delegatee);

        vm.prank(delegatee);
        governor.castVote(proposal1Id, yesVote);

        vm.prank(carol);
        governor.castVote(proposal1Id, yesVote);

        assertEq(vote.getVotes(delegatee), delegateeVotesBeforeVoting, "Incorrect inflation of voting power");

        vm.prank(alice);
        uint256 aliceInflation = vote.claimInflation();
        assertEq(aliceInflation, 0, "No inflation for alice");

        vm.prank(bob);
        uint256 bobInflation = vote.claimInflation();
        assertEq(bobInflation, 0, "No inflation for bob");

        vm.prank(carol);
        uint256 carolInflation = vote.claimInflation();
        assertEq(carolInflation, 20e18, "Wrong inflation for carol");
    }

    function test_inflationStuckInDelegate() external {
        address david = createUser("david");

        assertEq(vote.balanceOf(alice), 100e18, "alice starting balance incorrect");
        assertEq(vote.balanceOf(bob), 100e18, "bob starting balance incorrect");
        assertEq(vote.balanceOf(david), 0, "david starting balance incorrect");

        assertEq(vote.getVotes(alice), 100e18, "alice starting votes incorrect");
        assertEq(vote.getVotes(bob), 100e18, "bob starting votes incorrect");
        assertEq(vote.getVotes(david), 0, "david starting votes incorrect");

        // Alice delegate's to David in this epoch.
        vm.prank(alice);
        vote.delegate(david);

        // A proposal is created this epoch.
        (uint256 proposalId, , , , ) = proposeAddingAnAddressToList(makeAddr("Alpha"));

        // The next epoch begins, such that votes for the proposal can be collected.
        vm.roll(governor.startOf(governor.currentEpoch() + 1) + 1);

        // Alice delegate's to herself in this epoch.
        vm.prank(alice);
        vote.delegate(alice);

        // Bob delegate's to David in this epoch.
        vm.prank(bob);
        vote.delegate(david);

        // David votes for the proposal.
        vm.prank(david);
        governor.castVote(proposalId, yesVote);

        // The next epoch begins, such that the proposal can be executed.
        vm.roll(governor.startOf(governor.currentEpoch() + 1) + 1);

        // Everyone claim's inflation.
        vm.prank(alice);
        vote.claimInflation();

        vm.prank(bob);
        vote.claimInflation();

        vm.prank(david);
        vote.claimInflation();

        assertEq(vote.balanceOf(alice), 100e18, "alice balance incorrect after votes and claims");
        assertEq(vote.balanceOf(bob), 100e18, "bob balance incorrect after votes and claims");
        assertEq(vote.balanceOf(david), 0, "david balance incorrect after votes and claims");

        assertEq(vote.getVotes(alice), 100e18, "alice votes incorrect after votes and claims");
        assertEq(vote.getVotes(bob), 0, "bob votes incorrect after votes and claims");
        assertEq(vote.getVotes(david), 100e18, "david votes incorrect after votes and claims");

        // The next epoch begins, just for the sake of it.
        vm.roll(governor.startOf(governor.currentEpoch() + 1) + 1);

        // Bob delegate's to himself in this epoch.
        vm.prank(bob);
        vote.delegate(bob);

        // Everyone claim's inflation.
        vm.prank(alice);
        vote.claimInflation();

        vm.prank(bob);
        vote.claimInflation();

        vm.prank(david);
        vote.claimInflation();

        assertEq(vote.balanceOf(alice), 100e18, "alice balance incorrect at end");
        assertEq(vote.balanceOf(bob), 100e18, "bob balance incorrect at end");
        assertEq(vote.balanceOf(david), 0, "david balance incorrect at end");

        assertEq(vote.getVotes(alice), 100e18, "alice votes incorrect at end");
        assertEq(vote.getVotes(bob), 100e18, "bob votes incorrect at end");
        assertEq(vote.getVotes(david), 0e18, "david votes incorrect at end");
    }
}
