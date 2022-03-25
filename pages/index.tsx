import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Spin, Typography } from 'antd'
import styles from '../styles/Home.module.css'
import Banner from '../components/home/Banner'
import EventCard from '../components/Card/EventCard'
import { getFirebaseEvents } from '../services/firebase'
import { IEvent } from '../models/event'
import moment from 'moment'

const { Title } = Typography

const cover =
  'https://firebasestorage.googleapis.com/v0/b/clueconn-73e93.appspot.com/o/no-image.jpg?alt=media&token=18825795-d81a-40dc-8721-84c6b7d0ac3b'

const Home: NextPage = () => {
  const [events, setEvents] = useState<IEvent[]>()
  const [loading, setLoading] = useState(false)

  async function getEvents() {
    setLoading(true)
    const firebaseEvents = await getFirebaseEvents()
    setEvents(firebaseEvents)
    setLoading(false)
  }

  useEffect(() => {
    getEvents()
  }, [])

  if (loading) {
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

  function renderEvents() {
    return events?.map((ev) => {
      return (
        <EventCard
          key={ev.uid}
          cid={ev.uid}
          title={ev.title}
          cover={ev.covers || cover}
          strartDate={moment(ev.date.startDate).format('llll')}
          endDate={moment(ev.date.endDate).format('llll')}
          location={ev.location.address}
        />
      )
    })
  }

  console.log('events', events)

  return (
    <div className={styles.container}>
      <Head>
        <title>Clueconn | NFT Events</title>
        <meta name="description" content="A new ticketing system for event intelligence" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ marginTop: 40 }}>
        <Banner />
      </div>
      <div className={styles.suggestions}>
        <div>
          <div className={styles.nearWrapper}>
            <Title level={2}>Events</Title>
          </div>
          <div className={styles.eventsColumn}>{renderEvents()}</div>
        </div>
      </div>
    </div>
  )
}

export default Home
