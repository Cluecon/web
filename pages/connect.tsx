import React, { useEffect, useState } from 'react'
import styles from '../styles/metamask-auth.module.css'

function isMobileDevice() {
  if (typeof window !== 'undefined') return 'ontouchstart' in window || 'onmsgesturechange' in window
}

async function connect(onConnected: any) {
  if (typeof window !== 'undefined' && !window.ethereum) {
    alert('Get MetaMask!')
    return
  }
  if (typeof window !== 'undefined') {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    onConnected(accounts[0])
  }
}

async function checkIfWalletIsConnected(onConnected: any) {
  if (typeof window !== 'undefined' && window.ethereum) {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    })

    if (accounts.length > 0) {
      const account = accounts[0]
      onConnected(account)
      return
    }

    if (isMobileDevice()) {
      await connect(onConnected)
    }
  }
}

function MetaMaskAuth({ onAddressChanged }: any) {
  const [userAddress, setUserAddress] = useState('')

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress)
  }, [])

  useEffect(() => {
    onAddressChanged(userAddress)
  }, [userAddress])

  return userAddress ? (
    <div>
      Connected with <Address userAddress={userAddress} />
    </div>
  ) : (
    <Connect setUserAddress={setUserAddress} />
  )
}

function Connect({ setUserAddress }: any) {
  if (isMobileDevice()) {
    const dappUrl = 'd247-2603-8081-1400-8b-441d-41da-5a01-5c12.ngrok.io' // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = 'https://metamask.app.link/dapp/' + dappUrl
    return (
      <a href={metamaskAppDeepLink}>
        <button className={styles.button}>Connect to MetaMask</button>
      </a>
    )
  }

  return (
    <button className={styles.button} onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  )
}

function Address({ userAddress }: any) {
  return (
    <span className={styles.address}>
      {userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}
    </span>
  )
}

function ConnectWallet() {
  return (
    <>
      <MetaMaskAuth
        onAddressChanged={(address: any) => {
          alert(address)
        }}
      />
    </>
  )
}

export default ConnectWallet
