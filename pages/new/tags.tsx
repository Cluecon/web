import React, { useState } from 'react'
import { Button, Typography, Input } from 'antd'
import Link from 'next/link'
import styles from '../../styles/New.module.css'
import { useNewEventContext } from '../../context/newEvent'
import Head from 'next/head'

const { Title } = Typography

function Tags() {
  const [inputValue, setInputValue] = useState('')
  const { event, updateNewEvent } = useNewEventContext()

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Clueconn | Add event tags</title>
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
          <Title style={{ textAlign: 'center' }}>Select some tags or enter new tags</Title>
          <div className={styles.description}></div>
          <div className={styles.inputWrapper}>
            <Input
              onKeyDown={(e) => {
                if (inputValue.length >= 3 && e.key == 'Enter') {
                  const newList =
                    event?.tags &&
                    event?.tags.filter((tag) => tag.name.toLocaleLowerCase() != inputValue.toLocaleLowerCase())
                  updateNewEvent &&
                    newList &&
                    updateNewEvent({ ...event, tags: [...newList, { name: inputValue, isSelected: true }] })
                  setInputValue('')
                }
              }}
              value={inputValue}
              className={styles.input}
              size="large"
              placeholder="Tag"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className={styles.tags}>
            {event?.tags?.map((tag: { name: string; isSelected: boolean }, i: number) => (
              <Button
                key={i}
                style={{ marginRight: 10, marginTop: 10 }}
                type={tag.isSelected ? 'primary' : 'dashed'}
                shape="round"
                size="large"
                onClick={() => {
                  const newArray = event?.tags?.filter(
                    (t) => t.name.toLocaleLowerCase() != tag.name.toLocaleLowerCase()
                  )
                  updateNewEvent &&
                    newArray &&
                    updateNewEvent({ ...event, tags: [...newArray, { name: tag.name, isSelected: true }] })
                }}
              >
                {tag.name}
              </Button>
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.back}>
            <Link href="/new/location">
              <a>
                <Button className={styles.button} shape="round" size="large">
                  Back
                </Button>
              </a>
            </Link>
          </div>
          <div className={styles.next}>
            <Link href="/new/art">
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

export default Tags
