const { ethers } = require("hardhat");
const fs = require("fs");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
const utils = ethers.utils;

// comandline: npx hardhat run scripts/deploy.js --network shibarium

const TokenFilePath = "./deployment/Token.json";
// const TokenSaleFilePath = "./deployment/TokenSale.json";
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("Deploying contracts with the account:", deployer.address);

  const RWA = await ethers.getContractFactory("PornHub"); // Replace with your actual RWA contract name
  const rwaContract = await RWA.deploy();
  await rwaContract.deployed();
  console.log("RWA Contract address:", rwaContract.address);
  var dataSave = {
    name: "PornHub",
    address: rwaContract.address,
  };
  fs.writeFileSync(TokenFilePath, JSON.stringify(dataSave, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
