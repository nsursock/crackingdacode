// const fetch = require('node-fetch-commonjs')

// module.exports = async () => {
//   let data = await fetch(
//     'https://plausible.io/api/v1/stats/breakdown?site_id=nsursock.netlify.app&period=6mo&property=event:page',
//     {
//       method: 'GET',
//       headers: {
//         Authorization:
//           'Bearer 2K985BK3VVcjSZIpdUo6mbWti2118_DoDvoi9k2nxxZwMPoOmrYFYpARCPUhbR97',
//       },
//     }
//   )
//   let json = (await data.json()).results
//   let top = json.filter((item) => item.page.includes('/blog/')).slice(0, 3)
//   console.log(top);
//   return { top }
// }
