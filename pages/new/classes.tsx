import React from 'react'
import { Input, Button, Space, Typography, InputNumber } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import Link from 'next/link'
import styles from '../../styles/New.module.css'
import { useNewEventContext } from '../../context/newEvent'
import Head from 'next/head'

const { Title } = Typography

function Classes() {
  const { event, updateNewEvent } = useNewEventContext()
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Clueconn | Add ticket categories</title>
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
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color=" #d818ff" />
          <meta name="theme-color" content="#d818ff" />
        </Head>
        <>
          <div className={styles.content}>
            <Title style={{ textAlign: 'center' }}>Ticket categories</Title>
            <div className={styles.description}>
              {/* <Text>Choose a name that will give get people excited about your event. Feel free to get creative! You can edit this later if you change your mind.</Text> */}
            </div>
            <div className={styles.inputWrapper}>
              <>
                {!event?.isFree &&
                  event?.classes &&
                  event?.classes.map((cl) => {
                    return (
                      <>
                        <Space
                          key={cl.id}
                          style={{ display: 'flex', marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}
                          align="baseline"
                        >
                          <Input
                            value={cl.name}
                            size="large"
                            className={styles.input}
                            placeholder="Name"
                            onChange={(e) => {
                              const classesArray = event.classes
                              if (classesArray) {
                                const itemIndex = classesArray?.findIndex((obj) => obj.id == cl.id) as number
                                classesArray[itemIndex].name = e.target.value
                                updateNewEvent && updateNewEvent({ ...event, classes: classesArray })
                              }
                            }}
                          />
                          <InputNumber
                            placeholder="price"
                            value={cl.price}
                            size="large"
                            className={styles.input}
                            addonBefore="$"
                            onChange={(e) => {
                              const classesArray = event.classes
                              if (classesArray) {
                                const itemIndex = classesArray?.findIndex((obj) => obj.id == cl.id) as number
                                classesArray[itemIndex].price = e
                                updateNewEvent && updateNewEvent({ ...event, classes: classesArray })
                              }
                            }}
                          />
                          <InputNumber
                            placeholder="amount"
                            value={cl.amount}
                            size="large"
                            className={styles.input}
                            onChange={(e) => {
                              const classesArray = event.classes
                              if (classesArray) {
                                const itemIndex = classesArray?.findIndex((obj) => obj.id == cl.id) as number
                                classesArray[itemIndex].amount = e
                                updateNewEvent && updateNewEvent({ ...event, classes: classesArray })
                              }
                            }}
                          />
                          <MinusCircleOutlined
                            onClick={() => {
                              const newList = event.classes?.filter((c) => c.id !== cl.id)
                              updateNewEvent && updateNewEvent({ ...event, classes: newList })
                            }}
                          />
                        </Space>
                      </>
                    )
                  })}
                {!event?.isFree && (
                  <Button
                    type="dashed"
                    onClick={() => {
                      const currentList = event?.classes || []
                      const updatedList = [
                        ...currentList,
                        {
                          id: currentList.length == 0 ? 1 : currentList.length + 1,
                          name: '',
                          price: '',
                          amount: '',
                        },
                      ]
                      updateNewEvent && updateNewEvent({ ...event, classes: updatedList })
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Category
                  </Button>
                )}
                <div>
                  <Button
                    block
                    style={{ marginRight: 10, marginTop: 10 }}
                    type={event?.isFree ? 'primary' : 'dashed'}
                    shape="round"
                    size="large"
                    onClick={() => {
                      updateNewEvent && updateNewEvent({ ...event, isFree: !event?.isFree })
                    }}
                  >
                    Free
                  </Button>
                </div>
              </>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.back}>
              <Link href="/new/location">
                <a>
                  <Button className={styles.button} shape="round" size="large" htmlType="submit">
                    Back
                  </Button>
                </a>
              </Link>
            </div>
            <div className={styles.next}>
              <Link href="/new/date">
                <a>
                  <Button className={styles.button} type="primary" shape="round" size="large">
                    Next
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </>
      </div>
    </>
  )
}

export default Classes
