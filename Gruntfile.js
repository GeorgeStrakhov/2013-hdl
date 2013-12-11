module.exports = function(grunt) {
	grunt.registerTask('watch', [ 'watch' ]);
	grunt.registerTask('server', [ 'connect', 'watch' ]);

	grunt.initConfig({
		less: {
			style: {
				files: {
					"app/css/styles.css": "app/less/styles.less"
				}
			}
		},
		concat: {
			dist: {
				src: ['bower_components/jquery/jquery.min.js', 'bower_components/bootstrap/dist/js/bootstrap.min.js', 'app/js/*.js', '!app/js/main.js', '!app/js/built.min.js', 'app/js/main.js'],
				dest: 'app/js/built.min.js'
			}
		},
		uglify: {
			options: {
				mangle: true,
				compress: true
			},
			my_target: {
				files: {
					'app/js/built.min.js': ['app/js/built.min.js']
				}
			},
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'app/css/',
				src: ['*.css', '!*.min.css'],
				dest: 'app/css/',
				ext: '.min.css'
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'app/',
				}
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			html: {
				files: ['app/html/*.html'],
				tasks: ['inject:single']
			},
			js: {
				files: ['app/js/*.js', '!app/js/built.min.js'],
				tasks: ['concat','uglify']
			},
			css: {
				files: ['app/less/*.less', 'app/less/themes/*.less'],
				tasks: ['less:style', 'cssmin'],
			}
		},
		inject: {
			single: {
				scriptSrc: 'Workflow.js',
				files: {
					'app/index.html': 'app/html/index.html'
				}
			}
		},
		copy: {
			buildAssets: {
				cwd: 'app',
				src: [ 'css/styles.min.css','js/built.min.js', 'img/png/**'],
				dest: 'build',
				expand: true
			},
			buildHtml: {
				cwd: 'app',
				src: [ 'html/**' ],
				dest: 'build',
				expand: true,
				flatten: true
			}
		},
		clean: {
			build: {
				src: [ 'build' ]
			}
		}
	});

	//NPM tasks
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-inject');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	//Other tasks
	grunt.registerTask(
		'build',
		'Clean up and copy only necessary files into the build directory',
		[ 'clean', 'copy:buildAssets', 'copy:buildHtml' ]
	);

};