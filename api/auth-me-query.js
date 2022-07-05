import { createClient } from '@supabase/supabase-js'
const jwt = require('jsonwebtoken')

export default async function handler(request, response) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  )

  const storageName = process.env.NODE_ENV.startsWith('dev')
    ? 'users.dev'
    : 'users'

  try {
    var decoded = jwt.decode(request.body)
    response.status(201).send({
      success: true,
      user: (
        await supabase.from(storageName).select().eq('email', decoded.email)
      ).data[0],
    })
  } catch (error) {
    console.log(error)
    response
      .status(400)
      .send({ success: false, error: 'Sorry, an error occurred' })
  }
}
