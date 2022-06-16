import { createClient } from '@supabase/supabase-js'

export default async function handler(request, response) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    )
    const data = (await supabase.from('testimonials').select()).data
    response.status(200).json({ data })
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch testimonials.' })
  }
}
