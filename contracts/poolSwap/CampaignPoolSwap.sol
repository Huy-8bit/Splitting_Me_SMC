// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./libraries/Math.sol";
import "./libraries/UQ112x112.sol";
import "./ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// safe math
import "./libraries/SafeMath.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract CampaignPoolSwap is OwnableUpgradeable {
    ERC20 public usdtToken;
    ERC20 public token1;
    uint256 public swapFee;
    uint256 public ratio;

    mapping(address => uint256) public balancesAddPool;

    uint256 public poolusdtToken;
    uint256 public poolToken1;

    constructor() {}

    function initialize(
        address _usdtToken,
        address _token1,
        uint256 _swapFee,
        uint256 _ratio
    ) public initializer {
        usdtToken = ERC20(_usdtToken);
        token1 = ERC20(_token1);
        swapFee = _swapFee;
        ratio = _ratio;
    }

    function getReserves() public view returns (uint256, uint256) {
        return (
            usdtToken.balanceOf(address(this)),
            token1.balanceOf(address(this))
        );
    }

    function FramPool(address _tokenUSDT, uint256 _amount) external {
        require(_tokenUSDT == address(usdtToken), "Invalid token");
        usdtToken.transferFrom(msg.sender, address(this), _amount);
        balancesAddPool[msg.sender] += _amount;
    }

    function withdrawPool() external {
        uint256 amount = balancesAddPool[msg.sender];
        require(amount > 0, "Insufficient balance");
        balancesAddPool[msg.sender] = 0;
        usdtToken.transfer(msg.sender, amount);
    }

    function swap(address _from, address _to, uint256 _amount) external {
        require(
            _from == address(usdtToken) || _from == address(token1),
            "Invalid token"
        );

        require(
            _to == address(usdtToken) || _to == address(token1),
            "Invalid token"
        );

        uint256 amount0Out;
        uint256 amount1Out;
        if (_from == address(usdtToken)) {
            amount0Out = _amount;
            amount1Out = (_amount * ratio) / 100000;
        } else {
            amount0Out = (_amount * 100000) / ratio;
            amount1Out = _amount;
        }

        uint256 balance0 = usdtToken.balanceOf(address(this));
        uint256 balance1 = token1.balanceOf(address(this));
        require(
            amount0Out <= balance0 && amount1Out <= balance1,
            "Insufficient balance"
        );

        if (_from == address(usdtToken)) {
            // transfer fee usdtToken
            uint256 feeusdtToken = (amount0Out * swapFee) / 100000;
            usdtToken.transferFrom(msg.sender, address(this), feeusdtToken);
            amount0Out = amount0Out - feeusdtToken;
            usdtToken.transfer(address(this), amount0Out);
            token1.transfer(msg.sender, amount1Out);
        } else {
            // transfer fee usdtToken
            uint256 feeusdtToken = (amount0Out * swapFee) / 100000;
            usdtToken.transferFrom(msg.sender, address(this), feeusdtToken);
            amount0Out = amount0Out - feeusdtToken;
            usdtToken.transfer(msg.sender, amount0Out);
            token1.transfer(address(this), amount1Out);
        }
    }
}
