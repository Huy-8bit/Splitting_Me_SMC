// test nft marketplace

const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { id } = require("ethers/lib/utils");
const utils = ethers.utils;
require("dotenv").config();
// const { WETH } = require("@uniswap/v2-periphery");
// comandline: npx hardhat test scripts/test.js --network sepolia

const TokenFilePath = "./deployment/Token.json";
const tokenData = fs.readFileSync(TokenFilePath);
const tokenJSON = JSON.parse(tokenData);
const tokenAddress = tokenJSON.address;

const addres_recipient = "0xf30607e0cdEc7188d50d2bb384073bF1D5b02fA4";

describe("Splitting Me", function () {
  beforeEach(async function () {
    const Token = await ethers.getContractFactory("PornHub");
    token = await Token.attach(tokenAddress);

    [owner] = await ethers.getSigners();
    console.log("owner: ", owner.address);
    console.log("token: ", token.address);
  });

  describe("Token", function () {
    it("should addBots", async function () {
      const result = await token.delBots([
        "0x0749a37209317bCBA0ebf0C26d70ad62990119DF",
      ]);
      console.log("result: ", result);
    });
    // it("should delBots", async function () {
    //   const result = await token.delBots([
    //     "0x0749a37209317bCBA0ebf0C26d70ad62990119DF",
    //   ]);
    //   console.log("result: ", result);
    // });
  });
});

// it("should transfer token", async function () {
//   const amount = 100;
//   const amountWei = utils.parseEther(amount.toString());
//   const result = await token.transfer(addres_recipient, amountWei);
//   console.log("result: ", result);
// });
