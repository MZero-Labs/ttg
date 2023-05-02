// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "forge-std/Test.sol";
import {ERC20GodMode} from "test/mock/ERC20GodMode.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title BaseTest
/// @notice Common contract members needed across test contracts.
abstract contract BaseTest is Test {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/

    event Log(string err);
    event LogAddress(address value);
    event LogArray(address[] value);
    event LogArray(bool[] value);
    event LogArray(bytes32[] value);
    event LogArray(int256[] value);
    event LogArray(string[] value);
    event LogArray(uint256[] value);
    event LogBytes(bytes value);
    event LogBytes32(bytes32 value);
    event LogString(string value);
    event LogInt256(int256 value);
    event LogUint256(uint256 value);
    event LogNamedAddress(string key, address value);
    event LogNamedArray(string key, address[] value);
    event LogNamedArray(string key, bool[] value);
    event LogNamedArray(string key, bytes32[] value);
    event LogNamedArray(string key, int256[] value);
    event LogNamedArray(string key, string[] value);
    event LogNamedArray(string key, uint256[] value);
    event LogNamedBytes(string key, bytes value);
    event LogNamedBytes32(string key, bytes32 value);
    event LogNamedInt256(string key, int256 value);
    event LogNamedString(string key, string value);
    event LogNamedUint256(string key, uint256 value);
    event LogNamedArray(string key, IERC20[] value);

    /*//////////////////////////////////////////////////////////////////////////
                                      STRUCTS
    //////////////////////////////////////////////////////////////////////////*/

    struct Users {
        address payable admin;
        address payable alice;
        address payable bob;
        address payable charlie;
    }

    /*//////////////////////////////////////////////////////////////////////////
                                     CONSTANTS
    //////////////////////////////////////////////////////////////////////////*/

    uint256 internal constant ONE_MILLION_DAI = 1_000_000e18;
    uint256 internal constant ONE_MILLION_USDC = 1_000_000e6;

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/

    ERC20GodMode internal tkn0 = new ERC20GodMode("Token 0", "TKN0", 0);
    ERC20GodMode internal dai = new ERC20GodMode("Dai Stablecoin", "DAI", 18);
    ERC20GodMode internal usdc = new ERC20GodMode("USD Coin", "USDC", 6);
    Users internal users;

    /*//////////////////////////////////////////////////////////////////////////
                                   SETUP FUNCTION
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev A setup function invoked before each test case.
    function createUsers() public virtual {
        // Create users for testing.
        users = Users({
            admin: createUser("Admin"),
            alice: createUser("Alice"),
            bob: createUser("Bob"),
            charlie: createUser("Charlie")
        });

        // Make the admin the default caller in all subsequent tests.
        changePrank({who: users.admin});
    }

    /*//////////////////////////////////////////////////////////////////////////
                            INTERNAL CONSTANT FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev Helper function that multiplies the `amount` by `10^decimals` and returns a `uint256.`
    function bn(uint256 amount, uint256 decimals) internal pure returns (uint256 result) {
        result = amount * 10 ** decimals;
    }

    /*//////////////////////////////////////////////////////////////////////////
                          INTERNAL NON-CONSTANT FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev Helper function to compare two `IERC20` arrays.
    function assertEq(IERC20[] memory a, IERC20[] memory b) internal {
        if (keccak256(abi.encode(a)) != keccak256(abi.encode(b))) {
            emit Log("Error: a == b not satisfied [IERC20[]]");
            emit LogNamedArray("  Expected", b);
            emit LogNamedArray("    Actual", a);
            fail();
        }
    }

    /// @dev Helper function to compare two `IERC20` arrays.
    function assertEq(IERC20[] memory a, IERC20[] memory b, string memory err) internal {
        if (keccak256(abi.encode(a)) != keccak256(abi.encode(b))) {
            emit LogNamedString("Error", err);
            assertEq(a, b);
        }
    }

    /// @dev Generates an address by hashing the name, labels the address and funds it with 100 ETH, 1 million DAI,
    /// and 1 million non-compliant tokens.
    function createUser(string memory name) internal returns (address payable addr) {
        addr = payable(makeAddr(name));
        vm.deal({account: addr, newBalance: 1000 ether});
        dai.mint({account: addr, amount: ONE_MILLION_DAI});
        usdc.mint({account: addr, amount: ONE_MILLION_USDC});
    }

    /// @dev Expects an event to be emitted by checking all three topics and the data. As mentioned in the Foundry
    /// Book, the extra `true` arguments don't hurt.
    function expectEmit() internal {
        vm.expectEmit({checkTopic1: true, checkTopic2: true, checkTopic3: true, checkData: true});
    }
}
