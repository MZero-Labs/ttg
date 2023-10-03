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

export interface MockDualGovernorDeployerAbiInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "deploy"
      | "deploy(address,address,uint256,uint256,uint256,uint256,uint16,uint16)"
      | "setNextDeploy"
      | "setNextDeploy(address)"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deploy",
    values: [
      AddressLike,
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deploy(address,address,uint256,uint256,uint256,uint256,uint16,uint16)",
    values: [
      AddressLike,
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setNextDeploy",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setNextDeploy(address)",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "deploy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deploy(address,address,uint256,uint256,uint256,uint256,uint16,uint16)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setNextDeploy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setNextDeploy(address)",
    data: BytesLike
  ): Result;
}

export interface MockDualGovernorDeployerAbi extends BaseContract {
  connect(runner?: ContractRunner | null): MockDualGovernorDeployerAbi;
  waitForDeployment(): Promise<this>;

  interface: MockDualGovernorDeployerAbiInterface;

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
      cashToken_: AddressLike,
      powerToken_: AddressLike,
      proposalFee_: BigNumberish,
      minProposalFee_: BigNumberish,
      maxProposalFee_: BigNumberish,
      reward_: BigNumberish,
      zeroTokenQuorumRatio_: BigNumberish,
      powerTokenQuorumRatio_: BigNumberish
    ],
    [string],
    "view"
  >;

  "deploy(address,address,uint256,uint256,uint256,uint256,uint16,uint16)": TypedContractMethod<
    [
      cashToken_: AddressLike,
      powerToken_: AddressLike,
      proposalFee_: BigNumberish,
      minProposalFee_: BigNumberish,
      maxProposalFee_: BigNumberish,
      reward_: BigNumberish,
      zeroTokenQuorumRatio_: BigNumberish,
      powerTokenQuorumRatio_: BigNumberish
    ],
    [string],
    "view"
  >;

  setNextDeploy: TypedContractMethod<
    [nextDeploy_: AddressLike],
    [void],
    "nonpayable"
  >;

  "setNextDeploy(address)": TypedContractMethod<
    [nextDeploy_: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "deploy"
  ): TypedContractMethod<
    [
      cashToken_: AddressLike,
      powerToken_: AddressLike,
      proposalFee_: BigNumberish,
      minProposalFee_: BigNumberish,
      maxProposalFee_: BigNumberish,
      reward_: BigNumberish,
      zeroTokenQuorumRatio_: BigNumberish,
      powerTokenQuorumRatio_: BigNumberish
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "deploy(address,address,uint256,uint256,uint256,uint256,uint16,uint16)"
  ): TypedContractMethod<
    [
      cashToken_: AddressLike,
      powerToken_: AddressLike,
      proposalFee_: BigNumberish,
      minProposalFee_: BigNumberish,
      maxProposalFee_: BigNumberish,
      reward_: BigNumberish,
      zeroTokenQuorumRatio_: BigNumberish,
      powerTokenQuorumRatio_: BigNumberish
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "setNextDeploy"
  ): TypedContractMethod<[nextDeploy_: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setNextDeploy(address)"
  ): TypedContractMethod<[nextDeploy_: AddressLike], [void], "nonpayable">;

  filters: {};
}
