import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Typography } from 'antd'
import styles from '../styles/Home.module.css'
import Banner from '../components/home/Banner'
import EventCard from '../components/Card/EventCard'
import { getEvents } from '../services/firebase'

const { Title } = Typography

const Home: NextPage = () => {
  const [events, setEvents] = useState<any>()

  async function updateEvents() {
    const eventsList = await getEvents()
    setEvents(eventsList)
  }

  useEffect(() => {
    updateEvents()
  }, [])

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
            <Title level={2}>Near you</Title>
          </div>
          <div className={styles.eventsColumn}>
            <EventCard
              cid="kokokokok"
              title="Moulin Rouge! The Musical on Broadway"
              cover="https://dev-ipfs.clueconn.com/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX"
              strartDate="Sat, Apr 30, 12:00 PM"
              endDate=" Sat, Apr 30, 16:00 PM"
              location="2734 Barkley street, santa clara"
            />
            <EventCard
              cid="kokokokok"
              title="Moulin Rouge! The Musical on Broadway"
              cover="https://dev-ipfs.clueconn.com/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX"
              strartDate="Sat, Apr 30, 12:00 PM"
              endDate=" Sat, Apr 30, 16:00 PM"
              location="2734 Barkley street, santa clara"
            />
            <EventCard
              cid="kokokokok"
              title="Moulin Rouge! The Musical on Broadway"
              cover="https://dev-ipfs.clueconn.com/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX"
              strartDate="Sat, Apr 30, 12:00 PM"
              endDate=" Sat, Apr 30, 16:00 PM"
              location="2734 Barkley street, santa clara"
            />
            <EventCard
              cid="kokokokok"
              title="Moulin Rouge! The Musical on Broadway"
              cover="https://dev-ipfs.clueconn.com/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX"
              strartDate="Sat, Apr 30, 12:00 PM"
              endDate=" Sat, Apr 30, 16:00 PM"
              location="2734 Barkley street, santa clara"
            />
          </div>
        </div>
        <div>
          <div className={styles.nearWrapper}>
            <Title level={2}>Popular</Title>
          </div>
          <div className={styles.eventsColumn}>
            <EventCard
              cid="kokokokok"
              title="Moulin Rouge! The Musical on Broadway"
              cover="https://dev-ipfs.clueconn.com/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX"
              strartDate="Sat, Apr 30, 12:00 PM"
              endDate=" Sat, Apr 30, 16:00 PM"
              location="2734 Barkley street, santa clara"
            />
            <EventCard
              cid="kokokokok"
              title="Moulin Rouge! The Musical on Broadway"
              cover="https://dev-ipfs.clueconn.com/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX"
              strartDate="Sat, Apr 30, 12:00 PM"
              endDate=" Sat, Apr 30, 16:00 PM"
              location="2734 Barkley street, santa clara"
            />
            <EventCard
              cid="kokokokok"
              title="Moulin Rouge! The Musical on Broadway"
              cover="https://dev-ipfs.clueconn.com/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX"
              strartDate="Sat, Apr 30, 12:00 PM"
              endDate=" Sat, Apr 30, 16:00 PM"
              location="2734 Barkley street, santa clara"
            />
            <EventCard
              cid="kokokokok"
              title="Moulin Rouge! The Musical on Broadway"
              cover="https://dev-ipfs.clueconn.com/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX"
              strartDate="Sat, Apr 30, 12:00 PM"
              endDate=" Sat, Apr 30, 16:00 PM"
              location="2734 Barkley street, santa clara"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
