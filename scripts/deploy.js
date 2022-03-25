/* eslint-disable @typescript-eslint/no-var-requires */

const hre = require('hardhat')
const fs = require('fs')

async function main() {
  const ClueconnTickets = await hre.ethers.getContractFactory('ClueconnTickets')
  const clueconnTickets = await ClueconnTickets.deploy()
  await clueconnTickets.deployed()
  console.log('clueconnTickets deployed to:', clueconnTickets.address)

  const Ticket = await hre.ethers.getContractFactory('Ticket')
  const ticket = await Ticket.deploy(clueconnTickets.address)
  await ticket.deployed()
  console.log('ticket deployed to:', ticket.address)

  let config = `
  export const clueconnTicketsAddress = "${clueconnTickets.address}"
  export const ticketAddress = "${ticket.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
