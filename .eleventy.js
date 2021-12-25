const { strictEqual } = require('assert')
const yaml = require('js-yaml')
const format = require('date-fns/format')
const fetch = require('node-fetch-commonjs')

module.exports = (config) => {
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
  config.addPassthroughCopy('./src/static/img')

  config.addFilter('split', function (str, sep) {
    return (str + '').split(sep)
  })

  config.addNunjucksAsyncFilter('top', async function (posts, callback) {
    let data = await fetch(
      'https://plausible.io/api/v1/stats/breakdown?site_id=nsursock.netlify.app&period=6mo&property=event:page',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PLAUSIBLE_KEY}`,
        },
      }
    )
    let json = (await data.json()).results
    let tops = json.filter((item) => item.page.includes('/blog/')).slice(0, 3)
    // console.log(tops);

    callback(
      null,
      tops.map((top) => {
        const index = posts.findIndex((post) => post.url === top.page)
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
