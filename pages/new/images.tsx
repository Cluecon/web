/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {Button, Typography, Upload, message} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import Link from 'next/link'
import {create} from 'ipfs-http-client'
import styles from '../../styles/New.module.css'
import {useNewEventContext} from '../../context/newEvent'
import Router, {useRouter} from 'next/router'

const {Title} = Typography
const {Dragger} = Upload

const IpfsClient = create({url: ' https://dev-ipfs.clueconn.com'})

async function uploadFile(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      // @ts-ignore
      const buffer = Buffer.from(reader.result)
      IpfsClient.add(buffer)
        .then((files) => {
          resolve(files)
        })
        .catch((error) => reject(error))
    }
    reader.readAsArrayBuffer(file)
  })
}

function Images() {
  const {push} = useRouter()
  const {event, updateNewEvent} = useNewEventContext()

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
      const uploaded = await IpfsClient.add(JSON.stringify(event))
      const contentIpfsUrl = `https://dev-ipfs.clueconn.com/ipfs/${uploaded.path}`
      console.log('uploaded', contentIpfsUrl)
      // TODO: Save to blockchain
    }
  }

  const imagesProps = {
    name: 'file',
    multiple: true,
    action: '',
    onChange(info: any) {
      const {status} = info.file
      if (status !== 'uploading') {
        console.log('Uploading')
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
        uploadFile(info.file.originFileObj)
          .then((file: any) => {
            const newCovers =
              event?.covers && event?.covers?.length > 0
                ? [...event?.covers, {name: info.file.name, url: `https://dev-ipfs.clueconn.com/ipfs/${file.path}`}]
                : [{url: `https://dev-ipfs.clueconn.com/ipfs/${file.path}`, name: info.file.name}]
            updateNewEvent && updateNewEvent({...event, covers: newCovers})
          })
          .catch((err) => {
            console.log('err', err)
            message.error(`Error uploading file`)
          })
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onRemove(file: any) {
      updateNewEvent &&
        updateNewEvent({...event, covers: event?.covers?.filter((cv) => cv.name != file.originFileObj.name)})
    },
  }

  return (
    <>
      <div className={styles.container}>
        <div style={{position: 'relative'}} className={styles.content}>
          <Title style={{textAlign: 'center'}}>Upload Images</Title>
          <div className={styles.inputWrapper}>
            <Title level={5} style={{textAlign: 'center'}}>
              Event Images (Optional)
            </Title>
            <div>
              <Dragger {...imagesProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Upload event cover images (You can upload multiple images)</p>
              </Dragger>
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
