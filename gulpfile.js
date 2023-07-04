const { series, parallel } = require('gulp');

function clean(cb){
    cb();
}

function build(cb){
    cb();
}

function transpile(cb){
    cb();
}

function bundle(cb){
    cb();
}

function javascript(cb){
    cb();
}

function css(cb){
    cb();
}

exports.build = build;
exports.default = series(clean, build);
exports.build = series(transpile, bundle);
exports.build = parallel(javascript,css);
