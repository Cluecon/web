/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Spin, Table, Modal, Input, message } from 'antd'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { getWeb3Address } from '../../../../utils/web3Login'
import { clueconnTicketsAddress } from '../../../../config'
import ClueconnTickets from '../../../../artifacts/contracts/ClueconnTickets.sol/ClueconnTickets.json'
import axios from 'axios'
import { getCodesByEventId } from '../../../../services/firebase'

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
                  await axios.post('https://us-central1-clueconn-73e93.cloudfunctions.net/api/verifyticketcode', {
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
    setIsLoading(true)
    const address = await getWeb3Address()
    setCurrentUserAddress(address)
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const otpCodes = await getCodesByEventId(uid as string)

    const clueconnTicketContract = new ethers.Contract(clueconnTicketsAddress, ClueconnTickets.abi, signer)
    const data = await clueconnTicketContract.fetchEventTickets(uid)
    const items = await Promise.all(
      data &&
        data.map(
          async (i: {
            tokenId: { toNumber: () => any }
            price: { toString: () => ethers.BigNumberish }
            creator: any
            owner: any
            scanned: any
          }) => {
            const price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            const codeArray = otpCodes && otpCodes.filter((c) => c.tokenId == i.tokenId.toNumber().toString())
            const item = {
              key: i.tokenId.toNumber().toString(),
              owner: i.owner,
              price: price,
              scanned: codeArray && codeArray.length > 0 && codeArray[0].verified.toString(),
              verify: i.tokenId.toNumber().toString(),
            }
            return item
          }
        )
    )
    setEvents(items)
    setIsLoading(false)
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
