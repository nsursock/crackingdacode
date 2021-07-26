module.exports = {
  devMode: process.env.NODE_ENV !== 'production',
  environment: process.env.NODE_ENV || "development",
  stripeKey:
    process.env.ELEVENTY_STRIPE_KEY ||
    "pk_test_51JFiNrAfmGj15aPl4snuD3ohWeHiF3PzDmm6EIjS2kr4CV0Bx2eJZWIX432GBZ7EqpG5xmc68pIg0uh5kEIZOdcd00jdzhZBLa",
  apiUrl: process.env.ELEVENTY_BACKEND_URL || "http://localhost:8081",
}
