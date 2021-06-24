const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const htmlmin = require('gulp-html-minifier-terser')
const htmlclean = require('gulp-htmlclean')
const imagemin = require('gulp-imagemin')
const workbox = require("workbox-build");
// gulp-tester (如果使用 gulp-tester,把下面的//去掉)
// const terser = require('gulp-terser');

// babel
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

//pwa
gulp.task('generate-service-worker', () => {
  return workbox.injectManifest({
    swSrc: './sw-template.js',
    swDest: './public/sw.js',
    globDirectory: './public',
    globPatterns: [
        "**/*.{html,css,js,json,woff2}"
    ],
    modifyURLPrefix: {
        "": "./"
    }
  });
});

//minify js babel
gulp.task('compress', () =>
  gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
    .pipe(uglify().on('error', function(e){
      console.log(e);
    }))
		.pipe(gulp.dest('./public'))
);

// minify js - gulp-tester (如果使用 gulp-tester,把下面前面的//去掉)
// gulp.task('compress', () =>
//   gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
//     .pipe(terser())
//     .pipe(gulp.dest('./public'))
// )

//css
gulp.task('minify-css', () => {
  return gulp.src('./public/**/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie11'
    }))
    .pipe(gulp.dest('./public'));
});


// 压缩 public 目录内 html
gulp.task('minify-html', () => {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
      removeComments: true, //清除 HTML 註释
      collapseWhitespace: true, //压缩 HTML
      collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true, //删除 <script> 的 type="text/javascript"
      removeStyleLinkTypeAttributes: true, //删除 <style> 和 <link> 的 type="text/css"
      minifyJS: true, //压缩页面 JS
      minifyCSS: true, //压缩页面 CSS
      minifyURLs: true
    }))
    .pipe(gulp.dest('./public'))
});

// 压缩 public/uploads 目录内图片
gulp.task('minify-images', async () => {
  gulp.src('./public/img/**/*.*')
    .pipe(imagemin({
      optimizationLevel: 5, //类型：Number  预设：3  取值範围：0-7（优化等级）
      progressive: true, //类型：Boolean 预设：false 无失真压缩jpg图片
      interlaced: false, //类型：Boolean 预设：false 隔行扫描gif进行渲染
      multipass: false, //类型：Boolean 预设：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('./public/img'));
});

// 执行 gulp 命令时执行的任务
gulp.task("default", gulp.series("generate-service-worker", gulp.parallel(
    'compress','minify-html', 'minify-css', 'minify-images'
)));


