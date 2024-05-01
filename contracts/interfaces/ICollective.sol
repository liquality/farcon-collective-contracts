// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "../interfaces/AA/IEntryPoint.sol";

/// @title Collective interface
/// @notice This contract represents the collective interface
/// @dev This contract is used to interact with the collective contract
interface ICollective {

    /* EVENTS */

    event NewMember(address indexed member);
    event MemberRemoved(address indexed member);
    event OperatorRenounced(address indexed operator);
    event CollectiveInitialized(address indexed initiator, address indexed operator);
    event PoolAdded(address indexed pool, address indexed tokenContract, address indexed honeyPot, address initiator);
    event RewardForwarded(address indexed pool, address indexed honeyPot, uint256 indexed amount, address tokenContract);
    event CWalletSet(address indexed cWallet);

    /* ERRORS */
    error Collective__Fallback();
    error Collective__PoolNotAdded(address pool);
    error Collective__OnlyOperator(address sender);
    error Collective__OnlyInitiator(address sender);
    error Collective__PoolAlreadyAdded(address pool);
    error Collective__MemberAlreadyAdded(address member);
    error Collective__OnlyCWallet(address sender);
    error Collective__OnlyMember(address sender);
    error Collective_MitMatchedLength(uint256 tokenContracts, uint256 honeyPots);
    error Collective__NoValidInvite(address invitee, bytes16 inviteID);
    error Collective__PoolRewardNotSent(address pool, address honeyPot, uint256 amount);


    /* METHODS */

    /* ---- WRITE METHODS ---- */
    /// @notice Create a new pool
    /// @dev This function is called by the collective, to create a new pool
    /// @param _tokenContracts The address of the token contract
    /// @param _honeyPots The address of the honey pot
    function createPools(address[] calldata _tokenContracts, address[] calldata _honeyPots) external ; // Only group admin or whitelisted members

    /// @notice Whitelist target addresses on wallet
    /// @dev This function is called by the collective, to whitelist target addresses on wallet
    /// @param _targets The address of the target
    function whitelistTargets(address[] calldata _targets) external;
    
    // recordPoolMint
    /// @notice Record pool mint
    /// @dev This function is called by the pool, to record the pool mint
    /// @param _tokenID The token ID
    /// @param _quantity The quantity
    /// @param _amountPaid The amount paid
    /// @param _pool The address of the pool
    /// @param _participant The address of the participant
    function recordPoolMint(address _pool, address _participant, uint256 _tokenID, uint256 _quantity, uint256 _amountPaid)  external;
}

