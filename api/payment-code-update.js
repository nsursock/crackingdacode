import { createClient } from '@supabase/supabase-js'

export default async function handler(request, response) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  )

  const storageName = process.env.NODE_ENV.startsWith('dev')
    ? 'permissions.dev'
    : 'permissions'

  try {
    const { user, article } = request.body
    await supabase.from(storageName).insert({
      user,
      article,
    })
    response.status(200).send({ success: true })
  } catch (err) {
    response.status(400).send({ success: false })
  }
}
