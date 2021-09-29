const stripe = require('stripe')(
  (process.env.NODE_ENV || 'development').startsWith('prod')
    ? process.env.EXPRESS_STRIPE_KEY
    : 'sk_test_51JFiNrAfmGj15aPlIe0B1WTAbiChENOkQnnOfdrL8TnGuplrVLnxq18XrvAQn3HMLEqB09SqL2deOyI9wFTaEpEd00IUUpKLKh'
)
const YOUR_DOMAIN = (process.env.NODE_ENV || 'development').startsWith('prod')
  ? process.env.EXPRESS_FRONTEND_URL
  : 'http://localhost:8888'

exports.handler = async function (event, context) {
  const { currency, amount } = JSON.parse(event.body)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: currency,
          product_data: {
            name: 'WebDev - Nicolas Sursock',
            images: ['https://source.unsplash.com/500x500/?abstract'],
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/thanks`,
    cancel_url: `${YOUR_DOMAIN}`,
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ id: session.id }),
  }
}
