// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "test/shared/SPOG_Base.t.sol";

contract SPOG_AppendAddressToList is SPOG_Base {
    address internal listToAddAddressTo;
    address internal addressToAdd;

    function setUp() public override {
        super.setUp();

        addNewListToSpog();
        listToAddAddressTo = address(list);
        addressToAdd = address(0x1234);
    }

    function test_Revert_AppendToListWhenNotCallingFromGovernance() public {
        vm.expectRevert("SPOG: Only GovSPOGVote");
        spog.append(addressToAdd, IList(listToAddAddressTo));
    }

    function test_Revert_WhenAppendAddressToList_ByGovSPOGValueHolders()
        external
    {
        // create proposal to append address to list
        address[] memory targets = new address[](1);
        targets[0] = address(spog);
        uint256[] memory values = new uint256[](1);
        values[0] = 0;
        bytes[] memory calldatas = new bytes[](1);
        calldatas[0] = abi.encodeWithSignature(
            "append(address,address)",
            addressToAdd,
            listToAddAddressTo
        );
        string memory description = "Append address to a list";

        (
            bytes32 hashedDescription,
            uint256 proposalId
        ) = getProposalIdAndHashedDescription(
                govSPOGValue,
                targets,
                values,
                calldatas,
                description
            );

        // update start of next voting period
        govSPOGValue.updateStartOfNextVotingPeriod();

        // vote on proposal
        deployScript.cash().approve(address(spog), deployScript.tax());
        spog.propose(
            IGovSPOG(address(govSPOGValue)),
            targets,
            values,
            calldatas,
            description
        );

        // fast forward to an active voting period
        vm.roll(block.number + govSPOGValue.votingDelay() + 1);

        // cast vote on proposal
        uint8 yesVote = uint8(VoteType.Yes);
        govSPOGValue.castVote(proposalId, yesVote);

        vm.roll(block.number + deployScript.voteTime() + 1);

        // proposal execution is not allowed by govSPOGValue holders
        vm.expectRevert("SPOG: Only GovSPOGVote");
        govSPOGValue.execute(targets, values, calldatas, hashedDescription);

        assertFalse(
            IList(listToAddAddressTo).contains(addressToAdd),
            "Address must not be in list"
        );
    }

    function test_SPOGProposalToAppedToAList() public {
        // create proposal to append address to list
        address[] memory targets = new address[](1);
        targets[0] = address(spog);
        uint256[] memory values = new uint256[](1);
        values[0] = 0;
        bytes[] memory calldatas = new bytes[](1);
        calldatas[0] = abi.encodeWithSignature(
            "append(address,address)",
            addressToAdd,
            listToAddAddressTo
        );
        string memory description = "Append address to a list";

        (
            bytes32 hashedDescription,
            uint256 proposalId
        ) = getProposalIdAndHashedDescription(
                govSPOGVote,
                targets,
                values,
                calldatas,
                description
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

        // assert that spog has cash balance
        assertTrue(
            deployScript.cash().balanceOf(address(spog)) ==
                deployScript.tax() * 2,
            "Balance of SPOG should be 2x tax, one from adding the list and one from the current proposal"
        );

        // fast forward to an active voting period
        vm.roll(block.number + govSPOGVote.votingDelay() + 1);

        // cast vote on proposal
        uint8 yesVote = 1;
        govSPOGVote.castVote(proposalId, yesVote);
        // fast forward to end of voting period
        vm.roll(block.number + deployScript.voteTime() + 1);

        // execute proposal
        govSPOGVote.execute(targets, values, calldatas, hashedDescription);

        // assert that address was added to list
        assertTrue(
            IList(listToAddAddressTo).contains(addressToAdd),
            "Address was not added to list"
        );
    }
}