/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  RegistrarAbi,
  RegistrarAbiInterface,
} from "../../Registrar.sol/RegistrarAbi";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "governorDeployer_",
        type: "address",
      },
      {
        internalType: "address",
        name: "powerTokenDeployer_",
        type: "address",
      },
      {
        internalType: "address",
        name: "bootstrapToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "cashToken_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "CallerIsNotGovernor",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "list",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressAddedToList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "list",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressRemovedFromList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "value",
        type: "bytes32",
      },
    ],
    name: "ConfigUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "ResetExecuted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "list_",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "addToList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key_",
        type: "bytes32",
      },
    ],
    name: "get",
    outputs: [
      {
        internalType: "bytes32",
        name: "value_",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "keys_",
        type: "bytes32[]",
      },
    ],
    name: "get",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "values_",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "governor",
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
    name: "governorDeployer",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "list_",
        type: "bytes32",
      },
      {
        internalType: "address[]",
        name: "accounts_",
        type: "address[]",
      },
    ],
    name: "listContains",
    outputs: [
      {
        internalType: "bool",
        name: "contains_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "list_",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "listContains",
    outputs: [
      {
        internalType: "bool",
        name: "contains_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "powerTokenDeployer",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "list_",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "removeFromList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key_",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "value_",
        type: "bytes32",
      },
    ],
    name: "updateConfig",
    outputs: [],
    stateMutability: "nonpayable",
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

export class RegistrarAbi__factory {
  static readonly abi = _abi;
  static createInterface(): RegistrarAbiInterface {
    return new Interface(_abi) as RegistrarAbiInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): RegistrarAbi {
    return new Contract(address, _abi, runner) as unknown as RegistrarAbi;
  }
}