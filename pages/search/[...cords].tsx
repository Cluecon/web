import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { geohashQueryBounds } from 'geofire-common'
import { getEventsByBounds } from '../../services/firebase'
import { IEvent } from '../../models/event'
import { Spin, Typography } from 'antd'
import Head from 'next/head'
import EventCard from '../../components/Card/EventCard'
import moment from 'moment'
import { no_image } from '../../components/account/UserContent'

const { Title } = Typography

function SearchResults() {
  const router = useRouter()
  const { cords } = router.query
  const [events, setEvents] = useState<IEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    searchEvents()
  }, [])

  async function searchEvents() {
    setIsLoading(true)
    if (cords && cords.length > 0) {
      const center = [parseFloat(cords[0]), parseFloat(cords[1])]
      const radiusInM = 50 * 1000
      const bounds = geohashQueryBounds(center, radiusInM)
      const eventsByBounds = await getEventsByBounds(bounds)
      setEvents(eventsByBounds)
      setIsLoading(false)
    }
    // router.push('/404');
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

  if (!isLoading && events.length <= 0) {
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
          No events found!
        </Title>
      </div>
    )
  }

  function renderEvents() {
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
            tokenId={e.tokenId}
            owner={e.owner}
            creator={e.creatorAddress}
            price={e.price}
          />
        </div>
      )
    })
  }

  return (
    <>
      <Head>
        <title>Cluconn | Events Search</title>
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
        {renderEvents()}
      </div>
    </>
  )
}

export default SearchResults
