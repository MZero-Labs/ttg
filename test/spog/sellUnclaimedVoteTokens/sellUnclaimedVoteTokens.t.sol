// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "test/vault/helper/Vault_IntegratedWithSPOG.t.sol";
import {ValueToken} from "src/tokens/ValueToken.sol";
import {VoteToken} from "src/tokens/VoteToken.sol";

contract SPOG_SellUnclaimedVoteTokens is Vault_IntegratedWithSPOG {
    function test_sellUnclaimedVoteTokens() public {
        setUp();

        ValueToken valueToken = new ValueToken("SPOGValue", "value");
        VoteToken voteToken = new VoteToken("SPOGVote", "vote", address(valueToken));

        (uint256 proposalId,,,,) = proposeAddingNewListToSpog("Add new list to spog");

        // deposit rewards for previous epoch
        vm.roll(block.number + voteGovernor.votingDelay() + 1);

        voteGovernor.castVote(proposalId, yesVote);

        vm.roll(block.number + voteGovernor.votingPeriod() + 1);

        // anyone can call
        spog.sellUnclaimedVoteTokens(voteGovernor.currentVotingPeriodEpoch() - 1);

        assertEq(voteToken.balanceOf(address(vault)), 0);
    }
}
