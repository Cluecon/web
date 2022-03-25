// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract ClueconnTickets is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _ticketsSold;
    Counters.Counter private _ticketIds;

    address payable owner;
    // price to be payed to the original event creator on ticket resale
    uint256 ticketListingPrice = 0.010 ether;

    constructor() {
      owner = payable(msg.sender);
    }

    struct Ticket {
      uint ticketId;
      address ticketContract;
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      bool sold;
    }

    mapping(uint256 => Ticket) private idToTicket;

    event TicketCreated (
      uint indexed ticketId,
      address indexed ticketContract,
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      bool sold
    );

    function getTicketListingPrice() public view returns (uint256) {
      return ticketListingPrice;
    }

    function createTicket(
      address ticketContract,
      uint256 tokenId,
      uint256 price,
      address organizer
    ) public payable nonReentrant {
      require(msg.value == ticketListingPrice, "Price must be equal to ticket listing price");

      _ticketIds.increment();
      uint256 ticketId = _ticketIds.current();

      idToTicket[ticketId] = Ticket(
        ticketId,
        ticketContract,
        tokenId,
        payable(address(organizer)),
        payable(address(0)),
        price,
        false
      );

      IERC721(ticketContract).transferFrom(msg.sender, address(this), tokenId);

      emit TicketCreated(
        ticketId,
        ticketContract,
        tokenId,
        msg.sender,
        address(0),
        price,
        false
      );
    }

    function createTicketSale(
      address ticketContract,
      uint256 ticketId
    ) public payable nonReentrant {
      uint price = idToTicket[ticketId].price;
      uint tokenId = idToTicket[ticketId].tokenId;
      require(msg.value == price, "Please submit the ticket price to complete purchase");

      idToTicket[ticketId].seller.transfer(msg.value);
      IERC721(ticketContract).transferFrom(address(this), msg.sender, tokenId);
      idToTicket[ticketId].owner = payable(msg.sender);
      idToTicket[ticketId].sold = true;
      _ticketsSold.increment();
      payable(owner).transfer(ticketListingPrice);
    }

    function fetchMyTickets() public view returns (Ticket[] memory) {
      uint totalItemCount = _ticketIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToTicket[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      Ticket[] memory items = new Ticket[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToTicket[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          Ticket storage currentItem = idToTicket[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
  }
}