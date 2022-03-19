import {useRouter} from 'next/router'
import React from 'react'
import NavMenu from './NavMenu'
import styles from '../../styles/UserProfile.module.css'
import EventCard from '../Card/EventCard'

function UserContent() {
  const events = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  const router = useRouter()
  const tab = router.query.tab

  function renderRelated() {
    return events.map((e, i) => {
      return (
        <div key={i} style={{margin: 20}}>
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

  function renderContent() {
    if (tab === 'upcoming') {
      return <div className={styles.content}>{renderRelated()}</div>
    }

    if (tab === 'myEvents') {
      return <div className={styles.content}>{renderRelated()}</div>
    }
  }

  return (
    <div>
      <NavMenu />
      {renderContent()}
    </div>
  )
}

export default UserContent
