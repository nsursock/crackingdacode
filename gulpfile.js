var critical = require('critical')
var uglify = require('gulp-terser')
const { dest, src, task, series } = require('gulp')

task('minify', async function (cb) {
  src('dist/assets/main.bundle.js').pipe(uglify()).pipe(dest('dist/static'))
})

// task('minify', async function (cb) {
//   src('dist/**/*.{html,css,js}')
//     .pipe(uglify())
//     .pipe(dest('dist'))
// })

// var criticalCss = require('gulp-penthouse')
// const injectInline = require('@exuanbo/gulp-inject-inline')

task('critical', async function (cb) {
  // src('./dist/assets/main.bundle.css')
  //   .pipe(
  //     criticalCss({
  //       out: 'critical.css', // output file name
  //       url: './dist/index.html', // url from where we want penthouse to extract critical styles
  //       width: 1300, // max window width for critical media queries
  //       height: 900, // max window height for critical media queries
  //       strict: true,
  //       // userAgent:
  //       //   'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', // pretend to be googlebot when grabbing critical page styles.
  //     })
  //   )
  //   // .pipe(
  //   //   cssNano({
  //   //     safe: true, // this isn't required, but I've included cssNano to minify the output file
  //   //   })
  //   // )
  //   .pipe(dest('./dist/static/css/'))
  critical.generate({
    inline: true,
    base: 'dist/',
    src: 'index.html',
    css: ['assets/main.bundle.css'],
    dimensions: [
      {
        height: 500,
        width: 300,
      },
      {
        height: 720,
        width: 1280,
      },
    ],
    target: {
      // css: 'static/css/crit.bundle.css',
      html: 'index.html',
      uncritical: 'static/rest.bundle.min.css',
    },
    extract: true,
    // ignore: {
    //   atrule: ['@font-face', '@import'],
    // },
  })
})

// task('critical-inject', async function (cb) {
//   src('./dist/**/*.html').pipe(injectInline()).pipe(dest('dist'))
// })

var gulpBrotli = require('gulp-brotli')

task('compress', async function (cb) {
  src('dist/**/*.{html,css,js}', { buffer: false })
    .pipe(gulpBrotli.compress())
    .pipe(dest('dist'))
})

// task('critical', series('critical-extract', 'critical-inject'))
task('build', series('minify', 'critical'))

// var gzip = require("gulp-gzip");

// gulp.task("compress", function () {
//   gulp
//     .src("./dev/scripts/*.js")
//     .pipe(gzip())
//     .pipe(gulp.dest("./public/scripts"));
// });
