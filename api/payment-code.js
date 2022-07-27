const stripe = require('stripe')(process.env.EXPRESS_STRIPE_KEY)

export default async function handler(request, response) {
  
  const intent = await stripe.paymentIntents.create({
    amount: Math.round(parseFloat(request.body.protection) * 100),
    currency: 'eur',
    automatic_payment_methods: { enabled: true },
  })

  response.status(200).json({ client_secret: intent.client_secret })
}
