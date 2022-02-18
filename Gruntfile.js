module.exports = function(grunt){

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-json-minify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-run');
	
	grunt.initConfig({
		concat: {
			styles: {
				src: [
					'src/common/styles/reset.css',
					'src/common/components/menu/menu.css',
					'src/assets/fonts/fonts.css',
					'src/pages/about-me/about-me.css',
					'src/pages/my-work/my-work.css',
					'src/common/components/autocomplete/autocomplete.css',
					],
				dest: 'docs/app.css'
			},
			scripts: {
				src: [
					'src/app.module.js',
					'src/app.route.js',
					'src/common/components/menu/menu.js',
					'src/pages/about-me/about-me.js',
					'src/common/components/autocomplete/autocomplete.js',
					'src/pages/my-work/my-work.js',
				],
				dest: 'docs/app.js'
			}
		},
		// sass: {
		// 	app: {
		// 		files: {
		// 			'tmp/app.css': ['sass/style.scss'] //not use yet
		// 		}
		// 	}
		// },
		copy: {
		  main: {
			files: [
				// copy json
				{	
					src: 'src/models/data.json',
					dest: 'docs/models/data.json'
				},
				// copy js
				{	
					src: 'src/common/lib/skrollr.min.js',
					dest: 'docs/lib/skrollr.min.js'
				},
				// copy img
				{
					expand: true,
					cwd: 'src/assets/img',
					src: '**',
					dest: 'docs/img'
				},
				// copy fonts
				{
					expand: true,
					cwd: 'src/assets/fonts', 
					src: '**',
					dest: 'docs/fonts'
				},
			]
		  },
		},
		//Min stuff
		uglify:{
			scripts: {
				files: {
					'docs/app.min.js' : 'docs/app.js'
				}
			}
		},
		cssmin: {
			app: {
				files: {
					'docs/app.min.css': 'docs/app.css'
				}
			}
		},
		'json-minify': { //not include copy
		  build: {
			files: 'docs/models/data.json'
		  }
		},
		htmlmin: {                                     
			'views': {                                      
				options: {                                 
					removeComments: true,
					collapseWhitespace: true
				},
				files: {                                  
					'docs/views/my-work.html': 'src/pages/my-work/my-work.html',
					'docs/views/about-me.html': 'src/pages/about-me/about-me.html',
					'docs/views/404.html': 'src/pages/404/404.html'
				}
			},
			'index': {                                      
				options: {
					collapseWhitespace: true
				},
				files: {                              
					'docs/index.html': 'index.html'
				}
			}
		},
		watch: {
			scripts: {
				files: 'src/**/*.js',
				tasks: ['concat:scripts','uglify'],
				options: {
					spawn: false,
					livereload : true
				}
			},
			json:{
				files: 'src/models/data.json',
				tasks: ['copy','json-minify'],
				options: {
					spawn: false,
					livereload : true
				}
			},
			styles: {
				files: 'src/**/*.css',
				tasks: ['concat:styles','cssmin'],
				options: {
					spawn: false,
					livereload : true
				}
			},
			html:{
				files: 'src/**/*.html',
				tasks: ['htmlmin'],
				options: {
					spawn: false,
					livereload : true
				}
			}
		},
	  	// imagemin: {
		  //   png: {
		  //     options: {
		  //       optimizationLevel: 7
		  //     },
		  //     files: [
		  //       {
		  //         expand: true,
		  //         cwd: 'dev/img/',
		  //         src: ['**/*.png'],
		  //         dest: 'dist/img/',
		  //         ext: '.png'
		  //       }
		  //     ]
		  //   },
		  //   jpg: {
		  //     options: {
		  //       progressive: true
		  //     },
		  //     files: [
		  //       {
		  //         // Set to true to enable the following options…
		  //         expand: true,
		  //         cwd: 'dev/img/',
		  //         src: ['**/*.png'],
		  //         dest: 'dist/img/',
		  //         ext: '.png'
		  //       }
		  //     ]
		  //   }
	  	// }
		run: {
			options: {
				// Task-specific options go here.
			},
			server: {
				cmd: 'node',
				args: [
				'server.js'
				]
			}
		}
	});

	grunt.registerTask('buildJson', "Build Json.",['copy','json-minify']);
	grunt.registerTask('build', "Builds the application.",['buildJson','htmlmin','concat','uglify','cssmin']);
	grunt.registerTask('default', ['build','run','watch']);
};


