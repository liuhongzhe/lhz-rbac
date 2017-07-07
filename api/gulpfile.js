var gulp = require('gulp');
var del = require('del');
var gts = require('gulp-typescript');
var gsm = require('gulp-sourcemaps');
var gtsp = gts.createProject('tsconfig.json');

var paths = {
    outputRoot: 'dist',
    api: {
        src: 'src/**/*.ts',
        dest: 'dist'
    }
}

gulp.task('clean', function () {
    return del(paths.outputRoot);
});

gulp.task('tsc', ['clean'], function () {
    return gulp.src(paths.api.src)
        .pipe(gsm.init())
        .pipe(gtsp())
        .js
        .pipe(gsm.write('.', {
            sourceRoot: function (file) {
                return file.cwd + '\\src';
            }
        }))
        .pipe(gulp.dest(paths.api.dest));
});

gulp.task('build', ['default']);

gulp.task('default', ['clean', 'tsc']);