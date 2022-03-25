import React from 'react'
// import NavMenu from './NavMenu'
import EventCard from '../Card/EventCard'
import { IEvent } from '../../models/event'
import moment from 'moment'

const no_image =
  'https://firebasestorage.googleapis.com/v0/b/clueconn-73e93.appspot.com/o/no-image.jpg?alt=media&token=18825795-d81a-40dc-8721-84c6b7d0ac3b'

export type IUserContentProps = {
  events: IEvent[]
}

function UserContent(props: IUserContentProps) {
  function renderTickets() {
    return props.events.map((e, i) => {
      console.log('eeeee', e)
      return (
        <div key={i} style={{ margin: 20 }}>
          <EventCard
            cid={e.uid}
            title={e.title}
            cover={e.ticketArt || no_image}
            strartDate={moment(e.date.startDate).format('llll')}
            endDate={moment(e.date.endDate).format('llll')}
            location={e.location.address}
          />
        </div>
      )
    })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
      {/* <NavMenu /> */}
      {renderTickets()}
    </div>
  )
}

export default UserContent
