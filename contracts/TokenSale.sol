// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SplittingToken.sol";
import "./USDT.sol";

contract TokenSale is Ownable {
    IERC20 public token;
    IERC20 public usdt;
    uint256 public totalSupply;

    enum Rank {
        Basic,
        Bronze,
        Silver,
        Gold
    }
    struct Package {
        uint256 priceUsdt; // Giá của gói trong USDT
        uint256 tokens;
    }

    mapping(Rank => Package) public packages;
    mapping(address => address) public referrals;
    mapping(address => uint256) public userLevels;

    constructor(address _tokenAddress, address _usdtAddress) {
        token = IERC20(_tokenAddress);
        usdt = IERC20(_usdtAddress);
        packages[Rank.Basic] = Package(1000 * 10 ** 18, 10000 * 10 ** 18); // 1000 USDT, 10,000 tokens
        packages[Rank.Bronze] = Package(10000 * 10 ** 18, 100000 * 10 ** 18); // 10,000 USDT, 100,000 tokens
        packages[Rank.Silver] = Package(20000 * 10 ** 18, 200000 * 10 ** 18); // 20,000 USDT, 200,000 tokens
        packages[Rank.Gold] = Package(45000 * 10 ** 18, 450000 * 10 ** 18); // 45,000 USDT, 450,000 tokens
    }

    function buyPackage(uint256 _packageName, uint _usdtSend) external {
        require(
            token.balanceOf(address(this)) >=
                packages[Rank(_packageName)].tokens,
            "TokenSale: not enough tokens"
        );
        require(
            usdt.transferFrom(
                msg.sender,
                address(this),
                packages[Rank(_packageName)].priceUsdt
            ),
            "TokenSale: USDT transfer failed"
        );

        if (Rank(_packageName) == Rank.Basic) {
            require(
                totalSupply < 1000 && _usdtSend >= 100 * 10 ** 18,
                "TokenSale: invalid price"
            );
            totalSupply += 1;
        }

        token.transfer(msg.sender, packages[Rank(_packageName)].tokens);
    }

    function checkSlotBasic() external view returns (uint256) {
        return totalSupply;
    }

    function setPackage(
        uint256 _packageName,
        uint256 _priceUsdt,
        uint256 _tokens
    ) external onlyOwner {
        packages[Rank(_packageName)] = Package(_priceUsdt, _tokens);
    }

    function getPrice(uint256 _packageName) external view returns (uint256) {
        if (Rank(_packageName) == Rank.Basic && totalSupply < 1000) {
            return 100 * 10 ** 18;
        }
        return packages[Rank(_packageName)].priceUsdt;
    }

    function withdrawEther() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function withdrawUSDT() external onlyOwner {
        usdt.transfer(owner(), usdt.balanceOf(address(this)));
    }
}
