/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  MockBootstrapTokenAbi,
  MockBootstrapTokenAbiInterface,
} from "../../Mocks.sol/MockBootstrapTokenAbi";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "epoch_",
        type: "uint256",
      },
    ],
    name: "balanceOfAt",
    outputs: [
      {
        internalType: "uint256",
        name: "balance_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance_",
        type: "uint256",
      },
    ],
    name: "setBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "totalSupply_",
        type: "uint256",
      },
    ],
    name: "setTotalSupply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "epoch_",
        type: "uint256",
      },
    ],
    name: "totalSupplyAt",
    outputs: [
      {
        internalType: "uint256",
        name: "totalSupply_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class MockBootstrapTokenAbi__factory {
  static readonly abi = _abi;
  static createInterface(): MockBootstrapTokenAbiInterface {
    return new Interface(_abi) as MockBootstrapTokenAbiInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MockBootstrapTokenAbi {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as MockBootstrapTokenAbi;
  }
}
