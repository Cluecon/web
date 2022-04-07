import React from 'react'
import { Card, Image, Typography, Tag, Divider } from 'antd'
import { EnvironmentOutlined, FieldTimeOutlined } from '@ant-design/icons'
import moment from 'moment'

const { Title, Text } = Typography

type EventBodyProps = {
  title: string
  description: string
  address?: string
  isOnline: boolean
  startDate: string
  endDate: string
  tags: string[] | undefined
  cover: string | undefined
}

function EventBody(props: EventBodyProps) {
  function renderTags() {
    return props.tags?.map((t, i) => (
      <Tag key={i} color="#d818ff">
        {t}
      </Tag>
    ))
  }
  return (
    <Card bodyStyle={{ padding: '0' }}>
      <div>
        {/* TODO: handle empty cover */}
        <Image
          src={props.cover}
          alt={props.title}
          width="100%"
          height="60vh"
          style={{ borderRadius: '50px', objectFit: 'cover' }}
          preview={false}
        />
      </div>
      <div style={{ marginTop: 30 }}>
        <Title level={2}>{props.title}</Title>
      </div>
      <div>
        <EnvironmentOutlined style={{ fontSize: '24px', marginRight: 10, marginLeft: 15 }} />
        <Text>{props.address ? props.address : 'Online'}</Text>
        <Divider dashed orientation="left">
          Date
        </Divider>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FieldTimeOutlined style={{ fontSize: 24, marginRight: 20, marginLeft: 15 }} />
          <Text>
            {moment(props.startDate).format('llll')} To {moment(props.endDate).format('llll')}
          </Text>
        </div>
        <Divider dashed orientation="left">
          Tags
        </Divider>
        <div style={{ marginLeft: 15 }}>{renderTags()}</div>
        <Divider dashed orientation="left">
          Description
        </Divider>
        <div style={{ marginLeft: 15 }}>
          <Text>{props.description}</Text>
        </div>
      </div>
    </Card>
  )
}

export default EventBody
