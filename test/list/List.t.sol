// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

import {List, NotAdmin} from "src/periphery/List.sol";
import {BaseTest} from "test/Base.t.sol";
import {ISPOG} from "src/interfaces/ISPOG.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";

contract MockSPOG is ERC165 {
    function supportsInterface(
        bytes4 interfaceId
    ) public view override returns (bool) {
        return
            interfaceId == type(ISPOG).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}

contract ListTest is BaseTest {
    List public list;

    // Events to test
    event AddressAdded(address _address);
    event AddressRemoved(address _address);

    function setUp() public {
        createUsers();
        list = new List("SPOG Collateral Managers List");
    }

    function test_constructor() public {
        assertEq(list.admin(), users.admin);
        assertEq(list.name(), "SPOG Collateral Managers List");
    }

    function test_AddUsers() public {
        // add Alice and check that event `AddressAdded` is emitted
        expectEmit();
        emit AddressAdded(users.alice);
        list.add(users.alice);

        // list contains only Alice
        assertTrue(list.contains(users.alice), "Alice is not in the list");
        assertFalse(list.contains(users.bob), "Bob is in the list");

        // add Bob and check that event `AddressAdded` is emitted
        expectEmit();
        emit AddressAdded(users.bob);
        list.add(users.bob);

        // list contains both Alice and Bob now
        assertTrue(list.contains(users.alice), "Alice is not in the list");
        assertTrue(list.contains(users.bob), "Bob is not in the list");
    }

    function test_RemoveUsers() public {
        // add Alice and Bob
        list.add(users.alice);
        list.add(users.bob);

        // remove Alice and check that event `AddressRemoved` is emitted
        expectEmit();
        emit AddressRemoved(address(users.alice));
        list.remove(users.alice);

        // list contains only Bob
        assertFalse(list.contains(users.alice), "Alice is still in the list");
        assertTrue(list.contains(users.bob), "Bob is not in the list");

        // remove Bob and check that event `AddressRemoved` is emitted
        expectEmit();
        emit AddressRemoved(address(users.bob));
        list.remove(users.bob);

        // list doesn't have users now
        assertFalse(list.contains(users.alice), "Alice is still in the list");
        assertFalse(list.contains(users.bob), "Bob is still in the list");
    }

    function test_changeAdmin() public {
        // successfully set new admin to SPOG-like contract
        address newSPOG = address(new MockSPOG());
        list.changeAdmin(newSPOG);

        assertEq(list.admin(), newSPOG);
    }

    function test_Revert_ChangeAdmin_WhenNewAdminIsNotSPOG() public {
        // revert when trying to set new admin to non-SPOG address
        vm.expectRevert(
            "ERC165CheckerSPOG: spogAddress address does not implement proper interface"
        );
        list.changeAdmin(users.alice);

        assertEq(list.admin(), users.admin);
    }

    function test_Revert_ChangeAdmin_WhenCallerIsNotAdmin() public {
        // Make Alice the default caller instead of admin
        changePrank({who: users.alice});
        address newSPOG = address(new MockSPOG());

        // revert when called not by an admin
        vm.expectRevert(NotAdmin.selector);
        list.changeAdmin(newSPOG);

        assertEq(list.admin(), users.admin);
    }

    function test_Revert_Add_WhenCallerIsNotAdmin() public {
        // Make Alice the default caller instead of admin
        changePrank({who: users.alice});

        // revert when called not by an admin
        vm.expectRevert(NotAdmin.selector);
        list.add(users.alice);
    }

    function test_Revert_Remove_WhenCallerIsNotAdmin() public {
        // Make Alice the default caller instead of admin
        changePrank({who: users.alice});

        // revert when called not by an admin
        vm.expectRevert(NotAdmin.selector);
        list.remove(users.alice);
    }
}
