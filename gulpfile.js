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

//concat vet inte om det behövs eller blir det bara en
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
//compress images and copy images from src to pub
gulp.task("convertimages", function(){
    return gulp.src("src/images/*")
    .pipe(compress())
    .pipe(gulp.dest("pub/images"))
});

//watch changes
gulp.task("watcher",function(){
    gulp.watch("src/sass/*.scss", ["sass"]);
    gulp.watch("src/*.html", ["copyhtml"]);
    gulp.watch("src/images/*", ["convertimages"]);

});


//default gulp
gulp.task("default", [ "sass", "copyhtml", "convertimages","watcher"]);

/*, "convertjs"


gulp.watch("src/js/*.js", ["convertjs"]);

*/