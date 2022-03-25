import React, { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import UserContent from '../../components/account/UserContent'
import { ticketAddress, clueconnTicketsAddress } from '../../config'
import Ticket from '../../artifacts/contracts/Ticket.sol/Ticket.json'
import ClueconnTickets from '../../artifacts/contracts/ClueconnTickets.sol/ClueconnTickets.json'
import axios from 'axios'
import { Spin, Typography } from 'antd'
import { IEvent } from '../../models/event'

const { Title } = Typography

function UserProfile() {
  const [tickets, setTickets] = useState<IEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function loadTickets() {
    setIsLoading(true)
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const clueconnTicketContract = new ethers.Contract(clueconnTicketsAddress, ClueconnTickets.abi, signer)
    const tokenContract = new ethers.Contract(ticketAddress, Ticket.abi, provider)
    const data = await clueconnTicketContract.fetchMyTickets()

    const items = await Promise.all(
      data.map(
        async (i: {
          tokenId: { toNumber: () => any }
          price: { toString: () => ethers.BigNumberish }
          seller: any
          owner: any
        }) => {
          const tokenUri = await tokenContract.tokenURI(i.tokenId)
          console.log('tokenUri', tokenUri)
          const meta = await axios.get(tokenUri)
          const price = ethers.utils.formatUnits(i.price.toString(), 'ether')
          const item = {
            price,
            tokenId: i.tokenId.toNumber(),
            ...meta.data,
          }
          return item
        }
      )
    )
    setTickets(items)
    setIsLoading(false)
  }

  useEffect(() => {
    loadTickets()
  }, [])

  console.log('tickets', tickets)

  if (isLoading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  if (!isLoading && !tickets.length) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}
      >
        <Title style={{ textAlign: 'center' }} level={3}>
          You have not purchased any tickets yet!
        </Title>
      </div>
    )
  }

  return (
    <>
      <div>{/* <Cover /> */}</div>
      <div>{/* <UserInfo /> */}</div>
      <div>
        <UserContent events={tickets} />
      </div>
    </>
  )
}

export default UserProfile
