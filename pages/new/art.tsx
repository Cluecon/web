/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Button, Typography, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import Link from 'next/link'
import styles from '../../styles/New.module.css'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useNewEventContext } from '../../context/newEvent'

const client = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0' })

const { Title } = Typography
const { Dragger } = Upload

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

function Art() {
  const { event, updateNewEvent } = useNewEventContext()

  const ticketProps = {
    name: 'file',
    multiple: false,
    action: '',
    onChange(info: any) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log('uploading')
      }
      if (status === 'done') {
        uploadImageToIpfs(info.file.originFileObj)
          .then((url: any) => {
            console.log('url', url)
            updateNewEvent && updateNewEvent({ ...event, ticketArt: url })
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
    onDrop() {
      console.log('uploading')
    },
  }

  return (
    <>
      <div className={styles.container}>
        <div style={{ position: 'relative' }} className={styles.content}>
          <Title style={{ textAlign: 'center' }}>Upload Images</Title>
          <div className={styles.inputWrapper}>
            <Title level={5} style={{ textAlign: 'center' }}>
              Custom Ticket Art (Optional)
            </Title>
            <div>
              {!event?.ticketArt ? (
                <Dragger {...ticketProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Upload an artwork to be used in the ticket issued to buyers</p>
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
                    src={event.ticketArt}
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
            <Link href="/new/images">
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

export default Art
