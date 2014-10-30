"use strict";


var path = require("path");
var fs   = require("fs");

var template = require("lodash.template");
var marked   = require("marked");


// the main function

module.exports = function(grunt) {
	grunt.registerMultiTask("slice_markdown",
		"Slices a Markdown file in segments, generates HTML, and applies a template to the result.",
		function(){
			var done = this.async(),
				options = this.options({
					splitter:     /^(?:\-(?:\s*\-){2,})|(?:_(?:\s*_){2,})|(?:\*(?:\s*\*){2,})\s*$/gm,
					attributes:   /^(?:\r?\n)*::\s+(.*?)\s*\r?\n/,
					templateFile: path.resolve(__dirname, "../resources/template.jst")
				});

			var markedOptions = options.markedOptions || {};
			markedOptions.renderer = new marked.Renderer();

			var templateOptions = options.templateOptions || {},
				templateParams  = options.templateParams  || {};

			var tmpl = template(fs.readFileSync(options.templateFile, {options: "utf8"}),
					null, templateOptions);

			this.files.forEach(function(file){

				// read and transform sections

				var sections = [];
				file.src.forEach(function(name){
					sections.push.apply(sections,
						String(fs.readFileSync(name, {options: "utf8"})).split(options.splitter).
							map(function(segment){
								options.attributes.lastIndex = 0;
								var result = options.attributes.exec(segment);
								if(result){
									return {
										attributes: result[1],
										content:    marked(segment.substr(result[0].length), markedOptions)
									};
								}
								return {
									attributes: "",
									content:    marked(segment, markedOptions)
								};
							}));
				});

				if(!sections){
					grunt.fatal("task: slice_markdown: " + this.target + " has 0 sections, exiting.");
					done();
					return;
				}

				// create a file

				var output = fs.createWriteStream(file.dest);
				output.on("finish", function(){
					done();
				});

				output.write(tmpl({
					sections: sections,
					params:   templateParams
				}));

				output.end();
			});
		}
	);
};
