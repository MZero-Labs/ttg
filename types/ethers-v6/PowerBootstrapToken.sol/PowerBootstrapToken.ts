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

export interface PowerBootstrapTokenInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "balanceOfAt"
      | "balanceOfAt(address,uint256)"
      | "totalSupplyAt"
      | "totalSupplyAt(uint256)"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "balanceOfAt",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfAt(address,uint256)",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupplyAt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupplyAt(uint256)",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "balanceOfAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfAt(address,uint256)",
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
}

export interface PowerBootstrapToken extends BaseContract {
  connect(runner?: ContractRunner | null): PowerBootstrapToken;
  waitForDeployment(): Promise<this>;

  interface: PowerBootstrapTokenInterface;

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

  balanceOfAt: TypedContractMethod<
    [account_: AddressLike, epoch_: BigNumberish],
    [bigint],
    "view"
  >;

  "balanceOfAt(address,uint256)": TypedContractMethod<
    [account_: AddressLike, epoch_: BigNumberish],
    [bigint],
    "view"
  >;

  totalSupplyAt: TypedContractMethod<[epoch_: BigNumberish], [bigint], "view">;

  "totalSupplyAt(uint256)": TypedContractMethod<
    [epoch_: BigNumberish],
    [bigint],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "balanceOfAt"
  ): TypedContractMethod<
    [account_: AddressLike, epoch_: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "balanceOfAt(address,uint256)"
  ): TypedContractMethod<
    [account_: AddressLike, epoch_: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "totalSupplyAt"
  ): TypedContractMethod<[epoch_: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalSupplyAt(uint256)"
  ): TypedContractMethod<[epoch_: BigNumberish], [bigint], "view">;

  filters: {};
}
