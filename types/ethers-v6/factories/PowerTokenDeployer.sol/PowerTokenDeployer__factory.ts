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
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  PowerTokenDeployer,
  PowerTokenDeployerInterface,
} from "../../PowerTokenDeployer.sol/PowerTokenDeployer";

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
        name: "treasury_",
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
    name: "treasury",
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

const _bytecode =
  "0x60c060405234801561000f575f80fd5b50604051613e8a380380613e8a83398101604081905261002e91610060565b6001600160a01b039182166080521660a052610091565b80516001600160a01b038116811461005b575f80fd5b919050565b5f8060408385031215610071575f80fd5b61007a83610045565b915061008860208401610045565b90509250929050565b60805160a051613dcc6100be5f395f818160c801526101cf01525f81816076015261015d0152613dcc5ff3fe608060405234801562000010575f80fd5b50600436106200006c575f3560e01c8063a852d90b1162000053578063a852d90b14620000ea578063affed0e014620000f4578063d9181cd3146200010c575f80fd5b80632b20e397146200007057806361d027b314620000c2575b5f80fd5b620000987f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b620000987f000000000000000000000000000000000000000000000000000000000000000081565b6200009862000123565b620000fd5f5481565b604051908152602001620000b9565b620000986200011d366004620007a9565b62000144565b5f6200013f305f5460016200013991906200081d565b62000255565b905090565b5f3373ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614620001b5576040517f277a630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f808154620001c49062000839565b9190508190555083837f000000000000000000000000000000000000000000000000000000000000000084604051620001fd9062000772565b73ffffffffffffffffffffffffffffffffffffffff9485168152928416602084015290831660408301529091166060820152608001604051809103905ff0801580156200024c573d5f803e3d5ffd5b50949350505050565b5f8115620006af57607f821115620005ff5760ff821115620005295761ffff821115620004535762ffffff8211156200036e576040517fda0000000000000000000000000000000000000000000000000000000000000060208201527f940000000000000000000000000000000000000000000000000000000000000060218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606085901b1660228201527f840000000000000000000000000000000000000000000000000000000000000060368201527fffffffff0000000000000000000000000000000000000000000000000000000060e084901b166037820152603b015b60405160208183030381529060405262000763565b6040517fd90000000000000000000000000000000000000000000000000000000000000060208201527f940000000000000000000000000000000000000000000000000000000000000060218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606085901b1660228201527f830000000000000000000000000000000000000000000000000000000000000060368201527fffffff000000000000000000000000000000000000000000000000000000000060e884901b166037820152603a0160405160208183030381529060405262000763565b6040517fd80000000000000000000000000000000000000000000000000000000000000060208201527f940000000000000000000000000000000000000000000000000000000000000060218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606085901b1660228201527f820000000000000000000000000000000000000000000000000000000000000060368201527fffff00000000000000000000000000000000000000000000000000000000000060f084901b16603782015260390162000359565b6040517fd70000000000000000000000000000000000000000000000000000000000000060208201527f940000000000000000000000000000000000000000000000000000000000000060218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606085901b1660228201527f8100000000000000000000000000000000000000000000000000000000000000603682015260f883901b7fff0000000000000000000000000000000000000000000000000000000000000016603782015260380162000359565b6040517fd60000000000000000000000000000000000000000000000000000000000000060208201527f940000000000000000000000000000000000000000000000000000000000000060218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606085901b16602282015260f883901b7fff0000000000000000000000000000000000000000000000000000000000000016603682015260370162000359565b6040517fd60000000000000000000000000000000000000000000000000000000000000060208201527f940000000000000000000000000000000000000000000000000000000000000060218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606085901b1660228201527f800000000000000000000000000000000000000000000000000000000000000060368201526037016040516020818303038152906040525b80516020909101209392505050565b613523806200087483390190565b803573ffffffffffffffffffffffffffffffffffffffff81168114620007a4575f80fd5b919050565b5f805f60608486031215620007bc575f80fd5b620007c78462000780565b9250620007d76020850162000780565b9150620007e76040850162000780565b90509250925092565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b80820180821115620008335762000833620007f0565b92915050565b5f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036200086c576200086c620007f0565b506001019056fe6101a060405234801562000011575f80fd5b506040516200352338038062003523833981016040819052620000349162000259565b6040518060400160405280600b81526020016a2837bbb2b9102a37b5b2b760a91b815250604051806040016040528060058152602001642827aba2a960d91b815250600a612710620000879190620002b3565b82825f8181847f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f82620000bb838262000373565b604051620000ca91906200043b565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160408051601f19818403018152919052805160209091012060805250600262000141838262000373565b5060ff1660a05250505060c0919091525050506001600160a01b03808416610100528281166101405284811661012052811660e081905263981b24d06001620001896200020c565b620001959190620004b5565b610160818152506040518263ffffffff1660e01b8152600401620001bb91815260200190565b602060405180830381865afa158015620001d7573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190620001fd9190620004db565b6101805250620004f392505050565b5f6200021d600c6213c680620002b3565b6200022c62ed14f143620004b5565b620002389190620002b3565b905090565b80516001600160a01b038116811462000254575f80fd5b919050565b5f805f80608085870312156200026d575f80fd5b62000278856200023d565b935062000288602086016200023d565b925062000298604086016200023d565b9150620002a8606086016200023d565b905092959194509250565b5f82620002ce57634e487b7160e01b5f52601260045260245ffd5b500490565b634e487b7160e01b5f52604160045260245ffd5b600181811c90821680620002fc57607f821691505b6020821081036200031b57634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156200036e575f81815260208120601f850160051c81016020861015620003495750805b601f850160051c820191505b818110156200036a5782815560010162000355565b5050505b505050565b81516001600160401b038111156200038f576200038f620002d3565b620003a781620003a08454620002e7565b8462000321565b602080601f831160018114620003dd575f8415620003c55750858301515b5f19600386901b1c1916600185901b1785556200036a565b5f85815260208120601f198616915b828110156200040d57888601518255948401946001909101908401620003ec565b50858210156200042b57878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b5f8083546200044a81620002e7565b600182811680156200046557600181146200047b57620004a9565b60ff1984168752821515830287019450620004a9565b875f526020805f205f5b85811015620004a05781548a82015290840190820162000485565b50505082870194505b50929695505050505050565b81810381811115620004d557634e487b7160e01b5f52601160045260245ffd5b92915050565b5f60208284031215620004ec575f80fd5b5051919050565b60805160a05160c05160e0516101005161012051610140516101605161018051612f7d620005a65f395f61130601525f818161037101528181610c640152611b5401525f81816105160152610d3801525f818161032a015281816109c20152610f0d01525f81816106190152610d1601525f818161044e015261132e01525f818161063f01528181610841015281816118c501526119c601525f6103e901525f818161041501526116e10152612f7d5ff3fe608060405234801561000f575f80fd5b50600436106102cd575f3560e01c806370a082311161017c578063a797d916116100dd578063c580b26911610093578063e7a324dc1161006e578063e7a324dc14610710578063ed0849f714610737578063f8520c081461073f575f80fd5b8063c580b269146106a5578063d505accf146106b8578063dd62ed3e146106cb575f80fd5b8063aaaaaa22116100c3578063aaaaaa2214610676578063c2ee3a0814610689578063c3cda52014610692575f80fd5b8063a797d9161461063d578063a9059cbb14610663575f80fd5b8063981b24d0116101325780639e4a93ec116101185780639e4a93ec146105e2578063a457c2d714610604578063a722468714610617575f80fd5b8063981b24d0146105bc5780639ab24eb0146105cf575f80fd5b80637ecebe00116101625780637ecebe001461056057806391ddadf41461059557806395d89b41146105b4575f80fd5b806370a082311461053a5780637deb60251461054d575f80fd5b80633644e515116102315780634bf5d7e9116101e75780635a4dd47d116101c25780635a4dd47d146104ee5780635c19a95c1461050157806361d027b314610514575f80fd5b80634bf5d7e91461048f5780634ee2cd7e146104c8578063587cde1e146104db575f80fd5b8063397da79d11610217578063397da79d1461044c5780633a46b1a814610472578063414408e514610485575f80fd5b80633644e515146104135780633950935114610439575f80fd5b806318160ddd116102865780632ff2e9dc1161026c5780632ff2e9dc146103b057806330adf81f146103bb578063313ce567146103e2575f80fd5b806318160ddd1461039557806323b872dd1461039d575f80fd5b806309dc8d92116102b657806309dc8d92146103125780630c340a24146103285780630db3a5581461036f575f80fd5b806306fdde03146102d1578063095ea7b3146102ef575b5f80fd5b6102d9610752565b6040516102e69190612b5f565b60405180910390f35b6103026102fd366004612bd7565b6107e1565b60405190151581526020016102e6565b61031a6107f6565b6040519081526020016102e6565b7f00000000000000000000000000000000000000000000000000000000000000005b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016102e6565b7f000000000000000000000000000000000000000000000000000000000000000061031a565b61031a6108b3565b6103026103ab366004612bff565b6108d3565b61031a633b9aca0081565b61031a7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b60405160ff7f00000000000000000000000000000000000000000000000000000000000000001681526020016102e6565b7f000000000000000000000000000000000000000000000000000000000000000061031a565b610302610447366004612bd7565b6108f4565b7f000000000000000000000000000000000000000000000000000000000000000061034a565b61031a610480366004612bd7565b610975565b61048d6109aa565b005b60408051808201909152600a81527f6d6f64653d65706f63680000000000000000000000000000000000000000000060208201526102d9565b61031a6104d6366004612bd7565b610ae4565b61034a6104e9366004612c38565b610b27565b61031a6104fc366004612c51565b610b37565b61048d61050f366004612c38565b610c19565b7f000000000000000000000000000000000000000000000000000000000000000061034a565b61031a610548366004612c38565b610c26565b61048d61055b366004612c68565b610c88565b61031a61056e366004612c38565b73ffffffffffffffffffffffffffffffffffffffff165f9081526001602052604090205490565b61059d610da2565b60405165ffffffffffff90911681526020016102e6565b6102d9610dab565b61031a6105ca366004612c51565b610dba565b61031a6105dd366004612c38565b610dd8565b6103026105f0366004612c51565b5f908152600b602052604090205460ff1690565b610302610612366004612bd7565b610e05565b7f000000000000000000000000000000000000000000000000000000000000000061034a565b7f000000000000000000000000000000000000000000000000000000000000000061031a565b610302610671366004612bd7565b610e11565b61034a610684366004612bd7565b610e1d565b61031a61271081565b61048d6106a0366004612ca2565b610e28565b61048d6106b3366004612c38565b610ef5565b61048d6106c6366004612cf6565b610f6d565b61031a6106d9366004612d5b565b73ffffffffffffffffffffffffffffffffffffffff9182165f90815260036020908152604080832093909416825291909152205490565b61031a7fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf81565b600a5461031a565b61030261074d366004612bd7565b61107a565b60605f805461076090612d83565b80601f016020809104026020016040519081016040528092919081815260200182805461078c90612d83565b80156107d75780601f106107ae576101008083540402835291602001916107d7565b820191905f5260205f20905b8154815290600101906020018083116107ba57829003601f168201915b5050505050905090565b5f6107ed338484611085565b50600192915050565b5f80600b5f6108036110f2565b815260208101919091526040015f205460ff16610820575f610823565b60015b60ff16600a546108339190612dfb565b90505f61271061086f6108667f000000000000000000000000000000000000000000000000000000000000000083612e0e565b84612710611118565b61087d90633b9aca00612e21565b6108879190612e65565b90505f6108926108b3565b90508082116108a1575f6108ab565b6108ab8183612dfb565b935050505090565b6004545f90156108ca576108c5611177565b905090565b50633b9aca0090565b5f6108df843384611182565b6108ea848484611210565b5060019392505050565b5f815f0361092e576040517f817e74f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b335f81815260036020908152604080832073ffffffffffffffffffffffffffffffffffffffff881684529091529020546107ed91908590610970908690612e0e565b611085565b73ffffffffffffffffffffffffffffffffffffffff82165f9081526007602052604081206109a3908361122d565b9392505050565b3373ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610a19576040517fee3675d400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f610a226110f2565b5f818152600b602052604090205490915060ff1615610a6d576040517f139163ed00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60405181907f022cb1cde5e4bb1b7b5720a93034a99caf68d21c09cfeacae42c602ca34b4186905f90a25f818152600b6020526040812080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055600a8054909190610add90612e78565b9091555050565b73ffffffffffffffffffffffffffffffffffffffff82165f9081526005602052604081205415610b1d57610b1883836112ad565b6109a3565b6109a383836112b8565b5f610b31826113ad565b92915050565b5f80610b416110f2565b90505f610b4d826113e4565b610b5e57610b596113f9565b610b6c565b610b6c600c6213c680612e65565b90505f6064610b7f600c6213c680612e65565b610b899190612e65565b90505f610b968284612e65565b6001901b90505f610ba78385612eaf565b9050610bb76105ca600187612dfb565b610bc19084612e21565b600183901c610bd08386612dfb565b610bda9190612e21565b610be48484612e21565b610bee9190612e0e565b610bfa89612710612e21565b610c049190612e21565b610c0e9190612e65565b979650505050505050565b610c23338261140d565b50565b73ffffffffffffffffffffffffffffffffffffffff81165f9081526005602052604081205415610c5e57610c59826114a4565b610b31565b610b31827f00000000000000000000000000000000000000000000000000000000000000006112b8565b610c906107f6565b821115610cc9576040517fec21873b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f610cd383610b37565b604080518581526020810183905291925033917f1cbc5ab135991bd2b6a4b034a04aa2aa086dac1371cb9b16b8b5e2ed6b036bed910160405180910390a2610d5d7f0000000000000000000000000000000000000000000000000000000000000000337f0000000000000000000000000000000000000000000000000000000000000000846114ae565b610d93576040517f7939f42400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610d9d828461154e565b505050565b5f6108c56110f2565b60606002805461076090612d83565b6004545f9015610dcd57610c5982611565565b633b9aca0092915050565b73ffffffffffffffffffffffffffffffffffffffff81165f908152600760205260408120610b3190611571565b5f6107ed338484611182565b5f6107ed338484611210565b5f6109a383836115ec565b5f610e34878787611624565b90505f610e448287878787611730565b73ffffffffffffffffffffffffffffffffffffffff81165f90815260016020526040902054909150808803610eb4576040517f56d8d10600000000000000000000000000000000000000000000000000000000815260048101899052602481018290526044015b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff82165f9081526001602081905260409091209082019055610eea828a61140d565b505050505050505050565b3373ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610f64576040517fee3675d400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610c23816118b4565b73ffffffffffffffffffffffffffffffffffffffff87165f9081526001602052604081205490610fa0898989858a611a29565b90505f610fb08288888888611730565b90508073ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff1614611037576040517fefe0e68600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff808c16600483015282166024820152604401610eab565b73ffffffffffffffffffffffffffffffffffffffff8a165f908152600160208190526040909120908401905561106e8a8a8a611085565b50505050505050505050565b5f6109a38383611aa7565b73ffffffffffffffffffffffffffffffffffffffff8381165f8181526003602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b5f611101600c6213c680612e65565b61110e62ed14f143612dfb565b6108c59190612e65565b5f826001165f03611129578161112b565b835b90505b60019290921c9182156109a357816111468580612e21565b6111509190612e65565b9350600183161561112e57816111668583612e21565b6111709190612e65565b905061112e565b5f6108c56004611571565b805f036111bb576040517f28bd1f0200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8084165f90815260036020908152604080832093861683529290522054600181016111fb5750505050565b61120a84846109708585612dfb565b50505050565b61121983611b20565b61122282611b20565b610d9d838383611b92565b81545f90808203611241575f915050610b31565b5f61125f8561124f84612ec2565b9350835f91825260209091200190565b805490915061ffff16841061129e57546201000090047dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff169150610b319050565b505f8111611241575092915050565b5f6109a38383611bb7565b6040517f4ee2cd7e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8381166004830152602482018390525f917f000000000000000000000000000000000000000000000000000000000000000091633b9aca00917f000000000000000000000000000000000000000000000000000000000000000090911690634ee2cd7e90604401602060405180830381865afa158015611375573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906113999190612ef6565b6113a39190612e21565b6109a39190612e65565b73ffffffffffffffffffffffffffffffffffffffff81165f908152600660205260408120610b31906113de90611cb0565b83611cf3565b5f6113f0600283612eaf565b60011492915050565b5f43611403611d1c565b6108c59190612dfb565b611415611d38565b61141e82611d81565b6114288282611eb9565b73ffffffffffffffffffffffffffffffffffffffff82165f908152600860205260408120610d9d9161149f906009906114618688611cf3565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20611571565b611f20565b5f610b31826120b9565b6040805173ffffffffffffffffffffffffffffffffffffffff85811660248301528416604482015260648082018490528251808303909101815260849091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd000000000000000000000000000000000000000000000000000000001790525f9061154590869061216a565b95945050505050565b61155782611b20565b611561828261221e565b5050565b5f610b3160048361122d565b80545f9080156115c3576115978361158a600184612dfb565b5f91825260209091200190565b546201000090047dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff166115c5565b5f5b7dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff169392505050565b73ffffffffffffffffffffffffffffffffffffffff82165f9081526006602052604081206109a39061161e9084612239565b84611cf3565b604080517fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf602082015273ffffffffffffffffffffffffffffffffffffffff85169181019190915260608101839052608081018290525f906117289060a0015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081840301815282825280516020918201207f1901000000000000000000000000000000000000000000000000000000000000848301527f00000000000000000000000000000000000000000000000000000000000000006022850152604280850191909152825180850390910181526062909301909152815191012090565b949350505050565b5f84421115611774576040517ff88f049000000000000000000000000000000000000000000000000000000000815260048101869052426024820152604401610eab565b7f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08211806117b557508360ff16601b141580156117b557508360ff16601c14155b156117ec576040517ff0ad0d0900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b604080515f81526020810180835288905260ff861691810191909152606081018490526080810183905260019060a0016020604051602081039080840390855afa15801561183c573d5f803e3d5ffd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff8116611545576040517f8baa579f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6118bc61229f565b5f6127106118ea7f000000000000000000000000000000000000000000000000000000000000000082612e0e565b73ffffffffffffffffffffffffffffffffffffffff84165f9081526009602052604090206119209061191b90611571565b6122e0565b61192a9190612e21565b6119349190612e65565b73ffffffffffffffffffffffffffffffffffffffff83165f9081526009602052604090209091506119659082611f20565b1561199c576040517f22ce1a0700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff82165f908152600760205260408120612710907f0000000000000000000000000000000000000000000000000000000000000000906119ef90611571565b6119f99190612e21565b611a039190612e65565b9050611a1360046122f683612301565b5050611a22836122f68361252e565b5050505050565b604080517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9602082015273ffffffffffffffffffffffffffffffffffffffff8088169282019290925290851660608201526080810184905260a0810183905260c081018290525f90611a9d9060e001611684565b9695505050505050565b73ffffffffffffffffffffffffffffffffffffffff82165f9081526009602052604081208054808303611ade575f92505050610b31565b5f611aec8361124f84612ec2565b805490915061ffff1685811115611b04575050611b11565b85149350610b3192505050565b5f8111611ade57505092915050565b73ffffffffffffffffffffffffffffffffffffffff81165f9081526005602052604090205415611b4d5750565b5f611b78827f00000000000000000000000000000000000000000000000000000000000000006112b8565b9050805f03611b85575050565b611561826122f6836125be565b611b9a611d38565b611ba383611d81565b611bac82611d81565b610d9d8383836125ed565b73ffffffffffffffffffffffffffffffffffffffff82165f9081526005602052604081208190611be7908461122d565b9050805f03611bf9575f915050610b31565b73ffffffffffffffffffffffffffffffffffffffff84165f908152600860205260409020611728908290611c2d908661122d565b73ffffffffffffffffffffffffffffffffffffffff87165f908152600660205260408120611cab91600991611c6c90611c66908b612239565b8b611cf3565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f208761122d565b6126ff565b80545f908015611ceb57611cc98361158a600184612dfb565b5462010000900473ffffffffffffffffffffffffffffffffffffffff166109a3565b5f9392505050565b5f73ffffffffffffffffffffffffffffffffffffffff831615611d1657826109a3565b50919050565b5f6108c5611d286110f2565b611d33906001612e0e565b612726565b611d48611d436110f2565b6113e4565b15611d7f576040517f66f21c3500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b73ffffffffffffffffffffffffffffffffffffffff81165f908152600560205260408120611dae90611571565b73ffffffffffffffffffffffffffffffffffffffff83165f90815260066020526040812091925090611de39061161e90611cb0565b73ffffffffffffffffffffffffffffffffffffffff81165f90815260096020526040812091925090611e1490611571565b90505f83611e6a85611e6160085f8a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20611571565b611cab866122e0565b611e749190612dfb565b9050611e83856122f6836125be565b73ffffffffffffffffffffffffffffffffffffffff85165f908152600860205260409020611eb19083611f20565b505050505050565b5f611ec4838361274c565b73ffffffffffffffffffffffffffffffffffffffff84165f90815260056020526040812091925090611ef590611571565b9050805f03611f045750505050565b611f1182612a828361252e565b5050611eb1836122f68361252e565b5f7dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821115611f79576040517fb5b0cde400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f611f826110f2565b84549091505f819003611ff657506040805180820190915261ffff91821681527dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff808516602080840191825287546001810189555f89815291822094519251909316620100000291909416179101559050610b31565b5f6120068661158a600185612dfb565b805490915061ffff16830361205057805461ffff16620100007dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8716021790555060019150610b319050565b50506040805180820190915261ffff91821681527dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff808516602080840191825287546001810189555f8981529182209451925190931662010000029190941617910155905092915050565b73ffffffffffffffffffffffffffffffffffffffff81165f90815260056020526040812081906120e890611571565b9050805f036120f957505f92915050565b73ffffffffffffffffffffffffffffffffffffffff83165f9081526008602052604090206109a390829061212c90611571565b73ffffffffffffffffffffffffffffffffffffffff86165f908152600660205260408120611cab916009916114619061216490611cb0565b8a611cf3565b5f73ffffffffffffffffffffffffffffffffffffffff83163b61218e57505f610b31565b60608373ffffffffffffffffffffffffffffffffffffffff16836040516121b59190612f0d565b5f604051808303815f865af19150503d805f81146121ee576040519150601f19603f3d011682016040523d82523d5f602084013e6121f3565b606091505b5090925090508180156117285750805115806117285750808060200190518101906117289190612f28565b612226611d38565b61222f82611d81565b6115618282612a8d565b81545f9080820361224d575f915050610b31565b5f61225b8561124f84612ec2565b805490915061ffff168410612290575462010000900473ffffffffffffffffffffffffffffffffffffffff169150610b319050565b505f811161224d575092915050565b6122aa611d436110f2565b611d7f576040517f90bfab2000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f81156122ed5781610b31565b61271092915050565b5f6109a38284612e0e565b5f805f61230c6110f2565b86549091505f8190036123db577dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff851115612371576040517fb5b0cde400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506040805180820190915261ffff91821681527dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80861660208084019182528954600181018b555f8b815291822094519251909316620100000291909416179101559150829050612526565b5f6123eb8861158a600185612dfb565b80546201000090047dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1695509050612425858763ffffffff8a16565b93507dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84111561247f576040517fb5b0cde400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805461ffff168311156124f2576040805180820190915261ffff80851682527dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80871660208085019182528c54600181018e555f8e815291909120945191519092166201000002921691909117910155612522565b805461ffff16620100007dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8616021781555b5050505b935093915050565b73ffffffffffffffffffffffffffffffffffffffff83165f908152600760205260408120819061255f908585612301565b604080518381526020810183905292945090925073ffffffffffffffffffffffffffffffffffffffff8716917fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724910160405180910390a2935093915050565b73ffffffffffffffffffffffffffffffffffffffff83165f908152600560205260409020611a22908383612301565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603612652576040517fbf2f44f500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516126b191815260200190565b60405180910390a36126c683612a82836125be565b6126db6126d2846113ad565b612a828361252e565b50506126ea826122f6836125be565b611a226126f6836113ad565b6122f68361252e565b5f612709836122e0565b612712836122e0565b61271c9086612e21565b6117289190612e65565b5f612735600c6213c680612e65565b61273f9083612e21565b610b319062ed14f1612e0e565b5f6127578284611cf3565b91505f6127648385612b03565b90505f61276f6110f2565b73ffffffffffffffffffffffffffffffffffffffff86165f9081526006602052604081208054929350919081900361288d578673ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1603612806576040517fd186046800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506040805180820190915261ffff928316815273ffffffffffffffffffffffffffffffffffffffff938416602080830191825283546001810185555f94855293209151919092018054925190941662010000027fffffffffffffffffffff000000000000000000000000000000000000000000009092169216919091171790555081610b31565b5f61289d8361158a600185612dfb565b80549091506128c89062010000900473ffffffffffffffffffffffffffffffffffffffff1689611cf3565b95508673ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff160361292f576040517fd186046800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8673ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff167f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f60405160405180910390a4805461ffff16841115612a33576040805180820190915261ffff808616825273ffffffffffffffffffffffffffffffffffffffff808816602080850191825287546001810189555f89815291909120945194018054915190921662010000027fffffffffffffffffffff000000000000000000000000000000000000000000009091169390921692909217179055612a77565b80547fffffffffffffffffffff0000000000000000000000000000000000000000ffff166201000073ffffffffffffffffffffffffffffffffffffffff8716021781555b505050505092915050565b5f6109a38284612dfb565b60405181815273ffffffffffffffffffffffffffffffffffffffff8316905f907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3612ae7826122f6836125be565b612af560046122f683612301565b505061120a6126f6836113ad565b5f8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614611ceb57826109a3565b5f5b83811015612b57578181015183820152602001612b3f565b50505f910152565b602081525f8251806020840152612b7d816040850160208701612b3d565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b803573ffffffffffffffffffffffffffffffffffffffff81168114612bd2575f80fd5b919050565b5f8060408385031215612be8575f80fd5b612bf183612baf565b946020939093013593505050565b5f805f60608486031215612c11575f80fd5b612c1a84612baf565b9250612c2860208501612baf565b9150604084013590509250925092565b5f60208284031215612c48575f80fd5b6109a382612baf565b5f60208284031215612c61575f80fd5b5035919050565b5f8060408385031215612c79575f80fd5b82359150612c8960208401612baf565b90509250929050565b803560ff81168114612bd2575f80fd5b5f805f805f8060c08789031215612cb7575f80fd5b612cc087612baf565b95506020870135945060408701359350612cdc60608801612c92565b92506080870135915060a087013590509295509295509295565b5f805f805f805f60e0888a031215612d0c575f80fd5b612d1588612baf565b9650612d2360208901612baf565b95506040880135945060608801359350612d3f60808901612c92565b925060a0880135915060c0880135905092959891949750929550565b5f8060408385031215612d6c575f80fd5b612d7583612baf565b9150612c8960208401612baf565b600181811c90821680612d9757607f821691505b602082108103611d16577f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b81810381811115610b3157610b31612dce565b80820180821115610b3157610b31612dce565b8082028115828204841417610b3157610b31612dce565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f82612e7357612e73612e38565b500490565b5f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612ea857612ea8612dce565b5060010190565b5f82612ebd57612ebd612e38565b500690565b5f81612ed057612ed0612dce565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190565b5f60208284031215612f06575f80fd5b5051919050565b5f8251612f1e818460208701612b3d565b9190910192915050565b5f60208284031215612f38575f80fd5b815180151581146109a3575f80fdfea2646970667358221220f19911a6555093b94c4c514504248754e759b286156dd145b6621feb7a60e4ff64736f6c63430008140033a26469706673582212203cb29cd378638050d1f3b2b687607934b297f0e64b81499f8fb6ea2a0b58ef7e64736f6c63430008140033";

type PowerTokenDeployerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PowerTokenDeployerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PowerTokenDeployer__factory extends ContractFactory {
  constructor(...args: PowerTokenDeployerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    registrar_: AddressLike,
    treasury_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(registrar_, treasury_, overrides || {});
  }
  override deploy(
    registrar_: AddressLike,
    treasury_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(registrar_, treasury_, overrides || {}) as Promise<
      PowerTokenDeployer & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): PowerTokenDeployer__factory {
    return super.connect(runner) as PowerTokenDeployer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PowerTokenDeployerInterface {
    return new Interface(_abi) as PowerTokenDeployerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): PowerTokenDeployer {
    return new Contract(address, _abi, runner) as unknown as PowerTokenDeployer;
  }
}
