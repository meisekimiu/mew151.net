var { src, dest, series, watch } = require("gulp");
var browserify = require("gulp-browserify");
var ts = require("gulp-typescript");
var uglify = require("gulp-uglify");
const babel = require("gulp-babel");
var tsProject = ts.createProject("tsconfig.json");
const sass = require("gulp-sass")(require("sass"));
const replace = require("gulp-replace");
const rename = require("gulp-rename");

require("dotenv").config({ path: "src/portfolio/.env" });

function megatranspile() {
  return src("src/**/*.ts")
    .pipe(tsProject())
    .js.pipe(browserify({}))
    .pipe(babel({}))
    .pipe(
      uglify({
        mangle: {
          properties: false,
        },
        output: {
          comments: "some",
        },
      })
    )
    .pipe(dest("src"));
}

function sassy() {
  return src("src/**/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(dest("src"));
}

function htmly() {
  return src("src/**/*.html.template")
    .pipe(
      replace(/\{\{\s*(\w+?)\s*\}\}/g, (_match, key) => {
        return process.env[key] ?? key;
      })
    )
    .pipe(
      rename((path) => {
        path.basename = path.basename.replace(/.html$/, "");
        path.extname = ".html";
      })
    )
    .pipe(dest("src"));
}

function watchy() {
  watch("src/**/*.scss", sassy);
  watch("src/**/*.ts", megatranspile);
  watch("src/**/*.html.template", htmly);
}

exports.sass = sassy;
exports.html = htmly;
exports.default = series(htmly, megatranspile, sassy);
exports.watch = watchy;
