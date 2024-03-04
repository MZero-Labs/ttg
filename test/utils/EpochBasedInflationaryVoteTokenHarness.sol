// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.23;

import { EpochBasedInflationaryVoteToken } from "../../src/abstract/EpochBasedInflationaryVoteToken.sol";

contract EpochBasedInflationaryVoteTokenHarness is EpochBasedInflationaryVoteToken {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 decimals_,
        uint256 participationInflation_
    ) EpochBasedInflationaryVoteToken(name_, symbol_, uint8(decimals_), uint16(participationInflation_)) {}

    function markParticipation(address delegatee_) external {
        _markParticipation(delegatee_);
    }

    function mint(address account_, uint256 amount_) external {
        _mint(account_, amount_);
    }

    function getBalanceSnapStartingEpoch(address account_, uint256 index_) external view returns (uint16) {
        return _balances[account_][index_].startingEpoch;
    }
}
