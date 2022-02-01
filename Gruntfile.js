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
					/*
					'src/common/styles/reset.css',
					'src/common/components/menu/menu.css',
					'src/assets/fonts/fonts.css',
					'src/about-me/about-me.css',
					'src/my-work/my-work.css',
					'src/common/components/autocomplete/autocomplete.css',
					*/
					
					'dev/styles/reset.css',
					'dev/styles/menu.css',
					'dev/styles/fonts.css',
					'dev/styles/about-me.css',
					'dev/styles/my-work.css',
					'dev/styles/autocomplete.css'
					],
				dest: 'dev/styles/app.css' //'build/app.css'
			},
			scripts: {
				src: [
				/*'src/common/components/autocomplete.js',
				'src/app.module.js',
				'src/app.route.js',
				'src/common/components/menu/menu.js',
				'src/about-me/about-me.js',
				'src/my-work/my-work.js',*/
				
				'dev/scripts/directives/autocomplete.js',
				'dev/scripts/app.module.js',
				'dev/scripts/app.route.js',
				'dev/scripts/controllers/menu.js',
				'dev/scripts/controllers/about-me.js',
				'dev/scripts/controllers/my-work.js'
				],
				dest: 'dev/scripts/app.js' //'build/app.js'
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
					src: 'dev/models/data.json', //'src/models/data.json', 
					dest: 'dist/models/data.json'
				},
				// copy img
				{
					expand: true,
					cwd: 'dev/img', //'src/assets/img',
					src: '**',
					dest: 'dist/img'
				},
				// copy fonts
				{
					expand: true,
					cwd: 'dev/styles/fonts', //'src/assets/fonts', 
					src: '**',
					dest: 'dist/styles/fonts'
				},
			]
		  },
		},
		//Min stuff
		uglify:{
			scripts: {
				files: {
					'dist/scripts/app.min.js' : 'dev/scripts/app.js' //'build/app.js'
				}
			}
		},
		cssmin: {
			app: {
				files: {
					'dist/styles/app.min.css': 'dev/styles/app.css' //'build/app.css'
				}
			}
		},
		'json-minify': { //not include copy
		  build: {
		    files: 'dist/models/data.json'
		  }
		},
		htmlmin: {                                     
			'views': {                                      
				options: {                                 
					removeComments: true,
					collapseWhitespace: true
				},
				files: {                                  
					'dist/views/my-work.html': 'dev/views/my-work.html', //'src/my-work/my-work.html'
					'dist/views/about-me.html': 'dev/views/about-me.html',//'src/about-me/about-me.html',
					'dist/views/404.html': 'dev/views/404.html' //'src/404/404.html'
				}
			},
			'index': {                                      
				options: {
					collapseWhitespace: true
				},
				files: {                                  
					//'index-dist.html': 'index-dev.html',
					//'index.html': 'index-dev.html',
					'index.html': 'index-dev-dist.html'
				}
			}
		},
		watch: {
			scripts: {
				files: 'dev/scripts/**/*.js', // 'src/**/*.js'
				tasks: ['concat:scripts','uglify'],
				options: {
					spawn: false,
					livereload : true
				}
			},
			json:{
				files: 'dev/models/data.json', // 'src/models/data.json'
				tasks: ['copy','json-minify'],
				options: {
					spawn: false,
					livereload : true
				}
			},
			styles: {
				files: 'dev/styles/**/*.css', // 'src/**/*.css'
				tasks: ['concat:styles','cssmin'],
				options: {
					spawn: false,
					livereload : true
				}
			},
			html:{
				files: 'dev/views/**/*.html', // 'src/**/*.html'
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


