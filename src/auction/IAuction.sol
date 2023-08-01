// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

interface IAuction {
    event AuctionPurchase(address indexed buyer, uint256 amount, uint256 price);
    event AuctionWithdrawal(address indexed taker, uint256 amount);

    // immutable vars
    function auctionToken() external returns (address);

    function paymentToken() external returns (address);

    function vault() external returns (address);

    function auctionDuration() external returns (uint256);

    function auctionEndTime() external returns (uint256);

    function floorPrice() external returns (uint256);

    // public vars
    function auctionTokenAmount() external returns (uint256);

    function amountSold() external returns (uint256);

    function ceilingPrice() external returns (uint256);

    function lastBuyPrice() external returns (uint256);

    // functions
    function initialize(
        address auctionToken_,
        address paymentToken_,
        uint256 auctionDuration_,
        uint256 auctionTokenAmount_
    ) external;

    function getCurrentPrice() external returns (uint256);

    function buyTokens(uint256 amountToBuy) external;

    function withdraw() external;
}
