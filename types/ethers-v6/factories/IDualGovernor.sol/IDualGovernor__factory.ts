/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IDualGovernor,
  IDualGovernorInterface,
} from "../../IDualGovernor.sol/IDualGovernor";

const _abi = [
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
        name: "typehash",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "BALLOTS_WITH_REASON_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "typehash",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "BALLOT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "typehash",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "BALLOT_WITH_REASON_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "typehash",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "CLOCK_MODE",
    outputs: [
      {
        internalType: "string",
        name: "clockMode",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "COUNTING_MODE",
    outputs: [
      {
        internalType: "string",
        name: "countingMode",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "domainSeparator",
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
        name: "one",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "cashToken",
    outputs: [
      {
        internalType: "address",
        name: "cashToken",
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
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
    ],
    name: "castVote",
    outputs: [
      {
        internalType: "uint256",
        name: "weight",
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
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "castVoteBySig",
    outputs: [
      {
        internalType: "uint256",
        name: "weight",
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
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "castVoteWithReason",
    outputs: [
      {
        internalType: "uint256",
        name: "weight",
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
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "castVoteWithReasonBySig",
    outputs: [
      {
        internalType: "uint256",
        name: "weight",
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
        name: "clock",
        type: "uint48",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "calldatas",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "descriptionHash",
        type: "bytes32",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "uint256",
        name: "proposalId",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timepoint",
        type: "uint256",
      },
    ],
    name: "getVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "weight",
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
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasVoted",
    outputs: [
      {
        internalType: "bool",
        name: "hasVoted",
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
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "calldatas",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "descriptionHash",
        type: "bytes32",
      },
    ],
    name: "hashProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "maxProposalFee",
    outputs: [
      {
        internalType: "uint256",
        name: "maxProposalFee",
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
        name: "minProposalFee",
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
        name: "name",
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
        name: "account",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "nonce",
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
        name: "epoch",
        type: "uint256",
      },
    ],
    name: "numberOfProposals",
    outputs: [
      {
        internalType: "uint256",
        name: "numberOfProposals",
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
        name: "epoch",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "numberOfProposalsVotedOn",
    outputs: [
      {
        internalType: "uint256",
        name: "numberOfProposalsVotedOn",
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
        name: "powerToken",
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
        name: "powerTokenQuorumRatio",
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
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "proposalDeadline",
    outputs: [
      {
        internalType: "uint256",
        name: "deadline",
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
        name: "proposalFee",
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
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "proposalProposer",
    outputs: [
      {
        internalType: "address",
        name: "proposer",
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
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "proposalSnapshot",
    outputs: [
      {
        internalType: "uint256",
        name: "snapshot",
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
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "calldatas",
        type: "bytes[]",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "propose",
    outputs: [
      {
        internalType: "uint256",
        name: "proposalId",
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
        name: "timepoint",
        type: "uint256",
      },
    ],
    name: "quorum",
    outputs: [
      {
        internalType: "uint256",
        name: "quorum",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registrar",
    outputs: [
      {
        internalType: "address",
        name: "registrar",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reward",
    outputs: [
      {
        internalType: "uint256",
        name: "reward",
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
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "state",
    outputs: [
      {
        internalType: "enum IGovernor.ProposalState",
        name: "state",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "votingDelay",
    outputs: [
      {
        internalType: "uint256",
        name: "votingDelay",
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
        name: "votingPeriod",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "zeroToken",
    outputs: [
      {
        internalType: "address",
        name: "zeroToken",
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
        name: "zeroTokenQuorumRatio",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IDualGovernor__factory {
  static readonly abi = _abi;
  static createInterface(): IDualGovernorInterface {
    return new Interface(_abi) as IDualGovernorInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IDualGovernor {
    return new Contract(address, _abi, runner) as unknown as IDualGovernor;
  }
}
