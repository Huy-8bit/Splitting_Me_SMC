// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import "./CampaignTypesTokenERC20.sol";

contract FactoryToken {
    address public campaignTypesTokenERC20Template;

    constructor(address _campaignTypesTokenERC20Template) {
        campaignTypesTokenERC20Template = _campaignTypesTokenERC20Template;
    }

    function createNewCampaign() external returns (address) {
        address newCampaign = Clones.clone(campaignTypesTokenERC20Template);
        return newCampaign;
    }
}
