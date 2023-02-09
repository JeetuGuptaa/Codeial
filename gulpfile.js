// const gulp = require('gulp');//optimizing our code, like minifying our css, js and compressing images
// const sass = require('gulp-sass')(require('sass'));//to conert sass to css
// const cssnano = require('gulp-cssnano')//to minify css
// const rev = require('gulp-rev')//to rename the file, we are renaming our files to prevent browser from caching our files

// //when using gulp we creates tasks one of them will be to minify css
// gulp.task('css', function(){
//     console.log('minifying css...');

//     gulp.src('./assets/sass/**/*.scss')//** means take all the folders and subfolder and ans *.scss takes any file with extension .scss
//     .pipe(sass())//calling scss, pipe is a function which is calling all these middlewares with the gulp
//     .pipe(cssnano())//calling cssnano to minify css
//     .pipe(gulp.dest('./assets/css'))

//     //for production we will be putting our files in a separate folder, 'public' which contains assets and so on
//     return gulp.src('./assets/**/*.css') 
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))//it will put it into the css folder
//     .pipe(rev.manifest({
//         cwd : 'public',
//         merger : true
//     }))
//     .pipe(gulp.dest('./public/assets'))
// });

 
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));//to conert sass to css
const cssnano = require('gulp-cssnano');//to minify css
const rev = require('gulp-rev');//to rename the file, we are renaming our files to prevent browser from caching our files
const uglify = require('gulp-uglify-es').default;//to minify js
const imagemin = require('gulp-imagemin');//to compress images
const del = require('del');//to delete the previous files from public folder

//when using gulp we creates tasks one of them will be to minify css
gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

     gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest('public/assets/rev-manifest.json', {
        base: 'public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest('public/assets/rev-manifest.json', {
        base: 'public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')//regular expression to match name
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest('public/assets/rev-manifest.json', {
        base: 'public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

//we had to separately call all the tasksk like glup css for css, gulp js for js and so on 
//so we have build a task "build" which will do it for us
gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});