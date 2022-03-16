/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {Button, Typography, Upload, message} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import Link from 'next/link'
import styles from '../../styles/New.module.css'
// import { useNewEventContext } from '../../context/newEvent';

const {Title} = Typography
const {Dragger} = Upload

function Art() {
  // const { event, updateNewEvent } = useNewEventContext()

  const ticketProps = {
    name: 'file',
    multiple: false,
    action: '',
    onChange(info: any) {
      const {status} = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  return (
    <>
      <div className={styles.container}>
        <div style={{position: 'relative'}} className={styles.content}>
          <Title style={{textAlign: 'center'}}>Upload Images</Title>
          <div className={styles.inputWrapper}>
            <Title level={5} style={{textAlign: 'center'}}>
              Custom Ticket Art (Optional)
            </Title>
            <div>
              <Dragger {...ticketProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Upload an artwork to be used in the ticket issued to buyers</p>
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
