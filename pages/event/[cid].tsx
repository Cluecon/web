import React, { useCallback, useEffect, useState } from 'react'
import { Typography, Spin } from 'antd'
import { useRouter } from 'next/router'
import styles from '../../styles/Details.module.css'
import DetailsAffix from '../../components/Event/Affix/DetailsAffix'
import EventBody from '../../components/Event/Body/EventBody'
import MobileFooter from '../../components/Event/MobileFooter/MobileFooter'
import EventCard from '../../components/Card/EventCard'
import { getFirebaseEventById } from '../../services/firebase'
import { IEvent } from '../../models/event'

const { Title } = Typography

function EventDetails() {
  const router = useRouter()
  const [event, setEvent] = useState<IEvent>()
  const { cid } = router.query
  console.log('cid', cid)
  const events = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

  const getEventDetails = useCallback(async () => {
    const eventUid = cid as string
    const fbEvent = await getFirebaseEventById(eventUid)
    setEvent(fbEvent)
  }, [cid])

  useEffect(() => {
    getEventDetails()
  }, [getEventDetails])

  console.log('fbevent', event)
  function renderRelated() {
    return events.map((e, i) => {
      return (
        <div key={i} style={{ margin: 20 }}>
          <EventCard
            cid="kokokokok"
            title="Moulin Rouge! The Musical on Broadway"
            cover="https://dev-ipfs.clueconn.com/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX"
            strartDate="Sat, Apr 30, 12:00 PM"
            endDate=" Sat, Apr 30, 16:00 PM"
            location="2734 Barkley street, santa clara"
          />
        </div>
      )
    })
  }

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

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.container}>
        <div className={styles.body}>
          <EventBody
            title={event.title}
            description={event.description}
            address={event.location.address}
            startDate={event.date.startDate}
            endDate={event.date.endDate}
            tags={event.tags}
            cover={event.covers}
          />
        </div>
        <div className={styles.sticker}>
          <DetailsAffix classes={event.classes} />
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <Title style={{ textAlign: 'center' }} level={1}>
          Related
        </Title>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          {renderRelated()}
        </div>
      </div>
      <div className={styles.footer}>
        <MobileFooter classes={event.classes} />
      </div>
    </div>
  )
}

export default EventDetails
