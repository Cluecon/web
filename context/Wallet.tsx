import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

export type IWallet = {
  address: string
}

export type IWalletContext = {
  wallet?: IWallet
  updateWallet?: Dispatch<SetStateAction<any>>
}

const WalletContext = createContext<IWalletContext>({})

export interface WalletWrapperProps {
  children: React.ReactNode
}

export const WalletWrapper = ({ children }: WalletWrapperProps) => {
  const [wallet, setWallet] = useState<IWallet>()
  console.log('wallet', wallet)
  return <WalletContext.Provider value={{ wallet: wallet, updateWallet: setWallet }}>{children}</WalletContext.Provider>
}

export function useWalletContext() {
  return useContext(WalletContext)
}
