import { EnvironmentOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { Card, Typography, Image } from 'antd'
import Link from 'next/link'
import React from 'react'

const { Title, Text } = Typography

type EventCardProps = {
  cid: string
  title: string
  cover: string
  strartDate: string
  endDate: string
  location: string
}

function EventCard(props: EventCardProps) {
  return (
    <>
      <Link href={`/event/${props.cid}`}>
        <a>
          <Card
            hoverable
            style={{ width: 300, margin: 20, height: 380 }}
            cover={<Image alt={props.title} src={props.cover} height="150px" preview={false} />}
          >
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
          </Card>
        </a>
      </Link>
    </>
  )
}

export default EventCard
