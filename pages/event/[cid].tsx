import React, { useCallback, useEffect, useState } from 'react'
import { Button, Spin } from 'antd'
import { useRouter } from 'next/router'
import styles from '../../styles/Details.module.css'
import DetailsAffix from '../../components/Event/Affix/DetailsAffix'
import EventBody from '../../components/Event/Body/EventBody'
import MobileFooter from '../../components/Event/MobileFooter/MobileFooter'
import { getFirebaseEventById } from '../../services/firebase'
import { IEvent } from '../../models/event'
import axios from 'axios'
import Head from 'next/head'
import { getWeb3Address } from '../../utils/web3Login'
import Link from 'next/link'

function EventDetails() {
  const router = useRouter()
  const [event, setEvent] = useState<IEvent>()
  const [rate, setRate] = useState<string>()
  const [userAddress, setUserAddress] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const { cid } = router.query

  const getEventDetails = useCallback(async () => {
    setIsLoading(true)
    const address = await getWeb3Address()
    setUserAddress(address)
    const responseData = await axios.get('https://us-central1-clueconn-73e93.cloudfunctions.net/api/rates/matic')
    setRate(responseData.data[0].usd)
    const eventUid = cid as string
    const fbEvent = await getFirebaseEventById(eventUid)
    setEvent(fbEvent)
    setIsLoading(false)
  }, [cid])

  useEffect(() => {
    getEventDetails()
  }, [getEventDetails])

  if (!event) {
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

  if (!isLoading && !event) {
    router.push('/404')
  }

  return (
    <div style={{ position: 'relative' }}>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description.substring(0, 150)} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d818ff" />
        <meta name="theme-color" content="#d818ff" />
      </Head>
      <div className={styles.container}>
        <div className={styles.body}>
          <EventBody
            title={event.title}
            description={event.description}
            address={event?.location?.address}
            startDate={event.date.startDate}
            endDate={event.date.endDate}
            tags={event.tags}
            cover={event.covers}
            isOnline={event.isOnline ? event.isOnline : false}
          />
        </div>
        <div className={styles.sticker}>
          {userAddress === event.creatorAddress ? (
            <>
              <Link href={`/account/myevents/${event.creatorAddress}/${event.uid}`}>
                <a>
                  <Button type="primary" shape="round" size="large">
                    Dashboard
                  </Button>
                </a>
              </Link>
            </>
          ) : (
            <>
              <DetailsAffix
                isFree={event.isFree}
                classes={event.classes}
                ipfsUrl={event.ipfsAdress}
                creator={event.creatorAddress}
                rate={rate as string}
                eventId={cid as string}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <MobileFooter
          isFree={event.isFree}
          classes={event.classes}
          ipfsUrl={event.ipfsAdress}
          creator={event.creatorAddress}
          rate={rate as string}
          eventId={cid as string}
        />
      </div>
    </div>
  )
}

export default EventDetails
