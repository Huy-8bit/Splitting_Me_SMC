const { ethers } = require("hardhat");
const fs = require("fs");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
const utils = ethers.utils;

// comandline: npx hardhat run scripts/deploy.js --network sepolia

const TokenFilePath = "./deployment/SplittingToken.json";
const TokenSaleFilePath = "./deployment/TokenSale.json";
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("Deploying contracts with the account:", deployer.address);

  const RWA = await ethers.getContractFactory("SplittingToken"); // Replace with your actual RWA contract name
  const rwaContract = await RWA.deploy();
  await rwaContract.deployed();
  console.log("RWA Contract address:", rwaContract.address);
  var dataSave = {
    name: "SplittingToken",
    address: rwaContract.address,
  };
  fs.writeFileSync(TokenFilePath, JSON.stringify(dataSave, null, 2));

  const TokenSale = await ethers.getContractFactory("TokenSale"); // Replace with your actual TokenSale contract name
  const tokenSaleContract = await TokenSale.deploy(rwaContract.address);
  await tokenSaleContract.deployed();
  console.log("TokenSale Contract address:", tokenSaleContract.address);
  dataSave = {
    name: "TokenSale",
    address: tokenSaleContract.address,
  };
  fs.writeFileSync(TokenSaleFilePath, JSON.stringify(dataSave, null, 2));
  console.log("Deployment completed. Data saved to respective JSON files.");

  // tranfer all tokens to TokenSale contract
  const totalSupply = await rwaContract.totalSupply();
  const totalSupplyInWei = utils.parseEther(totalSupply.toString());
  console.log("Total supply: ", totalSupplyInWei.toString());
  await rwaContract.transfer(tokenSaleContract.address, totalSupply);
  console.log("All tokens transferred to TokenSale contract.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
