// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.21;

import { IGovernorBySig } from "./IGovernorBySig.sol";

interface IDualGovernor is IGovernorBySig {
    /******************************************************************************************************************\
    |                                                      Enums                                                       |
    \******************************************************************************************************************/

    enum ProposalType {
        Standard,
        Emergency,
        Zero
    }

    enum VoteType {
        No,
        Yes
    }

    /******************************************************************************************************************\
    |                                                      Events                                                      |
    \******************************************************************************************************************/

    event CashTokenSet(address indexed cashToken);

    event PowerTokenThresholdRatioSet(uint16 thresholdRatio);

    event ProposalFeeSet(uint256 proposalFee);

    event ZeroTokenThresholdRatioSet(uint16 thresholdRatio);

    event ProposalFeeSentToVault(uint256 indexed proposalId, address indexed cashToken, uint256 proposalFee);

    /******************************************************************************************************************\
    |                                                      Errors                                                      |
    \******************************************************************************************************************/

    error AlreadyVoted();

    error EpochHasNoProposals();

    error ExecutionFailed(bytes data);

    error FeeNotDestinedForVault(ProposalState state);

    error InvalidCallDatasLength();

    error InvalidCashToken();

    error InvalidPowerTokenAddress();

    error InvalidProposalType();

    error InvalidTarget();

    error InvalidTargetsLength();

    error InvalidValue();

    error InvalidValuesLength();

    error InvalidZeroTokenAddress();

    error NoAllowedCashTokens();

    error NoProposalFee();

    error NotSelf();

    error ProposalCannotBeExecuted();

    error ProposalDoesNotExist();

    error ProposalExists();

    error ProposalNotActive(ProposalState state);

    error ZeroCashTokenAddress();

    error ZeroRegistrarAddress();

    error ZeroVaultAddress();

    /******************************************************************************************************************\
    |                                              Interactive Functions                                               |
    \******************************************************************************************************************/

    function sendProposalFeeToVault(uint256 proposalId) external;

    /******************************************************************************************************************\
    |                                               View/Pure Functions                                                |
    \******************************************************************************************************************/

    function BALLOT_TYPEHASH() external pure returns (bytes32 typehash);

    function BALLOT_WITH_REASON_TYPEHASH() external pure returns (bytes32 typehash);

    function BALLOTS_TYPEHASH() external pure returns (bytes32 typehash);

    function BALLOTS_WITH_REASON_TYPEHASH() external pure returns (bytes32 typehash);

    function ONE() external pure returns (uint256 one);

    function cashToken() external view returns (address cashToken);

    function getProposal(
        uint256 proposalId
    )
        external
        view
        returns (
            ProposalType proposalType,
            uint16 voteStart,
            uint16 voteEnd,
            bool executed,
            ProposalState state,
            uint16 thresholdRatio,
            uint256 noVotes,
            uint256 yesVotes,
            address proposer
        );

    function hashProposal(bytes memory callData) external view returns (uint256 proposalId);

    function hasVotedOnAllStandardProposals(address voter, uint256 epoch) external view returns (bool hasVoted);

    function isAllowedCashToken(address token) external view returns (bool isAllowed);

    function maxTotalZeroRewardPerActiveEpoch() external view returns (uint256 reward);

    function numberOfStandardProposalsAt(uint256 epoch) external view returns (uint256 count);

    function numberOfStandardProposalsVotedOnAt(uint256 epoch, address voter) external view returns (uint256 count);

    function powerToken() external view returns (address powerToken);

    function powerTokenThresholdRatio() external view returns (uint256 thresholdRatio);

    function proposalFee() external view returns (uint256 proposalFee);

    function registrar() external view returns (address registrar);

    function vault() external view returns (address vault);

    function zeroToken() external view returns (address zeroToken);

    function zeroTokenThresholdRatio() external view returns (uint256 thresholdRatio);

    /******************************************************************************************************************\
    |                                                Proposal Functions                                                |
    \******************************************************************************************************************/

    function addToList(bytes32 list, address account) external;

    function addAndRemoveFromList(bytes32 list, address accountToAdd, address accountToRemove) external;

    function emergencyAddToList(bytes32 list, address account) external;

    function emergencyAddAndRemoveFromList(bytes32 list, address accountToAdd, address accountToRemove) external;

    function emergencyRemoveFromList(bytes32 list, address account) external;

    function emergencySetProposalFee(uint256 newProposalFee) external;

    function emergencyUpdateConfig(bytes32 key, bytes32 value_) external;

    function removeFromList(bytes32 list, address account) external;

    function resetToPowerHolders() external;

    function resetToZeroHolders() external;

    function setCashToken(address newCashToken_, uint256 newProposalFee_) external;

    function setProposalFee(uint256 newProposalFee) external;

    function setPowerTokenThresholdRatio(uint16 newThresholdRatio) external;

    function setZeroTokenThresholdRatio(uint16 newThresholdRatio) external;

    function updateConfig(bytes32 key, bytes32 value_) external;
}
