import React from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import Image from 'next/image'
import { PlusCircleOutlined } from '@ant-design/icons'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <header className={styles.container}>
      <div className={styles.right}>
        <Link href="/">
          <a>
            <Image src="/assets/logo.png" alt="me" width="55" height="55" />
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
        <div>
          <Link href="/account/myTickets">
            <a>
              <Button type="primary" shape="round" size="large">
                My Tickets
              </Button>
            </a>
          </Link>
        </div>
        <div style={{ marginLeft: 20 }}>
          <Link href="/account/myevents">
            <a>
              <Button type="primary" shape="round" size="large">
                My Events
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
