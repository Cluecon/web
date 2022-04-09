import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { functionsAPi } from '../../../utils/functionsapi'
import { message, Spin, Input, Typography, Button } from 'antd'
import { getEventById, getTicketCodeData } from '../../../services/firebase'
import { getWeb3Address } from '../../../utils/web3Login'
import { IEvent } from '../../../models/event'

const { Title } = Typography

function LiveVideo() {
  const router = useRouter()
  const { cid } = router.query
  const [sessionId, setSessionId] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)
  const [isValidCode, setIsValidCode] = useState(false)
  const [event, setEvent] = useState<IEvent | undefined>()
  const [loggedInAddress, setLoggedInAddress] = useState<string | undefined>()

  async function getSession() {
    if (cid) {
      try {
        const session = await axios.get(`${functionsAPi}/video/api/session/${cid}`)
        if (session.status == 404) {
          router.push('/404')
        } else {
          setSessionId(session.data.id)
        }
      } catch (error: any) {
        if (error.message.includes('404')) {
          setLoading(false)
          router.push('/404')
        }
        throw new Error(error)
      }
    }
  }

  async function getEvent() {
    if (cid) {
      try {
        const event = await getEventById(cid as string)
        setEvent(event)
      } catch (error: any) {
        if (error.message.includes('not found')) {
          router.push('/404')
        }
        throw new Error(error)
      }
    }
  }

  async function getLoggedInAddress() {
    const add = await getWeb3Address()
    setLoggedInAddress(add)
  }

  async function getPreData() {
    try {
      setLoading(true)
      await getLoggedInAddress()
      await getEvent()
      await getSession()
      setLoading(false)
    } catch (error) {
      console.log(error)
      message.error('Internal server error')
      setLoading(false)
    }
  }

  useEffect(() => {
    getPreData()
  }, [])

  if (loading) {
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

  console.log(event?.creatorAddress)
  console.log(loggedInAddress)
  if (event && event?.creatorAddress !== loggedInAddress && !isValidCode) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '91vh',
          flexDirection: 'column',
        }}
      >
        <Title level={2}>Entry Code</Title>
        <Input style={{ width: '50%' }} size="large" placeholder="Input Entry Code" />
        <Button
          onClick={async () => {
            const userAddress = await getWeb3Address()
            const codeData = await getTicketCodeData(cid as string, userAddress)
            console.log(codeData)
          }}
          style={{ marginTop: 30 }}
          type="primary"
          size="large"
        >
          Submit
        </Button>
      </div>
    )
  }

  return (
    <>
      <div style={{ width: '100%', height: '91vh' }}>
        <iframe
          width="100%"
          height="100%"
          src={`https://video.clueconn.com/#/${sessionId}`}
          title={cid as string}
          allow="accelerometer;camera;microphone;display-capture ;
                    autoplay; 
                    clipboard-write; 
                    encrypted-media; 
                    gyroscope; 
                    picture-in-picture"
        ></iframe>
      </div>
    </>
  )
}

export default LiveVideo
