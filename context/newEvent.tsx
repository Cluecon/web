import {createContext, Dispatch, SetStateAction, useContext, useState} from 'react'

export type INewEvent = {
  title?: string
  description?: string
  location?: string
  tags?: string[]
  date?: {
    startDate: string | null
    endDate: string | null
  }
  classes?: {
    name: string
    price: string
  }[]
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
  const [newEvent, setNewEvent] = useState<INewEvent>({})

  return (
    <NewEventContext.Provider value={{event: newEvent, updateNewEvent: setNewEvent}}>
      {children}
    </NewEventContext.Provider>
  )
}

export function useNewEventContext() {
  return useContext(NewEventContext)
}
