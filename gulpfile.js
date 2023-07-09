const { parallel, src, dest, watch, series } = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const comments = require("gulp-header-comment");
const browserSync = require("browser-sync");

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
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer)
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

/*
    -- TOP LEVEL FUNCTIONS --
    gulp.task - Define tasks
    gulp.src - Points to files to use and compile
    gulp.dest -- Points to folder to output
    gulp.watch -- Watch files and folders for changes
*/

let path_sass = {
  src: {
    html: "src-sass/*.html",
    htminc: "src-sass/**/*.htm",
    js: "src-sass/js/*.js",
    css: "src-sass/css/*.css",
    scss: "src-sass/scss/**/*.scss",
    images: "src-sass/images/**/*.+(png|jpg|jpeg|svg)",
    others: "src-sass/**/*.+(php|ico|png)",
    vendor: "src-sass/vendor/**/*.js",
  },
  build: {
    dirBuild: "production-sass/",
    dirDev: "development-sass/",
  },
};

async function cssBuild() {
  return src(path_sass.src.scss)
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(dest(path_sass.build.dirDev));
}

async function copyHTML() {
  return src(path_sass.src.html)
    .pipe(comments(content.comments))
    .pipe(dest(path_sass.build.dirDev));
}

async function copyImage() {
  return src(path_sass.src.images).pipe(
    dest(path_sass.build.dirDev + "images/")
  );
}

async function watchFiles(){
  // Initialize browser sync
  browserSync.init({
    server:path_sass.build.dirDev
  });

  // Compile scss when the files changes
  watch(path.src.scss, cssBuild).on("change", browserSync.reload);

  // Copy images when images change
  watch(path_sass.src.images, copyImage);

  // Copy html when file changes happen
  watch(path_sass.src.html, copyHTML).on('change', browserSync.reload);
}

// exports.default = series(watchFiles);
exports.compile = parallel(copyHTML, copyImage, cssBuild);
