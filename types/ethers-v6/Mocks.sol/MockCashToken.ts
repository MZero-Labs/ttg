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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface MockCashTokenInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "setTransferFromSuccess"
      | "setTransferFromSuccess(bool)"
      | "transferFrom"
      | "transferFrom(address,address,uint256)"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "setTransferFromSuccess",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setTransferFromSuccess(bool)",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom(address,address,uint256)",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "setTransferFromSuccess",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTransferFromSuccess(bool)",
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

export interface MockCashToken extends BaseContract {
  connect(runner?: ContractRunner | null): MockCashToken;
  waitForDeployment(): Promise<this>;

  interface: MockCashTokenInterface;

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

  setTransferFromSuccess: TypedContractMethod<
    [transferFromSuccess_: boolean],
    [void],
    "nonpayable"
  >;

  "setTransferFromSuccess(bool)": TypedContractMethod<
    [transferFromSuccess_: boolean],
    [void],
    "nonpayable"
  >;

  transferFrom: TypedContractMethod<
    [sender_: AddressLike, recipient_: AddressLike, amount_: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  "transferFrom(address,address,uint256)": TypedContractMethod<
    [sender_: AddressLike, recipient_: AddressLike, amount_: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "setTransferFromSuccess"
  ): TypedContractMethod<[transferFromSuccess_: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setTransferFromSuccess(bool)"
  ): TypedContractMethod<[transferFromSuccess_: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [sender_: AddressLike, recipient_: AddressLike, amount_: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferFrom(address,address,uint256)"
  ): TypedContractMethod<
    [sender_: AddressLike, recipient_: AddressLike, amount_: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  filters: {};
}
