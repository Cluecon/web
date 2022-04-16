/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Avatar, Typography, Tabs, Tag, Space, Button, Modal, Form, Input, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'

const { Title, Text } = Typography
const { TabPane } = Tabs

function MyAccount() {
  const [editVisible, setEditVisible] = useState(false)

  const onEditFinish = async (values: any) => {
    try {
      console.log('save')
    } catch (error: any) {
      console.log(error)
    }
  }

  const onEditFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    message.error('Incomplete fields!')
  }
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div style={{ width: '100%', height: '25vh' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div style={{ width: '100%', height: '100%' }}>
              <img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src="https://joeschmoe.io/api/v1/random"
                alt=""
              />
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 5, cursor: 'pointer' }}>
              <EditOutlined style={{ fontSize: 32 }} />
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: -95, left: '50%' }}>
          <div style={{ position: 'relative' }}>
            <div>
              <Avatar size={100} src="https://joeschmoe.io/api/v1/random" />
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 5, cursor: 'pointer' }}>
              <EditOutlined style={{ fontSize: 24 }} />
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div>
              <Title>Likono</Title>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 120,
          position: 'relative',
        }}
      >
        <Space>
          <Text>Address: </Text>
          <Tag color="#d818ff">0x0637df715E70C9aCf4DCbf14ba930a2f9F6Ee1E0</Tag>
        </Space>
        <div style={{ position: 'absolute', right: 10, bottom: -35 }}>
          <Button onClick={() => setEditVisible(true)} shape="round" type="primary" icon={<EditOutlined />}>
            Edit Profile
          </Button>
        </div>
      </div>
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <div style={{ position: 'relative', width: '80%' }}>
          <Tabs centered style={{ width: '80%' }} defaultActiveKey="1">
            <TabPane tab="My Events" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Going" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Past Events" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
      <Modal title="Edit Profile" centered visible={editVisible} footer={null} onCancel={() => setEditVisible(false)}>
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onEditFinish}
          onFinishFailed={onEditFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="username" label="Username" rules={[{ required: true, message: "username can't be empty" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default MyAccount
