import { createClient } from '@supabase/supabase-js'

async function handler(request, response) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  )

  const storageName = process.env.NODE_ENV.startsWith('dev')
    ? 'rankings.dev'
    : 'rankings'

  try {
    const { user, quiz, accuracy, speed, accuracy2, speed2 } = request.body
    await supabase.from(storageName).insert({
      player: user, quiz, accuracy, speed, accuracy2, speed2
    })
    response.status(200).send({ success: true })
  } catch (err) {
    console.log(err)
    response.status(400).send({ success: false })
  }
}

export default handler
