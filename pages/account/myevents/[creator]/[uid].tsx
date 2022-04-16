/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Spin, Table, Modal, Input, message } from 'antd'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { functionsAPi } from '../../../../utils/functionsapi'

function MyEventDetail() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentUserAddress, setCurrentUserAddress] = useState<string | undefined>()
  const [events, setEvents] = useState<{ key: string; owner: string; price: string; scanned: string }[]>([])
  const [isVerifyVisible, setIsVerifyVisible] = useState(false)
  const [code, setCode] = useState('')
  // const [fbEvent, setFbEvent] = useState<IEvent | undefined>();
  const { creator, uid } = router.query

  const columns = [
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Scanned',
      dataIndex: 'scanned',
      key: 'scanned',
    },
    {
      title: 'Verify',
      dataIndex: 'verify',
      key: 'verify',
      render: (tokenId: string) => (
        <>
          <Button
            type="primary"
            onClick={async () => {
              setIsVerifyVisible(true)
            }}
          >
            Verfify
          </Button>
          <Modal
            title="Verify Passcode"
            centered
            visible={isVerifyVisible}
            onOk={async () => {
              if (code.length) {
                try {
                  await axios.post(`${functionsAPi}/verifyticketcode`, {
                    eventId: uid,
                    tokenId: tokenId,
                    code: code,
                  })
                  await loadData()
                } catch (error) {
                  console.log('error')
                  message.error('Invalid Code')
                }
              }
            }}
            onCancel={() => setIsVerifyVisible(false)}
          >
            <Input value={code} onChange={(e) => setCode(e.target.value)} size="large" placeholder="Enter Code" />
          </Modal>
        </>
      ),
    },
  ]
  // async function loadEvent() {
  //     setIsLoading(true);
  //     const myevents = await getEventById(uid as string)
  //     setFbEvent(myevents as IEvent);
  // }

  async function loadData() {
    console.log('load data')
  }

  useEffect(() => {
    loadData()
    // loadEvent();
  }, [])

  if (isLoading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  if (!isLoading && currentUserAddress && creator && creator !== currentUserAddress) {
    router.push('/403')
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
      <div style={{ width: '80%' }}>
        <div style={{ marginTop: 50 }}>
          <Table dataSource={events} columns={columns} />
        </div>
      </div>
    </div>
  )
}

export default MyEventDetail
