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
    const { email, name, password } = request.body

    if (
      (await supabase.from(storageName).select().eq('email', email)).data
        .length > 0
    )
      response
        .status(400)
        .send({ success: false, error: 'Email already taken by another user' })
    else {
      if (password.length < 8)
        response.status(400).send({
          success: false,
          error: 'Password should be min 8 characters',
        })
      else {
        const hash = await argon2.hash(password)
        const { data, error } = await supabase.from(storageName).insert({
          email,
          name,
          password: hash,
        })

        if (error) throw new Error(error)
        const token = jwt.sign(
          { userId: data[0].id, email: data[0].email },
          process.env.APP_SECRET,
          {
            expiresIn: '6h',
          }
        )
        data[0].token = token
        response.status(201).send({ success: true, user: data[0] })
      }
    }
  } catch (error) {
    console.log(error)
    response
      .status(400)
      .send({ success: false, error: 'Sorry, an error occurred' })
  }
}
