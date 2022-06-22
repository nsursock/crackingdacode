const fetch = require('node-fetch')
async function getMetrics() {
  let data = await fetch(
    'https://plausible.io/api/v1/stats/aggregate?site_id=nsursock.netlify.app&period=6mo&metrics=visitors,pageviews,bounce_rate,visit_duration',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer 2K985BK3VVcjSZIpdUo6mbWti2118_DoDvoi9k2nxxZwMPoOmrYFYpARCPUhbR97`,
      },
    }
  )
  let json = (await data.json()).results
  console.log(json)
}

getMetrics()