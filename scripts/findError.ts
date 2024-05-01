
import { ethers } from "hardhat";
import { AbiParameter } from "typechain";

type AbiError = { 
    name: string;
    inputs: { 
        internalType: string;
        name: string;
        type: string;
    }[];
};


const collectiveErrors = [
    {"name": "AddressEmptyCode", "inputs": [{"internalType": "address", "name": "target", "type": "address"}]},
    {"name": "Collective_MitMatchedLength", "inputs": [{"internalType": "uint256", "name": "tokenContracts", "type": "uint256"}, {"internalType": "uint256", "name": "honeyPots", "type": "uint256"}]},
    {"name": "Collective__Fallback", "inputs": []},
    {"name": "Collective__MemberAlreadyAdded", "inputs": [{"internalType": "address", "name": "member", "type": "address"}]},
    {"name": "Collective__NoValidInvite", "inputs": [{"internalType": "address", "name": "invitee", "type": "address"}, {"internalType": "bytes16", "name": "inviteID", "type": "bytes16"}]},
    {"name": "Collective__OnlyCWallet", "inputs": [{"internalType": "address", "name": "sender", "type": "address"}]},
    {"name": "Collective__OnlyInitiator", "inputs": [{"internalType": "address", "name": "sender", "type": "address"}]},
    {"name": "Collective__OnlyMember", "inputs": [{"internalType": "address", "name": "sender", "type": "address"}]},
    {"name": "Collective__OnlyOperator", "inputs": [{"internalType": "address", "name": "sender", "type": "address"}]},
    {"name": "Collective__PoolAlreadyAdded", "inputs": [{"internalType": "address", "name": "pool", "type": "address"}]},
    {"name": "Collective__PoolNotAdded", "inputs": [{"internalType": "address", "name": "pool", "type": "address"}]},
    {"name": "Collective__PoolRewardNotSent", "inputs": [{"internalType": "address", "name": "pool", "type": "address"}, {"internalType": "address", "name": "honeyPot", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}]},
    {"name": "ECDSAInvalidSignature", "inputs": []},
    {"name": "ECDSAInvalidSignatureLength", "inputs": [{"internalType": "uint256", "name": "length", "type": "uint256"}]},
    {"name": "ECDSAInvalidSignatureS", "inputs": [{"internalType": "bytes32", "name": "s", "type": "bytes32"}]},
    {"name": "ERC1967InvalidImplementation", "inputs": [{"internalType": "address", "name": "implementation", "type": "address"}]},
    {"name": "ERC1967NonPayable", "inputs": []},
    {"name": "FailedInnerCall", "inputs": []},
    {"name": "InvalidInitialization", "inputs": []},
    {"name": "NotInitializing", "inputs": []},
    {"name": "UUPSUnauthorizedCallContext", "inputs": []},
    {"name": "UUPSUnsupportedProxiableUUID", "inputs": [{"internalType": "bytes32", "name": "slot", "type": "bytes32"}]}

];
const mockTokenError = [
    {
        name: "ERC721IncorrectOwner",
        inputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "address", name: "owner", type: "address" }
        ],
        type: "error"
    },
    {
        name: "ERC721InsufficientApproval",
        inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" }
        ],
        type: "error"
    },
    {
        name: "ERC721InvalidApprover",
        inputs: [
            { internalType: "address", name: "approver", type: "address" }
        ],
        type: "error"
    },
    {
        name: "ERC721InvalidOperator",
        inputs: [
            { internalType: "address", name: "operator", type: "address" }
        ],
        type: "error"
    },
    {
        name: "ERC721InvalidOwner",
        inputs: [
            { internalType: "address", name: "owner", type: "address" }
        ],
        type: "error"
    },
    {
        name: "ERC721InvalidReceiver",
        inputs: [
            { internalType: "address", name: "receiver", type: "address" }
        ],
        type: "error"
    },
    {
        name: "ERC721InvalidSender",
        inputs: [
            { internalType: "address", name: "sender", type: "address" }
        ],
        type: "error"
    },
    {
        name: "ERC721NonexistentToken",
        inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" }
        ],
        type: "error"
    }
];
const honeyPotError = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "target",
                "type": "address"
            }
        ],
        "name": "AddressEmptyCode",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "ERC1967InvalidImplementation",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ERC1967NonPayable",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "FailedInnerCall",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "caller",
                "type": "address"
            }
        ],
        "name": "HoneyPot__OnlyOperator",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "HoneyPot__RewardFailedToSend",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "HoneyPot__TopContributorNotSet",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidInitialization",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotInitializing",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ReentrancyGuardReentrantCall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UUPSUnauthorizedCallContext",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "slot",
                "type": "bytes32"
            }
        ],
        "name": "UUPSUnsupportedProxiableUUID",
        "type": "error"
    }
]
const poolError = [
    {
        "inputs": [],
        "name": "EnforcedPause",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ExpectedPause",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_recipient",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "Pool__FailedToWithdrawFunds",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "Pool__NoRewardToDistribute",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "participant",
                "type": "address"
            }
        ],
        "name": "Pool__ZeroParticipation",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ReentrancyGuardReentrantCall",
        "type": "error"
    }
]
const cWalletError = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        }
      ],
      "name": "AddressEmptyCode",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "CWallet__FailedToReceiveReward",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "CWallet__FailedToWithdrawFunds",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "signer",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "CWallet__NotEnoughBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "CWallet__OnlyEntrypoint",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "CWallet__OnlyOperator",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        }
      ],
      "name": "CWallet__OnlyWhitelistedTargets",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ECDSAInvalidSignature",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "length",
          "type": "uint256"
        }
      ],
      "name": "ECDSAInvalidSignatureLength",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "ECDSAInvalidSignatureS",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "ERC1967InvalidImplementation",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ERC1967NonPayable",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "FailedInnerCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidInitialization",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotInitializing",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "UUPSUnauthorizedCallContext",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "slot",
          "type": "bytes32"
        }
      ],
      "name": "UUPSUnsupportedProxiableUUID",
      "type": "error"
    }
]  
const ZoraNFTError = [
    {
      "type": "error",
      "inputs": [],
      "name": "ADDRESS_DELEGATECALL_TO_NON_CONTRACT"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "ADDRESS_LOW_LEVEL_CALL_FAILED"
    },
    {
      "type": "error",
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "caller",
          "type": "address"
        }
      ],
      "name": "Burn_NotOwnerOrApproved"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "CREATOR_FUNDS_RECIPIENT_NOT_SET"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "INVALID_ETH_AMOUNT"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "INVALID_ETH_AMOUNT"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "WrongValueSent"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "SaleHasNotStarted"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "SaleEnded"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "Mint_InsolventSaleTransfer"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "Mint_ValueTransferFail"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "Mint_TokenIDMintNotAllowed"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "ONLY_MINTER"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "IncorrectAmountSent"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "TokenAlreadyCreated"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "TokenDoesNotExist"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "ETHTransferFailed"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "InvalidTokenPrice"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "InvalidRecipient"
    },
    {
      "type": "error",
      "inputs": [
        { "internalType": "address", "name": "user", "type": "address" },
        { "internalType": "uint256", "name": "limit", "type": "uint256" },
        { "internalType": "uint256", "name": "requestedAmount", "type": "uint256" }
      ],
      "name": "UserExceedsMintLimit"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "InvalidMintSchedule"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "OnlyTransfersFromZoraMints"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "Call_TokenIdMismatch"
    },
    {
      "type": "error",
      "inputs": [
        { "internalType": "uint256", "name": "expected", "type": "uint256" },
        { "internalType": "uint256", "name": "actual", "type": "uint256" }
      ],
      "name": "TokenIdMismatch"
    },
    {
      "type": "error",
      "inputs": [
        { "internalType": "address", "name": "user", "type": "address" },
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
        { "internalType": "uint256", "name": "role", "type": "uint256" }
      ],
      "name": "UserMissingRoleForToken"
    },
    {
      "type": "error",
      "inputs": [
        { "internalType": "address", "name": "proposedAddress", "type": "address" }
      ],
      "name": "Config_TransferHookNotSupported"
    },
    // Additional errors from IMinterErrors and other interfaces go here
    // ...
    {
      "type": "error",
      "inputs": [],
      "name": "InvalidSignatureVersion"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "premintSignerContractNotAContract"
    },
    // Continue with the remaining errors as needed
    // ...
    {
      "type": "error",
      "inputs": [
        { "internalType": "bytes", "name": "reason", "type": "bytes" }
      ],
      "name": "CallFailed"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "Renderer_NotValidRendererContract"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "TokenNotMintable"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "ERC20TransferSlippage"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "InvalidPremintVersion"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "NonEthRedemption"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "ERC1155_MINT_TO_ZERO_ADDRESS"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "FirstMinterAddressZero"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "premintSignerContractFailedToRecoverSigner"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "InvalidSignature"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "premintSignerContractNotAContract"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "InvalidSignatureVersion"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "PremintDeleted"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "MintNotYetStarted"
    },
    {
      "type": "error",
      "inputs": [
        {
          "internalType": "bytes",
          "name": "lowLevelData",
          "type": "bytes"
        }
      ],
      "name": "CallFailed"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "Call_TokenIdMismatch"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "CallerNotZoraCreator1155"
    },
    {
      "type": "error",
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maxMintAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maxSupply",
          "type": "uint256"
        }
      ],
      "name": "CannotMintMoreTokens"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "Config_TransferHookNotSupported"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "ERC1155_ACCOUNTS_AND_IDS_LENGTH_MISMATCH"
    },
    {
      "type": "error",
      "inputs": [],
      "name": "ERC1155_ADDRESS_ZERO_IS_NOT_A_VALID_OWNER"
    }
  ]
const ERC20MinterError = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        }
      ],
      "name": "AddressEmptyCode",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "AddressInsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "AddressZero",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "AlreadyInitialized",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ERC20TransferSlippage",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "FailedInnerCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidCurrency",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "OnlyZoraRewardsRecipient",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "PricePerTokenTooLow",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "RequestMintInvalidUseMint",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "SafeERC20FailedOperation",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "SaleEnded",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "SaleHasNotStarted",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "limit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "requestedAmount",
          "type": "uint256"
        }
      ],
      "name": "UserExceedsMintLimit",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "WrongValueSent",
      "type": "error"
    }
  ]

const errorAbis = [collectiveErrors, mockTokenError, honeyPotError, poolError, cWalletError, ZoraNFTError, ERC20MinterError];

// Function to create the full error signature
function getErrorSignature(error: AbiError) {
    const types = error.inputs.map(input => input.type);
    return `${error.name}(${types.join(',')})`;
}
// Function to find the matching error
function findMatchingError(signature: string) {
  for (let abi in errorAbis) {
    for (let error of ZoraNFTError) {
      const errorSignature = getErrorSignature(error);
      const hashedSignature = ethers.keccak256(ethers.toUtf8Bytes(errorSignature));
      const shortSignature = hashedSignature.slice(0, 10); // First 4 bytes

      if (shortSignature === signature) {
          return error;
      }
    }
  }
    
  return null;
}
const signature = '0xd9f55f13';
const matchingError = findMatchingError(signature);

if (matchingError) {
    console.log('Matching Error:', matchingError.name);
}  else {
    console.log('No matching error found');
}
