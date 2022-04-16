import React, { useState } from 'react'
import Link from 'next/link'
import { Button, Modal, Form, Input, Checkbox, Tabs, message, Avatar, Dropdown, Menu, Space } from 'antd'
import Image from 'next/image'
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons'
import { LoginOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import styles from './Navbar.module.css'
import { useUserContext } from '../../context/user'
import { createUser, getUserByUsername, geUserById } from '../../services/firebase'
import { IUser } from '../../models/user'

const { TabPane } = Tabs

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

function Navbar() {
  const { user, updateUser } = useUserContext()
  const auth = getAuth()
  const [loginVisible, setLoginVisible] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)

  const onLoginFinish = async (values: any) => {
    try {
      setLoginLoading(true)
      await signInWithEmailAndPassword(auth, values.email, values.password)
      setLoginLoading(false)
      setLoginVisible(false)
    } catch (error: any) {
      console.log(error.message)
      if (error.message.includes('user-not-found')) {
        message.error('User not found')
      } else {
        message.error('Internal Server Error')
      }
      setLoginLoading(false)
    }
  }

  const onLoginFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    message.error('Incomplete fields!')
  }
  const onRegisterFinish = async (values: any) => {
    try {
      setRegisterLoading(true)
      const userPresent = await getUserByUsername(values.username)
      if (userPresent) {
        message.error('Username already taken! Please select a different username')
      } else {
        const userCredentials = await createUserWithEmailAndPassword(auth, values.email, values.password)
        const registeredUser: IUser = {
          uid: userCredentials.user.uid,
          email: userCredentials.user.email as string,
          username: values.username,
        }
        await createUser(registeredUser)
        const userDetails = await geUserById(userCredentials.user.uid)
        if (userDetails) {
          updateUser(userDetails)
        }
        setRegisterLoading(false)
        setLoginVisible(false)
      }
    } catch (error) {
      console.log('error')
      message.error('Internal Server Error')
      setRegisterLoading(false)
    }
  }

  const onRegisterFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    message.error('Incomplete fields!')
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <Link href={`/account/${user?.uid}`}>
          <a>
            <Button type="primary" shape="round" size="large">
              Profile
            </Button>
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Button
          onClick={async () => {
            await signOut(auth)
          }}
          type="primary"
          shape="round"
          size="large"
        >
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  )
  return (
    <header className={styles.container}>
      <div className={styles.right}>
        <Link href="/">
          <a>
            <Image src="/assets/logo.png" alt="me" width="55" height="55" />
          </a>
        </Link>
      </div>
      <div className={styles.left}>
        {!user ? (
          <>
            <Button
              type="primary"
              shape="round"
              icon={<PlusCircleOutlined />}
              size="large"
              onClick={() => setLoginVisible(true)}
            >
              Login
            </Button>
          </>
        ) : (
          <Space>
            <Link href="/new/title">
              <a>
                <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size="large">
                  Create
                </Button>
              </a>
            </Link>
            <div style={{ cursor: 'pointer' }}>
              <Dropdown overlay={menu} placement="bottom">
                <Avatar size={{ xs: 40, sm: 40, md: 40, lg: 64, xl: 64, xxl: 64 }} icon={<UserOutlined />} />
              </Dropdown>
            </div>
          </Space>
        )}
      </div>
      <Modal centered visible={loginVisible} footer={null}>
        <Tabs defaultActiveKey="2">
          <TabPane
            tab={
              <span>
                <LoginOutlined />
                Login
              </span>
            }
            key="1"
          >
            <Form
              name="login"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onLoginFinish}
              onFinishFailed={onLoginFinishFailed}
              autoComplete="off"
              validateMessages={validateMessages}
            >
              <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button disabled={loginLoading} loading={loginLoading} type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane
            tab={
              <span>
                <AppstoreAddOutlined />
                Signup
              </span>
            }
            key="2"
          >
            <Form
              name="register"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onRegisterFinish}
              onFinishFailed={onRegisterFinishFailed}
              autoComplete="off"
              validateMessages={validateMessages}
            >
              <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button disabled={registerLoading} loading={registerLoading} type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </header>
  )
}

export default Navbar
