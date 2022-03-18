import {createContext, Dispatch, SetStateAction, useContext, useState} from 'react'

export type IEvent = {
  cid: string
  ownerAddress: string
  title: string
  description: string
  location: {
    lat: number
    long: number
    address: string
  }

  tags?: string[]
  date: {
    startDate: string
    endDate: string
  }
  classes: {
    id: number
    name: string
    price: string
    amount: string
  }[]
  ticketArt?: string
  covers?: string
}

export type IEventContext = {
  event?: IEvent
  addEvent?: Dispatch<SetStateAction<IEvent | undefined>>
}

const EventContext = createContext<IEventContext>({})

export interface NewEventWrapperProps {
  children: React.ReactNode
}

export const EventWrapper = ({children}: NewEventWrapperProps) => {
  const [event, setEvent] = useState<IEvent | undefined>()
  return <EventContext.Provider value={{event: event, addEvent: setEvent}}>{children}</EventContext.Provider>
}

export function useEventContext() {
  return useContext(EventContext)
}
