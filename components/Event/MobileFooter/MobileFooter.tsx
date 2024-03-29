import React, { useState } from 'react'
import { Card, Button, Affix, Typography } from 'antd'
import Image from 'next/image'
import Select from 'react-select'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import styles from '../../../styles/Details.module.css'
import { DetailsAffixProps } from '../Affix/DetailsAffix'
import ClueconnTickets from '../../../artifacts/contracts/ClueconnTickets.sol/ClueconnTickets.json'
import Ticket from '../../../artifacts/contracts/Ticket.sol/Ticket.json'
import { clueconnTicketsAddress, ticketAddress } from '../../../config'

const { Title } = Typography

function MobileFooter(props: DetailsAffixProps) {
  const options = props.classes?.map((cl) => {
    return {
      value: cl.name,
      label: cl.name,
    }
  })
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null)
  const [ticketPrice, setTicketPrice] = useState<string | undefined>()

  function renderPrice() {
    if (!props.classes || !selectedOption) {
      return 'Free'
    }
    if (!ticketPrice) {
      return 'Select Option'
    }
    if (ticketPrice) {
      const mFloat = parseInt(ticketPrice) / parseFloat(props.rate)
      const pMatic = (Math.round(mFloat * 100) / 100).toFixed(2)
      return (
        <div style={{ display: 'flex' }}>
          ${ticketPrice}
          <div style={{ margin: '0px 10px 0px 10px' }}>
            <Image src="/assets/polygon.png" alt="me" width="20" height="20" />
          </div>
          {pMatic} MATIC
        </div>
      )
    }
  }

  async function buyTicket() {
    if (!ticketPrice) {
      alert('Please select ticket option')
    } else {
      try {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        /* next, create the ticket */
        let contract = new ethers.Contract(ticketAddress, Ticket.abi, signer)
        let transaction = await contract.createToken(props.ipfsUrl)
        const tx = await transaction.wait()
        const event = tx.events[0]
        const value = event.args[2]
        const tokenId = value.toNumber()
        const mFloat = parseInt(ticketPrice) / parseFloat(props.rate)
        const toSavePrice = ticketPrice === 'Free' ? 0 : mFloat
        const price = ethers.utils.parseUnits(toSavePrice.toString(), 'ether')
        contract = new ethers.Contract(clueconnTicketsAddress, ClueconnTickets.abi, signer)
        let listingPrice = await contract.getTicketListingPrice()
        listingPrice = listingPrice.toString()
        transaction = await contract.createTicket(ticketAddress, tokenId, price, props.creator, props.eventId, {
          value: listingPrice,
        })
        await transaction.wait()

        // Buy Ticket

        contract = new ethers.Contract(clueconnTicketsAddress, ClueconnTickets.abi, signer)
        const buyPrice = ethers.utils.parseUnits(toSavePrice.toString(), 'ether')
        transaction = await contract.createTicketSale(ticketAddress, tokenId, {
          value: buyPrice,
        })
        await transaction.wait()
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  return (
    <>
      <Affix style={{ width: '100%' }} offsetBottom={10}>
        <Card
          style={{ width: '100%' }}
          bodyStyle={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <Select
              defaultValue={selectedOption}
              //  @ts-ignore
              onChange={(opt) => {
                setSelectedOption(opt)
                let price
                if (props.classes) {
                  const pPrice = props.classes.filter((c) => c.name == opt?.value)[0].price
                  if (parseInt(pPrice) > 0) {
                    price = pPrice
                  } else {
                    price = 'Free'
                  }
                  setTicketPrice(price)
                }
              }}
              options={options}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: '#d818ff',
                },
              })}
            />
            <Title style={{ marginTop: 20 }} level={5}>
              ${renderPrice()}
            </Title>
            <Button
              style={{ marginTop: 20 }}
              className={styles.button}
              type="primary"
              shape="round"
              size="large"
              onClick={buyTicket}
            >
              Buy Ticket
            </Button>
          </div>
        </Card>
      </Affix>
    </>
  )
}

export default MobileFooter
