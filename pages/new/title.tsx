import React from 'react'
import Link from 'next/link'
import {Button, Typography, Input} from 'antd'
import styles from '../../styles/New.module.css'
import {useNewEventContext} from '../../context/newEvent'

const {Title} = Typography

function TitlePage() {
  const {event, updateNewEvent} = useNewEventContext()
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Title style={{textAlign: 'center'}}>What is the name of your event?</Title>
          <div className={styles.description}></div>
          <div className={styles.inputWrapper}>
            <Input
              value={event?.title}
              className={styles.input}
              size="large"
              placeholder="Title"
              onChange={(e) => {
                updateNewEvent && updateNewEvent({...event, title: e.target.value})
              }}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.next}>
            <Link href="/new/description">
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

export default TitlePage
