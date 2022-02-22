const fs = require('fs')
var lda = require('lda')
var mdFiles = fs.readdirSync('src/blog')
mdFiles.forEach((file) => {
  fs.readFile('src/blog/'+file, 'utf8', (err, data) => {
      var documents = data.match(/[^\.!\?]+[\.!\?]+/g)
      var result = lda(documents, 5, 5)
      console.log(result);
  })
})

// var lda = require('@stdlib/nlp-lda')
// const fs = require('fs')
// var mdFiles = fs.readdirSync('src/blog')
// var model
// mdFiles.forEach((file) => {
//   fs.readFile('src/blog/' + file, 'utf8', (err, data) => {
//     var docs = data.match(/[^\.!\?]+[\.!\?]+/g)
//     model = lda(docs, 2)
//     model.fit(1000, 100, 10)
//     var words = model.getTerms(0, 3)
//     console.log(words)
//   })
// })
