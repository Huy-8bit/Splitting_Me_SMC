// test nft marketplace

const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { id } = require("ethers/lib/utils");
const utils = ethers.utils;
require("dotenv").config();
// const { WETH } = require("@uniswap/v2-periphery");
// comandline: npx hardhat test scripts/test.js --network sepolia

const nftFilePath = "./deployment/HeroNFT.json";
// const HeroTokenFilePath = "./deployment/HeroToken.json";
const HeroItemFilePath = "./deployment/HeroItem.json";
// const HeroMarketPlaceFilePath = "./deployment/HeroMarketPlace.json";

// Read data from an NFT . JSON file
const nftJsonData = fs.readFileSync(nftFilePath, "utf-8");
const nftData = JSON.parse(nftJsonData);
const NFTAddress = nftData.HeroNFTAddress;

// // Read data from HeroToken's JSON file
// const HeroTokenJsonData = fs.readFileSync(HeroTokenFilePath, "utf-8");
// const heroTokenData = JSON.parse(HeroTokenJsonData);
// const tokenAddress = heroTokenData.HeroTokenAddress;

// Read data from HeroItem's JSON file
const HeroItemJsonData = fs.readFileSync(HeroItemFilePath, "utf-8");
const HeroItemData = JSON.parse(HeroItemJsonData);
const HeroItemAddress = HeroItemData.HeroItemAddress;

// // read data from HeroMarketPlace's JSON file
// const HeroMarketPlaceJsonData = fs.readFileSync(
//   HeroMarketPlaceFilePath,
//   "utf-8"
// );
// const HeroMarketPlaceData = JSON.parse(HeroMarketPlaceJsonData);
// const HeroMarketPlaceAddress = HeroMarketPlaceData.HeroMarketPlaceAddress;

const addres_recipient = "0xFd883589837bEEFf3dFdB97A821E0c71FF9BA20A";

describe("NFTMarketplace", function () {
  beforeEach(async function () {
    // HeroNFT = await ethers.getContractFactory("HeroNFT");
    // heroNFT = await HeroNFT.attach(NFTAddress);
    // HeroToken = await ethers.getContractFactory("HeroToken");
    // heroToken = await HeroToken.attach(tokenAddress);
    HeroItem = await ethers.getContractFactory("HeroItem");
    heroItem = await HeroItem.attach(HeroItemAddress);
    // HeroMarketPlace = await ethers.getContractFactory("HeroMarketPlace");
    // heroMarketPlace = await HeroMarketPlace.attach(HeroMarketPlaceAddress);
    [owner] = await ethers.getSigners();
  });

  describe("NFT", function () {
    it("should return address", async function () {
      // console.log("owner: ", owner.address);
      // console.log("NFTAddress: ", NFTAddress);
      // console.log("tokenAddress: ", tokenAddress);
      // console.log("heroItem: ", HeroItemAddress);
      // console.log("HeroMarketPlaceAddress: ", HeroMarketPlaceAddress);
    });
    // it("Should transfer heroToken", async function () {
    //   const amount = utils.parseEther("15000000000");
    //   const result = await heroToken.transfer(
    //     "0xf30607e0cdEc7188d50d2bb384073bF1D5b02fA4",
    //     amount
    //   );
    //   console.log("result: ", result);
    // });
    // it("Should mint a new token and return the correct tokenURI", async function () {
    //   const tokenId = 13;
    //   const tokenURI = "my-token-uri";
    //   const result = await heroItem.mint(
    //     owner.address,
    //     tokenId,
    //     1000,
    //     tokenURI
    //   );
    //   console.log("result: ", result);
    // });
    // it("Should return token uri", async function () {
    //   const tokenId = 13;
    //   const actualTokenURI = await HeroItem.uri(tokenId);
    //   console.log("actualTokenURI: ", actualTokenURI);
    // });
    // it("Should send token", async function () {
    //   const tokenId = 12;
    //   const amount = 5;
    //   const result = await heroItem.safeTransferFrom(
    //     owner.address,
    //     addres_recipient,
    //     tokenId,
    //     amount,
    //     "0x"
    //   );
    //   console.log("result: ", result);
    // });
    // it("Should return balance of owner", async function () {
    //   const balance = await heroNFT.checkBalance();
    //   console.log("balance: ", balance.toString());
    // });
    // it("Should create info NFT random", async function () {
    //   const result = await heroNFT.calculateRandomNFTInfo();
    //   await new Promise((resolve) => setTimeout(resolve, 20000));
    //   console.log("result: ", result);
    // });
    // it("Should get info NFT random", async function () {
    //   const result = await heroNFT.getMintedNFTInfo(owner.address);
    //   console.log("result: ", result);
    // });
    // it("Should crete NFT", async function () {
    //   const getInfoNFT = await heroNFT.getMintedNFTInfo(owner.address);
    //   console.log("getInfoNFT: ", getInfoNFT);
    //   const tokenId = getInfoNFT.tokenId.toString();
    //   const rank = getInfoNFT.rank.toString();
    //   const price = getInfoNFT.mintingPrice.toString();
    //   console.log("tokenId: ", tokenId);
    //   console.log("rank: ", rank);
    //   console.log("price: ", price);
    //   const tokenURI =
    //     "https://red-flying-lynx-578.mypinata.cloud/ipfs/QmZqeKmGoquMG5nFCb9q82WHR4F1Rd3WeMbW1QEPJifHsc/nft.json";
    //   const result = await heroNFT.mintNFTWithId(tokenId, tokenURI, {
    //     value: price,
    //   });
    //   console.log("result: ", result);
    // });
    // it("Should return NFTRank of nft ", async function () {
    //   const tokenId = 30748987;
    //   const NFTRank = await heroNFT.getNFTRank(tokenId);
    //   console.log("NFTRank: ", NFTRank);
    // });
    // it("Should withdraw eth", async function () {
    //   const result = await heroNFT.withdraw();
    //   console.log("result: ", result);
    // });
    // it("Should edit price", async function () {
    //   const rank = 3;
    //   const price = utils.parseEther("3");
    //   const result = await heroNFT.editPriceMint(rank, price);
    //   console.log("result: ", result);
    // });
    // it("Should listed NFT on marketplace", async function () {
    //   const tokenId = 7;
    //   const result = await heroMarketPlace.ListedNFT(
    //     tokenId,
    //     utils.parseEther("100000")
    //   );
    //   console.log("result: ", result);
    // });
    // it("should approve nft", async function () {
    //   const tokenId = 7;
    //   const result = await heroNFT.approve(HeroMarketPlaceAddress, tokenId);
    //   console.log("result: ", result);
    // });
    // it("buy nft ", async function () {
    //   const tokenId = 7;
    //   const NftBuyInfo = await heroMarketPlace.getListedTokenForId(tokenId);
    //   await heroToken.approve(HeroMarketPlaceAddress, NftBuyInfo.price);
    //   const result = await heroMarketPlace.buyNft(tokenId);
    //   console.log("result: ", result);
    // });
  });
});
