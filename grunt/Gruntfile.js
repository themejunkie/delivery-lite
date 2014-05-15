'use strict';
module.exports = function(grunt) {

	// Load NPM's via matchdep
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Javascript linting with jshint
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				"force": true
			},
			all: [
				'Gruntfile.js',
				'../assets/js/dev/**/*.js'
			]
		},

		// Compile your sass
		sass: {
			dev: {
				options: {
					style: 'expanded',
					require: [
						'susy',
						'bourbon',
					]
				},
				files: {
					'../style.css': '../scss/style.scss',
				}
			},
			prod: {
				options: {
					style: 'compressed',
					require: [
						'susy',
						'bourbon',
					]
				},
				files: {
					'../style-min.css': '../scss/style.scss',
				}
			}
		},

		// Concat and minify our JS
		uglify: {
			plugins: {
				files: {
					'../assets/js/plugins.min.js': ['../assets/js/dev/plugins.js']
				}
			},
			main: {
				files: {
					'../assets/js/main.min.js': ['../assets/js/dev/main.js']
				}
			},
			customize: {
				files: {
					'../assets/js/customizer.min.js': ['../assets/js/dev/customizer.js']
				}
			}
		},

		// Autoprefixer
		autoprefixer: {
			options: {
				browsers: [
					'last 2 versions', 'ie 9'
				]
			},
			files: {
				expand: true,
				flatten: true,
				src: '../*.css',
				dest: '../'
			}
		},

		// Image optimization
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 7,
					progressive: true,
					interlaced: true
				},
				files: [{
					expand: true,
					cwd: '../assets/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: '../assets/img/'
				}]
			}
		},

		// Watch for changes
		watch: {
			scss: {
				files: [
					'../scss/**/*.scss'
				],
				tasks: [
					'sass:dev'
				]
			},
			css: {
				files: [
					'../style.css'
				],
				tasks: [
					'autoprefixer'
				]
			},
			js: {
				files: [
					'<%= jshint.all %>'
				],
				tasks: [
					'uglify',
					'jshint'
				]
			},
		},

	});

	// Development task
	grunt.registerTask('dev', [
		'watch'
	]);

	// Production task
	grunt.registerTask('default', [
		'jshint',
		'uglify',
		'sass',
		'imagemin'
	]);

};