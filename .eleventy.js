const { devMode, statPwd } = require('./src/_data/env')
// const { Appsignal } = require('@appsignal/nodejs')

// const appsignal = new Appsignal({
//   active: !devMode,
//   name: 'CrackingDaCode',
// })

const { strictEqual } = require('assert')
const yaml = require('js-yaml')
const format = require('date-fns/format')
const fetch = require('node-fetch-commonjs')

const https = require('https')
const { log } = require('console')
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})

module.exports = (config) => {
  config.addCollection('postsByYear', (collection) => {
    const posts = collection.getFilteredByTag('blog').reverse()
    const years = posts.map((post) => post.date.getFullYear())
    const uniqueYears = [...new Set(years)]

    const postsByYear = uniqueYears.reduce((prev, year) => {
      const filteredPosts = posts.filter(
        (post) => post.date.getFullYear() === year
      )

      return [...prev, [year, filteredPosts]]
    }, [])

    return postsByYear
  })

  config.addFilter('latest', function (items) {
    return items.slice(0, 9)
  })

  config.addFilter('shuffle', function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  })

  // config.ignores.add('src/settings.njk')

  config.addFilter('getCode', function (items) {
    const index = items.findIndex((post) => post.url.includes('just-solution'))
    if (index !== -1) return items[index]
  })

  config.addFilter('getRandom', function (items) {
    let selected = items[Math.floor(Math.random() * items.length)]
    return selected
  })

  config.addFilter('date', function (date, dateFormat) {
    return format(date, dateFormat)
  })

  function filterTagList(tags) {
    return (tags || []).filter((tag) => ['all', 'blog'].indexOf(tag) === -1)
  }
  config.addFilter('filterTagList', filterTagList)
  config.addCollection('tagList', function (collection) {
    let tagSet = new Set()
    collection.getAll().forEach((item) => {
      ;(item.data.tags || []).forEach((tag) => tagSet.add(tag))
    })

    return filterTagList([...tagSet]).sort()
  })

  config.addFilter('isPaginated', (url) => new RegExp('^/[0-9]+/$').test(url))

  // function capitalize(str) {
  //   return str[0].toUpperCase() + str.substring(1)
  // }

  // config.addCollection('stats', async function (collection) {
  //   let data = await fetch(
  //     'https://plausible.io/api/v1/stats/aggregate?site_id=nsursock.netlify.app&period=6mo&metrics=visitors,pageviews,bounce_rate,visit_duration',
  //     {
  //       method: 'GET',
  //       headers: {
  //         // Authorization: `Bearer ${process.env.PLAUSIBLE_KEY}`,
  //         Authorization: `Bearer 2K985BK3VVcjSZIpdUo6mbWti2118_DoDvoi9k2nxxZwMPoOmrYFYpARCPUhbR97`,
  //       },
  //     }
  //   )
  //   let json = (await data.json()).results
  //   let stats = []
  //   for (const prop in json) {
  //     stats.push({
  //       name: prop
  //         .split('_')
  //         .map((w) => capitalize(w))
  //         .join(' '),
  //       value: json[prop].value,
  //     })
  //   }
  //   stats.push({
  //     name: 'Views / Visitor',
  //     value: (json.pageviews.value / json.visitors.value).toFixed(2),
  //   })
  //   return stats
  // })

  config.addCollection('stats', async function (collection) {
    let token = await fetch(
      'https://statumami-production.up.railway.app/api/auth/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: statPwd,
        }),
        // agent: httpsAgent,
      }
    )
    token = (await token.json()).token

    // const today = new Date(new Date().setHours(0, 0, 0, 0))
    const today = new Date()
    let endAt = today.getTime()
    let startAt = today.getTime() - 30 * 24 * 60 * 60 * 1000

    let data = await fetch(
      `https://statumami-production.up.railway.app/api/website/1/stats?start_at=${startAt}&end_at=${endAt}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        agent: httpsAgent,
      }
    )
    let json = await data.json()

    let stats = []
    stats.push({
      name: 'Views',
      value: json.pageviews.value,
      prev: json.pageviews.value - json.pageviews.change,
      change: (
        (json.pageviews.change /
          (json.pageviews.value - json.pageviews.change)) *
        100
      ).toFixed(),
    })
    stats.push({
      name: 'Visitors',
      value: json.uniques.value,
      prev: json.uniques.value - json.uniques.change,
      change: (
        (json.uniques.change / (json.uniques.value - json.uniques.change)) *
        100
      ).toFixed(),
    })
    stats.push({
      name: 'Average Time (s)',
      value: (json.totaltime.value / json.uniques.value).toFixed(),
      prev: (
        (json.totaltime.value - json.totaltime.change) /
        (json.uniques.value - json.uniques.change)
      ).toFixed(),
      change: (
        ((json.totaltime.value / json.uniques.value -
          (json.totaltime.value - json.totaltime.change) /
            (json.uniques.value - json.uniques.change)) /
          ((json.totaltime.value - json.totaltime.change) /
            (json.uniques.value - json.uniques.change))) *
        100
      ).toFixed(),
    })
    stats.push({
      name: 'Bounce Rate (%)',
      value: ((json.bounces.value / json.uniques.value) * 100).toFixed(),
      prev: (
        ((json.bounces.value - json.bounces.change) /
          (json.uniques.value - json.uniques.change)) *
        100
      ).toFixed(),
      change: (
        ((json.bounces.value / json.uniques.value -
          (json.bounces.value - json.bounces.change) /
            (json.uniques.value - json.uniques.change)) /
          ((json.bounces.value - json.bounces.change) /
            (json.uniques.value - json.uniques.change))) *
        100
      ).toFixed(),
    })

    const curr = (json.pageviews.value / json.uniques.value).toFixed(1)
    const prev = (
      (json.pageviews.value - json.pageviews.change) /
      (json.uniques.value - json.uniques.change)
    ).toFixed(1)
    stats.push({
      name: 'Views Per Visitor',
      value: curr,
      prev: prev,
      change: (((curr - prev) / prev) * 100).toFixed(),
    })

    // const p = await fetch('/api/stats-ip-log', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     startDate: startAt,
    //     endDate: endAt,
    //     mode: 'percent'
    //   }),
    // })
    // const d = (await p.json()).data
    // stats.push({
    //   name: 'Returning Users (%)',
    //   value: (d.filter(r => r.status === 'Returning').length / d.length * 100).toFixed(2),
    //   prev: 0,
    //   change: 0
    // })

    return stats
  })

  config.addPassthroughCopy({ public: './' })
  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
    open: true,
    // Tweak for Turbolinks & Browserstack Compatibility
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match
        },
      },
    },
  })
  config.setDataDeepMerge(true)
  config.addDataExtension('yaml', (contents) => yaml.load(contents))

  // config.addPassthroughCopy({
  //   './assets/main.bundle.js': './static/js/main.bundle.js',
  // })
  config.addPassthroughCopy('./src/static')

  config.addFilter('split', function (str, sep) {
    return (str + '').split(sep)
  })

  // config.addNunjucksAsyncFilter('views', async function (posts, callback) {
  //   let data = await fetch(
  //     'https://plausible.io/api/v1/stats/breakdown?site_id=nsursock.netlify.app&period=6mo&property=event:page',
  //     {
  //       method: 'GET',
  //       headers: {
  //         // Authorization: `Bearer ${process.env.PLAUSIBLE_KEY}`,
  //         Authorization: `Bearer 2K985BK3VVcjSZIpdUo6mbWti2118_DoDvoi9k2nxxZwMPoOmrYFYpARCPUhbR97`,
  //       },
  //     }
  //   )
  //   let json = (await data.json()).results
  //   let views = json?.filter((item) => item.page.includes('/blog/'))

  //   callback(
  //     null,
  //     views?.map((view) => {
  //       const index = posts.findIndex((post) => post.url === view.page)
  //       if (index !== -1) return { post: posts[index], views: view.visitors }
  //     })
  //   )
  // })

  // config.addNunjucksAsyncFilter('top', async function (posts, callback) {
  //   let data = await fetch(
  //     'https://plausible.io/api/v1/stats/breakdown?site_id=nsursock.netlify.app&period=6mo&property=event:page',
  //     {
  //       method: 'GET',
  //       headers: {
  //         // Authorization: `Bearer ${process.env.PLAUSIBLE_KEY}`,
  //         Authorization: `Bearer 2K985BK3VVcjSZIpdUo6mbWti2118_DoDvoi9k2nxxZwMPoOmrYFYpARCPUhbR97`,
  //       },
  //     }
  //   )
  //   let json = (await data.json()).results
  //   let tops = json?.filter((item) => item.page.includes('/blog/')).slice(0, 3)

  //   callback(
  //     null,
  //     tops?.map((top) => {
  //       const index = posts.findIndex((post) => post.url === top.page)
  //       if (index !== -1) return posts[index]
  //     })
  //   )
  // })

  config.addNunjucksAsyncFilter('top', async function (posts, callback) {
    let token = await fetch(
      'https://statumami-production.up.railway.app/api/auth/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: statPwd,
        }),
        agent: httpsAgent,
      }
    )
    token = (await token.json()).token

    let endAt = new Date().getTime()
    startAt = new Date().getTime() - 30 * 24 * 60 * 60 * 1000

    let data = await fetch(
      `https://statumami-production.up.railway.app/api/website/1/metrics?start_at=${startAt}&end_at=${endAt}&type=url`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // agent: httpsAgent,
      }
    )
    let json = await data.json()
    let tops = json?.filter((item) => item.x.includes('/blog/')).filter((item) => !item.x.includes('just-solution'))
    tops = tops.slice(0, Math.min(tops.length,3))

    callback(
      null,
      tops?.map((top) => {
        const index = posts.findIndex((post) => post.url === top.x)
        if (index !== -1) return posts[index]
      })
    )
  })

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    htmlTemplateEngine: 'njk',
  }
}
