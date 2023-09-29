/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  DualGovernorAbi,
  DualGovernorAbiInterface,
} from "../../DualGovernor.sol/DualGovernorAbi";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "cashToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "registrar_",
        type: "address",
      },
      {
        internalType: "address",
        name: "zeroToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "powerToken_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "proposalFee_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minProposalFee_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxProposalFee_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reward_",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "zeroTokenQuorumRatio_",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "powerTokenQuorumRatio_",
        type: "uint16",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadyVoted",
    type: "error",
  },
  {
    inputs: [],
    name: "EpochHasNoProposals",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "ExecutionFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidCalldatasLength",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPowerTokenAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidProposalFeeRange",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidProposalType",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTarget",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTargetsLength",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidValue",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidValuesLength",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidZeroTokenAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MalleableSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "NotSelf",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposalDoesNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposalExists",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minProposalFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxProposalFee",
        type: "uint256",
      },
    ],
    name: "ProposalFeeOutOfRange",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum IGovernor.ProposalState",
        name: "state",
        type: "uint8",
      },
    ],
    name: "ProposalIsNotInActiveState",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposalNotSuccessful",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentNonce",
        type: "uint256",
      },
    ],
    name: "ReusedNonce",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "SignatureExpired",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
    ],
    name: "SignerMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroCashTokenAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroRegistrarAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "powerTokenQuorumRatio",
        type: "uint16",
      },
    ],
    name: "PowerTokenQuorumRatioSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "proposer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "signatures",
        type: "string[]",
      },
      {
        indexed: false,
        internalType: "bytes[]",
        name: "calldatas",
        type: "bytes[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "voteStart",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "voteEnd",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "ProposalCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "ProposalExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "minProposalFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "maxProposalFee",
        type: "uint256",
      },
    ],
    name: "ProposalFeeRangeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalFee",
        type: "uint256",
      },
    ],
    name: "ProposalFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldQuorumNumerator",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newQuorumNumerator",
        type: "uint256",
      },
    ],
    name: "QuorumNumeratorUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "VoteCast",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "zeroTokenQuorumRatio",
        type: "uint16",
      },
    ],
    name: "ZeroTokenQuorumRatioSet",
    type: "event",
  },
  {
    inputs: [],
    name: "BALLOTS_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BALLOTS_WITH_REASON_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BALLOT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BALLOT_WITH_REASON_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CLOCK_MODE",
    outputs: [
      {
        internalType: "string",
        name: "clockMode_",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "COUNTING_MODE",
    outputs: [
      {
        internalType: "string",
        name: "countingMode_",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "domainSeparator_",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ONE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "list_",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "addToList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cashToken",
    outputs: [
      {
        internalType: "address",
        name: "cashToken_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId_",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support_",
        type: "uint8",
      },
    ],
    name: "castVote",
    outputs: [
      {
        internalType: "uint256",
        name: "weight_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId_",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support_",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "v_",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r_",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s_",
        type: "bytes32",
      },
    ],
    name: "castVoteBySig",
    outputs: [
      {
        internalType: "uint256",
        name: "weight_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId_",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support_",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reason_",
        type: "string",
      },
    ],
    name: "castVoteWithReason",
    outputs: [
      {
        internalType: "uint256",
        name: "weight_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId_",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support_",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reason_",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "v_",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r_",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s_",
        type: "bytes32",
      },
    ],
    name: "castVoteWithReasonBySig",
    outputs: [
      {
        internalType: "uint256",
        name: "weight_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "proposalIds_",
        type: "uint256[]",
      },
      {
        internalType: "uint8[]",
        name: "supports_",
        type: "uint8[]",
      },
    ],
    name: "castVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "weight_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "proposalIds_",
        type: "uint256[]",
      },
      {
        internalType: "uint8[]",
        name: "supports_",
        type: "uint8[]",
      },
      {
        internalType: "uint8",
        name: "v_",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r_",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s_",
        type: "bytes32",
      },
    ],
    name: "castVotesBySig",
    outputs: [
      {
        internalType: "uint256",
        name: "weight_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "proposalIds_",
        type: "uint256[]",
      },
      {
        internalType: "uint8[]",
        name: "supports_",
        type: "uint8[]",
      },
      {
        internalType: "string[]",
        name: "reasons_",
        type: "string[]",
      },
    ],
    name: "castVotesWithReason",
    outputs: [
      {
        internalType: "uint256",
        name: "weight_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "proposalIds_",
        type: "uint256[]",
      },
      {
        internalType: "uint8[]",
        name: "supports_",
        type: "uint8[]",
      },
      {
        internalType: "string[]",
        name: "reasons_",
        type: "string[]",
      },
      {
        internalType: "uint8",
        name: "v_",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r_",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s_",
        type: "bytes32",
      },
    ],
    name: "castVotesWithReasonBySig",
    outputs: [
      {
        internalType: "uint256",
        name: "weight_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "clock",
    outputs: [
      {
        internalType: "uint48",
        name: "clock_",
        type: "uint48",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "list_",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "emergencyAddToList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "list_",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "emergencyRemoveFromList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key_",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "value_",
        type: "bytes32",
      },
    ],
    name: "emergencyUpdateConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values_",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "calldatas_",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "descriptionHash_",
        type: "bytes32",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "uint256",
        name: "proposalId_",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timepoint_",
        type: "uint256",
      },
    ],
    name: "getVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "weight_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "hasVoted",
    outputs: [
      {
        internalType: "bool",
        name: "hasVoted_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values_",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "calldatas_",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "descriptionHash_",
        type: "bytes32",
      },
    ],
    name: "hashProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "proposalId_",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "markEpochActive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxProposalFee",
    outputs: [
      {
        internalType: "uint256",
        name: "maxProposalFee_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minProposalFee",
    outputs: [
      {
        internalType: "uint256",
        name: "minProposalFee_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "nonce_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "epoch_",
        type: "uint256",
      },
    ],
    name: "numberOfProposals",
    outputs: [
      {
        internalType: "uint256",
        name: "numberOfProposals_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "epoch_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "voter_",
        type: "address",
      },
    ],
    name: "numberOfProposalsVotedOn",
    outputs: [
      {
        internalType: "uint256",
        name: "numberOfProposalsVotedOn_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "powerToken",
    outputs: [
      {
        internalType: "address",
        name: "powerToken_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "powerTokenQuorumRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "powerTokenQuorumRatio_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId_",
        type: "uint256",
      },
    ],
    name: "proposalDeadline",
    outputs: [
      {
        internalType: "uint256",
        name: "deadline_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalFee",
    outputs: [
      {
        internalType: "uint256",
        name: "proposalFee_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId_",
        type: "uint256",
      },
    ],
    name: "proposalProposer",
    outputs: [
      {
        internalType: "address",
        name: "proposer_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId_",
        type: "uint256",
      },
    ],
    name: "proposalSnapshot",
    outputs: [
      {
        internalType: "uint256",
        name: "snapshot_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values_",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "calldatas_",
        type: "bytes[]",
      },
      {
        internalType: "string",
        name: "description_",
        type: "string",
      },
    ],
    name: "propose",
    outputs: [
      {
        internalType: "uint256",
        name: "proposalId_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timepoint_",
        type: "uint256",
      },
    ],
    name: "quorum",
    outputs: [
      {
        internalType: "uint256",
        name: "quorum_",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "registrar",
    outputs: [
      {
        internalType: "address",
        name: "registrar_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "list_",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "removeFromList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reward",
    outputs: [
      {
        internalType: "uint256",
        name: "reward_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "newPowerTokenQuorumRatio_",
        type: "uint16",
      },
    ],
    name: "setPowerTokenQuorumRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newProposalFee_",
        type: "uint256",
      },
    ],
    name: "setProposalFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMinProposalFee_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newMaxProposalFee_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newProposalFee_",
        type: "uint256",
      },
    ],
    name: "setProposalFeeRange",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "newZeroTokenQuorumRatio_",
        type: "uint16",
      },
    ],
    name: "setZeroTokenQuorumRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId_",
        type: "uint256",
      },
    ],
    name: "state",
    outputs: [
      {
        internalType: "enum IGovernor.ProposalState",
        name: "state_",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key_",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "value_",
        type: "bytes32",
      },
    ],
    name: "updateConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "votingDelay",
    outputs: [
      {
        internalType: "uint256",
        name: "votingDelay_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "votingPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "votingPeriod_",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "zeroToken",
    outputs: [
      {
        internalType: "address",
        name: "zeroToken_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "zeroTokenQuorumRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "zeroTokenQuorumRatio_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class DualGovernorAbi__factory {
  static readonly abi = _abi;
  static createInterface(): DualGovernorAbiInterface {
    return new utils.Interface(_abi) as DualGovernorAbiInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DualGovernorAbi {
    return new Contract(address, _abi, signerOrProvider) as DualGovernorAbi;
  }
}
