/* eslint-disable @typescript-eslint/no-var-requires */
// const { expect } = require("chai");
const { ethers } = require('hardhat')

describe('ClueconnTickets', function () {
  it('Should create and execute ticket sales', async function () {
    /* deploy the marketplace */
    const ClueconnTickets = await ethers.getContractFactory('ClueconnTickets')
    const clueconnTickets = await ClueconnTickets.deploy()
    await clueconnTickets.deployed()
    const clueconnTicketsAddress = clueconnTickets.address

    const Ticket = await ethers.getContractFactory('Ticket')
    const ticket = await Ticket.deploy(clueconnTicketsAddress)
    await ticket.deployed()
    const ticketContractAddress = ticket.address

    let ticketListingPrice = await clueconnTickets.getTicketListingPrice()
    ticketListingPrice = ticketListingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('100', 'ether')

    await ticket.createToken('https:/www.mytokenlocation.com')
    await ticket.createToken('https:/www.mytokenlocation.com')

    await clueconnTickets.createTicket(ticketContractAddress, 1, auctionPrice, { value: ticketListingPrice })
    await clueconnTickets.createTicket(ticketContractAddress, 2, auctionPrice, { value: ticketListingPrice })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, buyerAddress] = await ethers.getSigners()

    await clueconnTickets.connect(buyerAddress).createTicketSale(ticketContractAddress, 1, { value: auctionPrice })
  })
})
