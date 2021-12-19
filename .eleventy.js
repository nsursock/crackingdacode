const { strictEqual } = require('assert')
const yaml = require('js-yaml')
const format = require('date-fns/format')

module.exports = (config) => {
  config.addFilter('date', function (date, dateFormat) {
    return format(date, dateFormat)
  })

  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ['all', 'blog'].indexOf(tag) === -1
    )
  }
  config.addFilter('filterTagList', filterTagList)
  config.addCollection('tagList', function (collection) {
    let tagSet = new Set()
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag))
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

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    htmlTemplateEngine: 'njk',
  }
}
