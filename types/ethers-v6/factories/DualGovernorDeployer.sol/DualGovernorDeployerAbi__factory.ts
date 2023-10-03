/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  DualGovernorDeployerAbi,
  DualGovernorDeployerAbiInterface,
} from "../../DualGovernorDeployer.sol/DualGovernorDeployerAbi";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "registrar_",
        type: "address",
      },
      {
        internalType: "address",
        name: "zeroToken_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "CallerIsNotRegistrar",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cashToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "powerToken_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "proposalFee_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minProposalFee_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxProposalFee_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reward_",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "powerTokenQuorumRatio_",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "zeroTokenQuorumRatio_",
        type: "uint16",
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
    stateMutability: "nonpayable",
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
  {
    inputs: [],
    name: "nonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registrar",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "zeroToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class DualGovernorDeployerAbi__factory {
  static readonly abi = _abi;
  static createInterface(): DualGovernorDeployerAbiInterface {
    return new Interface(_abi) as DualGovernorDeployerAbiInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): DualGovernorDeployerAbi {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as DualGovernorDeployerAbi;
  }
}