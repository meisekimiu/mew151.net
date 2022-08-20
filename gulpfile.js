var { src, dest, series } = require("gulp");
var browserify = require("gulp-browserify");
var ts = require("gulp-typescript");
var uglify = require("gulp-uglify");
const babel = require("gulp-babel");
var tsProject = ts.createProject("tsconfig.json");
const sass = require("gulp-sass")(require("sass"));

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

exports.sass = sassy;
exports.default = series(megatranspile, sassy);
