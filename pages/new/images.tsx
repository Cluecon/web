/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Button, Typography, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { v4 as uuidv4 } from 'uuid'
import styles from '../../styles/New.module.css'
import { useNewEventContext } from '../../context/newEvent'
import { useRouter } from 'next/router'
import { saveEventToFirebase } from '../../services/firebase'
import { getWeb3Address } from '../../utils/web3Login'
import { IEvent } from '../../models/event'
import Head from 'next/head'

const { Title } = Typography
const { Dragger } = Upload

const client = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0' })

function Images() {
  const { push } = useRouter()
  const { event, updateNewEvent } = useNewEventContext()
  const [loading, setLoading] = useState(false)

  async function uploadToIpfs() {
    if (!event?.title) {
      push('/new/title')
    } else if (!event.description) {
      push('/new/description')
    } else if (!event.date) {
      push('/new/date')
    } else if (!event.classes && !event.isFree) {
      push('/new/classes')
    } else if (event.classes && event.classes?.length > 0) {
      event.classes.map((cl) => {
        if (!cl.name || !cl.price) {
          push('/new/classess')
        }
      })
    } else {
      try {
        setLoading(true)
        const tagsList = event.tags?.filter((t) => t.isSelected).map((tag) => tag.name)
        const address = await getWeb3Address()
        const uid = uuidv4()
        const toIpfs = {
          ...event,
          tags: tagsList,
          creatorAddress: address,
          uid: uid,
          location: event.location ? event.location : null,
        } as IEvent
        const added = await client.add(JSON.stringify(toIpfs))
        const jsonUrl = `https://ipfs.infura.io/ipfs/${added.path}`
        const toUpload = { ...toIpfs, ipfsAdress: jsonUrl }
        const firebaseEvent = (await saveEventToFirebase(toUpload)) as IEvent
        setLoading(false)
        push(`/event/${firebaseEvent.uid}`)
      } catch (error) {
        console.error(error)
        setLoading(false)
        message.error('Internal server error! Please try again')
      }
    }
  }

  async function uploadImageToIpfs(file: File) {
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      })
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  const imagesProps = {
    name: 'file',
    multiple: true,
    action: '/api/antupload',
    onChange(info: any) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log('Uploading')
      }
      if (status === 'done') {
        uploadImageToIpfs(info.file.originFileObj)
          .then((url: any) => {
            console.log('url', url)
            updateNewEvent && updateNewEvent({ ...event, covers: url })
          })
          .catch((err) => {
            console.log('err', err)
            message.error(`Error uploading file`)
          })
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Clueconn | Upload Cover images</title>
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
        <div style={{ position: 'relative' }} className={styles.content}>
          <Title style={{ textAlign: 'center' }}>Upload Images</Title>
          <div className={styles.inputWrapper}>
            <Title level={5} style={{ textAlign: 'center' }}>
              Event Images (Optional)
            </Title>
            <div>
              {!event?.covers ? (
                <Dragger {...imagesProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Upload event cover images (You can upload multiple images)</p>
                </Dragger>
              ) : (
                <div
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    width={300}
                    height={300}
                    // layout="responsive"
                    src={event.covers}
                    alt={event.title}
                    style={{ marginBottom: 10 }}
                  />
                  <Button
                    className={styles.button}
                    type="default"
                    shape="round"
                    size="large"
                    onClick={() => {
                      updateNewEvent && updateNewEvent({ ...event, covers: undefined })
                    }}
                  >
                    Replace
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.back}>
            <Link href="/new/art">
              <a>
                <Button className={styles.button} shape="round" size="large">
                  Back
                </Button>
              </a>
            </Link>
          </div>
          <div className={styles.next}>
            <Button
              className={styles.button}
              type="primary"
              shape="round"
              size="large"
              onClick={uploadToIpfs}
              loading={loading}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Images
