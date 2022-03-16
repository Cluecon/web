import React from 'react'
import {Button, Typography, Input} from 'antd'
import Link from 'next/link'
import styles from '../../styles/New.module.css'
import {useNewEventContext} from '../../context/newEvent'

const {Title} = Typography

function Description() {
  const {event, updateNewEvent} = useNewEventContext()
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Title style={{textAlign: 'center'}}>Describe your event</Title>
          <div className={styles.description}>{/* <Text>Feel free to be as descriptive as you wish</Text> */}</div>
          <div className={styles.inputWrapper}>
            <Input.TextArea
              value={event?.description}
              rows={10}
              className={styles.input}
              size="large"
              placeholder="Description"
              onChange={(e) => {
                updateNewEvent && updateNewEvent({...event, description: e.target.value})
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
