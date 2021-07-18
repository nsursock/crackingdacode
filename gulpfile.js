var critical = require("critical");
var gulp = require("gulp");

gulp.task("critical", async function (cb) {
  critical.generate({
    inline: true,
    base: "_site/",
    src: "index.html",
    css: ["static/css/style.css"],
    dimensions: [
      {
        width: 320,
        height: 480,
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
      css: "static/css/critical.css",
      html: "index.html",
      uncritical: "static/css/uncritical.css",
    },
    // minify: true,
    extract: false,
    ignore: ["font-face"],
  });
});