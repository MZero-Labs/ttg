/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MockPowerToken,
  MockPowerTokenInterface,
} from "../../Mocks.sol/MockPowerToken";

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
        name: "timepoint_",
        type: "uint256",
      },
    ],
    name: "getPastVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "votePower_",
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
        name: "delegatee_",
        type: "address",
      },
    ],
    name: "markParticipation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "totalSupplyAt_",
        type: "uint256",
      },
    ],
    name: "setTotalSupplyAt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "votePower_",
        type: "uint256",
      },
    ],
    name: "setVotePower",
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

const _bytecode =
  "0x608060405234801561000f575f80fd5b506101998061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610064575f3560e01c8063981b24d01161004d578063981b24d0146100a3578063c580b269146100b8578063ea86e118146100c9575f80fd5b8063093ed490146100685780633a46b1a81461007c575b5f80fd5b61007a6100763660046100dc565b5f55565b005b61009161008a36600461011b565b50505f5490565b60405190815260200160405180910390f35b6100916100b13660046100dc565b5060015490565b61007a6100c6366004610143565b50565b61007a6100d73660046100dc565b600155565b5f602082840312156100ec575f80fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610116575f80fd5b919050565b5f806040838503121561012c575f80fd5b610135836100f3565b946020939093013593505050565b5f60208284031215610153575f80fd5b61015c826100f3565b939250505056fea2646970667358221220a3ffbee3e9a73a0d797b8254fe853fe1c19a72043a89dcaf407636d04966208264736f6c63430008140033";

type MockPowerTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockPowerTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockPowerToken__factory extends ContractFactory {
  constructor(...args: MockPowerTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string }
  ): Promise<MockPowerToken> {
    return super.deploy(overrides || {}) as Promise<MockPowerToken>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockPowerToken {
    return super.attach(address) as MockPowerToken;
  }
  override connect(signer: Signer): MockPowerToken__factory {
    return super.connect(signer) as MockPowerToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockPowerTokenInterface {
    return new utils.Interface(_abi) as MockPowerTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockPowerToken {
    return new Contract(address, _abi, signerOrProvider) as MockPowerToken;
  }
}
