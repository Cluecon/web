import React, { useState } from 'react'
import { Card, Button, Affix, Typography } from 'antd'
import Image from 'next/image'
import Select from 'react-select'
import styles from '../../../styles/Details.module.css'
import { DetailsAffixProps } from '../Affix/DetailsAffix'

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
        console.log('buy ticket')
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
