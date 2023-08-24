// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SplittingToken.sol";

contract TokenSale is Ownable {
    IERC20 public token; // The token being sold

    struct Package {
        uint256 price;
        uint256 tokens;
        uint256 commissionPercentage;
    }

    mapping(string => Package) public packages;
    mapping(address => address) public referrals;
    mapping(address => uint256) public userLevels; // Mapping to store user levels

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);

        packages["Basic"] = Package(0.001 ether, 10000 * 10 ** 18, 1);
        packages["Bronze"] = Package(0.01 ether, 100000 * 10 ** 18, 10);
        packages["Silver"] = Package(0.02 ether, 200000 * 10 ** 18, 20);
        packages["Gold"] = Package(0.045 ether, 450000 * 10 ** 18, 45);
    }

    function buyPackage(string memory _packageName) external payable {
        require(packages[_packageName].price > 0, "Invalid package name");

        uint256 ethAmount = packages[_packageName].price;
        uint256 tokensToReceive = packages[_packageName].tokens;

        // Transfer tokens to the buyer
        require(msg.value >= ethAmount, "Insufficient ether sent");
        token.transfer(msg.sender, tokensToReceive);

        // balance tokens to the user
        uint256 balance = token.balanceOf(msg.sender);
        if (balance >= 10000 * 10 ** 18 && balance < 100000 * 10 ** 18) {
            userLevels[msg.sender] = 1;
        } else if (
            balance >= 100000 * 10 ** 18 && balance < 200000 * 10 ** 18
        ) {
            userLevels[msg.sender] = 2;
        } else if (
            balance >= 200000 * 10 ** 18 && balance < 450000 * 10 ** 18
        ) {
            userLevels[msg.sender] = 3;
        } else if (balance >= 450000 * 10 ** 18) {
            userLevels[msg.sender] = 4;
        }

        // Refund excess ether
        if (msg.value > ethAmount) {
            payable(msg.sender).transfer(msg.value - ethAmount);
        }
    }

    function buyPackageWithReferral(
        string memory _packageName,
        address _referrer
    ) external payable {
        require(packages[_packageName].price > 0, "Invalid package name");

        uint256 ethAmount = packages[_packageName].price;
        uint256 tokensToReceive = packages[_packageName].tokens;
        uint256 commissionPercentage = packages[_packageName]
            .commissionPercentage;

        // Calculate referral commission and update referral mapping
        if (_referrer != address(0) && _referrer != msg.sender) {
            tokensToReceive += (tokensToReceive * commissionPercentage) / 100;
            referrals[msg.sender] = _referrer;
        }

        // Transfer tokens to the buyer
        require(msg.value >= ethAmount, "Insufficient ether sent");
        token.transfer(msg.sender, tokensToReceive);

        // Distribute commission to referrer
        address referrer = referrals[msg.sender];
        if (referrer != address(0)) {
            token.transfer(
                referrer,
                (tokensToReceive * commissionPercentage) / 100
            );
        }

        // Refund excess ether
        if (msg.value > ethAmount) {
            payable(msg.sender).transfer(msg.value - ethAmount);
        }
    }

    function setPackage(
        string memory _packageName,
        uint256 _price,
        uint256 _tokens,
        uint256 _commissionPercentage
    ) external onlyOwner {
        packages[_packageName] = Package(
            _price,
            _tokens,
            _commissionPercentage
        );
    }

    function getPrice(
        string memory _packageName
    ) external view returns (uint256) {
        return packages[_packageName].price;
    }

    function withdrawEther() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
