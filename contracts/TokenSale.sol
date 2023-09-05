// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SplittingToken.sol";

contract TokenSale is Ownable {
    IERC20 public token;
    uint256 public totalSuply;

    enum Rank {
        Basic,
        Bronze,
        Silver,
        Gold
    }
    struct Package {
        uint256 price;
        uint256 tokens;
    }

    mapping(Rank => Package) public packages;
    mapping(address => address) public referrals;
    mapping(address => uint256) public userLevels;

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
        packages[Rank.Basic] = Package(0.001 ether, 10000 * 10 ** 18); // 0
        packages[Rank.Bronze] = Package(0.01 ether, 100000 * 10 ** 18); // 1
        packages[Rank.Silver] = Package(0.02 ether, 200000 * 10 ** 18); // 2
        packages[Rank.Gold] = Package(0.045 ether, 450000 * 10 ** 18); // 3
    }

    function buyPackage(uint256 _packageName) external payable {
        require(
            token.balanceOf(address(this)) >=
                packages[Rank(_packageName)].tokens,
            "TokenSale: not enough tokens"
        );
        if (Rank(_packageName) == Rank.Basic) {
            require(
                totalSuply < 1000 && msg.value == 0.0001 ether,
                "TokenSale: invalid price"
            );
            totalSuply += 1;
        } else {
            require(
                msg.value == packages[Rank(_packageName)].price,
                "TokenSale: invalid price"
            );
        }
        token.transfer(msg.sender, packages[Rank(_packageName)].tokens);
    }

    function checkSlotBasic() external view returns (uint256) {
        return totalSuply;
    }

    function setPackage(
        uint256 _packageName,
        uint256 _price,
        uint256 _tokens
    ) external onlyOwner {
        packages[Rank(_packageName)] = Package(_price, _tokens);
    }

    function getPrice(uint256 _packageName) external view returns (uint256) {
        if (Rank(_packageName) == Rank.Basic && totalSuply < 1000) {
            return 0.0001 ether;
        }
        return packages[Rank(_packageName)].price;
    }

    function withdrawEther() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
