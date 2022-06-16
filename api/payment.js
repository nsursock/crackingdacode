const stripe = require('stripe')(process.env.EXPRESS_STRIPE_KEY)

const YOUR_DOMAIN = process.env.EXPRESS_FRONTEND_URL

export default async function handler(request, response) {
  const { currency, amount } = request.body

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: currency,
          product_data: {
            name: 'Cracking Da Code',
            images: ['https://source.unsplash.com/500x500/?abstract'],
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/thanks.html`,
    cancel_url: `${YOUR_DOMAIN}`,
  })

  response.status(200).json({ id: session.id })
}
