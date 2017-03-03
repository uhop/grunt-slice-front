/*
 * grunt-slice-markdown
 * https://github.com/uhop/grunt-slice-markdown
 *
 * Copyright (c) 2014 Eugene Lazutkin
 * Licensed under the New BSD license.
 */

"use strict";

module.exports = function(grunt) {
	grunt.initConfig({
		slice_front: {
			plain: {
				options: {
					templateParams: {
						title: "Demo"
					}
				},
				src:  "tests/demo.md",
				dest: "tests/demo-plain.html"
			},
			trivial: {
				options: {
					templateFile: "tests/trivial/trivial.html.jst",
					templateParams: {
						title: "Demo"
					}
				},
				src:  "tests/demo.md",
				dest: "tests/demo-trivial.html"
			},
			dynamic: {
				options: {
					templateFile: "tests/trivial/trivial.html.jst",
					templateParams: {
						title: "Dynamic demo"
					}
				},
				// dynamically mapping files, so it's not just reading demo.md, but also about/index.md, as well.
				files: [
					{
						expand: true,
						cwd: "tests/",
						src:  [
							"*.md",
							"**/*.md"
						],
						dest: "tests/dynamic/",
						ext: ".html"
					}
				]
			}
		}
	});

	grunt.loadTasks("tasks");

	grunt.registerTask("default", "slice_front");
	grunt.registerTask("test",    "slice_front");
};
