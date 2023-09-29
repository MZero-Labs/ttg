// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.20;

import { IPowerBootstrapToken } from "./interfaces/IPowerBootstrapToken.sol";

// NOTE: This is an example of a token that can be used to bootstrap the PowerToken for the first time.

contract PowerBootstrapToken is IPowerBootstrapToken {
    uint256 internal immutable _totalSupply;

    mapping(address account => uint256 balance) internal _balances;

    constructor(address[] memory initialAccounts_, uint256[] memory initialBalances_) {
        uint256 accountsLength_ = initialAccounts_.length;
        uint256 balancesLength_ = initialBalances_.length;

        if (accountsLength_ != balancesLength_) revert LengthMismatch(accountsLength_, balancesLength_);

        uint256 totalSupply_;

        for (uint256 index_; index_ < accountsLength_; index_++) {
            totalSupply_ += _balances[initialAccounts_[index_]] = initialBalances_[index_];
        }

        _totalSupply = totalSupply_;
    }

    function balanceOfAt(address account_, uint256 epoch_) external view returns (uint256 balance_) {
        balance_ = _balances[account_];
    }

    function totalSupplyAt(uint256 epoch_) external view returns (uint256 totalSupply_) {
        totalSupply_ = _totalSupply;
    }
}