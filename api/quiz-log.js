import { createClient } from '@supabase/supabase-js'

async function handler(request, response) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  )

  const storageName = process.env.NODE_ENV.startsWith('dev')
    ? 'quizzes.dev'
    : 'quizzes'

  try {
    const { quiz, question, answer, correct, elapsed, user } = request.body
    await supabase.from(storageName).insert({
      quiz, question, answer, correct, elapsed, user
    })
    response.status(200).send({ success: true })
  } catch (err) {
    console.log(err)
    response.status(400).send({ success: false })
  }
}

export default handler
