import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { IUser } from '../models/user'
import { geUserById } from '../services/firebase'

export type IUserContext = {
  user?: IUser
  updateUser: (user: IUser) => void
}

const UserContext = createContext<IUserContext>({
  updateUser: (user: IUser) => null,
})

export interface UserWrapperProps {
  children: React.ReactNode
}

export const UserWrapper = ({ children }: UserWrapperProps) => {
  const auth = getAuth()

  const [user, setUser] = useState<IUser | undefined>()

  function updateUser(user: IUser) {
    setUser(user)
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid
        const userDetails = await geUserById(uid)
        setUser(userDetails)
      } else {
        setUser(undefined)
      }
    })
  }, [])

  return (
    <>
      <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
    </>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
