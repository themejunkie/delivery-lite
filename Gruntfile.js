module.exports = function(grunt) {

	// Load all Grunt tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Concat and Minify our js.
		uglify: {
			minify: {
				files: {
					'assets/js/<%= pkg.name %>.min.js': ['assets/js/plugins.js','assets/js/main.js']
				}
			}
		},

		// Javascript linting with jshint.
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				"force": true
			},
			beforeconcat: ['assets/js/plugins.js', 'assets/js/main.js'],
			afterconcat: ['assets/js/<%= pkg.name %>.min.js']
		},

		// Compile our sass.
		sass: {
			dev: {
				options: {
					style: 'expanded',
					sourcemap: 'none',
					require: [
						'susy',
					]
				},
				files: {
					'style.css': 'scss/style.scss',
					'assets/css/editor-style.css': 'scss/editor-style.scss',
				}
			},
			prod: {
				options: {
					style: 'compressed',
					sourcemap: 'none',
					require: [
						'susy',
					]
				},
				files: {
					'style.min.css': 'scss/style.scss',
				}
			}
		},

		// Autoprefixer.
		autoprefixer: {
			options: {
				browsers: [
					'last 2 versions', 'ie 9'
				]
			},
			single_file: {
				src: 'style.css',
				dest: 'style.css'
			}
		},

		// Sorting our CSS properties.
		csscomb: {
			options: {
				config: 'csscomb.json'
			},
			files: {
				'style.css': ['style.css']
			}
		},

		// Watch for changes.
		watch: {
			scss: {
				files: ['scss/**/*.scss'],
				tasks: ['sass:dev']
			}
		},

		// Copy the theme into the build directory
		copy: {
			build: {
				src:  [
					'**',
					'!node_modules/**',
					'!build/**',
					'!scss/**',
					'!.git/**',
					'!Gruntfile.js',
					'!package.json',
					'!csscomb.json',
					'!.gitignore',
					'!.jshintrc',
					'!style.css.map',
					'!style.min.css.map',
					'!**/editor-style.css.map',
					'!**/Gruntfile.js',
					'!**/package.json',
					'!**/*~'
				],
				dest: 'build/<%= pkg.name %>/'
			}
		},

		// Compress build directory into <name>.zip and <name>-<version>.zip
		compress: {
			build: {
				options: {
					mode: 'zip',
					archive: './build/<%= pkg.name %>.zip'
				},
				expand: true,
				cwd: 'build/<%= pkg.name %>/',
				src: ['**/*'],
				dest: '<%= pkg.name %>/'
			}
		},

		// Clean up build directory
		clean: {
			build: ['build/<%= pkg.name %>']
		},

		makepot: {
			target: {
				options: {
					domainPath: '/languages/',           // Where to save the POT file.
					exclude: ['build/.*'],               // Exlude build folder.
					potFilename: '<%= pkg.name %>.pot',  // Name of the POT file.
					type: 'wp-theme',                    // Type of project (wp-plugin or wp-theme).
					updateTimestamp: true,               // Whether the POT-Creation-Date should be updated without other changes.
					processPot: function( pot, options ) {
						pot.headers['report-msgid-bugs-to'] = 'http://www.theme-junkie.com/forum/';
						pot.headers['plural-forms'] = 'nplurals=2; plural=n != 1;';
						pot.headers['last-translator'] = 'Satrya (satrya@theme-junkie.com)\n';
						pot.headers['language-team'] = 'Theme Junkie (satrya@theme-junkie.com)\n';
						pot.headers['x-poedit-basepath'] = '..\n';
						pot.headers['x-poedit-language'] = 'English\n';
						pot.headers['x-poedit-country'] = 'UNITED STATES\n';
						pot.headers['x-poedit-sourcecharset'] = 'utf-8\n';
						pot.headers['x-poedit-searchpath-0'] = '.\n';
						pot.headers['x-poedit-keywordslist'] = '__;_e;__ngettext:1,2;_n:1,2;__ngettext_noop:1,2;_n_noop:1,2;_c;_nc:4c,1,2;_x:1,2c;_ex:1,2c;_nx:4c,1,2;_nx_noop:4c,1,2;\n';
						pot.headers['x-textdomain-support'] = 'yes\n';
						return pot;
					}
				}
			}
		},

	});

	// Theme Test task
	grunt.registerTask('default', [
		'uglify',
		'jshint',
		'sass',
		'csscomb',
		'autoprefixer',
		'copy'
	]);

	// Package task
	grunt.registerTask('package', [
		'copy',
		'compress',
		'clean',
	]);

};