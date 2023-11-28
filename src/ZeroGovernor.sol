// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.21;

import { ThresholdGovernor } from "./abstract/ThresholdGovernor.sol";

import { IEmergencyGovernor } from "./interfaces/IEmergencyGovernor.sol";
import { IRegistrar } from "./interfaces/IRegistrar.sol";
import { IStandardGovernor } from "./interfaces/IStandardGovernor.sol";
import { IZeroGovernor } from "./interfaces/IZeroGovernor.sol";

contract ZeroGovernor is IZeroGovernor, ThresholdGovernor {
    address public immutable registrar;
    address public immutable startingCashToken;

    mapping(address token => bool allowed) internal _allowedCashTokens;

    constructor(
        address registrar_,
        address voteToken_,
        address[] memory allowedCashTokens_,
        uint16 thresholdRatio_
    ) ThresholdGovernor("ZeroGovernor", voteToken_, thresholdRatio_) {
        if ((registrar = registrar_) == address(0)) revert InvalidRegistrarAddress();

        if (allowedCashTokens_.length == 0) revert NoAllowedCashTokens();

        startingCashToken = allowedCashTokens_[0];

        for (uint256 index_; index_ < allowedCashTokens_.length; ++index_) {
            address allowedCashToken_ = allowedCashTokens_[index_];

            if (allowedCashToken_ == address(0)) revert InvalidCashTokenAddress();

            _allowedCashTokens[allowedCashToken_] = true;
        }
    }

    /******************************************************************************************************************\
    |                                       External/Public View/Pure Functions                                        |
    \******************************************************************************************************************/

    function emergencyGovernor() public view returns (address emergencyGovernor_) {
        return IRegistrar(registrar).emergencyGovernor();
    }

    function isAllowedCashToken(address token_) external view returns (bool isAllowed_) {
        return _allowedCashTokens[token_];
    }

    function standardGovernor() public view returns (address standardGovernor_) {
        return IRegistrar(registrar).standardGovernor();
    }

    /******************************************************************************************************************\
    |                                                Proposal Functions                                                |
    \******************************************************************************************************************/

    function resetToPowerHolders() external onlySelf {
        IRegistrar(registrar).reset(IRegistrar(registrar).powerToken());
    }

    function resetToZeroHolders() external onlySelf {
        IRegistrar(registrar).reset(voteToken);
    }

    // TODO: Issue here where Zero holders can set the proposal fee by abusing this proposal.
    function setCashToken(address newCashToken_, uint256 newProposalFee_) external onlySelf {
        if (!_allowedCashTokens[newCashToken_]) revert InvalidCashToken();

        IStandardGovernor(standardGovernor()).setCashToken(newCashToken_, newProposalFee_);
    }

    function setEmergencyProposalThresholdRatio(uint16 newThresholdRatio_) external onlySelf {
        IEmergencyGovernor(emergencyGovernor()).setThresholdRatio(newThresholdRatio_);
    }

    function setZeroProposalThresholdRatio(uint16 newThresholdRatio_) external onlySelf {
        _setThresholdRatio(newThresholdRatio_);
    }

    /******************************************************************************************************************\
    |                                           Internal View/Pure Functions                                           |
    \******************************************************************************************************************/

    function _revertIfInvalidCalldata(bytes memory callData_) internal pure override {
        bytes4 func_ = bytes4(callData_);

        if (
            func_ != this.resetToPowerHolders.selector &&
            func_ != this.resetToZeroHolders.selector &&
            func_ != this.setCashToken.selector &&
            func_ != this.setEmergencyProposalThresholdRatio.selector &&
            func_ != this.setZeroProposalThresholdRatio.selector
        ) revert InvalidCallData();
    }
}
