import { createClient } from '@supabase/supabase-js'

async function handler(request, response) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  )

  const storageName = process.env.NODE_ENV.startsWith('dev')
    ? 'sessions.dev'
    : 'sessions'

  try {
    const { startDate, endDate } = request.body
    const { data, error } = supabase
      .from(storageName)
      .select('*')
      .lt('created_at', new Date(endDate).toISOString())
      .gt('created_at', new Date(startDate).toISOString())
    response.status(200).json({ data })
  } catch (err) {
    console.log(err)
    response.status(400).send({ success: false })
  }
}

export default handler
