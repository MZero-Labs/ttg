// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {SPOG_Base} from "test/shared/SPOG_Base.t.sol";
import {IGovernor} from "@openzeppelin/contracts/governance/Governor.sol";
import "forge-std/console.sol";

contract ValueSPOGGovernorTest is SPOG_Base {
    // Setup function, add test-specific initializations here
    function setUp() public override {
        super.setUp();
    }

    function test_valueGov_StartOfNextVotingPeriod() public {
        uint256 votingPeriod = valueGovernor.votingPeriod();
        uint256 startOfNextVotingPeriod = valueGovernor.startOfNextVotingPeriod();

        assertTrue(startOfNextVotingPeriod > block.number);
        assertEq(startOfNextVotingPeriod, block.number + votingPeriod);
    }

    function test_value_gov_AccurateIncrementOfCurrentVotingPeriodEpoch() public {
        uint256 currentVotingPeriodEpoch = valueGovernor.currentVotingPeriodEpoch();

        assertEq(currentVotingPeriodEpoch, 0); // initial value

        for (uint256 i = 0; i < 6; i++) {
            vm.roll(block.number + valueGovernor.votingDelay() + 1);

            valueGovernor.updateStartOfNextVotingPeriod();
            currentVotingPeriodEpoch = valueGovernor.currentVotingPeriodEpoch();

            assertEq(currentVotingPeriodEpoch, i + 1);
        }
    }

    function test_ValueTokenSupplyInflatesAtTheBeginningOfEachVotingPeriod() public {
        uint256 spogValueSupplyBefore = spogValue.totalSupply();

        uint256 vaultVoteTokenBalanceBefore = spogValue.balanceOf(address(vault));

        // fast forward to an active voting period. Inflate vote token supply
        vm.roll(block.number + voteGovernor.votingDelay() + 1);

        // update voting epoch
        valueGovernor.updateStartOfNextVotingPeriod();

        uint256 spogValueSupplyAfterFirstPeriod = spogValue.totalSupply();

        uint256 amountAddedByInflation = deployScript.valueFixedInflationAmount();

        assertEq(
            spogValueSupplyAfterFirstPeriod,
            spogValueSupplyBefore + amountAddedByInflation,
            "Vote token supply didn't inflate correctly"
        );

        // check that vault has received the vote inflationary supply
        uint256 vaultVoteTokenBalanceAfterFirstPeriod = spogValue.balanceOf(address(vault));
        assertEq(
            vaultVoteTokenBalanceAfterFirstPeriod,
            vaultVoteTokenBalanceBefore + amountAddedByInflation,
            "Vault did not receive the accurate vote inflationary supply"
        );

        // start of new epoch inflation is triggered
        vm.roll(block.number + deployScript.voteTime() + 1);

        valueGovernor.updateStartOfNextVotingPeriod();

        uint256 spogValueSupplyAfterSecondPeriod = spogValue.totalSupply();

        assertEq(
            spogValueSupplyAfterSecondPeriod,
            spogValueSupplyAfterFirstPeriod + amountAddedByInflation,
            "Vote token supply didn't inflate correctly in the second period"
        );
    }
}
