/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { Avatar, Typography, Tabs, Tag, Space, Button, Modal, Input, message, Upload, Spin } from 'antd'
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import _debounce from 'lodash/debounce'
import EventCard from '../../components/Card/EventCard'
import moment from 'moment'
import { useRouter } from 'next/router'
import {
  getEventsByUserId,
  getUserById,
  getUserByUsername,
  updateUserAvatar,
  updateUserCover,
  updateUserDetails,
} from '../../services/firebase'
import { IUser } from '../../models/user'
import { useUserContext } from '../../context/user'
import { getWeb3Address } from '../../utils/web3Login'
import { IEvent } from '../../models/event'

const { Title, Text } = Typography
const { TabPane } = Tabs

const client = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0' })
const no_image =
  'https://firebasestorage.googleapis.com/v0/b/clueconn-73e93.appspot.com/o/no-image.jpg?alt=media&token=18825795-d81a-40dc-8721-84c6b7d0ac3b'

function MyAccount() {
  const [editVisible, setEditVisible] = useState(false)
  const [profUser, setProfUser] = useState<IUser | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUserContext()
  const router = useRouter()
  const { uid } = router.query
  const [username, setUsername] = useState<string | undefined>()
  const [walletAddress, setWalletAddress] = useState<string | undefined>()
  const [usernameError, setUsernameError] = useState(false)
  const [createdEvents, setCreatedEvents] = useState<IEvent[] | undefined>([])

  async function getUserDetails() {
    setIsLoading(true)
    const fbUser = await getUserById(uid as string)
    if (!fbUser && uid) {
      setIsLoading(false)
      router.push('/404')
    } else {
      setProfUser(fbUser)
      setUsername(fbUser?.username)
      setWalletAddress(fbUser?.walletAddress)
      const myEvents = await getEventsByUserId(fbUser?.uid as string)
      setCreatedEvents(myEvents)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (uid) {
      getUserDetails()
    }
  }, [])

  const events: any = [1, 2, 3, 4, 5]

  function renderEvents() {
    return events?.map((ev: any) => {
      return (
        <EventCard
          key={ev}
          cid="ksdiisjweiwe"
          title="Frisco Uncorked Presented By H-E-B"
          cover="https://images.unsplash.com/photo-1649996415915-0641e9283532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
          strartDate={moment('2022-04-21T05:25:00Z').format('llll')}
          endDate={moment('2022-04-21T07:19:50Z').format('llll')}
          location="Frisco, TX, USA"
          isOnline={false}
        />
      )
    })
  }

  function renderMyEvents() {
    if (createdEvents && createdEvents.length < 0) {
      return (
        <div>
          <Title>No Events</Title>
        </div>
      )
    } else {
      return createdEvents?.map((ev: IEvent) => {
        return (
          <EventCard
            key={ev.uid}
            cid={ev.uid}
            title={ev.title}
            cover={ev.covers || no_image}
            strartDate={moment(ev.date.startDate).format('llll')}
            endDate={moment(ev.date.endDate).format('llll')}
            location={ev.location?.address}
            isOnline={ev.isOnline ? ev.isOnline : false}
          />
        )
      })
    }
  }

  async function uploadImageToIpfs(file: File) {
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      })
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  const uploadProps = {
    name: 'file',
    action: '/api/antupload',
    onChange(info: any) {
      if (info.file.status === 'done') {
        uploadImageToIpfs(info.file.originFileObj)
          .then(async (url: any) => {
            await updateUserCover(url, profUser?.uid as string)
            await getUserDetails()
          })
          .catch((err) => {
            console.log('err', err)
            message.error(`Error uploading file`)
          })
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const avatarProps = {
    name: 'file',
    action: '/api/antupload',
    onChange(info: any) {
      if (info.file.status === 'done') {
        uploadImageToIpfs(info.file.originFileObj)
          .then(async (url: any) => {
            await updateUserAvatar(url, profUser?.uid as string)
            await getUserDetails()
          })
          .catch((err) => {
            console.log('err', err)
            message.error(`Error uploading file`)
          })
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

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

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div style={{ width: '100%', height: '25vh' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div style={{ width: '100%', height: '100%' }}>
              {profUser?.coverPic ? (
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={profUser?.coverPic} alt="" />
              ) : (
                <div style={{ backgroundColor: '#000', width: '100%', height: '100%' }}></div>
              )}
            </div>
            {profUser?.uid === user?.uid && (
              <div style={{ position: 'absolute', bottom: 0, right: 5, cursor: 'pointer' }}>
                <Upload {...uploadProps} showUploadList={false}>
                  <EditOutlined style={{ fontSize: 32, color: '#d818ff' }} />
                </Upload>
              </div>
            )}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: -95, left: '50%' }}>
          <div style={{ position: 'relative' }}>
            <div>
              {profUser?.profilePic ? (
                <Avatar size={100} src={profUser?.profilePic} />
              ) : (
                <Avatar size={100} icon={<UserOutlined />} />
              )}
            </div>
            {profUser?.uid == user?.uid && (
              <div style={{ position: 'absolute', bottom: 0, right: 5, cursor: 'pointer' }}>
                <Upload {...avatarProps} showUploadList={false}>
                  <EditOutlined style={{ fontSize: 24, color: '#d818ff' }} />
                </Upload>
              </div>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <div>
              <Title>{profUser?.username}</Title>
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
        {profUser?.uid === user?.uid && (
          <div style={{ position: 'absolute', right: 10, bottom: -35 }}>
            <Button onClick={() => setEditVisible(true)} shape="round" type="primary" icon={<EditOutlined />}>
              Edit Profile
            </Button>
          </div>
        )}
      </div>
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <div style={{ position: 'relative', width: '80%' }}>
          <Tabs
            defaultActiveKey="1"
            onChange={(key) => {
              console.log(key)
            }}
          >
            <TabPane tab="My Events" key="1">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {renderMyEvents()}
              </div>
            </TabPane>
            <TabPane tab="Going" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Past" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
      <Modal title="Edit Profile" centered visible={editVisible} footer={null} onCancel={() => setEditVisible(false)}>
        <Space style={{ display: 'flex', flexDirection: 'column' }}>
          <Input
            style={{ borderColor: usernameError ? 'red' : '#d818ff' }}
            value={username || ''}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value)
              _debounce(async () => {
                if (username && username !== profUser?.username) {
                  const uData = await getUserByUsername(username)
                  if (uData) {
                    setUsernameError(true)
                  } else {
                    setUsernameError(false)
                  }
                }
              }, 2000)
            }}
            onBlur={async () => {
              if (username && username !== profUser?.username) {
                const uData = await getUserByUsername(username)
                if (uData) {
                  setUsernameError(true)
                } else {
                  setUsernameError(false)
                }
              }
            }}
          />
          {usernameError && <Text style={{ color: 'red' }}>Username unavailable!</Text>}
          <Button
            onClick={async () => {
              const address = await getWeb3Address()
              setWalletAddress(address)
            }}
          >
            Connect Wallet
          </Button>
          <Input
            value={walletAddress || ''}
            placeholder="Wallet Address"
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <Button
            disabled={usernameError}
            type="primary"
            onClick={async () => {
              if (username) {
                try {
                  await updateUserDetails(username, walletAddress || '', profUser?.uid as string)
                  await getUserDetails()
                  setEditVisible(false)
                } catch (err: any) {
                  message.error(err.message)
                }
              }
            }}
          >
            Save
          </Button>
        </Space>
      </Modal>
    </div>
  )
}

export default MyAccount
