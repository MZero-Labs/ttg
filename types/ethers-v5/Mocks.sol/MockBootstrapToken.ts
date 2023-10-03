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

export interface MockBootstrapTokenInterface extends utils.Interface {
  functions: {
    "balanceOfAt(address,uint256)": FunctionFragment;
    "setBalance(address,uint256)": FunctionFragment;
    "setTotalSupply(uint256)": FunctionFragment;
    "totalSupplyAt(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "balanceOfAt"
      | "balanceOfAt(address,uint256)"
      | "setBalance"
      | "setBalance(address,uint256)"
      | "setTotalSupply"
      | "setTotalSupply(uint256)"
      | "totalSupplyAt"
      | "totalSupplyAt(uint256)"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "balanceOfAt",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfAt(address,uint256)",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setBalance",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setBalance(address,uint256)",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setTotalSupply",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setTotalSupply(uint256)",
    values: [BigNumberish]
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
  decodeFunctionResult(functionFragment: "setBalance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setBalance(address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTotalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTotalSupply(uint256)",
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

  events: {};
}

export interface MockBootstrapToken extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MockBootstrapTokenInterface;

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
    balanceOfAt(
      account_: string,
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { balance_: BigNumber }>;

    "balanceOfAt(address,uint256)"(
      account_: string,
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { balance_: BigNumber }>;

    setBalance(
      account_: string,
      balance_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    "setBalance(address,uint256)"(
      account_: string,
      balance_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setTotalSupply(
      totalSupply_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    "setTotalSupply(uint256)"(
      totalSupply_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    totalSupplyAt(
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { totalSupply_: BigNumber }>;

    "totalSupplyAt(uint256)"(
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { totalSupply_: BigNumber }>;
  };

  balanceOfAt(
    account_: string,
    epoch_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "balanceOfAt(address,uint256)"(
    account_: string,
    epoch_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setBalance(
    account_: string,
    balance_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  "setBalance(address,uint256)"(
    account_: string,
    balance_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setTotalSupply(
    totalSupply_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  "setTotalSupply(uint256)"(
    totalSupply_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  totalSupplyAt(
    epoch_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "totalSupplyAt(uint256)"(
    epoch_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    balanceOfAt(
      account_: string,
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "balanceOfAt(address,uint256)"(
      account_: string,
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setBalance(
      account_: string,
      balance_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setBalance(address,uint256)"(
      account_: string,
      balance_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setTotalSupply(
      totalSupply_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setTotalSupply(uint256)"(
      totalSupply_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    totalSupplyAt(
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "totalSupplyAt(uint256)"(
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    balanceOfAt(
      account_: string,
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "balanceOfAt(address,uint256)"(
      account_: string,
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setBalance(
      account_: string,
      balance_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    "setBalance(address,uint256)"(
      account_: string,
      balance_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setTotalSupply(
      totalSupply_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    "setTotalSupply(uint256)"(
      totalSupply_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    totalSupplyAt(
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "totalSupplyAt(uint256)"(
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    balanceOfAt(
      account_: string,
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "balanceOfAt(address,uint256)"(
      account_: string,
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setBalance(
      account_: string,
      balance_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    "setBalance(address,uint256)"(
      account_: string,
      balance_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setTotalSupply(
      totalSupply_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    "setTotalSupply(uint256)"(
      totalSupply_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    totalSupplyAt(
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "totalSupplyAt(uint256)"(
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}