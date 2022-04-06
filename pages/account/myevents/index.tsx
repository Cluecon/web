import { Spin, Typography } from 'antd'
import moment from 'moment'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { no_image } from '../../../components/account/UserContent'
import EventCard from '../../../components/Card/EventCard'
import { IEvent } from '../../../models/event'
import { getFirebaseEventsByAdress } from '../../../services/firebase'
import { getWeb3Address } from '../../../utils/web3Login'

const { Title } = Typography

function MyEvents() {
  const [events, setEvents] = useState<IEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function loadEvents() {
    setIsLoading(true)
    const address = await getWeb3Address()
    const myevents = await getFirebaseEventsByAdress(address)
    setEvents(myevents as IEvent[])
    setIsLoading(false)
  }

  useEffect(() => {
    loadEvents()
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

  if (!isLoading && !events.length) {
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
          You have not created any events
        </Title>
      </div>
    )
  }

  function renderMyEvents() {
    return events.map((e, i) => {
      return (
        <div key={i} style={{ margin: 20 }}>
          <EventCard
            cid={e.uid}
            title={e.title}
            cover={e.covers || no_image}
            strartDate={moment(e.date.startDate).format('llll')}
            endDate={moment(e.date.endDate).format('llll')}
            location={e.location.address}
            creator={e.creatorAddress}
            price={e.price || 'Free'}
          />
        </div>
      )
    })
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        {renderMyEvents()}
      </div>
    </>
  )
}

export default MyEvents
