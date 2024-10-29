// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Buying{
    address public owner;
    uint256 public moviePrice;

    event MoviePurchased(address indexed buyer, string movieName, uint256 movieYear);

    constructor(uint256 _moviePrice) {
        owner = msg.sender;
        moviePrice = _moviePrice;
    }

    function purchaseMovie(string memory movieName, uint256 movieYear) external payable {
        require(msg.value >= moviePrice, "Insufficient payment amount");

        emit MoviePurchased(msg.sender, movieName, movieYear);
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    function setMoviePrice(uint256 _newPrice) external {
        require(msg.sender == owner, "Only owner can set movie price");
        moviePrice = _newPrice;
    }
}
