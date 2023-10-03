/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  EpochBasedVoteTokenHarness,
  EpochBasedVoteTokenHarnessInterface,
} from "../../EpochBasedVoteTokenHarness.sol/EpochBasedVoteTokenHarness";

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
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
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
  "0x60c060405234801562000010575f80fd5b5060405162001f9f38038062001f9f8339810160408190526200003391620001c0565b8282828181847f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f5f620000678382620002cb565b60405162000076919062000393565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160408051601f198184030181529190528051602090910120608052506002620000ed8382620002cb565b5060ff1660a052506200040d95505050505050565b634e487b7160e01b5f52604160045260245ffd5b5f82601f83011262000126575f80fd5b81516001600160401b038082111562000143576200014362000102565b604051601f8301601f19908116603f011681019082821181831017156200016e576200016e62000102565b816040528381526020925086838588010111156200018a575f80fd5b5f91505b83821015620001ad57858201830151818301840152908201906200018e565b5f93810190920192909252949350505050565b5f805f60608486031215620001d3575f80fd5b83516001600160401b0380821115620001ea575f80fd5b620001f88783880162000116565b945060208601519150808211156200020e575f80fd5b506200021d8682870162000116565b925050604084015160ff8116811462000234575f80fd5b809150509250925092565b600181811c908216806200025457607f821691505b6020821081036200027357634e487b7160e01b5f52602260045260245ffd5b50919050565b601f821115620002c6575f81815260208120601f850160051c81016020861015620002a15750805b601f850160051c820191505b81811015620002c257828155600101620002ad565b5050505b505050565b81516001600160401b03811115620002e757620002e762000102565b620002ff81620002f884546200023f565b8462000279565b602080601f83116001811462000335575f84156200031d5750858301515b5f19600386901b1c1916600185901b178555620002c2565b5f85815260208120601f198616915b82811015620003655788860151825594840194600190910190840162000344565b50858210156200038357878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b5f808354620003a2816200023f565b60018281168015620003bd5760018114620003d35762000401565b60ff198416875282151583028701945062000401565b875f526020805f205f5b85811015620003f85781548a820152908401908201620003dd565b50505082870194505b50929695505050505050565b60805160a051611b69620004365f395f61024c01525f81816102780152610e6f0152611b695ff3fe608060405234801561000f575f80fd5b50600436106101b0575f3560e01c80635c19a95c116100f3578063a457c2d711610093578063c3cda5201161006e578063c3cda5201461043c578063d505accf1461044f578063dd62ed3e14610462578063e7a324dc146104a7575f80fd5b8063a457c2d714610403578063a9059cbb14610416578063aaaaaa2214610429575f80fd5b806391ddadf4116100ce57806391ddadf4146103b657806395d89b41146103d5578063981b24d0146103dd5780639ab24eb0146103f0575f80fd5b80635c19a95c1461035b57806370a082311461036e5780637ecebe0014610381575f80fd5b80633644e5151161015e57806340c10f191161013957806340c10f19146102c25780634bf5d7e9146102d75780634ee2cd7e14610310578063587cde1e14610323575f80fd5b80633644e51514610276578063395093511461029c5780633a46b1a8146102af575f80fd5b806323b872dd1161018e57806323b872dd1461020b57806330adf81f1461021e578063313ce56714610245575f80fd5b806306fdde03146101b4578063095ea7b3146101d257806318160ddd146101f5575b5f80fd5b6101bc6104ce565b6040516101c9919061180d565b60405180910390f35b6101e56101e036600461189e565b61055d565b60405190151581526020016101c9565b6101fd610572565b6040519081526020016101c9565b6101e56102193660046118c6565b610582565b6101fd7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b60405160ff7f00000000000000000000000000000000000000000000000000000000000000001681526020016101c9565b7f00000000000000000000000000000000000000000000000000000000000000006101fd565b6101e56102aa36600461189e565b6105a3565b6101fd6102bd36600461189e565b610624565b6102d56102d036600461189e565b610659565b005b60408051808201909152600a81527f6d6f64653d65706f63680000000000000000000000000000000000000000000060208201526101bc565b6101fd61031e36600461189e565b610667565b6103366103313660046118ff565b610695565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101c9565b6102d56103693660046118ff565b6106a5565b6101fd61037c3660046118ff565b6106b2565b6101fd61038f3660046118ff565b73ffffffffffffffffffffffffffffffffffffffff165f9081526001602052604090205490565b6103be6106df565b60405165ffffffffffff90911681526020016101c9565b6101bc6106e8565b6101fd6103eb366004611918565b6106f7565b6101fd6103fe3660046118ff565b610703565b6101e561041136600461189e565b610730565b6101e561042436600461189e565b61073c565b61033661043736600461189e565b610748565b6102d561044a36600461193f565b610753565b6102d561045d366004611993565b610820565b6101fd6104703660046119f8565b73ffffffffffffffffffffffffffffffffffffffff9182165f90815260036020908152604080832093909416825291909152205490565b6101fd7fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf81565b60605f80546104dc90611a29565b80601f016020809104026020016040519081016040528092919081815260200182805461050890611a29565b80156105535780601f1061052a57610100808354040283529160200191610553565b820191905f5260205f20905b81548152906001019060200180831161053657829003601f168201915b5050505050905090565b5f61056933848461092d565b50600192915050565b5f61057d600461099a565b905090565b5f61058e843384610a15565b610599848484610aa3565b5060019392505050565b5f815f036105dd576040517f817e74f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b335f81815260036020908152604080832073ffffffffffffffffffffffffffffffffffffffff881684529091529020546105699190859061061f908690611aa1565b61092d565b73ffffffffffffffffffffffffffffffffffffffff82165f9081526007602052604081206106529083610bbc565b9392505050565b6106638282610c3c565b5050565b73ffffffffffffffffffffffffffffffffffffffff82165f9081526005602052604081206106529083610bbc565b5f61069f82610cae565b92915050565b6106af3382610ce5565b50565b73ffffffffffffffffffffffffffffffffffffffff81165f90815260056020526040812061069f9061099a565b5f61057d610d54565b6060600280546104dc90611a29565b5f61069f600483610bbc565b73ffffffffffffffffffffffffffffffffffffffff81165f90815260076020526040812061069f9061099a565b5f610569338484610a15565b5f610569338484610aa3565b5f6106528383610d7a565b5f61075f878787610db2565b90505f61076f8287878787610ebe565b73ffffffffffffffffffffffffffffffffffffffff81165f908152600160205260409020549091508088036107df576040517f56d8d10600000000000000000000000000000000000000000000000000000000815260048101899052602481018290526044015b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff82165f9081526001602081905260409091209082019055610815828a610ce5565b505050505050505050565b73ffffffffffffffffffffffffffffffffffffffff87165f9081526001602052604081205490610853898989858a61104b565b90505f6108638288888888610ebe565b90508073ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff16146108ea576040517fefe0e68600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff808c166004830152821660248201526044016107d6565b73ffffffffffffffffffffffffffffffffffffffff8a165f90815260016020819052604090912090840190556109218a8a8a61092d565b50505050505050505050565b73ffffffffffffffffffffffffffffffffffffffff8381165f8181526003602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b80545f9080156109ec576109c0836109b3600184611ab4565b5f91825260209091200190565b546201000090047dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff166109ee565b5f5b7dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff169392505050565b805f03610a4e576040517f28bd1f0200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8084165f9081526003602090815260408083209386168352929052205460018101610a8e5750505050565b610a9d848461061f8585611ab4565b50505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610b08576040517fbf2f44f500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610b6791815260200190565b60405180910390a3610b7c836110c9836110d4565b610b91610b8884610cae565b6110c983611103565b5050610ba082611193836110d4565b610bb5610bac83610cae565b61119383611103565b5050505050565b81545f90808203610bd0575f91505061069f565b5f610bee85610bde84611ac7565b9350835f91825260209091200190565b805490915061ffff168410610c2d57546201000090047dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff16915061069f9050565b505f8111610bd0575092915050565b60405181815273ffffffffffffffffffffffffffffffffffffffff8316905f907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3610c9682611193836110d4565b610ca460046111938361119e565b5050610a9d610bac835b73ffffffffffffffffffffffffffffffffffffffff81165f90815260066020526040812061069f90610cdf906113cb565b8361140e565b5f610cf08383611437565b73ffffffffffffffffffffffffffffffffffffffff84165f90815260056020526040812091925090610d219061099a565b9050805f03610d305750505050565b610d3d826110c983611103565b5050610d4c8361119383611103565b505050505050565b5f610d63600c6213c680611afb565b610d7062ed14f143611ab4565b61057d9190611afb565b73ffffffffffffffffffffffffffffffffffffffff82165f90815260066020526040812061065290610dac908461176d565b8461140e565b604080517fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf602082015273ffffffffffffffffffffffffffffffffffffffff85169181019190915260608101839052608081018290525f90610eb69060a0015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081840301815282825280516020918201207f1901000000000000000000000000000000000000000000000000000000000000848301527f00000000000000000000000000000000000000000000000000000000000000006022850152604280850191909152825180850390910181526062909301909152815191012090565b949350505050565b5f84421115610f02576040517ff88f0490000000000000000000000000000000000000000000000000000000008152600481018690524260248201526044016107d6565b7f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0821180610f4357508360ff16601b14158015610f4357508360ff16601c14155b15610f7a576040517ff0ad0d0900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b604080515f81526020810180835288905260ff861691810191909152606081018490526080810183905260019060a0016020604051602081039080840390855afa158015610fca573d5f803e3d5ffd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff8116611042576040517f8baa579f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b95945050505050565b604080517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9602082015273ffffffffffffffffffffffffffffffffffffffff8088169282019290925290851660608201526080810184905260a0810183905260c081018290525f906110bf9060e001610e12565b9695505050505050565b5f6106528284611ab4565b73ffffffffffffffffffffffffffffffffffffffff83165f908152600560205260409020610bb590838361119e565b73ffffffffffffffffffffffffffffffffffffffff83165f908152600760205260408120819061113490858561119e565b604080518381526020810183905292945090925073ffffffffffffffffffffffffffffffffffffffff8716917fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724910160405180910390a2935093915050565b5f6106528284611aa1565b5f805f6111a9610d54565b86549091505f819003611278577dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff85111561120e576040517fb5b0cde400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506040805180820190915261ffff91821681527dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80861660208084019182528954600181018b555f8b8152918220945192519093166201000002919094161791015591508290506113c3565b5f611288886109b3600185611ab4565b80546201000090047dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff16955090506112c2858763ffffffff8a16565b93507dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84111561131c576040517fb5b0cde400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805461ffff1683111561138f576040805180820190915261ffff80851682527dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80871660208085019182528c54600181018e555f8e8152919091209451915190921662010000029216919091179101556113bf565b805461ffff16620100007dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8616021781555b5050505b935093915050565b80545f908015611406576113e4836109b3600184611ab4565b5462010000900473ffffffffffffffffffffffffffffffffffffffff16610652565b5f9392505050565b5f73ffffffffffffffffffffffffffffffffffffffff8316156114315782610652565b50919050565b5f611442828461140e565b91505f61144f83856117d3565b90505f61145a610d54565b73ffffffffffffffffffffffffffffffffffffffff86165f90815260066020526040812080549293509190819003611578578673ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16036114f1576040517fd186046800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506040805180820190915261ffff928316815273ffffffffffffffffffffffffffffffffffffffff938416602080830191825283546001810185555f94855293209151919092018054925190941662010000027fffffffffffffffffffff00000000000000000000000000000000000000000000909216921691909117179055508161069f565b5f611588836109b3600185611ab4565b80549091506115b39062010000900473ffffffffffffffffffffffffffffffffffffffff168961140e565b95508673ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff160361161a576040517fd186046800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8673ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff167f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f60405160405180910390a4805461ffff1684111561171e576040805180820190915261ffff808616825273ffffffffffffffffffffffffffffffffffffffff808816602080850191825287546001810189555f89815291909120945194018054915190921662010000027fffffffffffffffffffff000000000000000000000000000000000000000000009091169390921692909217179055611762565b80547fffffffffffffffffffff0000000000000000000000000000000000000000ffff166201000073ffffffffffffffffffffffffffffffffffffffff8716021781555b505050505092915050565b81545f90808203611781575f91505061069f565b5f61178f85610bde84611ac7565b805490915061ffff1684106117c4575462010000900473ffffffffffffffffffffffffffffffffffffffff16915061069f9050565b505f8111611781575092915050565b5f8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146114065782610652565b5f6020808352835180828501525f5b818110156118385785810183015185820160400152820161181c565b505f6040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b803573ffffffffffffffffffffffffffffffffffffffff81168114611899575f80fd5b919050565b5f80604083850312156118af575f80fd5b6118b883611876565b946020939093013593505050565b5f805f606084860312156118d8575f80fd5b6118e184611876565b92506118ef60208501611876565b9150604084013590509250925092565b5f6020828403121561190f575f80fd5b61065282611876565b5f60208284031215611928575f80fd5b5035919050565b803560ff81168114611899575f80fd5b5f805f805f8060c08789031215611954575f80fd5b61195d87611876565b955060208701359450604087013593506119796060880161192f565b92506080870135915060a087013590509295509295509295565b5f805f805f805f60e0888a0312156119a9575f80fd5b6119b288611876565b96506119c060208901611876565b955060408801359450606088013593506119dc6080890161192f565b925060a0880135915060c0880135905092959891949750929550565b5f8060408385031215611a09575f80fd5b611a1283611876565b9150611a2060208401611876565b90509250929050565b600181811c90821680611a3d57607f821691505b602082108103611431577f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b8082018082111561069f5761069f611a74565b8181038181111561069f5761069f611a74565b5f81611ad557611ad5611a74565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190565b5f82611b2e577f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b50049056fea2646970667358221220b2ea8b3497bb401e7c6d141067e8c0d2bd0ec2bbc0bdb8051944b7d620c8180764736f6c63430008140033";

type EpochBasedVoteTokenHarnessConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EpochBasedVoteTokenHarnessConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EpochBasedVoteTokenHarness__factory extends ContractFactory {
  constructor(...args: EpochBasedVoteTokenHarnessConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      name_,
      symbol_,
      decimals_,
      overrides || {}
    );
  }
  override deploy(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(name_, symbol_, decimals_, overrides || {}) as Promise<
      EpochBasedVoteTokenHarness & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): EpochBasedVoteTokenHarness__factory {
    return super.connect(runner) as EpochBasedVoteTokenHarness__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EpochBasedVoteTokenHarnessInterface {
    return new Interface(_abi) as EpochBasedVoteTokenHarnessInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): EpochBasedVoteTokenHarness {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as EpochBasedVoteTokenHarness;
  }
}
