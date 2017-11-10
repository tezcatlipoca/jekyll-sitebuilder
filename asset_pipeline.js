// asset_pipeline
// ================

// Requires
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');
const argv = require('minimist')(process.argv.slice(2));
const gulp = require('gulp');
const runSequence = require('run-sequence');

// Variables
var scss_files, js_files, img_files;

var runningAsScript = !module.parent;

// Gulp tasks
gulp.task('js_handler', () => {
	if (runningAsScript){
		console.log("AssetPipeline: JS Handler - not implemented yet, passing files through --->");
	}
	// Just pass the files through
	gulp.src(js_files_in).pipe(gulp.dest(js_files_out));
});

gulp.task('img_handler', () => {
	if (runningAsScript){
		console.log("AssetPipeline: IMG Handler - not implemented yet, passing files through --->");
	}
	// Just pass the files through
	gulp.src(img_files_in).pipe(gulp.dest(img_files_out));
});

gulp.task('sass_handler', () => {
	if (runningAsScript){
		console.log("AssetPipeline: SASS Handler - compiling");
	}
	gulp.src(scss_files_in).pipe(sass()).pipe(gulp.dest(scss_files_out));
});

// Public methods
module.exports = {

	// Set the locations
	init: function(options) {
		broswerSync = options.broswerSync;

		scss_files_in = options.scss_files_in;
		scss_files_out = options.scss_files_out;

		js_files_in = options.js_files_in;
		js_files_out = options.js_files_out;

		img_files_in = options.img_files_in;
		img_files_out = options.img_files_out;
	},

	// Do SCSS processing
	processSCSS: function() {
		runSequence('sass_handler');
		return "Asset Pipeline: SCSS processing";
	},

	// Do IMG processing
	processIMG: function() {
		runSequence('img_handler');
		return "Asset Pipeline: IMG processing";
	},

	// Do JS processing
	processJS: function() {
		runSequence('js_handler');
		return "Asset Pipeline: JS processing";
	}

};

// Parse command line input, requires a pair:
// --scss_in= --scss_out  | --js_in= --js_out | --img_in= --img_out
if(
	(argv.scss_in && argv.scss_out) ||
	(argv.js_in && argv.js_out) 	||
	(argv.img_in && argv.img_out)
){
	// Init
	module.exports.init({
		'scss_files_in':argv.scss_in,
		'scss_files_out':argv.scss_out,

		'js_files_in':argv.js_in,
		'js_files_out':argv.js_out,

		'img_files_in':argv.img_in,
		'img_files_out':argv.img_out,
	});

	if(scss_files_in){	module.exports.processSCSS(); }
	if(js_files_in){	module.exports.processJS(); }
	if(img_files_in){	module.exports.processIMG();  }

}else{

	if (runningAsScript){
		console.log('USAGE: asset_pipline [--scss_in --scss_out | --js_in --js_out | --img_in --img_out  ]');
		console.log('EXAMPLE: node ./asset_pipeline.js --scss_in=_assets/scss/**/*.scss --scss_out=/Users/andrew/Desktop/Output');
	}
}