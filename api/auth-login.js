import { createClient } from '@supabase/supabase-js'
const argon2 = require('argon2')
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
    const { email, password } = request.body

    const data = (await supabase.from(storageName).select().eq('email', email))
      .data

    if (data.length === 0) {
      response
        .status(400)
        .send({ success: false, error: 'User with this email not found' })
    } else {
      if (await argon2.verify(data[0].password, password)) {
        // password match
        const token = jwt.sign(
          { userId: data[0].id, email: data[0].email },
          process.env.APP_SECRET,
          {
            expiresIn: '6h',
          }
        )
        data[0].token = token
        response.status(201).send({ success: true, user: data[0] })
      } else {
        // password did not match
        response
          .status(400)
          .send({ success: false, error: 'The password provided was invalid' })
      }
    }
  } catch (error) {
    console.log(error)
    response
      .status(400)
      .send({ success: false, error: 'Sorry, an error occurred' })
  }
}
