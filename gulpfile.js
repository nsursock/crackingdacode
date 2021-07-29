var critical = require('critical')
var uglify = require('gulp-terser')
const { dest, src, task, series } = require('gulp')

task('minify', async function (cb) {
  src('dist/assets/main.bundle.js')
    .pipe(uglify())
    .pipe(dest('dist/static/js'))
})

task('critical', async function (cb) {
  critical.generate({
    inline: true,
    base: 'dist/',
    src: 'index.html',
    css: ['assets/main.bundle.css'],
    dimensions: [
      {
        width: 320,
        height: 480,
      },
      {
        width: 375,
        height: 812,
      },
      {
        width: 768,
        height: 1024,
      },
      {
        width: 1280,
        height: 960,
      },
    ],
    target: {
      // css: 'static/css/crit.bundle.css',
      html: 'index.html',
      uncritical: 'static/css/rest.bundle.min.css',
    },
    extract: false,
    ignore: ['font-face'],
  })
})

task('build', series('minify', 'critical'))

// var gzip = require("gulp-gzip");

// gulp.task("compress", function () {
//   gulp
//     .src("./dev/scripts/*.js")
//     .pipe(gzip())
//     .pipe(gulp.dest("./public/scripts"));
// });
