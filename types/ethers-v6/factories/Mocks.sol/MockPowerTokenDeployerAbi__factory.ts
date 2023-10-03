/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  MockPowerTokenDeployerAbi,
  MockPowerTokenDeployerAbiInterface,
} from "../../Mocks.sol/MockPowerTokenDeployerAbi";

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

export class MockPowerTokenDeployerAbi__factory {
  static readonly abi = _abi;
  static createInterface(): MockPowerTokenDeployerAbiInterface {
    return new Interface(_abi) as MockPowerTokenDeployerAbiInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MockPowerTokenDeployerAbi {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as MockPowerTokenDeployerAbi;
  }
}
