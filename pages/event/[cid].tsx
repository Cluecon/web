import React, { useCallback, useEffect, useState } from 'react'
import { Button, message, Spin } from 'antd'
import { useRouter } from 'next/router'
import styles from '../../styles/Details.module.css'
import DetailsAffix from '../../components/Event/Affix/DetailsAffix'
import EventBody from '../../components/Event/Body/EventBody'
import MobileFooter from '../../components/Event/MobileFooter/MobileFooter'
import { ICodeData, IEvent } from '../../models/event'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { functionsAPi } from '../../utils/functionsapi'

function EventDetails() {
  const router = useRouter()
  const [event, setEvent] = useState<IEvent>()
  const [rate, setRate] = useState<string>()
  const [userAddress, setUserAddress] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [userTickets, setUserTickets] = useState<ICodeData[] | undefined>()
  const { cid } = router.query

  // useEffect(() => {
  // }, [])

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

  function renderAffix() {
    if (userAddress === event?.creatorAddress) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Link href={`/event/myevents/${event?.creatorAddress}/${event?.uid}`}>
            <a>
              <Button type="primary" shape="round" size="large">
                Dashboard
              </Button>
            </a>
          </Link>
          {event?.isOnline && (
            <div style={{ marginTop: 40 }}>
              <Button
                onClick={async () => {
                  try {
                    console.log("Success'clicked")
                  } catch (error) {
                    console.log(error)
                    message.error('unable to start livestream!')
                  }
                }}
                type="primary"
                shape="round"
                size="large"
              >
                Start Event
              </Button>
            </div>
          )}
        </div>
      )
    }
    if (userTickets && userTickets.length > 0 && event?.isOngoing) {
      return (
        <div style={{ marginTop: 40 }}>
          <Button
            onClick={async () => {
              try {
                router.push(`/event/live/${event.uid}`)
              } catch (error) {
                console.log(error)
                message.error('unable to join event!')
              }
            }}
            type="primary"
            shape="round"
            size="large"
          >
            Attend Event
          </Button>
        </div>
      )
    }
    if (event) {
      return (
        <>
          <DetailsAffix
            isFree={event.isFree}
            classes={event.classes}
            ipfsUrl={event.ipfsAdress}
            rate={rate as string}
            eventId={cid as string}
          />
        </>
      )
    }
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
        {renderAffix()}
      </div>
      <div className={styles.footer}>
        <MobileFooter
          isFree={event.isFree}
          classes={event.classes}
          ipfsUrl={event.ipfsAdress}
          rate={rate as string}
          eventId={cid as string}
        />
      </div>
    </div>
  )
}

export default EventDetails
