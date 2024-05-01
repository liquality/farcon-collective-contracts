import { setBalance } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, upgrades } from "hardhat";
import { Bytecode } from "hardhat/internal/hardhat-network/stack-traces/model";
// import {HoneyPot__factory} from "../typechain";

async function main() {
    console.log("Deploying from account:", (await ethers.getSigners())[0].address);
    console.log("Deploying from account:", (await ethers.provider.getBalance((await ethers.getSigners())[0].address)).toString());
    // deployEntryPoint()
    // await deployMockToken()
    // await honeyPotFactory()
    console.log(`.........Deploying CollectiveFactory......... \n`)
    await collectiveFactory(process.env.ENTRY_POINT_ADDRESS as string)
}

async function escrowFactory() {
    console.log(".........Deploying RewardEscrowFactory ......... \n")
    let rewardContractFactory = await ethers.getContractFactory("RewardEscrowFactory");
    let escrowFactory =  await upgrades.deployProxy(rewardContractFactory);
    await escrowFactory.waitForDeployment();
    let escrowFactoryAddress = await escrowFactory.getAddress();
  
    let escrowFactoryImpl = await upgrades.erc1967.getImplementationAddress(escrowFactoryAddress)
    let escrowFactoryProxyAdmin = await upgrades.erc1967.getAdminAddress(escrowFactoryAddress)
  
    console.log(`.........RewardEscrowFactory deployed at ${escrowFactoryAddress} ......... \n`)
    console.log(`.........RewardEscrowFactory impl deployed at ${escrowFactoryImpl} ......... \n`)
    console.log(`.........RewardEscrowFactory proxy admin deployed at ${escrowFactoryProxyAdmin} ......... \n`)
}

async function collectiveFactory(entryPoint: string) {
    console.log(".........Deploying CollectiveFactory ......... \n")
    let contractFactory = (await ethers.getContractFactory("CollectiveFactory")).connect((await ethers.getSigners())[0]);
    let cFactory =  (await contractFactory.connect((await ethers.getSigners())[0]).deploy(ethers.getAddress((entryPoint))));
    await cFactory.waitForDeployment();
    let cFactoryAddress = await cFactory.getAddress();
  
    console.log(`.........cFactory deployed at ${cFactoryAddress} ......... \n`)
}

async function honeyPotFactory() {
    console.log(".........Deploying HoneyPotFactory ......... \n")
    let contractFactory = await ethers.getContractFactory("HoneyPotFactory");
    let hFactory =  await contractFactory.connect((await ethers.getSigners())[2]).deploy();
    await hFactory.waitForDeployment();
    console.log(`.........hFactory deployed at ${await hFactory.getAddress()} ......... \n`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
