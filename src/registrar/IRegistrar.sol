// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

interface IRegistrar {
    // Enums
    enum EmergencyType {
        RemoveFromList,
        AddToList,
        UpdateConfig
    }

    // Events
    event AddressAddedToList(bytes32 indexed listName, address indexed account);
    event AddressRemovedFromList(bytes32 indexed listName, address indexed account);
    event ConfigUpdated(bytes32 indexed valueName, bytes32 indexed value);
    event EmergencyExecuted(uint8 indexed emergencyType, bytes callData);
    event ResetExecuted(address indexed newGovernor, address indexed newVote, uint256 indexed resetSnapshotId);
    event TaxChanged(uint256 oldTax, uint256 newTax);
    event TaxRangeChanged(uint256 oldLowerRange, uint256 newLowerRange, uint256 oldUpperRange, uint256 newUpperRange);
    event ProposalFeeCharged(address indexed account, uint256 indexed epoch, uint256 fee);

    // Errors
    error CallerIsNotGovernor();
    error EmergencyMethodNotSupported();
    error InvalidTaxRange();
    error OnlyGovernor();
    error TaxOutOfRange();
    error ZeroCashAddress();
    error ZeroDeployerAddress();
    error ZeroFixedReward();
    error ZeroGovernorAddress();
    error ZeroInflator();
    error ZeroTax();
    error ZeroValueAddress();
    error ZeroValueQuorum();
    error ZeroVaultAddress();
    error ZeroVoteQuorum();

    // Info functions about double governance and Controller parameters
    function governor() external view returns (address);

    function deployer() external view returns (address);

    function vault() external view returns (address);

    function cash() external view returns (address);

    function tax() external view returns (uint256);

    function taxLowerBound() external view returns (uint256);

    function taxUpperBound() external view returns (uint256);

    function inflator() external view returns (uint256);

    function fixedReward() external view returns (uint256);

    // Accepted `proposal` functions
    function addToList(bytes32 listName, address account) external;

    function removeFromList(bytes32 listName, address account) external;

    function updateConfig(bytes32 valueName, bytes32 value) external;

    function emergency(uint8 emergencyType, bytes calldata callData) external;

    function reset() external;

    function changeTax(uint256 newTax) external;

    function changeTaxRange(uint256 newLowerBound, uint256 newUpperBound) external;

    function isGovernedMethod(bytes4 func) external pure returns (bool);

    function chargeFee(address account, bytes4 func) external returns (uint256);

    function getInflation(uint256 amount) external view returns (uint256);

    // Registry functions
    function get(bytes32 key) external view returns (bytes32 value);

    function get(bytes32[] calldata keys) external view returns (bytes32[] memory values);

    function listContains(bytes32 listName, address account) external view returns (bool contains);
}