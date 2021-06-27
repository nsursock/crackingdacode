module.exports = {
  environment: process.env.NODE_ENV || "development",
  stripeKey:
    process.env.ELEVENTY_STRIPE_KEY ||
    "pk_test_51IHPrGGrVUCQrQF7GzGUqErBudr5gE6HScm57Et46MkllKNJ9oEkNhghGdPjnlzpOchCOSylaR2paK85hwIVhAbn00Kgmxuzyl",
  apiUrl: process.env.ELEVENTY_BACKEND_URL || "http://localhost:8081",
};
