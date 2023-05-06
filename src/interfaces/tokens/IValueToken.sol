// SPDX-License-Identifier: GLP-3.0
pragma solidity 0.8.19;

import {ISPOGVotes} from "../../interfaces/tokens/ISPOGVotes.sol";

interface IValueToken is ISPOGVotes {
    function snapshot() external returns (uint256);
}
