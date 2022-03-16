import React from 'react'
import {Button, Typography, Input} from 'antd'
import Link from 'next/link'
import styles from '../../styles/New.module.css'

const {Title} = Typography

function Art() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Title style={{textAlign: 'center'}}>Upload Images</Title>
          <div className={styles.description}>
            {/* <Text>Choose a name that will give get people excited about your event. Feel free to get creative! You can edit this later if you change your mind.</Text> */}
          </div>
          <div className={styles.inputWrapper}>
            <Input className={styles.input} size="large" placeholder="Title" />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.back}>
            <Link href="/new/tags">
              <a>
                <Button className={styles.button} shape="round" size="large">
                  Back
                </Button>
              </a>
            </Link>
          </div>
          <div className={styles.next}>
            <Button className={styles.button} type="primary" shape="round" size="large">
              Create
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Art
