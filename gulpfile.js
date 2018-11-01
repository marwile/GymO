//
// gulp file
// dt173g projekt
// php rest webb service 
// maria ågren 2018
//

//include node modules
const gulp = require("gulp");
//sass
const sass = require("gulp-sass");
const cleanCss = require("gulp-clean-css");
const concatCss = require("gulp-concat-css");

//compress images 
const compress =require("gulp-imagemin");

//copy php



//sass compiler and minifyer 
gulp.task("sass", function(){
    return gulp.src("src/sass/*.scss")
    .pipe(sass())
    .pipe(concatCss("main.min.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest("pub/css"));
});

//copy html files to pub
gulp.task("copyhtml", function(){
    return gulp.src("src/*.html")
    .pipe(gulp.dest("pub"));
});

//copy php files to pub
gulp.task("copyphp", function(){
    return gulp.src("src/*.php")
    .pipe(gulp.dest("pub"));
});

//compress images and copy images from src to pub
gulp.task("convertimages", function(){
    return gulp.src("src/images/*")
    .pipe(compress())
    .pipe(gulp.dest("pub/images"))
});

//copy js files to pub
gulp.task("copyjs", function(){
    return gulp.src("src/js/*.js")
    .pipe(gulp.dest("pub/js"))

});

//watch changes
gulp.task("watcher",function(){
    gulp.watch("src/sass/*.scss", ["sass"]);
    gulp.watch("src/*.html", ["copyhtml"]);
    gulp.watch("src/images/*", ["convertimages"]);
    gulp.watch("src/js/*.js", ["copyjs"]);
    gulp.watch("src/*.php", ["copyphp"]);

});


//default gulp
gulp.task("default", [ "sass", "copyhtml", "copyjs", "copyphp","convertimages","watcher"]);

