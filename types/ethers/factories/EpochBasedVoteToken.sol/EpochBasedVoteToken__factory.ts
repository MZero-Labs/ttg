/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  EpochBasedVoteToken,
  EpochBasedVoteTokenInterface,
} from "../../EpochBasedVoteToken.sol/EpochBasedVoteToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadyDelegated",
    type: "error",
  },
  {
    inputs: [],
    name: "AmountExceedsUint240",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "MalleableSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentNonce",
        type: "uint256",
      },
    ],
    name: "ReusedNonce",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "SignatureExpired",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
    ],
    name: "SignerMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToSelf",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroDecreaseAllowance",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroIncreaseAllowance",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "fromDelegate",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toDelegate",
        type: "address",
      },
    ],
    name: "DelegateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "DelegateVotesChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "CLOCK_MODE",
    outputs: [
      {
        internalType: "string",
        name: "clockMode_",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "DELEGATION_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "domainSeparator_",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        internalType: "address",
        name: "spender_",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "allowance_",
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
        name: "spender_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "success_",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [],
    name: "clock",
    outputs: [
      {
        internalType: "uint48",
        name: "clock_",
        type: "uint48",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedAmount_",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "success_",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatee_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry_",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v_",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r_",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s_",
        type: "bytes32",
      },
    ],
    name: "delegateBySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "delegates",
    outputs: [
      {
        internalType: "address",
        name: "delegatee_",
        type: "address",
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
        name: "epoch_",
        type: "uint256",
      },
    ],
    name: "delegatesAt",
    outputs: [
      {
        internalType: "address",
        name: "delegatee_",
        type: "address",
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
        name: "epoch_",
        type: "uint256",
      },
    ],
    name: "getPastVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "votingPower_",
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
    ],
    name: "getVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "votingPower_",
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
        name: "spender_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedAmount_",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "success_",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
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
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "nonce_",
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
        name: "owner_",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline_",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v_",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r_",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s_",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "success_",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender_",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "success_",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c060405234801562000010575f80fd5b5060405162001efb38038062001efb8339810160408190526200003391620001ba565b8181847f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f5f620000648382620002c5565b6040516200007391906200038d565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160408051601f198184030181529190528051602090910120608052506002620000ea8382620002c5565b5060ff1660a052506200040792505050565b634e487b7160e01b5f52604160045260245ffd5b5f82601f83011262000120575f80fd5b81516001600160401b03808211156200013d576200013d620000fc565b604051601f8301601f19908116603f01168101908282118183101715620001685762000168620000fc565b8160405283815260209250868385880101111562000184575f80fd5b5f91505b83821015620001a7578582018301518183018401529082019062000188565b5f93810190920192909252949350505050565b5f805f60608486031215620001cd575f80fd5b83516001600160401b0380821115620001e4575f80fd5b620001f28783880162000110565b9450602086015191508082111562000208575f80fd5b50620002178682870162000110565b925050604084015160ff811681146200022e575f80fd5b809150509250925092565b600181811c908216806200024e57607f821691505b6020821081036200026d57634e487b7160e01b5f52602260045260245ffd5b50919050565b601f821115620002c0575f81815260208120601f850160051c810160208610156200029b5750805b601f850160051c820191505b81811015620002bc57828155600101620002a7565b5050505b505050565b81516001600160401b03811115620002e157620002e1620000fc565b620002f981620002f2845462000239565b8462000273565b602080601f8311600181146200032f575f8415620003175750858301515b5f19600386901b1c1916600185901b178555620002bc565b5f85815260208120601f198616915b828110156200035f578886015182559484019460019091019084016200033e565b50858210156200037d57878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b5f8083546200039c8162000239565b60018281168015620003b75760018114620003cd57620003fb565b60ff1984168752821515830287019450620003fb565b875f526020805f205f5b85811015620003f25781548a820152908401908201620003d7565b50505082870194505b50929695505050505050565b60805160a051611acb620004305f395f61024101525f818161026d0152610dd10152611acb5ff3fe608060405234801561000f575f80fd5b50600436106101a5575f3560e01c806370a08231116100e8578063a457c2d711610093578063c3cda5201161006e578063c3cda5201461041e578063d505accf14610431578063dd62ed3e14610444578063e7a324dc14610489575f80fd5b8063a457c2d7146103e5578063a9059cbb146103f8578063aaaaaa221461040b575f80fd5b806395d89b41116100c357806395d89b41146103b7578063981b24d0146103bf5780639ab24eb0146103d2575f80fd5b806370a08231146103505780637ecebe001461036357806391ddadf414610398575f80fd5b80633644e515116101535780634bf5d7e91161012e5780634bf5d7e9146102b75780634ee2cd7e146102f0578063587cde1e146103035780635c19a95c1461033b575f80fd5b80633644e5151461026b57806339509351146102915780633a46b1a8146102a4575f80fd5b806323b872dd1161018357806323b872dd1461020057806330adf81f14610213578063313ce5671461023a575f80fd5b806306fdde03146101a9578063095ea7b3146101c757806318160ddd146101ea575b5f80fd5b6101b16104b0565b6040516101be919061176f565b60405180910390f35b6101da6101d5366004611800565b61053f565b60405190151581526020016101be565b6101f2610554565b6040519081526020016101be565b6101da61020e366004611828565b610564565b6101f27f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b60405160ff7f00000000000000000000000000000000000000000000000000000000000000001681526020016101be565b7f00000000000000000000000000000000000000000000000000000000000000006101f2565b6101da61029f366004611800565b610585565b6101f26102b2366004611800565b610606565b60408051808201909152600a81527f6d6f64653d65706f63680000000000000000000000000000000000000000000060208201526101b1565b6101f26102fe366004611800565b61063b565b610316610311366004611861565b610669565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101be565b61034e610349366004611861565b610679565b005b6101f261035e366004611861565b610686565b6101f2610371366004611861565b73ffffffffffffffffffffffffffffffffffffffff165f9081526001602052604090205490565b6103a06106b3565b60405165ffffffffffff90911681526020016101be565b6101b16106bc565b6101f26103cd36600461187a565b6106cb565b6101f26103e0366004611861565b6106d7565b6101da6103f3366004611800565b610704565b6101da610406366004611800565b610710565b610316610419366004611800565b61071c565b61034e61042c3660046118a1565b610727565b61034e61043f3660046118f5565b6107f4565b6101f261045236600461195a565b73ffffffffffffffffffffffffffffffffffffffff9182165f90815260036020908152604080832093909416825291909152205490565b6101f27fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf81565b60605f80546104be9061198b565b80601f01602080910402602001604051908101604052809291908181526020018280546104ea9061198b565b80156105355780601f1061050c57610100808354040283529160200191610535565b820191905f5260205f20905b81548152906001019060200180831161051857829003601f168201915b5050505050905090565b5f61054b338484610901565b50600192915050565b5f61055f600461096e565b905090565b5f6105708433846109e9565b61057b848484610a77565b5060019392505050565b5f815f036105bf576040517f817e74f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b335f81815260036020908152604080832073ffffffffffffffffffffffffffffffffffffffff8816845290915290205461054b91908590610601908690611a03565b610901565b73ffffffffffffffffffffffffffffffffffffffff82165f9081526007602052604081206106349083610b90565b9392505050565b73ffffffffffffffffffffffffffffffffffffffff82165f9081526005602052604081206106349083610b90565b5f61067382610c10565b92915050565b6106833382610c47565b50565b73ffffffffffffffffffffffffffffffffffffffff81165f9081526005602052604081206106739061096e565b5f61055f610cb6565b6060600280546104be9061198b565b5f610673600483610b90565b73ffffffffffffffffffffffffffffffffffffffff81165f9081526007602052604081206106739061096e565b5f61054b3384846109e9565b5f61054b338484610a77565b5f6106348383610cdc565b5f610733878787610d14565b90505f6107438287878787610e20565b73ffffffffffffffffffffffffffffffffffffffff81165f908152600160205260409020549091508088036107b3576040517f56d8d10600000000000000000000000000000000000000000000000000000000815260048101899052602481018290526044015b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff82165f90815260016020819052604090912090820190556107e9828a610c47565b505050505050505050565b73ffffffffffffffffffffffffffffffffffffffff87165f9081526001602052604081205490610827898989858a610fad565b90505f6108378288888888610e20565b90508073ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff16146108be576040517fefe0e68600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff808c166004830152821660248201526044016107aa565b73ffffffffffffffffffffffffffffffffffffffff8a165f90815260016020819052604090912090840190556108f58a8a8a610901565b50505050505050505050565b73ffffffffffffffffffffffffffffffffffffffff8381165f8181526003602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b80545f9080156109c05761099483610987600184611a16565b5f91825260209091200190565b546201000090047dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff166109c2565b5f5b7dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff169392505050565b805f03610a22576040517f28bd1f0200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8084165f9081526003602090815260408083209386168352929052205460018101610a625750505050565b610a7184846106018585611a16565b50505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610adc576040517fbf2f44f500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610b3b91815260200190565b60405180910390a3610b508361102b83611036565b610b65610b5c84610c10565b61102b83611065565b5050610b74826110f583611036565b610b89610b8083610c10565b6110f583611065565b5050505050565b81545f90808203610ba4575f915050610673565b5f610bc285610bb284611a29565b9350835f91825260209091200190565b805490915061ffff168410610c0157546201000090047dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1691506106739050565b505f8111610ba4575092915050565b73ffffffffffffffffffffffffffffffffffffffff81165f90815260066020526040812061067390610c4190611100565b83611143565b5f610c52838361116c565b73ffffffffffffffffffffffffffffffffffffffff84165f90815260056020526040812091925090610c839061096e565b9050805f03610c925750505050565b610c9f8261102b83611065565b5050610cae836110f583611065565b505050505050565b5f610cc5600c6213c680611a5d565b610cd262ed14f143611a16565b61055f9190611a5d565b73ffffffffffffffffffffffffffffffffffffffff82165f90815260066020526040812061063490610d0e90846114a2565b84611143565b604080517fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf602082015273ffffffffffffffffffffffffffffffffffffffff85169181019190915260608101839052608081018290525f90610e189060a0015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081840301815282825280516020918201207f1901000000000000000000000000000000000000000000000000000000000000848301527f00000000000000000000000000000000000000000000000000000000000000006022850152604280850191909152825180850390910181526062909301909152815191012090565b949350505050565b5f84421115610e64576040517ff88f0490000000000000000000000000000000000000000000000000000000008152600481018690524260248201526044016107aa565b7f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0821180610ea557508360ff16601b14158015610ea557508360ff16601c14155b15610edc576040517ff0ad0d0900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b604080515f81526020810180835288905260ff861691810191909152606081018490526080810183905260019060a0016020604051602081039080840390855afa158015610f2c573d5f803e3d5ffd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff8116610fa4576040517f8baa579f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b95945050505050565b604080517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9602082015273ffffffffffffffffffffffffffffffffffffffff8088169282019290925290851660608201526080810184905260a0810183905260c081018290525f906110219060e001610d74565b9695505050505050565b5f6106348284611a16565b73ffffffffffffffffffffffffffffffffffffffff83165f908152600560205260409020610b89908383611508565b73ffffffffffffffffffffffffffffffffffffffff83165f9081526007602052604081208190611096908585611508565b604080518381526020810183905292945090925073ffffffffffffffffffffffffffffffffffffffff8716917fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724910160405180910390a2935093915050565b5f6106348284611a03565b80545f90801561113b5761111983610987600184611a16565b5462010000900473ffffffffffffffffffffffffffffffffffffffff16610634565b5f9392505050565b5f73ffffffffffffffffffffffffffffffffffffffff8316156111665782610634565b50919050565b5f6111778284611143565b91505f6111848385611735565b90505f61118f610cb6565b73ffffffffffffffffffffffffffffffffffffffff86165f908152600660205260408120805492935091908190036112ad578673ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1603611226576040517fd186046800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506040805180820190915261ffff928316815273ffffffffffffffffffffffffffffffffffffffff938416602080830191825283546001810185555f94855293209151919092018054925190941662010000027fffffffffffffffffffff000000000000000000000000000000000000000000009092169216919091171790555081610673565b5f6112bd83610987600185611a16565b80549091506112e89062010000900473ffffffffffffffffffffffffffffffffffffffff1689611143565b95508673ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff160361134f576040517fd186046800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8673ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff167f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f60405160405180910390a4805461ffff16841115611453576040805180820190915261ffff808616825273ffffffffffffffffffffffffffffffffffffffff808816602080850191825287546001810189555f89815291909120945194018054915190921662010000027fffffffffffffffffffff000000000000000000000000000000000000000000009091169390921692909217179055611497565b80547fffffffffffffffffffff0000000000000000000000000000000000000000ffff166201000073ffffffffffffffffffffffffffffffffffffffff8716021781555b505050505092915050565b81545f908082036114b6575f915050610673565b5f6114c485610bb284611a29565b805490915061ffff1684106114f9575462010000900473ffffffffffffffffffffffffffffffffffffffff1691506106739050565b505f81116114b6575092915050565b5f805f611513610cb6565b86549091505f8190036115e2577dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff851115611578576040517fb5b0cde400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506040805180820190915261ffff91821681527dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80861660208084019182528954600181018b555f8b81529182209451925190931662010000029190941617910155915082905061172d565b5f6115f288610987600185611a16565b80546201000090047dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff169550905061162c858763ffffffff8a16565b93507dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff841115611686576040517fb5b0cde400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805461ffff168311156116f9576040805180820190915261ffff80851682527dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80871660208085019182528c54600181018e555f8e815291909120945191519092166201000002921691909117910155611729565b805461ffff16620100007dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8616021781555b5050505b935093915050565b5f8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161461113b5782610634565b5f6020808352835180828501525f5b8181101561179a5785810183015185820160400152820161177e565b505f6040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b803573ffffffffffffffffffffffffffffffffffffffff811681146117fb575f80fd5b919050565b5f8060408385031215611811575f80fd5b61181a836117d8565b946020939093013593505050565b5f805f6060848603121561183a575f80fd5b611843846117d8565b9250611851602085016117d8565b9150604084013590509250925092565b5f60208284031215611871575f80fd5b610634826117d8565b5f6020828403121561188a575f80fd5b5035919050565b803560ff811681146117fb575f80fd5b5f805f805f8060c087890312156118b6575f80fd5b6118bf876117d8565b955060208701359450604087013593506118db60608801611891565b92506080870135915060a087013590509295509295509295565b5f805f805f805f60e0888a03121561190b575f80fd5b611914886117d8565b9650611922602089016117d8565b9550604088013594506060880135935061193e60808901611891565b925060a0880135915060c0880135905092959891949750929550565b5f806040838503121561196b575f80fd5b611974836117d8565b9150611982602084016117d8565b90509250929050565b600181811c9082168061199f57607f821691505b602082108103611166577f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b80820180821115610673576106736119d6565b81810381811115610673576106736119d6565b5f81611a3757611a376119d6565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190565b5f82611a90577f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b50049056fea2646970667358221220ece6500541d8aeff3e5530395858985e48287e58605ca48569f4c8867985732364736f6c63430008140033";

type EpochBasedVoteTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EpochBasedVoteTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EpochBasedVoteToken__factory extends ContractFactory {
  constructor(...args: EpochBasedVoteTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<EpochBasedVoteToken> {
    return super.deploy(
      name_,
      symbol_,
      decimals_,
      overrides || {}
    ) as Promise<EpochBasedVoteToken>;
  }
  override getDeployTransaction(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      decimals_,
      overrides || {}
    );
  }
  override attach(address: string): EpochBasedVoteToken {
    return super.attach(address) as EpochBasedVoteToken;
  }
  override connect(signer: Signer): EpochBasedVoteToken__factory {
    return super.connect(signer) as EpochBasedVoteToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EpochBasedVoteTokenInterface {
    return new utils.Interface(_abi) as EpochBasedVoteTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EpochBasedVoteToken {
    return new Contract(address, _abi, signerOrProvider) as EpochBasedVoteToken;
  }
}
