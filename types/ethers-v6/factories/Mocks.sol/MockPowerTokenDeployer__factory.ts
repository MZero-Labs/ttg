/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  MockPowerTokenDeployer,
  MockPowerTokenDeployerInterface,
} from "../../Mocks.sol/MockPowerTokenDeployer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "governor_",
        type: "address",
      },
      {
        internalType: "address",
        name: "cashToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "bootstrapToken_",
        type: "address",
      },
    ],
    name: "deploy",
    outputs: [
      {
        internalType: "address",
        name: "deployed_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNextDeploy",
    outputs: [
      {
        internalType: "address",
        name: "nextDeploy_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561000f575f80fd5b506101088061001d5f395ff3fe6080604052348015600e575f80fd5b50600436106030575f3560e01c8063a852d90b146034578063d9181cd314605f575b5f80fd5b5f5b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b6036606a3660046099565b5f9392505050565b803573ffffffffffffffffffffffffffffffffffffffff811681146094575f80fd5b919050565b5f805f6060848603121560aa575f80fd5b60b1846072565b925060bd602085016072565b915060c9604085016072565b9050925092509256fea2646970667358221220fea6cc497a88241d05a4b107fdf0457e4808bda39c2b23f01e370339834d95be64736f6c63430008140033";

type MockPowerTokenDeployerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockPowerTokenDeployerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockPowerTokenDeployer__factory extends ContractFactory {
  constructor(...args: MockPowerTokenDeployerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      MockPowerTokenDeployer & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): MockPowerTokenDeployer__factory {
    return super.connect(runner) as MockPowerTokenDeployer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockPowerTokenDeployerInterface {
    return new Interface(_abi) as MockPowerTokenDeployerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MockPowerTokenDeployer {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as MockPowerTokenDeployer;
  }
}
