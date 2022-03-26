import React from 'react'
import { Button, Typography, DatePicker } from 'antd'
import Link from 'next/link'
import styles from '../../styles/New.module.css'
import moment from 'moment'
import { useNewEventContext } from '../../context/newEvent'
import Head from 'next/head'

const { Title } = Typography
const { RangePicker } = DatePicker

function Date() {
  const { event, updateNewEvent } = useNewEventContext()
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Clueconn | Add event dates</title>
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
          <Title style={{ textAlign: 'center' }}>When will the event be held?</Title>
          <div className={styles.description}>
            {/* <Text>Choose a name that will give get people excited about your event. Feel free to get creative! You can edit this later if you change your mind.</Text> */}
          </div>
          <div>
            <RangePicker
              style={{ height: '60px' }}
              showTime
              defaultValue={
                event?.date?.startDate ? [moment(event?.date?.startDate), moment(event?.date?.endDate)] : null
              }
              onChange={(d) => {
                const startDate = d && moment.utc(d[0]).format()
                const endDate = d && moment.utc(d[1]).format()
                updateNewEvent && updateNewEvent({ ...event, date: { startDate: startDate, endDate: endDate } })
              }}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.back}>
            <Link href="/new/classes">
              <a>
                <Button className={styles.button} shape="round" size="large">
                  Back
                </Button>
              </a>
            </Link>
          </div>
          <div className={styles.next}>
            <Link href="/new/tags">
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

export default Date
