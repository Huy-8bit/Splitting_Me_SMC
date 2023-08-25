// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// import SafeMath
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// import IUniswapV2Router02
// import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

// contract Token is ERC20("TienLo", "RWA"), Ownable {
//     uint256 private cap = 100_000_000_000 * 10 ** 18;

//     uint256 platformFee = 10;
//     mapping(address => bool) private blacklist;

//     constructor() {
//         _mint(msg.sender, cap);
//     }

//     function editCap(uint256 _newCap) external onlyOwner {
//         require(
//             _newCap > ERC20.totalSupply(),
//             "New cap must be greater than total supply"
//         );
//         cap = _newCap;
//     }

//     function addToBlacklist(address _address) public onlyOwner {
//         blacklist[_address] = true;
//     }

//     function removeFromBlacklist(address _address) public onlyOwner {
//         blacklist[_address] = false;
//     }

//     function isBlacklisted(address _address) public view returns (bool) {
//         return blacklist[_address];
//     }

//     function transfer(
//         address _to,
//         uint256 _amount
//     ) public override returns (bool) {
//         require(!blacklist[msg.sender], "Sender is blacklisted");
//         require(!blacklist[_to], "Recipient is blacklisted");
//         return super.transfer(_to, _amount);
//     }

//     function mint(address _to, uint256 _amount) public onlyOwner {
//         require(ERC20.totalSupply() + _amount <= cap, "Token: cap exceeded");
//         _mint(_to, _amount);
//     }
// }
