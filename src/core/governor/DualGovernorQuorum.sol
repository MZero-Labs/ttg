// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/utils/Checkpoints.sol";

import "src/interfaces/ISPOGGovernor.sol";

abstract contract DualGovernorQuorum is ISPOGGovernor {
    using Checkpoints for Checkpoints.Trace224;

    ISPOGVotes public immutable override vote;
    ISPOGVotes public immutable override value;

    uint256 private _valueQuorumNumerator; // DEPRECATED in favor of _quorumNumeratorHistory
    uint256 private _voteQuorumNumerator; // DEPRECATED in favor of _quorumNumeratorHistory

    /// @custom:oz-retyped-from Checkpoints.History
    Checkpoints.Trace224 private _valueQuorumNumeratorHistory;
    Checkpoints.Trace224 private _voteQuorumNumeratorHistory;

    event ValueQuorumNumeratorUpdated(uint256 oldValueQuorumNumerator, uint256 newValueQuorumNumerator);
    event VoteQuorumNumeratorUpdated(uint256 oldVoteQuorumNumerator, uint256 newVoteQuorumNumerator);

    /// @notice Construct a new governor instance with Double quorum logic
    constructor(
        string memory name_,
        address vote_,
        address value_,
        uint256 voteQuorumNumerator_,
        uint256 valueQuorumNumerator_
    ) Governor(name_) {
        vote = ISPOGVotes(vote_);
        value = ISPOGVotes(value_);
        _updateVoteQuorumNumerator(voteQuorumNumerator_);
        _updateValueQuorumNumerator(valueQuorumNumerator_);
    }

    function voteQuorumNumerator() public view virtual override returns (uint256) {
        return _voteQuorumNumeratorHistory._checkpoints.length == 0
            ? _voteQuorumNumerator
            : _voteQuorumNumeratorHistory.latest();
    }

    function valueQuorumNumerator() public view virtual override returns (uint256) {
        return _valueQuorumNumeratorHistory._checkpoints.length == 0
            ? _valueQuorumNumerator
            : _valueQuorumNumeratorHistory.latest();
    }

    function voteQuorumNumerator(uint256 timepoint) public view virtual override returns (uint256) {
        // If history is empty, fallback to old storage
        uint256 length = _voteQuorumNumeratorHistory._checkpoints.length;
        if (length == 0) {
            return _voteQuorumNumerator;
        }

        // Optimistic search, check the latest checkpoint
        Checkpoints.Checkpoint224 memory latest = _voteQuorumNumeratorHistory._checkpoints[length - 1];
        if (latest._key <= timepoint) {
            return latest._value;
        }

        // Otherwise, do the binary search
        // TODO: `upperLookupRecent` vs `upperLookup`, check that we use latest OZ libs
        return _voteQuorumNumeratorHistory.upperLookup(SafeCast.toUint32(timepoint));
    }

    function valueQuorumNumerator(uint256 timepoint) public view virtual override returns (uint256) {
        // If history is empty, fallback to old storage
        uint256 length = _valueQuorumNumeratorHistory._checkpoints.length;
        if (length == 0) {
            return _valueQuorumNumerator;
        }

        // Optimistic search, check the latest checkpoint
        Checkpoints.Checkpoint224 memory latest = _valueQuorumNumeratorHistory._checkpoints[length - 1];
        if (latest._key <= timepoint) {
            return latest._value;
        }

        // Otherwise, do the binary search
        // TODO:
        return _valueQuorumNumeratorHistory.upperLookup(SafeCast.toUint32(timepoint));
    }

    function quorumDenominator() public view virtual override returns (uint256) {
        return 100;
    }

    function voteQuorum(uint256 timepoint) public view virtual override returns (uint256) {
        return (vote.getPastTotalSupply(timepoint) * voteQuorumNumerator(timepoint)) / quorumDenominator();
    }

    function valueQuorum(uint256 timepoint) public view virtual override returns (uint256) {
        return (value.getPastTotalSupply(timepoint) * valueQuorumNumerator(timepoint)) / quorumDenominator();
    }

    function quorum(uint256 timepoint) public view virtual override returns (uint256) {
        return voteQuorum(timepoint);
    }

    function updateVoteQuorumNumerator(uint256 newVoteQuorumNumerator) external virtual override onlyGovernance {
        _updateVoteQuorumNumerator(newVoteQuorumNumerator);
    }

    function _updateVoteQuorumNumerator(uint256 newVoteQuorumNumerator) internal virtual {
        require(
            newVoteQuorumNumerator <= quorumDenominator(),
            "GovernorVotesQuorumFraction: quorumNumerator over quorumDenominator"
        );

        uint256 oldVoteQuorumNumerator = voteQuorumNumerator();

        // Make sure we keep track of the original numerator in contracts upgraded from a version without checkpoints.
        if (oldVoteQuorumNumerator != 0 && _voteQuorumNumeratorHistory._checkpoints.length == 0) {
            _voteQuorumNumeratorHistory._checkpoints.push(
                Checkpoints.Checkpoint224({_key: 0, _value: SafeCast.toUint224(oldVoteQuorumNumerator)})
            );
        }

        // Set new quorum for future proposals
        _voteQuorumNumeratorHistory.push(SafeCast.toUint32(block.number), SafeCast.toUint224(newVoteQuorumNumerator));

        emit VoteQuorumNumeratorUpdated(oldVoteQuorumNumerator, newVoteQuorumNumerator);
    }

    function updateValueQuorumNumerator(uint256 newValueQuorumNumerator) external virtual override onlyGovernance {
        _updateValueQuorumNumerator(newValueQuorumNumerator);
    }

    function _updateValueQuorumNumerator(uint256 newValueQuorumNumerator) internal virtual {
        require(
            newValueQuorumNumerator <= quorumDenominator(),
            "GovernorVotesQuorumFraction: quorumNumerator over quorumDenominator"
        );

        uint256 oldValueQuorumNumerator = voteQuorumNumerator();

        // Make sure we keep track of the original numerator in contracts upgraded from a version without checkpoints.
        if (oldValueQuorumNumerator != 0 && _valueQuorumNumeratorHistory._checkpoints.length == 0) {
            _valueQuorumNumeratorHistory._checkpoints.push(
                Checkpoints.Checkpoint224({_key: 0, _value: SafeCast.toUint224(oldValueQuorumNumerator)})
            );
        }

        // Set new quorum for future proposals
        _valueQuorumNumeratorHistory.push(SafeCast.toUint32(block.number), SafeCast.toUint224(newValueQuorumNumerator));

        emit ValueQuorumNumeratorUpdated(oldValueQuorumNumerator, newValueQuorumNumerator);
    }

    function _getVoteVotes(address account, uint256 timepoint, bytes memory /*params*/ )
        internal
        view
        virtual
        returns (uint256)
    {
        return vote.getPastVotes(account, timepoint);
    }

    function _getValueVotes(address account, uint256 timepoint, bytes memory /*params*/ )
        internal
        view
        virtual
        returns (uint256)
    {
        return value.getPastVotes(account, timepoint);
    }

    function _getVotes(address account, uint256 timepoint, bytes memory params)
        internal
        view
        virtual
        override
        returns (uint256)
    {
        return _getVoteVotes(account, timepoint, params);
    }
}
