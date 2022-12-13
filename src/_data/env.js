require('dotenv').config()
console.log(process.env.VERCEL_ANALYTICS_ID);
module.exports = {
  devMode: process.env.NODE_ENV !== 'production',
  environment: process.env.NODE_ENV || 'development',
  stripeKey: process.env.ELEVENTY_STRIPE_KEY,
  statPwd: process.env.UMAMI_ADMIN_PWD,
  supaUrl: process.env.SUPABASE_URL,
  supaKey: process.env.SUPABASE_KEY,
  rosebud: process.env.ROSEBUD
}
