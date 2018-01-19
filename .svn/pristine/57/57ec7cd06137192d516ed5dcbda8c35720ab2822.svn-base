//引用需要的插件
var
	gulp = require('gulp'),
	uglify = require('gulp-uglify'), //压缩js
	compass = require('gulp-compass'), //解析sass
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'), //添加前缀
	minifycss = require('gulp-minify-css'), //css压缩
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	del = require('del'),
	preprocess = require('gulp-preprocess'),
	htmlmin = require('gulp-htmlmin'), //html压缩
	rev = require('gulp-rev'), //加MD5后缀
	revReplace = require("gulp-rev-replace"), //替换
	minifyHTML = require('gulp-minify-html'), //html压缩
	rename = require('gulp-rename'); 
	gulpSequence = require('gulp-sequence');//顺序执行

//生产路径
var prod = {
	html: 'dist/html',
	js: 'dist/js',
	css: 'dist/css',
	img: 'dist/img',
	beforeFile: ['dist', 'rev'],
	afterFile: ['dist/html/_*', 'dist/html/**/_*.html', 'dist/js/app.js']
};
//开发路径
var dev = {
	html: 'src/html/**/*.html',
	js: [
		'src/js/**/*.js',
		'!src/js/lib/*.min.js'
	],
	minJs: 'src/js/**/*.min.js',
	commonJs: 'src/js/common/app.js',
	sass: 'src/sass/**/*.scss',
	img: ['src/img/**/*.+(jpg|jpeg|ico|png|gif|svg|swf)']
};

//开发环境js的处理
gulp.task('script:dev', function() {
	//处理不包括min的js
	gulp.src(dev.js)
		.pipe(plumber())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(prod.js))

	//处理min后缀的js
	gulp.src(dev.minJs)
		.pipe(plumber())
		.pipe(gulp.dest(prod.js));

	//处理common下面的app.js
	gulp.src(dev.commonJs)
		.pipe(plumber())
		.pipe(preprocess())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(prod.js))
		.pipe(reload({
			stream: true
		}));
});

//生产环境js的处理
gulp.task('script:prod', function() {
	//处理不包括min的js
	gulp.src(dev.js)
		.pipe(plumber())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify()) //压缩js
//		.pipe(rev())
		.pipe(gulp.dest(prod.js))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev/js/file'))

	//处理min后缀的js
	gulp.src(dev.minJs)
		.pipe(plumber())
		.pipe(gulp.dest(prod.js));

	//处理common下面的app.js
	gulp.src(dev.commonJs)
		.pipe(plumber())
		.pipe(preprocess())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify()) //压缩js
//		.pipe(rev())
		.pipe(gulp.dest(prod.js))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev/js'))
		.pipe(reload({
			stream: true
		}));
});

//开发环境sass处理
gulp.task('compass:dev', function() {
	gulp.src(dev.sass)
		.pipe(plumber())
		.pipe(compass({
			config_file: './config.rb',
			css: 'src/css',
			sass: 'src/sass',
			require: ['susy']
		}))
		.pipe(autoprefixer('last 2 versions')) //主要浏览器最后2个版本
		.pipe(gulp.dest(prod.css))
		.pipe(reload({
			stream: true
		}));
});

//生产环境sass处理
gulp.task('compass:prod', function() {
	gulp.src(dev.sass)
		.pipe(plumber())
		.pipe(compass({
			config_file: './config.rb',
			css: 'src/css',
			sass: 'src/sass',
			require: ['susy']
		}))
		.pipe(minifycss()) //css压缩
		.pipe(autoprefixer('last 2 versions')) //主要浏览器最后2个版本
//		.pipe(rev())
		.pipe(gulp.dest(prod.css))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev/css'))
		.pipe(reload({
			stream: true
		}));
});

//开发环境html处理
gulp.task('html:dev', function() {
	return gulp.src(dev.html)
		.pipe(plumber())
		.pipe(preprocess())
		.pipe(gulp.dest(prod.html))
		.pipe(reload({
			stream: true
		}));
});

//生产环境html处理
gulp.task('html:prod', function() {
	return gulp.src(dev.html)
		.pipe(plumber())
		.pipe(preprocess())
		// .pipe(htmlmin({
		// 	removeComments: true,
		// 	removeCommentsFromCDATA: true,
		// 	collapseWhitespace: true,
		// 	collapseInlineTagWhitespace: true
		// }))
		.pipe(gulp.dest(prod.html))
		.pipe(reload({
			stream: true
		}));
});

//开发环境图片处理
gulp.task('image:dev', function() {
	return gulp.src(dev.img)
		.pipe(gulp.dest(prod.img));
});

//生产环境图片处理
gulp.task('image:prod', function() {
	return gulp.src(dev.img)
		.pipe(gulp.dest(prod.img));
});

// ////////////////////////////////////
// Browser-Sync Tasks
// ////////////////////////////////////
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './dist'
		},
		open: 'external'
	});
});

// task to run build server for testing final app
gulp.task('build:server', function() {
	browserSync({
		server: {
			baseDir: './build/'
		}
	});
});

// ////////////////////////////////////
// Build Tasks
// ////////////////////////////////////

// clear out all files and folders from build folder
gulp.task('build:clean', function(cb) {
	del([
		'build/**'
	], cb);
});

// task to create build directory for all files
gulp.task('build:copy', ['build:clean'], function() {
	return gulp.src('src/**/*/')
		.pipe(gulp.dest('build/'));
});

// task to remove unwanted build files
// list all files and directories here that you don't want to include
gulp.task('build:remove', ['build:copy'], function(cb) {
	del([
		'build/sass/',
		'build/js/!(*.min.js)'
	], cb);
});

gulp.task('build', ['build:copy', 'build:remove']);

//开发环境监控
gulp.task('watch:dev', function() {
	gulp.watch(dev.js, ['script:dev']);
	gulp.watch(dev.sass, ['compass:dev']);
	gulp.watch(dev.html, ['html:dev']);
	// gulp.watch(dev.img, ['image:dev']);
});

//生产环境监控
gulp.task('watch:prod', function() {
	gulp.watch(dev.js, ['script:prod']);
	gulp.watch(dev.sass, ['compass:prod']);
	gulp.watch(dev.html, ['html:prod']);
	gulp.watch(dev.img, ['image:prod']);
});

//开发环境删除运行之前生成的文件
gulp.task("clean:dev-before", function() {
	return del(prod.beforeFile);
})

//开发环境删除运行之后生成的文件
gulp.task("clean:dev-after", ['dev-build'], function() {
	return del(prod.afterFile);
})

//生产环境删除运行之前生成的文件
gulp.task("clean:prod-before", function() {
	return del(prod.beforeFile);
})

//生产环境删除运行之后生成的文件
gulp.task("clean:prod-after", ['prod-build'], function() {
	return del(prod.afterFile);
})

/**
 *版本管理替换文件 
 */
gulp.task("revreplace", ['clean:prod-after'], function() {
	var manifest = gulp.src('rev/**/*.json');
	return gulp.src('dist/html/**/*.html')
		.pipe(revReplace({
			manifest: manifest
		}))
		.pipe(gulp.dest(prod.html));
});

//开发环境的构建
gulp.task('dev-build', ['script:dev', 'compass:dev', 'html:dev', 'image:dev', 'watch:dev'])
//线上环境的构建
gulp.task('prod-build', ['script:prod', 'compass:prod', 'html:prod', 'image:prod', 'watch:prod'])


//运行开发环境
gulp.task('dev',gulpSequence(['clean:dev-before'], 'clean:dev-after','browser-sync'));


//运行生产环境
gulp.task('prod',gulpSequence(['clean:prod-before'], 'clean:prod-after'));


//默认的任务
gulp.task('default', gulpSequence(['clean:dev-before'], 'clean:dev-after','browser-sync'));