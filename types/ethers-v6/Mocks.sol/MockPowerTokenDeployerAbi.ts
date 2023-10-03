/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
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

export interface MockPowerTokenDeployerAbiInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "deploy"
      | "deploy(address,address,address)"
      | "getNextDeploy"
      | "getNextDeploy()"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deploy",
    values: [AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "deploy(address,address,address)",
    values: [AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getNextDeploy",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNextDeploy()",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "deploy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deploy(address,address,address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNextDeploy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNextDeploy()",
    data: BytesLike
  ): Result;
}

export interface MockPowerTokenDeployerAbi extends BaseContract {
  connect(runner?: ContractRunner | null): MockPowerTokenDeployerAbi;
  waitForDeployment(): Promise<this>;

  interface: MockPowerTokenDeployerAbiInterface;

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

  deploy: TypedContractMethod<
    [
      governor_: AddressLike,
      cashToken_: AddressLike,
      bootstrapToken_: AddressLike
    ],
    [string],
    "view"
  >;

  "deploy(address,address,address)": TypedContractMethod<
    [
      governor_: AddressLike,
      cashToken_: AddressLike,
      bootstrapToken_: AddressLike
    ],
    [string],
    "view"
  >;

  getNextDeploy: TypedContractMethod<[], [string], "view">;

  "getNextDeploy()": TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "deploy"
  ): TypedContractMethod<
    [
      governor_: AddressLike,
      cashToken_: AddressLike,
      bootstrapToken_: AddressLike
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "deploy(address,address,address)"
  ): TypedContractMethod<
    [
      governor_: AddressLike,
      cashToken_: AddressLike,
      bootstrapToken_: AddressLike
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getNextDeploy"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getNextDeploy()"
  ): TypedContractMethod<[], [string], "view">;

  filters: {};
}
