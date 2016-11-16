var gulp = require("gulp"),
    gutil = require("gulp-util"),
    htmlmin = require("gulp-htmlmin"),
    livereload = require("gulp-livereload"),
    rimraf = require("gulp-rimraf"),
    webpack = require("webpack"),
    webpackStream = require("webpack-stream"),
    connect = require("gulp-connect"),
    runSequence = require("run-sequence"),
    replace = require("gulp-replace");

var helper = {
    tasks: {
        clear: "clear",
        watch: "watch",
        compile: {
            deploy: "compile:deploy",
            server: "compile:server",
            html: "compile:html",
            ts: "compile:ts",
            options: {
                watch: false,
                deploy: false
            }
        }
    },
    path: {
        source: {
            defaultFile: "./app/App.Component.ts",
            html: "./app/**/*.html"
        },
        destination: {
            port: "8080",
            html: "./public",
            assets: "./public/assets"
        }
    },
    htmlMimify: {
        collapseWhitespace: true,
        removeComments: true,
        removeTagWhitespace: false,
        removeRedundantAttributes: true,
        caseSensitive: true
    },
    reload: {
        tag: function () {
            return helper.tasks.compile.options.watch === true
                ? "<script type=\"text/javascript\" src=\"//localhost:" + helper.reload.port + "/livereload.js?snipver =1\" async defer></script>"
                : "";
        },
        port: 35719
    },
    webpack: function () {
        var result = Object.create(require("./webpack.config.js"));

        if (helper.tasks.compile.options.watch === true) {
            result.debug = true;            
            result.devtool = "source-map";            
            result.watch = true;
            result.plugins = result.plugins || [];
            result.plugins.push(helper.webPackLog);
        }

        if (helper.tasks.compile.options.deploy === true) {
            result.plugins = result.plugins || [];
            result.plugins.push(new webpack.NoErrorsPlugin());
            result.plugins.push(new webpack.optimize.DedupePlugin());
            result.plugins.push(new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                comments: false,
                minimize: true,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    drop_console: true,
                    drop_debugger: true
                }
            }));
        }

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
    return gulp.src([helper.path.destination.html], { read: false })
        .pipe(rimraf());
});

gulp.task(helper.tasks.compile.html, function () {

    return gulp.src([helper.path.source.html])
        .pipe(replace("[{reload}]", helper.reload.tag()))
        .pipe(htmlmin(helper.htmlMimify))
        .pipe(gulp.dest(helper.path.destination.html))
        .on("end", function () {
            livereload.reload("index.html");
        });
});

gulp.task(helper.tasks.compile.ts, function () {
    return gulp.src(helper.path.source.defaultFile)
        .pipe(webpackStream(helper.webpack()))
        .pipe(gulp.dest(helper.path.destination.assets))
        .pipe(livereload());
});

gulp.task(helper.tasks.compile.deploy, function () {

    helper.tasks.compile.options.watch = false;
    helper.tasks.compile.options.deploy = true;

    return runSequence(helper.tasks.clear,
        [helper.tasks.compile.html, helper.tasks.compile.ts]);
});

gulp.task(helper.tasks.compile.server, function () {
    livereload.listen({
        port: helper.reload.port
    });

    connect.server({
        root: helper.path.destination.html,
        port: helper.path.destination.port,
        fallback: helper.path.destination.html + "/index.html",
        livereload: false
    });
})

gulp.task(helper.tasks.watch, function () {

    helper.tasks.compile.options.debug = true;
    helper.tasks.compile.options.watch = true;
    helper.tasks.compile.options.deploy = false;

    gulp.watch([helper.path.source.html], [helper.tasks.compile.html]);

    return runSequence(helper.tasks.clear,
        [helper.tasks.compile.html, helper.tasks.compile.ts, helper.tasks.compile.server]);
});