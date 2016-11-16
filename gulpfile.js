var gulp = require("gulp"),
    gutil = require("gulp-util"),
    livereload = require("gulp-livereload"),
    rimraf = require("gulp-rimraf"),
    webpack = require("webpack"),
    webpackStream = require("webpack-stream"),
    connect = require("gulp-connect"),
	open = require("gulp-open"),
    runSequence = require("run-sequence");

var helper = {
    tasks: {
        clear: "clear",        
        test: {
			open: "test:open",
            watch: "test:watch",
            server: "test:server",
            compile: "test:compile"
        },
        compile: {
            deploy: "compile:deploy",
            server: "compile:local"
        }
    },
    path: {
        test: {
            root: "./test/runner",
            spec: "./test/runner/spec"
        },
        source: {
            root: "./scr",
            lib: "./lib"
        }
    },
    webpack: function () {
        var result = Object.create(require("./webpack.config.js"));

        result.debug = true;
        result.devtool = "source-map";
        result.watch = true;
        result.plugins = result.plugins || [];
        result.plugins.push(helper.webPackLog);

        return result;
    },
    webPackLog: function () {
        this.plugin("done", function (stats) {
            if (stats.compilation.errors && stats.compilation.errors.length) {
                console.log("");
                console.log("********************************************************************************");
                console.log("********************************   ERROR   *************************************");
                console.log("");
                console.log(stats.compilation.errors);
                console.log("********************************************************************************");
                console.log("");
                stats.compilation.errors = [];
            }
        });
    }
};

gulp.task(helper.tasks.clear, function () {
    return gulp.src([helper.path.source.lib, helper.path.test.spec], { read: false })
        .pipe(rimraf());
});

gulp.task(helper.tasks.test.compile, function () {

    return gulp.src(helper.path.test.root + "index.html", { read: false })
        .pipe(webpackStream(helper.webpack()))
        .pipe(gulp.dest(helper.path.test.spec))
        .pipe(livereload());
});

gulp.task(helper.tasks.test.open, function () {
    var options = {
		uri: "http:/localhost:38081",
		app: "chrome"
	};
	
	gulp.src(__filename)
		.pipe(open(options));
})

gulp.task(helper.tasks.test.server, function () {
    livereload.listen({
        port: 38082
    });

    connect.server({
        root: helper.path.test.root,
        port: 38081,
        fallback: helper.path.test.root + "/index.html",
        livereload: false
    });
})

gulp.task(helper.tasks.test.watch, function () {

    gulp.watch([helper.path.source.lib, helper.path.test.spec], [helper.tasks.compile.test]);

    return runSequence(
        helper.tasks.clear,
		helper.tasks.test.open,
        [
            helper.tasks.test.compile,
            helper.tasks.test.server
        ]
    );
});