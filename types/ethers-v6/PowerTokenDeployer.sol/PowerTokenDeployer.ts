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

export interface PowerTokenDeployerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "deploy"
      | "deploy(address,address,address)"
      | "getNextDeploy"
      | "getNextDeploy()"
      | "nonce"
      | "nonce()"
      | "registrar"
      | "registrar()"
      | "treasury"
      | "treasury()"
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
  encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonce()", values?: undefined): string;
  encodeFunctionData(functionFragment: "registrar", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registrar()",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "treasury()",
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
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonce()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registrar", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registrar()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "treasury()", data: BytesLike): Result;
}

export interface PowerTokenDeployer extends BaseContract {
  connect(runner?: ContractRunner | null): PowerTokenDeployer;
  waitForDeployment(): Promise<this>;

  interface: PowerTokenDeployerInterface;

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
    "nonpayable"
  >;

  "deploy(address,address,address)": TypedContractMethod<
    [
      governor_: AddressLike,
      cashToken_: AddressLike,
      bootstrapToken_: AddressLike
    ],
    [string],
    "nonpayable"
  >;

  getNextDeploy: TypedContractMethod<[], [string], "view">;

  "getNextDeploy()": TypedContractMethod<[], [string], "view">;

  nonce: TypedContractMethod<[], [bigint], "view">;

  "nonce()": TypedContractMethod<[], [bigint], "view">;

  registrar: TypedContractMethod<[], [string], "view">;

  "registrar()": TypedContractMethod<[], [string], "view">;

  treasury: TypedContractMethod<[], [string], "view">;

  "treasury()": TypedContractMethod<[], [string], "view">;

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
    "nonpayable"
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
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getNextDeploy"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getNextDeploy()"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "nonce"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "nonce()"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "registrar"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "registrar()"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "treasury"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "treasury()"
  ): TypedContractMethod<[], [string], "view">;

  filters: {};
}
