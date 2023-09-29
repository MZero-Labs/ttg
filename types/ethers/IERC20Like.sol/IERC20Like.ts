/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export interface IERC20LikeInterface extends utils.Interface {
  functions: {
    "approve(address,uint256)": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "approve"
      | "approve(address,uint256)"
      | "transfer"
      | "transfer(address,uint256)"
      | "transferFrom"
      | "transferFrom(address,address,uint256)"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "approve(address,uint256)",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer(address,uint256)",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom(address,address,uint256)",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "approve(address,uint256)",
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

  events: {};
}

export interface IERC20Like extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IERC20LikeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    approve(
      spender_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    "approve(address,uint256)"(
      spender_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    transfer(
      recipient_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    "transfer(address,uint256)"(
      recipient_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    transferFrom(
      owner_: string,
      recipient_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    "transferFrom(address,address,uint256)"(
      owner_: string,
      recipient_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  approve(
    spender_: string,
    amount_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  "approve(address,uint256)"(
    spender_: string,
    amount_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  transfer(
    recipient_: string,
    amount_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  "transfer(address,uint256)"(
    recipient_: string,
    amount_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  transferFrom(
    owner_: string,
    recipient_: string,
    amount_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  "transferFrom(address,address,uint256)"(
    owner_: string,
    recipient_: string,
    amount_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    approve(
      spender_: string,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "approve(address,uint256)"(
      spender_: string,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transfer(
      recipient_: string,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "transfer(address,uint256)"(
      recipient_: string,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      owner_: string,
      recipient_: string,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "transferFrom(address,address,uint256)"(
      owner_: string,
      recipient_: string,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    approve(
      spender_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    "approve(address,uint256)"(
      spender_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    transfer(
      recipient_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    "transfer(address,uint256)"(
      recipient_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    transferFrom(
      owner_: string,
      recipient_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    "transferFrom(address,address,uint256)"(
      owner_: string,
      recipient_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approve(
      spender_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    "approve(address,uint256)"(
      spender_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    transfer(
      recipient_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    "transfer(address,uint256)"(
      recipient_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      owner_: string,
      recipient_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    "transferFrom(address,address,uint256)"(
      owner_: string,
      recipient_: string,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}