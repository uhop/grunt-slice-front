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
		slice_markdown: {
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
			bespoke: {
				options: {
					templateFile: "tests/bespoke.js/bespoke.html.jst",
					templateParams: {
						title: "Demo"
					}
				},
				src:  "tests/demo.md",
				dest: "tests/demo-bespoke.html"
			},
			impress: {
				options: {
					templateFile: "tests/impress.js/impress.html.jst",
					templateParams: {
						title: "Demo"
					},
					attrProcessor: function(attributes, index){
						if(index){
							if(index % 2){
								return 'data-x="' + (3000 + 1500 * Math.floor((index - 1) / 2)) + '" data-y="-750"';
							}
							return 'data-x="' + (3000 + 1500 * Math.floor((index - 1) / 2)) + '" data-y="750"';
						}
						return 'data-x="0" data-y="0" data-scale="4"';
					}
				},
				src:  "tests/demo.md",
				dest: "tests/demo-impress.html"
			}
		}
	});

	grunt.loadTasks("tasks");

	grunt.registerTask("default", "slice_markdown");
	grunt.registerTask("test",    "slice_markdown");
};
