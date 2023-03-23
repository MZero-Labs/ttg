// SPDX-License-Identifier: GLP-3.0
pragma solidity 0.8.17;

import {IList} from "src/interfaces/IList.sol";

interface ISPOGClone {
    function __SPOG_init(
        address _cash,
        uint256[2] memory _taxRange,
        uint256 _inflator,
        uint256 _reward,
        uint256 _voteTime,
        uint256 _inflatorTime,
        uint256 _sellTime,
        uint256 _forkTime,
        uint256 _voteQuorum,
        uint256 _valueQuorum,
        uint256 _tax,
        address spogAddress
    ) external;

    function addNewList(IList list) external;

    function removeList(IList list) external;

    function append(address _address, IList _list) external;

    function remove(address _address, IList _list) external;

    function emergencyRemove(address _address, IList _list) external;
}