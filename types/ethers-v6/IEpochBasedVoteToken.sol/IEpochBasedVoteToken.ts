/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface IEpochBasedVoteTokenInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "CLOCK_MODE"
      | "CLOCK_MODE()"
      | "DELEGATION_TYPEHASH"
      | "DELEGATION_TYPEHASH()"
      | "DOMAIN_SEPARATOR"
      | "DOMAIN_SEPARATOR()"
      | "PERMIT_TYPEHASH"
      | "PERMIT_TYPEHASH()"
      | "allowance"
      | "allowance(address,address)"
      | "approve"
      | "approve(address,uint256)"
      | "balanceOf"
      | "balanceOf(address)"
      | "balanceOfAt"
      | "balanceOfAt(address,uint256)"
      | "clock"
      | "clock()"
      | "decimals"
      | "decimals()"
      | "decreaseAllowance"
      | "decreaseAllowance(address,uint256)"
      | "delegate"
      | "delegate(address)"
      | "delegateBySig"
      | "delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32)"
      | "delegates"
      | "delegates(address)"
      | "delegatesAt"
      | "delegatesAt(address,uint256)"
      | "getPastVotes"
      | "getPastVotes(address,uint256)"
      | "getVotes"
      | "getVotes(address)"
      | "increaseAllowance"
      | "increaseAllowance(address,uint256)"
      | "name"
      | "name()"
      | "nonces"
      | "nonces(address)"
      | "permit"
      | "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)"
      | "symbol"
      | "symbol()"
      | "totalSupply"
      | "totalSupply()"
      | "totalSupplyAt"
      | "totalSupplyAt(uint256)"
      | "transfer"
      | "transfer(address,uint256)"
      | "transferFrom"
      | "transferFrom(address,address,uint256)"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Approval"
      | "Approval(address,address,uint256)"
      | "DelegateChanged"
      | "DelegateChanged(address,address,address)"
      | "DelegateVotesChanged"
      | "DelegateVotesChanged(address,uint256,uint256)"
      | "Transfer"
      | "Transfer(address,address,uint256)"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "CLOCK_MODE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CLOCK_MODE()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DELEGATION_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DELEGATION_TYPEHASH()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PERMIT_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PERMIT_TYPEHASH()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "allowance(address,address)",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "approve(address,uint256)",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf(address)",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfAt",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfAt(address,uint256)",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "clock", values?: undefined): string;
  encodeFunctionData(functionFragment: "clock()", values?: undefined): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decimals()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance(address,uint256)",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "delegate",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "delegate(address)",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "delegateBySig",
    values: [
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32)",
    values: [
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "delegates",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "delegates(address)",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "delegatesAt",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "delegatesAt(address,uint256)",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPastVotes",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPastVotes(address,uint256)",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getVotes",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getVotes(address)",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance(address,uint256)",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "name()", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonces", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "nonces(address)",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [
      AddressLike,
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)",
    values: [
      AddressLike,
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(functionFragment: "symbol()", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupplyAt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupplyAt(uint256)",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer(address,uint256)",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom(address,address,uint256)",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "CLOCK_MODE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "CLOCK_MODE()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DELEGATION_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DELEGATION_TYPEHASH()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PERMIT_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PERMIT_TYPEHASH()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "allowance(address,address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "approve(address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balanceOf(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfAt(address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "clock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "clock()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals()", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance(address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "delegate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "delegate(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "delegateBySig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "delegates", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "delegates(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "delegatesAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "delegatesAt(address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPastVotes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPastVotes(address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getVotes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getVotes(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance(address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nonces(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol()", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupplyAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupplyAt(uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transfer(address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom(address,address,uint256)",
    data: BytesLike
  ): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    account: AddressLike,
    spender: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [account: string, spender: string, amount: bigint];
  export interface OutputObject {
    account: string;
    spender: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DelegateChangedEvent {
  export type InputTuple = [
    delegator: AddressLike,
    fromDelegate: AddressLike,
    toDelegate: AddressLike
  ];
  export type OutputTuple = [
    delegator: string,
    fromDelegate: string,
    toDelegate: string
  ];
  export interface OutputObject {
    delegator: string;
    fromDelegate: string;
    toDelegate: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DelegateVotesChangedEvent {
  export type InputTuple = [
    delegate: AddressLike,
    previousBalance: BigNumberish,
    newBalance: BigNumberish
  ];
  export type OutputTuple = [
    delegate: string,
    previousBalance: bigint,
    newBalance: bigint
  ];
  export interface OutputObject {
    delegate: string;
    previousBalance: bigint;
    newBalance: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    account: AddressLike,
    recipient: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    account: string,
    recipient: string,
    amount: bigint
  ];
  export interface OutputObject {
    account: string;
    recipient: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IEpochBasedVoteToken extends BaseContract {
  connect(runner?: ContractRunner | null): IEpochBasedVoteToken;
  waitForDeployment(): Promise<this>;

  interface: IEpochBasedVoteTokenInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  CLOCK_MODE: TypedContractMethod<[], [string], "view">;

  "CLOCK_MODE()": TypedContractMethod<[], [string], "view">;

  DELEGATION_TYPEHASH: TypedContractMethod<[], [string], "view">;

  "DELEGATION_TYPEHASH()": TypedContractMethod<[], [string], "view">;

  DOMAIN_SEPARATOR: TypedContractMethod<[], [string], "view">;

  "DOMAIN_SEPARATOR()": TypedContractMethod<[], [string], "view">;

  PERMIT_TYPEHASH: TypedContractMethod<[], [string], "view">;

  "PERMIT_TYPEHASH()": TypedContractMethod<[], [string], "view">;

  allowance: TypedContractMethod<
    [account: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;

  "allowance(address,address)": TypedContractMethod<
    [account: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;

  approve: TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  "approve(address,uint256)": TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  balanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  "balanceOf(address)": TypedContractMethod<
    [account: AddressLike],
    [bigint],
    "view"
  >;

  balanceOfAt: TypedContractMethod<
    [account: AddressLike, epoch: BigNumberish],
    [bigint],
    "view"
  >;

  "balanceOfAt(address,uint256)": TypedContractMethod<
    [account: AddressLike, epoch: BigNumberish],
    [bigint],
    "view"
  >;

  clock: TypedContractMethod<[], [bigint], "view">;

  "clock()": TypedContractMethod<[], [bigint], "view">;

  decimals: TypedContractMethod<[], [bigint], "view">;

  "decimals()": TypedContractMethod<[], [bigint], "view">;

  decreaseAllowance: TypedContractMethod<
    [spender: AddressLike, subtractedAmount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  "decreaseAllowance(address,uint256)": TypedContractMethod<
    [spender: AddressLike, subtractedAmount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  delegate: TypedContractMethod<[delegatee: AddressLike], [void], "nonpayable">;

  "delegate(address)": TypedContractMethod<
    [delegatee: AddressLike],
    [void],
    "nonpayable"
  >;

  delegateBySig: TypedContractMethod<
    [
      delegatee: AddressLike,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  "delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32)": TypedContractMethod<
    [
      delegatee: AddressLike,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  delegates: TypedContractMethod<[account: AddressLike], [string], "view">;

  "delegates(address)": TypedContractMethod<
    [account: AddressLike],
    [string],
    "view"
  >;

  delegatesAt: TypedContractMethod<
    [account: AddressLike, epoch: BigNumberish],
    [string],
    "view"
  >;

  "delegatesAt(address,uint256)": TypedContractMethod<
    [account: AddressLike, epoch: BigNumberish],
    [string],
    "view"
  >;

  getPastVotes: TypedContractMethod<
    [account: AddressLike, timepoint: BigNumberish],
    [bigint],
    "view"
  >;

  "getPastVotes(address,uint256)": TypedContractMethod<
    [account: AddressLike, timepoint: BigNumberish],
    [bigint],
    "view"
  >;

  getVotes: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  "getVotes(address)": TypedContractMethod<
    [account: AddressLike],
    [bigint],
    "view"
  >;

  increaseAllowance: TypedContractMethod<
    [spender: AddressLike, addedAmount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  "increaseAllowance(address,uint256)": TypedContractMethod<
    [spender: AddressLike, addedAmount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  name: TypedContractMethod<[], [string], "view">;

  "name()": TypedContractMethod<[], [string], "view">;

  nonces: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  "nonces(address)": TypedContractMethod<
    [account: AddressLike],
    [bigint],
    "view"
  >;

  permit: TypedContractMethod<
    [
      account: AddressLike,
      spender: AddressLike,
      amount: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": TypedContractMethod<
    [
      account: AddressLike,
      spender: AddressLike,
      amount: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  symbol: TypedContractMethod<[], [string], "view">;

  "symbol()": TypedContractMethod<[], [string], "view">;

  totalSupply: TypedContractMethod<[], [bigint], "view">;

  "totalSupply()": TypedContractMethod<[], [bigint], "view">;

  totalSupplyAt: TypedContractMethod<[epoch: BigNumberish], [bigint], "view">;

  "totalSupplyAt(uint256)": TypedContractMethod<
    [epoch: BigNumberish],
    [bigint],
    "view"
  >;

  transfer: TypedContractMethod<
    [recipient: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  "transfer(address,uint256)": TypedContractMethod<
    [recipient: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  transferFrom: TypedContractMethod<
    [account: AddressLike, recipient: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  "transferFrom(address,address,uint256)": TypedContractMethod<
    [account: AddressLike, recipient: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "CLOCK_MODE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "CLOCK_MODE()"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DELEGATION_TYPEHASH"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DELEGATION_TYPEHASH()"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DOMAIN_SEPARATOR"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DOMAIN_SEPARATOR()"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "PERMIT_TYPEHASH"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "PERMIT_TYPEHASH()"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "allowance"
  ): TypedContractMethod<
    [account: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "allowance(address,address)"
  ): TypedContractMethod<
    [account: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "approve"
  ): TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "approve(address,uint256)"
  ): TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "balanceOf(address)"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "balanceOfAt"
  ): TypedContractMethod<
    [account: AddressLike, epoch: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "balanceOfAt(address,uint256)"
  ): TypedContractMethod<
    [account: AddressLike, epoch: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "clock"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "clock()"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "decimals"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "decimals()"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "decreaseAllowance"
  ): TypedContractMethod<
    [spender: AddressLike, subtractedAmount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "decreaseAllowance(address,uint256)"
  ): TypedContractMethod<
    [spender: AddressLike, subtractedAmount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "delegate"
  ): TypedContractMethod<[delegatee: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "delegate(address)"
  ): TypedContractMethod<[delegatee: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "delegateBySig"
  ): TypedContractMethod<
    [
      delegatee: AddressLike,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32)"
  ): TypedContractMethod<
    [
      delegatee: AddressLike,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "delegates"
  ): TypedContractMethod<[account: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "delegates(address)"
  ): TypedContractMethod<[account: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "delegatesAt"
  ): TypedContractMethod<
    [account: AddressLike, epoch: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "delegatesAt(address,uint256)"
  ): TypedContractMethod<
    [account: AddressLike, epoch: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getPastVotes"
  ): TypedContractMethod<
    [account: AddressLike, timepoint: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getPastVotes(address,uint256)"
  ): TypedContractMethod<
    [account: AddressLike, timepoint: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getVotes"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getVotes(address)"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "increaseAllowance"
  ): TypedContractMethod<
    [spender: AddressLike, addedAmount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "increaseAllowance(address,uint256)"
  ): TypedContractMethod<
    [spender: AddressLike, addedAmount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "name"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "name()"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "nonces"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "nonces(address)"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "permit"
  ): TypedContractMethod<
    [
      account: AddressLike,
      spender: AddressLike,
      amount: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)"
  ): TypedContractMethod<
    [
      account: AddressLike,
      spender: AddressLike,
      amount: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "symbol"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "symbol()"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "totalSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalSupply()"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalSupplyAt"
  ): TypedContractMethod<[epoch: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalSupplyAt(uint256)"
  ): TypedContractMethod<[epoch: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [recipient: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transfer(address,uint256)"
  ): TypedContractMethod<
    [recipient: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [account: AddressLike, recipient: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferFrom(address,address,uint256)"
  ): TypedContractMethod<
    [account: AddressLike, recipient: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  getEvent(
    key: "Approval"
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: "Approval(address,address,uint256)"
  ): TypedContractEvent<
    Approval_address_address_uint256_Event.InputTuple,
    Approval_address_address_uint256_Event.OutputTuple,
    Approval_address_address_uint256_Event.OutputObject
  >;
  getEvent(
    key: "DelegateChanged"
  ): TypedContractEvent<
    DelegateChangedEvent.InputTuple,
    DelegateChangedEvent.OutputTuple,
    DelegateChangedEvent.OutputObject
  >;
  getEvent(
    key: "DelegateChanged(address,address,address)"
  ): TypedContractEvent<
    DelegateChanged_address_address_address_Event.InputTuple,
    DelegateChanged_address_address_address_Event.OutputTuple,
    DelegateChanged_address_address_address_Event.OutputObject
  >;
  getEvent(
    key: "DelegateVotesChanged"
  ): TypedContractEvent<
    DelegateVotesChangedEvent.InputTuple,
    DelegateVotesChangedEvent.OutputTuple,
    DelegateVotesChangedEvent.OutputObject
  >;
  getEvent(
    key: "DelegateVotesChanged(address,uint256,uint256)"
  ): TypedContractEvent<
    DelegateVotesChanged_address_uint256_uint256_Event.InputTuple,
    DelegateVotesChanged_address_uint256_uint256_Event.OutputTuple,
    DelegateVotesChanged_address_uint256_uint256_Event.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;
  getEvent(
    key: "Transfer(address,address,uint256)"
  ): TypedContractEvent<
    Transfer_address_address_uint256_Event.InputTuple,
    Transfer_address_address_uint256_Event.OutputTuple,
    Transfer_address_address_uint256_Event.OutputObject
  >;

  filters: {
    "Approval(address,address,uint256)": TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    "DelegateChanged(address,address,address)": TypedContractEvent<
      DelegateChangedEvent.InputTuple,
      DelegateChangedEvent.OutputTuple,
      DelegateChangedEvent.OutputObject
    >;
    DelegateChanged: TypedContractEvent<
      DelegateChangedEvent.InputTuple,
      DelegateChangedEvent.OutputTuple,
      DelegateChangedEvent.OutputObject
    >;

    "DelegateVotesChanged(address,uint256,uint256)": TypedContractEvent<
      DelegateVotesChangedEvent.InputTuple,
      DelegateVotesChangedEvent.OutputTuple,
      DelegateVotesChangedEvent.OutputObject
    >;
    DelegateVotesChanged: TypedContractEvent<
      DelegateVotesChangedEvent.InputTuple,
      DelegateVotesChangedEvent.OutputTuple,
      DelegateVotesChangedEvent.OutputObject
    >;

    "Transfer(address,address,uint256)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
  };
}
