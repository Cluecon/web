import React from 'react'
import { Button, Typography, Input } from 'antd'
import Link from 'next/link'
import styles from '../../styles/New.module.css'
import { useNewEventContext } from '../../context/newEvent'
import Head from 'next/head'

const { Title } = Typography

function Description() {
  const { event, updateNewEvent } = useNewEventContext()
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Clueconn | Add event description</title>
          <meta
            name="description"
            content="Revolutionizing the events industry letting your
curiousity find you the next big memories"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d818ff" />
          <meta name="theme-color" content="#d818ff" />
        </Head>
        <div className={styles.content}>
          <Title style={{ textAlign: 'center' }}>Describe your event</Title>
          <div className={styles.description}>{/* <Text>Feel free to be as descriptive as you wish</Text> */}</div>
          <div className={styles.inputWrapper}>
            <Input.TextArea
              value={event?.description}
              rows={10}
              className={styles.input}
              size="large"
              placeholder="Description"
              onChange={(e) => {
                updateNewEvent && updateNewEvent({ ...event, description: e.target.value })
              }}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.back}>
            <Link href="/new/title">
              <a>
                <Button className={styles.button} shape="round" size="large">
                  Back
                </Button>
              </a>
            </Link>
          </div>
          <div className={styles.next}>
            <Link href="/new/location">
              <a>
                <Button className={styles.button} type="primary" shape="round" size="large">
                  Next
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Description
