// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "test/shared/SPOG_Base.t.sol";

contract SPOG_AppendAddressToList is SPOG_Base {
    address internal listToAddAddressTo;
    address internal addressToAdd;

    function setUp() public override {
        super.setUp();

        addNewListToSpog();
        listToAddAddressTo = list;
        addressToAdd = address(0x1234);
    }

    function test_Revert_AppendToListWhenNotCallingFromGovernance() public {
        vm.expectRevert(ISPOG.OnlyGovernor.selector);
        ISPOG(spog).append(listToAddAddressTo, addressToAdd);
    }

    function test_Revert_WhenListNotInMasterList() external {
        listToAddAddressTo = address(new List("New List"));

        bytes memory expectedError = abi.encodeWithSignature("ListIsNotInMasterList()");

        vm.expectRevert(expectedError);
        vm.prank(governor);
        ISPOG(spog).append(listToAddAddressTo, addressToAdd);
    }

    function test_SPOGProposalToAppedToAList() public {
        // create proposal to append address to list
        address[] memory targets = new address[](1);
        targets[0] = spog;
        uint256[] memory values = new uint256[](1);
        values[0] = 0;
        bytes[] memory calldatas = new bytes[](1);
        calldatas[0] = abi.encodeWithSignature("append(address,address)", listToAddAddressTo, addressToAdd);
        string memory description = "Append address to a list";

        (bytes32 hashedDescription, uint256 proposalId) =
            getProposalIdAndHashedDescription(targets, values, calldatas, description);

        // vote on proposal
        IERC20(deployScript.cash()).approve(spog, deployScript.tax());
        IGovernor(governor).propose(targets, values, calldatas, description);

        // assert that vault has cash balance paid for proposals
        assertTrue(
            IERC20(deployScript.cash()).balanceOf(address(valueVault)) == deployScript.tax() * 2,
            "Balance of SPOG should be 2x tax, one from adding the list and one from the current proposal"
        );

        // fast forward to an active voting period
        vm.roll(block.number + IGovernor(governor).votingDelay() + 1);

        // cast vote on proposal
        uint8 yesVote = 1;
        IGovernor(governor).castVote(proposalId, yesVote);
        // fast forward to end of voting period
        vm.roll(block.number + deployScript.time() + 1);

        // execute proposal
        IGovernor(governor).execute(targets, values, calldatas, hashedDescription);

        // assert that address was added to list
        assertTrue(IList(listToAddAddressTo).contains(addressToAdd), "Address was not added to list");
    }
}
