import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

export type ITag = {
  name: string
  isSelected: boolean
}

export type INewEvent = {
  ownerAddress?: string
  title?: string
  description?: string
  geohash?: string
  location?: {
    lat?: number
    long?: number
    address?: string
  }
  tags?: ITag[]
  date?: {
    startDate: string | null
    endDate: string | null
  }
  isFree?: boolean
  classes?: {
    id: number
    name: string
    price: string
    amount: string
  }[]
  ticketArt?: string
  covers?: string
}

export type INewEventContext = {
  event?: INewEvent
  updateNewEvent?: Dispatch<SetStateAction<INewEvent>>
}

const NewEventContext = createContext<INewEventContext>({})

export interface NewEventWrapperProps {
  children: React.ReactNode
}

export const NewEventWrapper = ({ children }: NewEventWrapperProps) => {
  const [newEvent, setNewEvent] = useState<INewEvent>({
    tags: [
      { name: 'sports', isSelected: false },
      { name: 'music', isSelected: false },
      { name: 'soccer', isSelected: false },
      { name: 'basketball', isSelected: false },
      { name: 'hiking', isSelected: false },
      { name: 'clubbing', isSelected: false },
    ],
    ticketArt:
      'https://3vqfjspkq1qw.usemoralis.com:2053/server/files/eieJDT85ex6swEjngZuhlVqHI7uvUrgQYdWFKdew/QmYZauEK8xWmcgmpXWWhC13VSdKDeCR9TTqpDRTM4Y3kx5.png',
    isFree: false,
  })

  return (
    <NewEventContext.Provider value={{ event: newEvent, updateNewEvent: setNewEvent }}>
      {children}
    </NewEventContext.Provider>
  )
}

export function useNewEventContext() {
  return useContext(NewEventContext)
}
