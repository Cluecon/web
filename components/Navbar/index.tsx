import React from 'react'
import Link from 'next/link'
import { Button, Avatar } from 'antd'
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons'
import styles from './Navbar.module.css'
import { useWalletContext } from '../../context/Wallet'
import { getWeb3Address } from '../../utils/web3Login'

function Navbar() {
  const { wallet, updateWallet } = useWalletContext()

  async function login() {
    if (!wallet?.address) {
      const address = await getWeb3Address()
      console.log('address', address, updateWallet)
      updateWallet && updateWallet(address)
    }
  }

  return (
    <header className={styles.container}>
      <div className={styles.right}>
        <Link href="/">
          <a>
            <h2>Clueconn</h2>
          </a>
        </Link>
      </div>
      <div className={styles.left}>
        <div className={styles.create}>
          <Link href="/new/title">
            <a>
              <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size="large">
                Create
              </Button>
            </a>
          </Link>
        </div>
        {wallet?.address ? (
          <div>
            <Avatar size={48} icon={<UserOutlined />} />
          </div>
        ) : (
          <div>
            <Button onClick={login} type="primary" shape="round" size="large">
              Connect Wallet
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
