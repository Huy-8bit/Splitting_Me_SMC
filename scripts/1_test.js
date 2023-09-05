// test nft marketplace

const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { id } = require("ethers/lib/utils");
const utils = ethers.utils;
require("dotenv").config();
// const { WETH } = require("@uniswap/v2-periphery");
// comandline: npx hardhat test scripts/1_test.js --network sepolia

const TokenFilePath = "./deployment/SplittingToken.json";
const TokenSaleFilePath = "./deployment/TokenSale.json";

const tokenData = fs.readFileSync(TokenFilePath);
const tokenJSON = JSON.parse(tokenData);
const tokenAddress = tokenJSON.address;

const tokenSaleData = fs.readFileSync(TokenSaleFilePath);
const tokenSaleJSON = JSON.parse(tokenSaleData);
const tokenSaleAddress = tokenSaleJSON.address;

const addres_recipient = "0xFd883589837bEEFf3dFdB97A821E0c71FF9BA20A";

describe("Splitting Me", function () {
  beforeEach(async function () {
    const SplittingToken = await ethers.getContractFactory("SplittingToken");
    splittingToken = await SplittingToken.attach(tokenAddress);

    const TokenSale = await ethers.getContractFactory("TokenSale");
    tokenSale = await TokenSale.attach(tokenSaleAddress);

    [owner] = await ethers.getSigners();
    console.log("owner: ", owner.address);
    console.log("SplittingToken: ", splittingToken.address);
    console.log("TokenSale: ", tokenSale.address);
  });

  describe("Token", function () {
    // it("should buyPackage", async function () {
    //   for (var i = 0; i < 100; i++) {
    //     packageBuy = 0;
    //     var price = await tokenSale.getPrice(packageBuy);
    //     console.log("price: ", price.toString());
    //     _value = price.toString();
    //     const result = await tokenSale.buyPackage(packageBuy, {
    //       value: _value,
    //     });
    //     console.log("result: ", result);
    //     // delay 15s
    //     await new Promise((r) => setTimeout(r, 15000));
    //   }
    // });
    it("should buyPackage", async function () {
      for (var i = 0; i < 100; i++) {
        packageBuy = 1;
        var price = await tokenSale.getPrice(packageBuy);
        console.log("price: ", price.toString());
        _value = price.toString();
        const result = await tokenSale.buyPackage(packageBuy, {
          value: _value,
        });
        console.log("result: ", result);
        // delay 15s
        await new Promise((r) => setTimeout(r, 15000));
      }
    });
    // it("should buyPackage", async function () {
    //   const price = await tokenSale.getPrice("Bronze");
    //   console.log("price: ", price.toString());
    //   _value = price.toString();
    //   const result = await tokenSale.buyPackageWithReferral(
    //     "Bronze",
    //     "0x469f72990944a8b60664A2e5185635b266E826b0",
    //     {
    //       value: _value,
    //     }
    //   );
    //   console.log("result: ", result);
    // });
  });
});
