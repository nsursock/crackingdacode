module.exports = {
  devMode: process.env.NODE_ENV !== 'production',
  environment: process.env.NODE_ENV || 'development',
  stripeKey: process.env.ELEVENTY_STRIPE_KEY
}
