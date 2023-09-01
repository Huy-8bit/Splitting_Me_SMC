// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SplittingToken.sol";

contract TokenSale is Ownable {
    IERC20 public token; // The token being sold
    uint256 public totalSuply;
    struct Package {
        uint256 price;
        uint256 tokens;
    }

    mapping(string => Package) public packages;
    mapping(address => address) public referrals;
    mapping(address => uint256) public userLevels;

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
        packages["Basic"] = Package(0.001 ether, 10000 * 10 ** 18);
        packages["Bronze"] = Package(0.01 ether, 100000 * 10 ** 18);
        packages["Silver"] = Package(0.02 ether, 200000 * 10 ** 18);
        packages["Gold"] = Package(0.045 ether, 450000 * 10 ** 18);
    }

    function buyPackage(string memory _packageName) external payable {
        // check package name is valid
        require(
            packages[_packageName].price > 0,
            "TokenSale: invalid package name"
        );

        // Compare package name using keccak256
        bytes32 packageNameHash = keccak256(bytes(_packageName));
        bytes32 basicPackageHash = keccak256(bytes("Basic"));

        if (packageNameHash == basicPackageHash) {
            if (totalSuply < 1000) {
                require(msg.value >= 0.0001 ether, "TokenSale: invalid price");
                payable(address(this)).transfer(msg.value);
                token.transfer(msg.sender, 1000 * 10 ** 18);
                totalSuply += 1;
            }
        }

        require(
            msg.value >= packages[_packageName].price,
            "TokenSale: invalid price"
        );
        payable(address(this)).transfer(msg.value);
        token.transfer(msg.sender, packages[_packageName].tokens);
    }

    function setPackage(
        string memory _packageName,
        uint256 _price,
        uint256 _tokens
    ) external onlyOwner {
        packages[_packageName] = Package(_price, _tokens);
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
