import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import UserContent from '../../components/account/UserContent'
import { Spin, Typography } from 'antd'
import { IEvent } from '../../models/event'
import Head from 'next/head'

const { Title } = Typography

function UserProfile() {
  const [tickets, setTickets] = useState<IEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function loadTickets() {
    try {
      console.log('load my tickets')
    } catch (error) {
      console.log('error', error)
      router.push('/500')
    }
  }

  useEffect(() => {
    loadTickets()
  }, [])

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
      <Head>
        <title>My Tickets</title>
        <meta name="description" content="Clueconn Tickets" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d818ff" />
        <meta name="theme-color" content="#d818ff" />
      </Head>
      <div>{/* <Cover /> */}</div>
      <div>{/* <UserInfo /> */}</div>
      <div>
        <h2>My tickets</h2>
        <UserContent events={tickets} />
      </div>
    </>
  )
}

export default UserProfile
