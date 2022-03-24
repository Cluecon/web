/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Button, Typography, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import styles from '../../styles/New.module.css'
import { useNewEventContext } from '../../context/newEvent'
import Router, { useRouter } from 'next/router'
import { saveEventToFirebase } from '../../services/firebase'
import { getWeb3Address } from '../../utils/web3Login'
import { IEvent } from '../../models/event'

const { Title } = Typography
const { Dragger } = Upload

const client = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0' })

function Images() {
  const { push } = useRouter()
  const { event, updateNewEvent } = useNewEventContext()

  async function uploadToIpfs() {
    if (!event?.title) {
      push('/new/title')
    } else if (!event.description) {
      push('/new/description')
    } else if (!event.location) {
      push('/new/location')
    } else if (!event.date) {
      Router.push('/new/date')
    } else if (!event.classes) {
      push('/new/classes')
    } else {
      const tagsList = event.tags?.filter((t) => t.isSelected).map((tag) => tag.name)
      const address = await getWeb3Address()
      const toIpfs = { ...event, tags: tagsList, ownerAddress: address } as IEvent
      const added = await client.add(JSON.stringify(toIpfs))
      const jsonUrl = `https://ipfs.infura.io/ipfs/${added.path}`
      const toUpload = { ...toIpfs, ipfsAdress: jsonUrl }
      const firebaseEvent = (await saveEventToFirebase(toUpload)) as IEvent
      push(`/event/${firebaseEvent.uid}`)
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
    action: '',
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
                      updateNewEvent && updateNewEvent({ ...event, ticketArt: undefined })
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
            <Button className={styles.button} type="primary" shape="round" size="large" onClick={uploadToIpfs}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Images
