// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.21;

import { ThresholdGovernor } from "./abstract/ThresholdGovernor.sol";

import { IEmergencyGovernor } from "./interfaces/IEmergencyGovernor.sol";
import { IRegistrar } from "./interfaces/IRegistrar.sol";
import { IStandardGovernor } from "./interfaces/IStandardGovernor.sol";

contract EmergencyGovernor is IEmergencyGovernor, ThresholdGovernor {
    address public immutable registrar;
    address public immutable standardGovernor;
    address public immutable zeroGovernor;

    modifier onlyZeroGovernor() {
        _revertIfNotZeroGovernor();
        _;
    }

    constructor(
        address registrar_,
        address voteToken_,
        address standardGovernor_,
        address zeroGovernor_,
        uint16 thresholdRatio_
    ) ThresholdGovernor("EmergencyGovernor", voteToken_, thresholdRatio_) {
        if ((registrar = registrar_) == address(0)) revert InvalidRegistrarAddress();
        if ((standardGovernor = standardGovernor_) == address(0)) revert InvalidStandardGovernorAddress();
        if ((zeroGovernor = zeroGovernor_) == address(0)) revert InvalidZeroGovernorAddress();
    }

    /******************************************************************************************************************\
    |                                      External/Public Interactive Functions                                       |
    \******************************************************************************************************************/

    function setThresholdRatio(uint16 newThresholdRatio_) external onlyZeroGovernor {
        _setThresholdRatio(newThresholdRatio_);
    }

    /******************************************************************************************************************\
    |                                                Proposal Functions                                                |
    \******************************************************************************************************************/

    function addToList(bytes32 list_, address account_) external onlySelf {
        _addToList(list_, account_);
    }

    function addAndRemoveFromList(bytes32 list_, address accountToAdd_, address accountToRemove_) external onlySelf {
        _addToList(list_, accountToAdd_);
        _removeFromList(list_, accountToRemove_);
    }

    function removeFromList(bytes32 list_, address account_) external onlySelf {
        _removeFromList(list_, account_);
    }

    function setStandardProposalFee(uint256 newProposalFee_) external onlySelf {
        IStandardGovernor(standardGovernor).setProposalFee(newProposalFee_);
    }

    function updateConfig(bytes32 key_, bytes32 value_) external onlySelf {
        IRegistrar(registrar).updateConfig(key_, value_);
    }

    /******************************************************************************************************************\
    |                                          Internal Interactive Functions                                          |
    \******************************************************************************************************************/

    function _addToList(bytes32 list_, address account_) internal {
        IRegistrar(registrar).addToList(list_, account_);
    }

    function _removeFromList(bytes32 list_, address account_) internal {
        IRegistrar(registrar).removeFromList(list_, account_);
    }

    /******************************************************************************************************************\
    |                                           Internal View/Pure Functions                                           |
    \******************************************************************************************************************/

    function _revertIfInvalidCalldata(bytes memory callData_) internal pure override {
        bytes4 func_ = bytes4(callData_);

        if (
            func_ != this.addToList.selector &&
            func_ != this.addAndRemoveFromList.selector &&
            func_ != this.removeFromList.selector &&
            func_ != this.setStandardProposalFee.selector &&
            func_ != this.updateConfig.selector
        ) revert InvalidCallData();
    }

    function _revertIfNotZeroGovernor() internal view {
        if (msg.sender != zeroGovernor) revert NotZeroGovernor();
    }
}
