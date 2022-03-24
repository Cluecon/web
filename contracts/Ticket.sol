// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract Ticket is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address clueconnTicketsAddress) ERC721("Clueconn Tokens", "CLUE") {
        contractAddress = clueconnTicketsAddress;
    }

    function createToken(string memory tokenURI) public returns (uint) {
         _tokenIds.increment();
         uint256 newTicketId = _tokenIds.current();

         _mint(msg.sender, newTicketId);
         _setTokenURI(newTicketId, tokenURI);
         setApprovalForAll(contractAddress, true);
         return newTicketId;
    }
}