/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Registrar, RegistrarInterface } from "../Registrar";

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
] as const;

const _bytecode =
  "0x60c06040523480156200001157600080fd5b50604051620012ea380380620012ea833981016040819052620000349162000260565b6001600160a01b03808516608052831660a08190526040805163a852d90b60e01b815290516000929163a852d90b9160048083019260209291908290030181865afa15801562000088573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000ae9190620002bd565b905060006001600160a01b038616635da592f5848466038d7ea4c68000655af3107a4000662386f26fc100006103e8620000ec6002612710620002e2565b620000fb6002612710620002e2565b6040516001600160e01b031960e08b901b1681526001600160a01b03988916600482015297909616602488015260448701949094526064860192909252608485015260a484015261ffff90811660c48401521660e4820152610104016020604051808303816000875af115801562000177573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200019d9190620002bd565b600080546001600160a01b0319166001600160a01b0383811691821790925560405163d9181cd360e01b815260048101919091528582166024820152868216604482015291925086169063d9181cd3906064016020604051808303816000875af115801562000210573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620002369190620002bd565b5050505050505062000305565b80516001600160a01b03811681146200025b57600080fd5b919050565b600080600080608085870312156200027757600080fd5b620002828562000243565b9350620002926020860162000243565b9250620002a26040860162000243565b9150620002b26060860162000243565b905092959194509250565b600060208284031215620002d057600080fd5b620002db8262000243565b9392505050565b6000826200030057634e487b7160e01b600052601260045260246000fd5b500490565b60805160a051610faa62000340600039600081816101a3015281816105db0152610b0401526000818161020b01526107280152610faa6000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c8063af63a3e111610081578063d7d1c1c01161005b578063d7d1c1c0146101eb578063d826f88f146101fe578063f143d6941461020657600080fd5b8063af63a3e11461019e578063b4d87a12146101c5578063d48d8423146101d857600080fd5b8063889eba3b116100b2578063889eba3b1461013b5780638eaa6ac014610150578063abf306a81461017e57600080fd5b80630c340a24146100ce5780632595f8cf14610118575b600080fd5b6000546100ee9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b61012b610126366004610d02565b61022d565b604051901515815260200161010f565b61014e610149366004610d4e565b6102a9565b005b61017061015e366004610d70565b60009081526001602052604090205490565b60405190815260200161010f565b61019161018c366004610d89565b610339565b60405161010f9190610dcb565b6100ee7f000000000000000000000000000000000000000000000000000000000000000081565b61014e6101d3366004610e34565b6103eb565b61014e6101e6366004610e34565b6104a5565b61012b6101f9366004610e34565b61055e565b61014e610586565b6100ee7f000000000000000000000000000000000000000000000000000000000000000081565b6000805b8281101561029c57600180600061026e8888888781811061025457610254610e64565b90506020020160208101906102699190610e93565b610c55565b8152602001908152602001600020541461028c5760009150506102a2565b61029581610eb0565b9050610231565b50600190505b9392505050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102fa576040517f07f42bf200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526001602052604080822083905551829184917fe50cd7681ef9290dfd8130fd24ac0ccccd3d35e0d3b6e009f3d27343973253de9190a35050565b60608167ffffffffffffffff81111561035457610354610f0f565b60405190808252806020026020018201604052801561037d578160200160208202803683370190505b50905060005b828110156103e457600160008585848181106103a1576103a1610e64565b905060200201358152602001908152602001600020548282815181106103c9576103c9610e64565b60209081029190910101526103dd81610eb0565b9050610383565b5092915050565b60005473ffffffffffffffffffffffffffffffffffffffff16331461043c576040517f07f42bf200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600180600061044b8585610c55565b8152602001908152602001600020819055508073ffffffffffffffffffffffffffffffffffffffff16827f56573e227f8e2cfaf9c513a7e1586b18527b6f4010b703025003741b6a451ad560405160405180910390a35050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146104f6576040517f07f42bf200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160006105048484610c55565b8152602001908152602001600020600090558073ffffffffffffffffffffffffffffffffffffffff16827f72e193b20c528dc6c7ac5d8f5bc4354aa22b592c0fdca040fa926c2ff90534f760405160405180910390a35050565b60006001808261056e8686610c55565b81526020019081526020016000205414905092915050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146105d7576040517f07f42bf200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a852d90b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610644573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106689190610f3e565b905060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a72246876040518163ffffffff1660e01b8152600401602060405180830381865afa1580156106d8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106fc9190610f3e565b905060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16635da592f584868573ffffffffffffffffffffffffffffffffffffffff1663c27cabb56040518163ffffffff1660e01b8152600401602060405180830381865afa1580156107af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d39190610f5b565b8673ffffffffffffffffffffffffffffffffffffffff16635e91b75f6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561081e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108429190610f5b565b8773ffffffffffffffffffffffffffffffffffffffff16633a5dedf86040518163ffffffff1660e01b8152600401602060405180830381865afa15801561088d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108b19190610f5b565b8873ffffffffffffffffffffffffffffffffffffffff1663228cb7336040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109209190610f5b565b8973ffffffffffffffffffffffffffffffffffffffff16631f4a01806040518163ffffffff1660e01b8152600401602060405180830381865afa15801561096b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061098f9190610f5b565b8a73ffffffffffffffffffffffffffffffffffffffff16635d53f59f6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156109da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109fe9190610f5b565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e08b901b16815273ffffffffffffffffffffffffffffffffffffffff988916600482015297909616602488015260448701949094526064860192909252608485015260a484015261ffff90811660c48401521660e4820152610104016020604051808303816000875af1158015610a9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ac29190610f3e565b6000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905590507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663d9181cd382858573ffffffffffffffffffffffffffffffffffffffff1663f294bd926040518163ffffffff1660e01b8152600401602060405180830381865afa158015610b8b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610baf9190610f3e565b60405160e085901b7fffffffff0000000000000000000000000000000000000000000000000000000016815273ffffffffffffffffffffffffffffffffffffffff9384166004820152918316602483015290911660448201526064016020604051808303816000875af1158015610c2a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c4e9190610f3e565b5050505050565b60008282604051602001610c9892919091825260601b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000016602082015260340190565b60405160208183030381529060405280519060200120905092915050565b60008083601f840112610cc857600080fd5b50813567ffffffffffffffff811115610ce057600080fd5b6020830191508360208260051b8501011115610cfb57600080fd5b9250929050565b600080600060408486031215610d1757600080fd5b83359250602084013567ffffffffffffffff811115610d3557600080fd5b610d4186828701610cb6565b9497909650939450505050565b60008060408385031215610d6157600080fd5b50508035926020909101359150565b600060208284031215610d8257600080fd5b5035919050565b60008060208385031215610d9c57600080fd5b823567ffffffffffffffff811115610db357600080fd5b610dbf85828601610cb6565b90969095509350505050565b6020808252825182820181905260009190848201906040850190845b81811015610e0357835183529284019291840191600101610de7565b50909695505050505050565b73ffffffffffffffffffffffffffffffffffffffff81168114610e3157600080fd5b50565b60008060408385031215610e4757600080fd5b823591506020830135610e5981610e0f565b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215610ea557600080fd5b81356102a281610e0f565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610f08577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060208284031215610f5057600080fd5b81516102a281610e0f565b600060208284031215610f6d57600080fd5b505191905056fea26469706673582212201089cdacb11339136222739562591565c7e967da822d4a65b476d07620460b3464736f6c63430008130033";

type RegistrarConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RegistrarConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Registrar__factory extends ContractFactory {
  constructor(...args: RegistrarConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    governorDeployer_: string,
    powerTokenDeployer_: string,
    bootstrapToken_: string,
    cashToken_: string,
    overrides?: Overrides & { from?: string }
  ): Promise<Registrar> {
    return super.deploy(
      governorDeployer_,
      powerTokenDeployer_,
      bootstrapToken_,
      cashToken_,
      overrides || {}
    ) as Promise<Registrar>;
  }
  override getDeployTransaction(
    governorDeployer_: string,
    powerTokenDeployer_: string,
    bootstrapToken_: string,
    cashToken_: string,
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(
      governorDeployer_,
      powerTokenDeployer_,
      bootstrapToken_,
      cashToken_,
      overrides || {}
    );
  }
  override attach(address: string): Registrar {
    return super.attach(address) as Registrar;
  }
  override connect(signer: Signer): Registrar__factory {
    return super.connect(signer) as Registrar__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RegistrarInterface {
    return new utils.Interface(_abi) as RegistrarInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Registrar {
    return new Contract(address, _abi, signerOrProvider) as Registrar;
  }
}
