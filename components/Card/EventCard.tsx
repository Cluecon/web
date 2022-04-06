import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, Typography, Image, Button, Modal, Input } from 'antd'
import {
  EnvironmentOutlined,
  FieldTimeOutlined,
  QrcodeOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons'
import axios from 'axios'
// import { QRCodeSVG } from 'qrcode.react';

const { Title, Text } = Typography

type EventCardProps = {
  cid: string
  title: string
  cover: string
  strartDate: string
  endDate: string
  location: string
  isTicket?: boolean
  tokenId?: string
  owner?: string
  creator?: string
  price?: string
}

function EventCard(props: EventCardProps) {
  const [isQrVisible, setIsQrVisible] = useState(false)
  const [ticketPasscode, setTicketPasscode] = useState<string | undefined>()

  async function fetchTicketPasscode() {
    if (props.isTicket) {
      try {
        const responseData = await axios.get(
          `https://us-central1-clueconn-73e93.cloudfunctions.net/api/code/${props.cid}/${props.tokenId}`
        )
        if (responseData.status == 200) {
          setTicketPasscode(responseData.data.code)
        }
      } catch (error) {
        console.log('error')
      }
    }
  }

  useEffect(() => {
    fetchTicketPasscode()
  }, [])

  return (
    <>
      <Card
        hoverable
        style={{ width: 300, margin: 20, height: 380, position: 'relative' }}
        cover={<Image alt={props.title} src={props.cover} height="150px" preview={false} />}
      >
        {props.isTicket && (
          <div style={{ position: 'absolute', top: 5, right: 5 }}>
            <Button type="primary" size="middle" icon={<QrcodeOutlined />} onClick={() => setIsQrVisible(true)}>
              PASS CODE
            </Button>
            <Modal
              title="Ticket Passcode"
              centered
              visible={isQrVisible}
              onOk={() => setIsQrVisible(false)}
              onCancel={() => setIsQrVisible(false)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* <QRCodeSVG value={JSON.stringify({ creator: props.creator, eventId: props.cid, tokenId: props.tokenId, owner: props.owner, price: props.price })} /> */}
                {ticketPasscode ? (
                  <Input.Password
                    placeholder="input password"
                    value={ticketPasscode}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                ) : (
                  <Title level={3}>No Passcode generated Please contact support@clueconn.com</Title>
                )}
              </div>
            </Modal>
          </div>
        )}
        <Link href={`/event/${props.cid}`}>
          <a>
            <Title level={3}>{props.title.length > 55 ? `${props.title.substring(0, 50)}...` : props.title}</Title>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FieldTimeOutlined style={{ fontSize: 24, marginRight: 20, marginLeft: 15 }} />
              <Text>
                {props.strartDate} To {props.endDate}
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <EnvironmentOutlined style={{ fontSize: '24px', marginRight: 10, marginLeft: 15 }} />
              <Text>{props.location}</Text>
            </div>
          </a>
        </Link>
      </Card>
    </>
  )
}

export default EventCard
