// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./YourToken.sol";

contract Vendor is Ownable {
    YourToken public token;
    
    event BuyTokens(address indexed buyer, uint256 amountOfTokens, uint256 amountOfETH);
    event SellTokens(address indexed seller, uint256 amountOfTokens, uint256 amountOfETH);

    constructor(address _token) {
        token = YourToken(_token);
    }

    function buyTokens() external payable {
        uint256 amountOfTokens = msg.value * 100; // Example rate
        require(token.balanceOf(address(this)) >= amountOfTokens, "Insufficient tokens in the reserve");
        token.transfer(msg.sender, amountOfTokens);
        emit BuyTokens(msg.sender, amountOfTokens, msg.value);
    }

    function sellTokens(uint256 amountOfTokens) external {
        require(token.allowance(msg.sender, address(this)) >= amountOfTokens, "Insufficient allowance");
        uint256 amountOfETH = amountOfTokens / 100; // Example rate
        require(address(this).balance >= amountOfETH, "Insufficient ETH in the reserve");
        token.transferFrom(msg.sender, address(this), amountOfTokens);
        payable(msg.sender).transfer(amountOfETH);
        emit SellTokens(msg.sender, amountOfTokens, amountOfETH);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
