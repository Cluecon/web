import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { CURRENCY, formatAmountForStripe, MAX_AMOUNT, MIN_AMOUNT } from '../../../utils/stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const amount: number = req.body.amount
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error('Invalid amount.')
      }
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        line_items: [
          {
            name: 'Pay for ticket',
            amount: formatAmountForStripe(amount, CURRENCY),
            currency: CURRENCY,
            quantity: 1,
          },
        ],
        metadata: {
          userId: req.body.userId,
          eventId: req.body.eventId,
        },
        success_url: `${req.headers.origin}/ticket/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/event/${req.body.eventId}`,
      }
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)

      console.log('checkout Session')

      res.status(200).json(checkoutSession)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
