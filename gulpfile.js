const { parallel } = require("gulp");
const { src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const comments = require("gulp-header-comment");

/*
    -- TOP LEVEL FUNCTIONS --
    gulp.task - Define tasks
    gulp.src - Points to files to use and compile
    gulp.dest -- Points to folder to output
    gulp.watch -- Watch files and folders for changes
*/

let path = {
  src: {
    html: "src/*.html",
    htminc: "src/**/*.htm",
    js: "src/js/*.js",
    css: "src/css/*.css",
    scss: "src/sass/*.scss",
    images: "src/img/**/*.+(png|jpg|jpeg|svg)",
    others: "src/**/*.+(php|ico|png)",
    vendor: "src/vendor/**/*.js",
  },
  build: {
    dirBuild: "production/",
    dirDev: "development/",
  },
};

let content = {
  comments: "WEBSITE: medium.com/@echoness",
};

async function copyHTML() {
  return src(path.src.html)
    .pipe(comments(content.comments))
    .pipe(dest(path.build.dirDev));
}

// async function transpilation() {
//   return src(path.src.scss)
//     .pipe(sass().on("error", sass.logError))
//     .pipe(dest(path.build.dirDev + "css/"));
// }

// async function cssConcat() {
//   return src(path.src.css)
//     .pipe(concat("style.css"))
//     .pipe(dest(path.build.dirDev + "css/"));
// }

// async function cssConcat() {
//   return src(path.src.css)
//     .pipe(concat("style.css"))
//     .pipe(dest(path.build.dirDev + "css/"));
// }

async function cssBuild() {
  return src(path.src.scss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer)
    .pipe(sourcemaps.write("/"))
    .pipe(comments(content.comments))
    .pipe(dest(path.build.dirDev));
}

async function jsBuild() {
  return src(path.src.js)
    .pipe(babel())
    .pipe(src(path.src.vendor))
    .pipe(dest(path.build.dirDev))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest(path.build.dirDev));
}

exports.build = parallel(copyHTML, cssBuild, jsBuild);
