import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

export type IWalletContext = {
  address?: string
  updateAddress?: Dispatch<SetStateAction<any>>
}

const WalletContext = createContext<IWalletContext>({})

export interface WalletWrapperProps {
  children: React.ReactNode
}

export const WalletWrapper = ({ children }: WalletWrapperProps) => {
  const [userAddress, setUserAddress] = useState('')

  return (
    <>
      <WalletContext.Provider value={{ address: userAddress, updateAddress: setUserAddress }}>
        {children}
      </WalletContext.Provider>
    </>
  )
}

export function useWalletContext() {
  return useContext(WalletContext)
}
