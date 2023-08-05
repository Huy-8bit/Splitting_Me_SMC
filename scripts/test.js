// test nft marketplace

const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { id } = require("ethers/lib/utils");
const utils = ethers.utils;
require("dotenv").config();
// const { WETH } = require("@uniswap/v2-periphery");
// comandline: npx hardhat test scripts/test.js --network sepolia

const nftFilePath = "./deployment/SplittingNFT.json";
// const SplittingTokenFilePath = "./deployment/SplittingToken.json";
const HeroItemFilePath = "./deployment/HeroItem.json";
// const SplittingMarketPlaceFilePath = "./deployment/SplittingMarketPlace.json";

// Read data from an NFT . JSON file
const nftJsonData = fs.readFileSync(nftFilePath, "utf-8");
const nftData = JSON.parse(nftJsonData);
const NFTAddress = nftData.SplittingNFTAddress;

// // Read data from SplittingToken's JSON file
// const SplittingTokenJsonData = fs.readFileSync(SplittingTokenFilePath, "utf-8");
// const splittingTokenData = JSON.parse(SplittingTokenJsonData);
// const tokenAddress = splittingTokenData.SplittingTokenAddress;

// Read data from HeroItem's JSON file
const HeroItemJsonData = fs.readFileSync(HeroItemFilePath, "utf-8");
const HeroItemData = JSON.parse(HeroItemJsonData);
const HeroItemAddress = HeroItemData.HeroItemAddress;

// // read data from SplittingMarketPlace's JSON file
// const SplittingMarketPlaceJsonData = fs.readFileSync(
//   SplittingMarketPlaceFilePath,
//   "utf-8"
// );
// const SplittingMarketPlaceData = JSON.parse(SplittingMarketPlaceJsonData);
// const SplittingMarketPlaceAddress = SplittingMarketPlaceData.SplittingMarketPlaceAddress;

const addres_recipient = "0xFd883589837bEEFf3dFdB97A821E0c71FF9BA20A";

describe("NFTMarketplace", function () {
  beforeEach(async function () {
    // SplittingNFT = await ethers.getContractFactory("SplittingNFT");
    // splittingNFT = await SplittingNFT.attach(NFTAddress);
    // SplittingToken = await ethers.getContractFactory("SplittingToken");
    // splittingToken = await SplittingToken.attach(tokenAddress);
    HeroItem = await ethers.getContractFactory("HeroItem");
    heroItem = await HeroItem.attach(HeroItemAddress);
    // SplittingMarketPlace = await ethers.getContractFactory("SplittingMarketPlace");
    // splittingMarketPlace = await SplittingMarketPlace.attach(SplittingMarketPlaceAddress);
    [owner] = await ethers.getSigners();
  });

  describe("NFT", function () {
    it("should return address", async function () {
      // console.log("owner: ", owner.address);
      // console.log("NFTAddress: ", NFTAddress);
      // console.log("tokenAddress: ", tokenAddress);
      // console.log("heroItem: ", HeroItemAddress);
      // console.log("SplittingMarketPlaceAddress: ", SplittingMarketPlaceAddress);
    });
    // it("Should transfer splittingToken", async function () {
    //   const amount = utils.parseEther("15000000000");
    //   const result = await splittingToken.transfer(
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
    //   const balance = await splittingNFT.checkBalance();
    //   console.log("balance: ", balance.toString());
    // });
    // it("Should create info NFT random", async function () {
    //   const result = await splittingNFT.calculateRandomNFTInfo();
    //   await new Promise((resolve) => setTimeout(resolve, 20000));
    //   console.log("result: ", result);
    // });
    // it("Should get info NFT random", async function () {
    //   const result = await splittingNFT.getMintedNFTInfo(owner.address);
    //   console.log("result: ", result);
    // });
    // it("Should crete NFT", async function () {
    //   const getInfoNFT = await splittingNFT.getMintedNFTInfo(owner.address);
    //   console.log("getInfoNFT: ", getInfoNFT);
    //   const tokenId = getInfoNFT.tokenId.toString();
    //   const rank = getInfoNFT.rank.toString();
    //   const price = getInfoNFT.mintingPrice.toString();
    //   console.log("tokenId: ", tokenId);
    //   console.log("rank: ", rank);
    //   console.log("price: ", price);
    //   const tokenURI =
    //     "https://red-flying-lynx-578.mypinata.cloud/ipfs/QmZqeKmGoquMG5nFCb9q82WHR4F1Rd3WeMbW1QEPJifHsc/nft.json";
    //   const result = await splittingNFT.mintNFTWithId(tokenId, tokenURI, {
    //     value: price,
    //   });
    //   console.log("result: ", result);
    // });
    // it("Should return NFTRank of nft ", async function () {
    //   const tokenId = 30748987;
    //   const NFTRank = await splittingNFT.getNFTRank(tokenId);
    //   console.log("NFTRank: ", NFTRank);
    // });
    // it("Should withdraw eth", async function () {
    //   const result = await splittingNFT.withdraw();
    //   console.log("result: ", result);
    // });
    // it("Should edit price", async function () {
    //   const rank = 3;
    //   const price = utils.parseEther("3");
    //   const result = await splittingNFT.editPriceMint(rank, price);
    //   console.log("result: ", result);
    // });
    // it("Should listed NFT on marketplace", async function () {
    //   const tokenId = 7;
    //   const result = await splittingMarketPlace.ListedNFT(
    //     tokenId,
    //     utils.parseEther("100000")
    //   );
    //   console.log("result: ", result);
    // });
    // it("should approve nft", async function () {
    //   const tokenId = 7;
    //   const result = await splittingNFT.approve(SplittingMarketPlaceAddress, tokenId);
    //   console.log("result: ", result);
    // });
    // it("buy nft ", async function () {
    //   const tokenId = 7;
    //   const NftBuyInfo = await splittingMarketPlace.getListedTokenForId(tokenId);
    //   await splittingToken.approve(SplittingMarketPlaceAddress, NftBuyInfo.price);
    //   const result = await splittingMarketPlace.buyNft(tokenId);
    //   console.log("result: ", result);
    // });
  });
});
