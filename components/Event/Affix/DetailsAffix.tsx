import React, { useState } from 'react'
import { Card, Affix, Typography, Button, Spin } from 'antd'
import Select from 'react-select'
import Image from 'next/image'
import styles from '../../../styles/Details.module.css'
import { parseInt } from 'lodash'

const { Title } = Typography

export type IClass = {
  id: number
  name: string
  price: string
  amount: string
}

export type DetailsAffixProps = {
  classes?: IClass[]
  isFree: boolean
  ipfsUrl: string
  rate: string
  eventId: string
}

function DetailsAffix(props: DetailsAffixProps) {
  function getOptions() {
    let options: { value: string; label: string }[] | undefined = []
    if (props.isFree) {
      options = [
        {
          value: 'Free',
          label: 'Free',
        },
      ]
    } else {
      options = props.classes?.map((cl) => {
        return {
          value: cl.name,
          label: cl.name,
        }
      })
    }
    return options
  }
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null)
  const [ticketPrice, setTicketPrice] = useState<string | undefined>()
  const [isTransctionLoading, setIsTransactionLoading] = useState(false)

  function renderPrice() {
    if (props.isFree) {
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
          {parseFloat(pMatic) > 0 ? pMatic : 0} MATIC
        </div>
      )
    }
  }

  async function buyTicket() {
    setIsTransactionLoading(true)
    if (!ticketPrice && !props.isFree) {
      alert('Please select ticket option')
    } else {
      try {
        console.log('buy ticket')
      } catch (error) {
        setIsTransactionLoading(false)
        console.log('error', error)
      }
    }
  }

  if (isTransctionLoading) {
    return (
      <div
      // style={{
      //   position: 'fixed',
      //   top: '50%',
      //   left: '50%',
      // }}
      >
        <Spin size="large" />
      </div>
    )
  }

  return (
    <>
      <Affix offsetTop={20}>
        <Card>
          <>
            <Title level={5}>Type</Title>
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
              options={getOptions()}
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
              {renderPrice()}
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
          </>
        </Card>
      </Affix>
    </>
  )
}

export default DetailsAffix
