// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.23;

import { IERC5805 } from "../../src/abstract/interfaces/IERC5805.sol";
import { IZeroToken } from "../../src/interfaces/IZeroToken.sol";

import { TestUtils } from "./../utils/TestUtils.sol";
import { ZeroTokenHarness } from "./../utils/ZeroTokenHarness.sol";

contract ZeroTokenFuzzTests is TestUtils {
    address internal _alice = makeAddr("alice");
    address internal _bob = makeAddr("bob");
    address internal _carol = makeAddr("carol");
    address internal _standardGovernorDeployer = makeAddr("standardGovernorDeployer");

    ZeroTokenHarness internal _zeroToken;

    address[] internal _initialAccounts = [
        makeAddr("account1"),
        makeAddr("account2"),
        makeAddr("account3"),
        makeAddr("account4"),
        makeAddr("account5")
    ];

    uint256[] internal _initialAmounts = [
        1_000_000 * 1e6,
        2_000_000 * 1e6,
        3_000_000 * 1e6,
        4_000_000 * 1e6,
        5_000_000 * 1e6
    ];

    uint256[] internal _claimableEpochs;

    function setUp() external {
        _zeroToken = new ZeroTokenHarness(_standardGovernorDeployer, _initialAccounts, _initialAmounts);
    }

    function testFuzz_pastBalancesOf_subset(
        uint256 firstPushEpoch, 
        uint256 secondPushEpoch,
        uint256 thirdPushEpoch,
        uint256 firstValuePushed,
        uint256 secondValuePushed,
        uint256 thirdValuePushed      
    ) external {
        uint256 currentEpoch_ =_zeroToken.clock();
        
        _warpToEpoch(currentEpoch_);

        firstPushEpoch = bound(firstPushEpoch, 1, currentEpoch_ - 1);
        secondPushEpoch = bound(secondPushEpoch, 1, currentEpoch_ - 1);
        thirdPushEpoch = bound(thirdPushEpoch, 1, currentEpoch_ - 1);
        firstValuePushed = bound(firstValuePushed, 0, type(uint128).max);
        secondValuePushed = bound(secondValuePushed, 0, type(uint128).max);
        thirdValuePushed = bound(thirdValuePushed, 0, type(uint128).max);
        vm.assume(firstPushEpoch > secondPushEpoch && secondPushEpoch > thirdPushEpoch);


        _zeroToken.pushBalance(_alice, currentEpoch_ - firstPushEpoch, firstValuePushed);
        _zeroToken.pushBalance(_alice, currentEpoch_ - secondPushEpoch, secondValuePushed);
        _zeroToken.pushBalance(_alice, currentEpoch_ - thirdPushEpoch, thirdValuePushed);

        uint256[] memory balances_ = _zeroToken.pastBalancesOf(_alice, currentEpoch_ - firstPushEpoch, currentEpoch_ - thirdPushEpoch);

        assertEq(balances_[0], firstValuePushed);
        assertEq(balances_[firstPushEpoch - secondPushEpoch - 1], firstValuePushed);
        assertEq(balances_[firstPushEpoch - secondPushEpoch], secondValuePushed);
        assertEq(balances_[firstPushEpoch - thirdPushEpoch - 1], secondValuePushed);
        assertEq(balances_[firstPushEpoch - thirdPushEpoch], thirdValuePushed);
    }

    function testFuzz_pastBalancesOf_beforeAllSnaps(
        uint8 warpEpoch,
        uint256 firstPushEpoch, 
        uint256 secondPushEpoch,
        uint256 firstValuePushed,
        uint256 secondValuePushed       
    ) external {
        uint256 clock_ =_zeroToken.clock();
        uint256 currentEpoch_ = clock_ + warpEpoch;

        _warpToEpoch(currentEpoch_);        

        firstPushEpoch = bound(firstPushEpoch, 1, currentEpoch_ - 1);
        secondPushEpoch = bound(secondPushEpoch, 1, currentEpoch_);
        firstValuePushed = bound(firstValuePushed, 0, type(uint128).max);
        secondValuePushed = bound(secondValuePushed, 0, type(uint128).max);
        vm.assume(firstPushEpoch > secondPushEpoch);
                
        _zeroToken.pushBalance(_alice, currentEpoch_ - firstPushEpoch, firstValuePushed);
        _zeroToken.pushBalance(_alice, currentEpoch_ - secondPushEpoch, secondValuePushed);

        uint256[] memory balances_ = _zeroToken.pastBalancesOf(_alice, currentEpoch_ - firstPushEpoch - 1, currentEpoch_ - 1);
        
        assertEq(balances_[0], 0);
    }

    function testFuzz_pastBalancesOf_afterAllSnaps(
        uint8 warpEpoch,
        uint256 firstPushEpoch, 
        uint256 secondPushEpoch,
        uint256 firstValuePushed,
        uint256 secondValuePushed            
    ) external {
        uint256 clock_ =_zeroToken.clock();
        uint256 currentEpoch_ = clock_ + warpEpoch;

        _warpToEpoch(currentEpoch_);        

        firstPushEpoch = bound(firstPushEpoch, 1, currentEpoch_ - 1);
        secondPushEpoch = bound(secondPushEpoch, 1, currentEpoch_);
        firstValuePushed = bound(firstValuePushed, 0, type(uint128).max);
        secondValuePushed = bound(secondValuePushed, 0, type(uint128).max);
        vm.assume(firstPushEpoch > secondPushEpoch);
                
        _zeroToken.pushBalance(_alice, currentEpoch_ - firstPushEpoch, firstValuePushed);
        _zeroToken.pushBalance(_alice, currentEpoch_ - secondPushEpoch, secondValuePushed);

        _warpToEpoch(currentEpoch_ + 2); 
        uint256[] memory balances_ = _zeroToken.pastBalancesOf(_alice, currentEpoch_ - secondPushEpoch + 1, currentEpoch_);
        
        assertEq(balances_[0], secondValuePushed);
    }

    function testFuzz_pastDelegates_multi_subset(
        uint8 warpEpoch,
        uint8 firstPushEpoch, 
        uint8 secondPushEpoch,
        uint8 thirdPushEpoch        
    ) external {
        uint256 clock_ =_zeroToken.clock();
        uint256 currentEpoch_ = clock_ + warpEpoch;
        firstPushEpoch = uint8(bound(firstPushEpoch, 1, currentEpoch_ - 1));
        secondPushEpoch = uint8(bound(secondPushEpoch, 1, currentEpoch_ - 1));  
        thirdPushEpoch = uint8(bound(thirdPushEpoch, 1, currentEpoch_ - 1));  
        vm.assume(firstPushEpoch > secondPushEpoch && secondPushEpoch > thirdPushEpoch);           

        _warpToEpoch(currentEpoch_);

        _zeroToken.pushDelegatee(_alice, currentEpoch_ - firstPushEpoch, _carol);
        _zeroToken.pushDelegatee(_alice, currentEpoch_ - secondPushEpoch, address(0));
        _zeroToken.pushDelegatee(_alice, currentEpoch_ - thirdPushEpoch, _bob);

        _warpToEpoch(currentEpoch_ + 2); 
        address[] memory delegatees_ = _zeroToken.pastDelegates(_alice, currentEpoch_ - firstPushEpoch, currentEpoch_);

        assertEq(delegatees_[0], _carol);
        assertEq(delegatees_[firstPushEpoch - secondPushEpoch - 1], _carol);
        assertEq(delegatees_[firstPushEpoch - secondPushEpoch], _alice);
        assertEq(delegatees_[firstPushEpoch - thirdPushEpoch - 1], _alice);
        assertEq(delegatees_[firstPushEpoch - thirdPushEpoch], _bob);
        assertEq(delegatees_[firstPushEpoch], _bob);
    }

    function testFuzz_pastDelegates_multi_single(
        uint8 warpEpoch,
        uint8 firstPushEpoch, 
        uint8 secondPushEpoch,
        uint8 thirdPushEpoch            
    ) external {
        uint256 clock_ =_zeroToken.clock();
        uint256 currentEpoch_ = clock_ + warpEpoch;
        firstPushEpoch = uint8(bound(firstPushEpoch, 1, currentEpoch_ - 1));
        secondPushEpoch = uint8(bound(secondPushEpoch, 1, currentEpoch_ - 1));  
        thirdPushEpoch = uint8(bound(thirdPushEpoch, 1, currentEpoch_ - 1));  
        vm.assume(firstPushEpoch > secondPushEpoch && secondPushEpoch > thirdPushEpoch);           

        _warpToEpoch(currentEpoch_);

        _zeroToken.pushDelegatee(_alice, currentEpoch_ - firstPushEpoch, _carol);
        _zeroToken.pushDelegatee(_alice, currentEpoch_ - secondPushEpoch, address(0));
        _zeroToken.pushDelegatee(_alice, currentEpoch_ - thirdPushEpoch, _bob);

        _warpToEpoch(currentEpoch_ + 2); 
        address[] memory delegatees_ = _zeroToken.pastDelegates(_alice, currentEpoch_ - secondPushEpoch, currentEpoch_ - secondPushEpoch);

        assertEq(delegatees_[0], _alice);    
    }

    function testFuzz_pastDelegates_multi_beforeAllSnaps(
        uint8 warpEpoch,
        uint8 firstPushEpoch, 
        uint8 secondPushEpoch,
        uint8 thirdPushEpoch 
    ) external {
        uint256 clock_ =_zeroToken.clock();
        uint256 currentEpoch_ = clock_ + warpEpoch;
        firstPushEpoch = uint8(bound(firstPushEpoch, 1, currentEpoch_ - 5));
        secondPushEpoch = uint8(bound(secondPushEpoch, 1, currentEpoch_ - 1));  
        thirdPushEpoch = uint8(bound(thirdPushEpoch, 1, currentEpoch_ - 1));  
        vm.assume(firstPushEpoch > secondPushEpoch && secondPushEpoch > thirdPushEpoch);           

        _warpToEpoch(currentEpoch_);

        _zeroToken.pushDelegatee(_alice, currentEpoch_ - firstPushEpoch, _carol);
        _zeroToken.pushDelegatee(_alice, currentEpoch_ - secondPushEpoch, address(0));
        _zeroToken.pushDelegatee(_alice, currentEpoch_ - thirdPushEpoch, _bob);
 
        address[] memory delegatees_ = _zeroToken.pastDelegates(_alice, currentEpoch_ - firstPushEpoch - 2, currentEpoch_ - firstPushEpoch - 1);

        assertEq(delegatees_[0], _alice);
        assertEq(delegatees_[1], _alice);         
    }

    function testFuzz_getPastVotes_multi_subset(
        uint8 firstPushEpoch, 
        uint8 secondPushEpoch,
        uint256 firstValuePushed,
        uint256 secondValuePushed         
    ) external {
        uint256 currentEpoch_ = _zeroToken.clock();
        firstPushEpoch = uint8(bound(firstPushEpoch, 1, currentEpoch_ - 1));
        secondPushEpoch = uint8(bound(secondPushEpoch, 1, currentEpoch_ - 1));
        firstValuePushed = bound(firstValuePushed, 0, type(uint128).max);
        secondValuePushed = bound(secondValuePushed, 0, type(uint128).max);
        vm.assume(firstPushEpoch > secondPushEpoch);
        
        _zeroToken.pushVotes(_alice, currentEpoch_ - firstPushEpoch, firstValuePushed);
        _zeroToken.pushVotes(_alice, currentEpoch_ - secondPushEpoch, secondValuePushed);

        assertEq(_zeroToken.getPastVotes(_alice, currentEpoch_ - firstPushEpoch - 1), 0);
        assertEq(_zeroToken.getPastVotes(_alice, currentEpoch_ - firstPushEpoch), firstValuePushed);
        assertEq(_zeroToken.getPastVotes(_alice, currentEpoch_ - secondPushEpoch - 1), firstValuePushed);
        assertEq(_zeroToken.getPastVotes(_alice, currentEpoch_ - secondPushEpoch), secondValuePushed);
        assertEq(_zeroToken.getPastVotes(_alice, currentEpoch_ - 1), secondValuePushed);
    }

    function testFuzz_getPastVotes_multi_beforeAllSnaps(
        uint8 firstPushEpoch, 
        uint8 secondPushEpoch,
        uint256 firstValuePushed,
        uint256 secondValuePushed  
    ) external {
        uint256 currentEpoch_ = _zeroToken.clock();
        firstPushEpoch = uint8(bound(firstPushEpoch, 1, currentEpoch_ - 3));
        secondPushEpoch = uint8(bound(secondPushEpoch, 1, currentEpoch_ - 1));
        firstValuePushed = bound(firstValuePushed, 0, type(uint128).max);
        secondValuePushed = bound(secondValuePushed, 0, type(uint128).max);
        vm.assume(firstPushEpoch > secondPushEpoch);        

        _zeroToken.pushVotes(_alice, currentEpoch_ - firstPushEpoch, firstValuePushed);
        _zeroToken.pushVotes(_alice, currentEpoch_ - secondPushEpoch, secondValuePushed);

        uint256[] memory balances_ = _zeroToken.getPastVotes(_alice, currentEpoch_ - firstPushEpoch - 2, currentEpoch_ - firstPushEpoch - 1);
        assertEq(balances_[0], 0);
        assertEq(balances_[0], 0);
    }

    function testFuzz_getPastVotes_multi_afterAllSnaps(
        uint8 firstPushEpoch, 
        uint8 secondPushEpoch,
        uint256 firstValuePushed,
        uint256 secondValuePushed          
    ) external {
        uint256 currentEpoch_ = _zeroToken.clock();
        firstPushEpoch = uint8(bound(firstPushEpoch, 1, currentEpoch_ - 3));
        secondPushEpoch = uint8(bound(secondPushEpoch, 1, currentEpoch_ - 1));
        firstValuePushed = bound(firstValuePushed, 0, type(uint128).max);
        secondValuePushed = bound(secondValuePushed, 0, type(uint128).max);
        vm.assume(firstPushEpoch > secondPushEpoch);        

        _zeroToken.pushVotes(_alice, currentEpoch_ - firstPushEpoch, firstValuePushed);
        _zeroToken.pushVotes(_alice, currentEpoch_ - secondPushEpoch, secondValuePushed);

        _warpToEpoch(_zeroToken.clock() + 20);
        uint256[] memory balances_ = _zeroToken.getPastVotes(_alice, currentEpoch_, currentEpoch_ + 1);
        assertEq(balances_[0], secondValuePushed);
        assertEq(balances_[1], secondValuePushed);
    }

    function testFuzz_pastTotalSupplies_subset(
        uint256 firstPushEpoch, 
        uint256 secondPushEpoch,
        uint256 thirdPushEpoch,
        uint256 firstValuePushed,
        uint256 secondValuePushed,
        uint256 thirdValuePushed           
    ) external {
        uint256 currentEpoch_ = _zeroToken.clock();

        firstPushEpoch = uint8(bound(firstPushEpoch, 1, currentEpoch_ - 3));
        secondPushEpoch = uint8(bound(secondPushEpoch, 1, currentEpoch_ - 1));
        thirdPushEpoch = uint8(bound(thirdPushEpoch, 1, currentEpoch_ - 1));
        firstValuePushed = bound(firstValuePushed, 0, type(uint128).max);
        secondValuePushed = bound(secondValuePushed, 0, type(uint128).max);  
        thirdValuePushed = bound(thirdValuePushed, 0, type(uint128).max);  
        vm.assume(firstPushEpoch > secondPushEpoch && secondPushEpoch > thirdPushEpoch);        

        _zeroToken.pushTotalSupply(currentEpoch_ - firstPushEpoch, firstValuePushed);
        _zeroToken.pushTotalSupply(currentEpoch_ - secondPushEpoch, secondValuePushed); 
        _zeroToken.pushTotalSupply(currentEpoch_ - thirdPushEpoch, thirdValuePushed); 

        uint256[] memory totalSupplies_ = _zeroToken.pastTotalSupplies(currentEpoch_ - firstPushEpoch, currentEpoch_ - thirdPushEpoch - 1);

        assertEq(totalSupplies_[0], firstValuePushed);   
        assertEq(totalSupplies_[firstPushEpoch - secondPushEpoch - 1], firstValuePushed);
        assertEq(totalSupplies_[firstPushEpoch - secondPushEpoch], secondValuePushed);
        assertEq(totalSupplies_[firstPushEpoch - thirdPushEpoch - 1], secondValuePushed);
    }

    function testFuzz_pastTotalSupplies_beforeAllSnaps(
        uint8 firstPushEpoch, 
        uint8 secondPushEpoch,
        uint256 firstValuePushed,
        uint256 secondValuePushed          
    ) external {
        uint256 currentEpoch_ = _zeroToken.clock();
        firstPushEpoch = uint8(bound(firstPushEpoch, 1, currentEpoch_ - 3));
        secondPushEpoch = uint8(bound(secondPushEpoch, 1, currentEpoch_ - 1));
        firstValuePushed = bound(firstValuePushed, 0, type(uint128).max);
        secondValuePushed = bound(secondValuePushed, 0, type(uint128).max);
        vm.assume(firstPushEpoch > secondPushEpoch);          

        _zeroToken.pushTotalSupply(currentEpoch_ - firstPushEpoch, firstValuePushed);
        _zeroToken.pushTotalSupply(currentEpoch_ - secondPushEpoch, secondValuePushed);

        _warpToEpoch(_zeroToken.clock() + 20);
        uint256[] memory totalSupplies_ = _zeroToken.pastTotalSupplies(currentEpoch_ - firstPushEpoch - 2, currentEpoch_ - firstPushEpoch - 1);

        assertEq(totalSupplies_[0], 0);
        assertEq(totalSupplies_[0], 0);
    }

    function testFuzz_pastTotalSupplies_afterAllSnaps(
        uint8 firstPushEpoch, 
        uint8 secondPushEpoch,
        uint256 firstValuePushed,
        uint256 secondValuePushed         
    ) external {
        uint256 currentEpoch_ = _zeroToken.clock();
        firstPushEpoch = uint8(bound(firstPushEpoch, 1, currentEpoch_ - 3));
        secondPushEpoch = uint8(bound(secondPushEpoch, 1, currentEpoch_ - 1));
        firstValuePushed = bound(firstValuePushed, 0, type(uint128).max);
        secondValuePushed = bound(secondValuePushed, 0, type(uint128).max);
        vm.assume(firstPushEpoch > secondPushEpoch);          

        _zeroToken.pushTotalSupply(currentEpoch_ - firstPushEpoch, firstValuePushed);
        _zeroToken.pushTotalSupply(currentEpoch_ - secondPushEpoch, secondValuePushed);

        _warpToEpoch(_zeroToken.clock() + 20);
        uint256[] memory totalSupplies_ = _zeroToken.pastTotalSupplies(currentEpoch_, currentEpoch_ + 1);

        assertEq(totalSupplies_[0], secondValuePushed);
        assertEq(totalSupplies_[1], secondValuePushed);

    }
}
