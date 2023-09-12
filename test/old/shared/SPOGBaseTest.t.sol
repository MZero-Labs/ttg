// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.19;

// import { IRegistrar } from "../../src/registrar/IRegistrar.sol";
// import { IDualGovernor, IDualGovernorQuorum } from "../../src/governor/IDualGovernor.sol";
// import { IVault } from "../../src/vault/IVault.sol";
// import { IVOTE, IVALUE } from "../../src/tokens/ITokens.sol";
// import { IGovernanceDeployer } from "../../src/deployer/IGovernanceDeployer.sol";

// import { IERC20 } from "../ImportedInterfaces.sol";

// import { VOTE } from "../../src/tokens/VOTE.sol";
// import { DualGovernor } from "../../src/governor/DualGovernor.sol";

// import { SPOGDeployScript } from "../../script/SPOGDeploy.s.sol";
// import { BaseTest } from "./BaseTest.t.sol";

// contract SPOGBaseTest is BaseTest {
//     bytes32 public constant LIST_NAME = "Some List";

//     SPOGDeployScript public deployScript;

//     IERC20 public cash;
//     IGovernanceDeployer public deployer;
//     IRegistrar public registrar;
//     IDualGovernor public governor;
//     IVault public vault;
//     IVALUE public value;
//     IVOTE public vote;

//     uint256 public tax;

//     address public alice = createUser("alice");
//     address public bob = createUser("bob");
//     address public carol = createUser("carol");

//     uint256 public amountToMint = 100e18;

//     uint8 public noVote = 0;
//     uint8 public yesVote = 1;

//     enum VoteType {
//         No,
//         Yes
//     }

//     function setUp() public virtual {
//         deployScript = new SPOGDeployScript();
//         deployScript.run();

//         registrar = IRegistrar(deployScript.registrar());

//         updateAddresses();

//         // Initialize self
//         // TODO: Remove the need for this.
//         initializeSelf();

//         // Initialize users initial token balances
//         fundUsers();
//     }

//     function updateAddresses() internal {
//         vault = IVault(registrar.vault());
//         cash = IERC20(registrar.cash());
//         deployer = IGovernanceDeployer(registrar.deployer());
//         governor = IDualGovernor(registrar.governor());
//         value = IVALUE(governor.value());
//         vote = IVOTE(governor.vote());
//         tax = registrar.tax();
//     }

//     // TODO: Remove the need for this.
//     function initializeSelf() internal {
//         // mint vote tokens and self-delegate
//         vm.prank(address(governor));
//         vote.mint(address(this), amountToMint);

//         vote.delegate(address(this));

//         // mint value tokens and self-delegate
//         vm.prank(address(governor));
//         value.mint(address(this), amountToMint);

//         value.delegate(address(this));
//     }

//     function fundUsers() internal {
//         // mint VOTE and VALUE tokens to alice, bob and carol
//         vm.startPrank(address(governor));
//         vote.mint(alice, amountToMint);
//         value.mint(alice, amountToMint);
//         vm.stopPrank();

//         vm.startPrank(alice);
//         vote.delegate(alice); // self delegate
//         value.delegate(alice); // self delegate
//         vm.stopPrank();

//         vm.startPrank(address(governor));
//         vote.mint(bob, amountToMint);
//         value.mint(bob, amountToMint);
//         vm.stopPrank();

//         vm.startPrank(bob);
//         vote.delegate(bob); // self delegate
//         value.delegate(bob); // self delegate
//         vm.stopPrank();

//         vm.startPrank(address(governor));
//         vote.mint(carol, amountToMint);
//         value.mint(carol, amountToMint);
//         vm.stopPrank();

//         vm.startPrank(carol);
//         vote.delegate(carol); // self delegate
//         value.delegate(carol); // self delegate
//         vm.stopPrank();
//     }

//     function getProposalIdAndHashedDescription(
//         address[] memory targets,
//         uint256[] memory values,
//         bytes[] memory calldatas,
//         string memory description
//     ) internal view returns (bytes32 hashedDescription, uint256 proposalId) {
//         hashedDescription = keccak256(abi.encodePacked(description));
//         proposalId = governor.hashProposal(targets, values, calldatas, hashedDescription);
//     }

//     function proposeAddingAnAddressToList(
//         address account
//     )
//         internal
//         returns (
//             uint256 proposalId,
//             address[] memory targets,
//             uint256[] memory values,
//             bytes[] memory calldatas,
//             bytes32 hashedDescription
//         )
//     {
//         // create proposal to add address to list
//         targets = new address[](1);
//         targets[0] = address(registrar);
//         values = new uint256[](1);
//         values[0] = 0;
//         calldatas = new bytes[](1);
//         calldatas[0] = abi.encodeWithSignature("addToList(bytes32,address)", LIST_NAME, account);
//         string memory description = "Add an address to a list";

//         (hashedDescription, proposalId) = getProposalIdAndHashedDescription(targets, values, calldatas, description);

//         // vote on proposal
//         cash.approve(address(registrar), tax);
//         governor.propose(targets, values, calldatas, description);
//     }

//     function addAnAddressToList() internal returns (uint256 proposalId, address account) {
//         account = makeAddr("someAddress");

//         address[] memory targets;
//         uint256[] memory values;
//         bytes[] memory calldatas;
//         bytes32 hashedDescription;

//         (proposalId, targets, values, calldatas, hashedDescription) = proposeAddingAnAddressToList(account);

//         // fast forward to an active voting period
//         vm.roll(block.number + governor.votingDelay() + 1);

//         // cast vote on proposal
//         governor.castVote(proposalId, yesVote);
//         // fast forward to end of voting period
//         vm.roll(block.number + governor.votingPeriod() + 1);

//         // execute proposal
//         governor.execute(targets, values, calldatas, hashedDescription);
//     }

//     function proposeEmergencyAppend(
//         address account
//     ) internal returns (uint256, address[] memory, uint256[] memory, bytes[] memory, bytes32) {
//         // the actual proposal to wrap as an emergency
//         bytes memory callData = abi.encode(LIST_NAME, account);

//         // the emergency proposal
//         address[] memory targets = new address[](1);
//         targets[0] = address(registrar);
//         uint256[] memory values = new uint256[](1);
//         values[0] = 0;
//         bytes[] memory calldatas = new bytes[](1);

//         calldatas[0] = abi.encodeWithSignature(
//             "emergency(uint8,bytes)",
//             uint8(IRegistrar.EmergencyType.AddToList),
//             callData
//         );

//         string memory description = "Emergency add of merchant";

//         (bytes32 hashedDescription, uint256 proposalId) = getProposalIdAndHashedDescription(
//             targets,
//             values,
//             calldatas,
//             description
//         );

//         cash.approve(address(registrar), tax);

//         // TODO: Check that `NewEmergencyProposal` event is emitted
//         // expectEmit();
//         // emit NewEmergencyProposal(proposalId);
//         governor.propose(targets, values, calldatas, description);

//         return (proposalId, targets, values, calldatas, hashedDescription);
//     }

//     function proposeReset(
//         string memory proposalDescription
//     ) internal returns (uint256, address[] memory, uint256[] memory, bytes[] memory, bytes32) {
//         address[] memory targets = new address[](1);
//         targets[0] = address(registrar);
//         uint256[] memory values = new uint256[](1);
//         values[0] = 0;
//         bytes[] memory calldatas = new bytes[](1);
//         bytes memory callData = abi.encodeWithSignature("reset()");
//         string memory description = proposalDescription;
//         calldatas[0] = callData;

//         bytes32 hashedDescription = keccak256(abi.encodePacked(description));
//         uint256 proposalId = governor.hashProposal(targets, values, calldatas, hashedDescription);

//         // create proposal
//         cash.approve(address(registrar), 12 * deployScript.tax());

//         uint256 spogProposalId = governor.propose(targets, values, calldatas, description);

//         // Make sure the proposal is immediately (+1 block) votable
//         assertEq(governor.proposalSnapshot(proposalId), block.number + 1);

//         assertTrue(spogProposalId == proposalId, "registrar proposal id does not match value governor proposal id");

//         return (proposalId, targets, values, calldatas, hashedDescription);
//     }

//     function proposeTaxRangeChange(
//         string memory proposalDescription
//     ) internal returns (uint256, address[] memory, uint256[] memory, bytes[] memory, bytes32) {
//         address[] memory targets = new address[](1);
//         targets[0] = address(registrar);
//         uint256[] memory values = new uint256[](1);
//         values[0] = 0;
//         bytes[] memory calldatas = new bytes[](1);
//         bytes memory callData = abi.encodeWithSignature("changeTaxRange(uint256,uint256)", 10e18, 12e18);
//         string memory description = proposalDescription;
//         calldatas[0] = callData;

//         bytes32 hashedDescription = keccak256(abi.encodePacked(description));
//         uint256 proposalId = governor.hashProposal(targets, values, calldatas, hashedDescription);

//         // uint256 epoch = governor.currentEpoch();

//         // create proposal
//         cash.approve(address(registrar), tax);

//         // TODO: add checks for 2 emitted events
//         // expectEmit();
//         // emit ProposalCreated();
//         // expectEmit();
//         // emit Proposal(epoch, proposalId, IDualGovernorQuorum.ProposalType.Double);
//         uint256 spogProposalId = governor.propose(targets, values, calldatas, description);
//         assertTrue(spogProposalId == proposalId, "registrar proposal ids don't match");

//         return (proposalId, targets, values, calldatas, hashedDescription);
//     }
// }
