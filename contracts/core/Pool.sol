// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {IPool} from "../interfaces/IPool.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract Pool is IPool, Pausable, ReentrancyGuard  {

/* ======================= STORAGE ====================== */

    struct Participant {
        address id;
        uint64 contribution;
        bool isWinner;
    }
    mapping(address => Participant) public participantData;
    
    address[] public participants;
    address immutable public  poolInitiator;
    address immutable public  collective;
    address immutable public  tokenContract;

    uint256 public poolReward;    // total reward amount to be distributed to pool participants
    uint256 public rewardDistributed; 
    uint128 public totalContributions;

    bool public isDistributed;    // flag to indicate if reward has been distributed
    bool public isRewardReceived; // flag to indicate if pool reward has been received


/* ======================= MODIFIERS ====================== */
    modifier onlyPoolInitiator() {
        require(msg.sender == poolInitiator, "Pool__Authorization:OnlyInitiator");
        _;
    }
    modifier onlyCollective() {
        require(msg.sender == collective, "Pool__Authorization:OnlyCollective");
        _;
    }

/* ======================= EXTERNAL METHODS ====================== */


    constructor(address _tokenContract, address _initiator) {
        tokenContract = _tokenContract;
        poolInitiator = _initiator;
        collective = msg.sender;
    }

    function pause() external onlyCollective {
        _pause();
    }

    function unpause() external onlyCollective {
        _unpause();
    }

    receive() external payable {
        if (msg.sender == collective) {
            isRewardReceived = true;
            emit RewardReceived(msg.sender, msg.value);
        }
        poolReward += uint128(msg.value);
    }

    // @inheritdoc IPool
    function enterDraw(address _participant, uint256 _tokenID, uint256 _quantity, uint256 _amountPaid) 
    external onlyCollective whenNotPaused {
        participants.push(_participant);
        emit NewParticipant(_participant, _tokenID, _quantity, _amountPaid);
    }

    function startDraw(uint256[] memory _randomWords) external onlyPoolInitiator {        
        require(_randomWords.length > 0, "Invalid request");
        for (uint256 i = 0; i < _randomWords.length; i++) {
            uint256 winnerIndex = _randomWords[i] % participants.length;
            participantData[participants[winnerIndex]].isWinner = true;
            emit WinnerSelected(participants[winnerIndex]);
        }
    }

    function sendPrize(address[] calldata _tokenAddress, address[] calldata _winner, uint256[] calldata _tokenId, uint8[] calldata _type) external onlyPoolInitiator nonReentrant {
        require(_tokenAddress.length == _winner.length && _winner.length == _tokenId.length && _tokenId.length == _type.length, "Invalid input");
        for (uint256 i = 0; i < _tokenAddress.length;) {
            if (_winner[i] != address(0) && participantData[_winner[i]].isWinner == true) {
                if (_type[i] == 1) {
                    IERC721(_tokenAddress[i]).safeTransferFrom(address(this), _winner[i], _tokenId[i]);
                } else {
                    IERC1155(_tokenAddress[i]).safeTransferFrom(address(this), _winner[i], _tokenId[i], 1, "");
                }
                emit PrizeSent(_tokenAddress[i], _winner[i], _tokenId[i]);
            }

            unchecked {
                i++;
            }
        }
    }

    // withdraw all funds from the pool to collective, and destroy the pool
    function withdrawNative() external onlyPoolInitiator nonReentrant {
        (bool success, ) = payable(collective).call{value: address(this).balance}("");
        if (!success) {
            revert Pool__FailedToWithdrawFunds(collective, address(0), address(this).balance);
        }
        emit WithrawnToCollective(collective, address(0), address(this).balance);
    }

    // withdraw all ERC20 tokens from the pool to collective
    function withdrawERC20(address _tokenContract) external onlyPoolInitiator nonReentrant {
        uint256 balance = IERC20(_tokenContract).balanceOf(address(this));
        bool success = IERC20(_tokenContract).transfer(collective, balance);
        if (!success) {
            revert Pool__FailedToWithdrawFunds(collective, _tokenContract, balance);
        }
        emit WithrawnToCollective(collective, _tokenContract, balance);
    }

/* ======================= READ ONLY METHODS ====================== */

    // @inheritdoc IPool
     function getParticipantsCount() public view returns (uint256) {
        return participants.length;
     }

    // @inheritdoc IPool
    function getPoolInfo() public view returns 
    (address _tokenContract, uint256 _reward, uint256 _rewardDistributed, uint256 _totalContributions, bool _isRewardReceived, bool _isDistributed) {
        return (tokenContract, poolReward, rewardDistributed, totalContributions, isRewardReceived, isDistributed);
    }

    // @inheritdoc IPool
    function isPoolActive() public view returns (bool) {
        return paused();
    }

    // getParticipants
    function getParticipants() public view returns (address[] memory) {
        return participants;
    }
       
}