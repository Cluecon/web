import React from 'react'
import Link from 'next/link'
import {Button, Avatar} from 'antd'
import {PlusCircleOutlined, UserOutlined} from '@ant-design/icons'
import styles from './Navbar.module.css'

function Navbar() {
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
        <div>
          <Avatar size={48} icon={<UserOutlined />} />
        </div>
      </div>
    </header>
  )
}

export default Navbar
