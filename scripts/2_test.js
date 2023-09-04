// test nft marketplace

const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { id } = require("ethers/lib/utils");
const utils = ethers.utils;
require("dotenv").config();
// const { WETH } = require("@uniswap/v2-periphery");
// comandline: npx hardhat test scripts/2_test.js --network sepolia

const NFTSplittingMEFilePath = "./deployment/NFTSplittingME.json";
const CampaignTypesTokenERC20FilePath =
  "./deployment/CampaignTypesTokenERC20.json";
const FactoryTokenFilePath = "./deployment/FactoryToken.json";

const NFTSplittingMEData = fs.readFileSync(NFTSplittingMEFilePath);
const NFTSplittingMEJSON = JSON.parse(NFTSplittingMEData);
const NFTSplittingMEAddress = NFTSplittingMEJSON.address;

const CampaignTypesTokenERC20Data = fs.readFileSync(
  CampaignTypesTokenERC20FilePath
);
const CampaignTypesTokenERC20JSON = JSON.parse(CampaignTypesTokenERC20Data);
const CampaignTypesTokenERC20Address = CampaignTypesTokenERC20JSON.address;

const FactoryTokenData = fs.readFileSync(FactoryTokenFilePath);
const FactoryTokenJSON = JSON.parse(FactoryTokenData);
const FactoryTokenAddress = FactoryTokenJSON.address;

const addres_recipient = "0xf30607e0cdEc7188d50d2bb384073bF1D5b02fA4";
// const addres_recipient = "0x469f72990944a8b60664A2e5185635b266E826b0";
// Define variables for contract instances and owner
let nftSplittingME;
let campaignTypesTokenERC20;
let factoryToken;
let owner;

describe("Splitting Me", function () {
  beforeEach(async function () {
    const NFTSplittingME = await ethers.getContractFactory("NFTSplittingME");
    nftSplittingME = await NFTSplittingME.attach(NFTSplittingMEAddress);

    const CampaignTypesTokenERC20 = await ethers.getContractFactory(
      "CampaignTypesTokenERC20"
    );
    campaignTypesTokenERC20 = await CampaignTypesTokenERC20.attach(
      CampaignTypesTokenERC20Address
    );

    const FactoryToken = await ethers.getContractFactory("FactoryToken");
    factoryToken = await FactoryToken.attach(FactoryTokenAddress);

    [owner] = await ethers.getSigners();
    console.log("owner: ", owner.address);
  });

  describe("Splitting Me", function () {
    // it("should add a new slot mintNFT ", async function () {
    //   const result = await factoryToken.addSlotMintNFT(addres_recipient);
    //   console.log("result: ", result);
    // });
    // it("should create a new NFT ", async function () {
    //   const result = await factoryToken.mintNFT("link");
    //   console.log("result: ", result);
    // });
    // it("should create a new campagn ", async function () {
    //   const result = await factoryToken.createNewCampaign(
    //     "BDS2",
    //     "BL",
    //     3
    //   );
    //   console.log("result: ", result);
    // });
    // it("Should mint token", async function () {
    //   const tokenContract = await ethers.getContractAt(
    //     "CampaignTypesTokenERC20",
    //     "0x614a2428c44a9270dfe99fa85eab1894044579a9"
    //   );
    //   const result = await tokenContract.mint(
    //     owner.address,
    //     ethers.utils.parseEther("25000000")
    //   );
    //   console.log("result: ", result);
    // });
  });
});
