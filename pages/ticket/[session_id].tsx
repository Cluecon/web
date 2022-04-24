import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Stripe from 'stripe'
import useSWR from 'swr'
import { useUserContext } from '../../context/user'
import { ITicket } from '../../models/Ticket'
import { addTicketToFirebase, getFirebaseTicket } from '../../services/firebase'
import { fetchGetJSON } from '../../utils/api-helpers'

function TicketPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const [ticket, setTicket] = useState<ITicket | undefined>()
  const [loading, setLoading] = useState(false)

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR<Stripe.Checkout.Session, any>(
    router.query.session_id ? `/api/checkout_sessions/${router.query.session_id}` : null,
    fetchGetJSON
  )
  if (error) {
    console.log('swr error', error)
  }

  const getOrCreateTicket = React.useCallback(async () => {
    if (user && data) {
      try {
        const ticket = await getFirebaseTicket(data.metadata?.eventId as string, data.id, user.uid)
        setTicket(ticket)
      } catch (err: any) {
        if (err.message.includes('not authorized')) {
          router.push('/403')
        } else if (err.message.includes('not found')) {
          try {
            const addedTicket = await addTicketToFirebase(
              data.metadata?.eventId as string,
              data.metadata?.userId as string,
              data.id
            )
            setTicket(addedTicket)
          } catch (error) {
            console.log(error)
          }
        } else {
          router.push('/500')
        }
      }
    }
    // your function using screenSize here
  }, [data, router, user])

  useEffect(() => {
    console.log('ticket', ticket)
    getOrCreateTicket()
  }, [getOrCreateTicket, ticket])

  return (
    <>
      <div>
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.status ?? 'loading...'}</h2>
        <h3>CheckoutSession response:</h3>
        <pre>{data ? JSON.stringify(data, null, 2) : 'loading...'}</pre>
      </div>
    </>
  )
}

export default TicketPage
