import {createContext, Dispatch, SetStateAction, useContext, useState} from 'react'

export type ITag = {
  name: string
  isSelected: boolean
}

export type INewEvent = {
  title?: string
  description?: string
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
  classes?: {
    name: string
    price: string
  }[]
  ticketArt?: string
  artProps?: string[]
}

export type INewEventContext = {
  event?: INewEvent
  updateNewEvent?: Dispatch<SetStateAction<INewEvent>>
}

const NewEventContext = createContext<INewEventContext>({})

export interface NewEventWrapperProps {
  children: React.ReactNode
}

export const NewEventWrapper = ({children}: NewEventWrapperProps) => {
  const [newEvent, setNewEvent] = useState<INewEvent>({
    tags: [
      {name: 'sports', isSelected: false},
      {name: 'music', isSelected: false},
      {name: 'soccer', isSelected: false},
      {name: 'basketball', isSelected: false},
      {name: 'hiking', isSelected: false},
      {name: 'clubbing', isSelected: false},
    ],
  })

  return (
    <NewEventContext.Provider value={{event: newEvent, updateNewEvent: setNewEvent}}>
      {children}
    </NewEventContext.Provider>
  )
}

export function useNewEventContext() {
  return useContext(NewEventContext)
}
