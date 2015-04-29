"use strict";


var path = require("path"),
	fs   = require("fs"),
	hljs = require("highlight.js"),
	template = require("lodash.template");

var MarkdownIt = require("markdown-it"),
	MarkdownItSub   = require("markdown-it-sub"),
	MarkdownItSup   = require("markdown-it-sup"),
	MarkdownItFootnote = require("markdown-it-footnote"),
	MarkdownItDeflist  = require("markdown-it-deflist"),
	MarkdownItAbbr  = require("markdown-it-abbr"),
	MarkdownItEmoji = require("markdown-it-emoji"),
	MarkdownItIns   = require("markdown-it-ins"),
	MarkdownItMark  = require("markdown-it-mark"),
	MarkdownItMath  = require("markdown-it-math"),
	MarkdownItVideo = require("markdown-it-video"),
	MarkdownItCheckbox = require("markdown-it-checkbox"),
	MarkdownItSmartarrows = require("markdown-it-smartarrows"),
	MarkdownItHighlightjs = require("markdown-it-highlightjs"),
	MarkdownItContainer   = require("markdown-it-container");


var classRenderer = {
			validate: function(params){
				return params.trim().match(/^class:\s+.*$/);
			},
			render: function (tokens, idx) {
				var m = tokens[idx].info.trim().match(/^class:\s+(.*)$/);
				return tokens[idx].nesting === 1 ? "<div class=\"" + m[1] + "\">" : "</div>";
			}
		};


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

			var markdownItOptions = options.markdownItOptions || {
						typographer: true,
						html:        true
					},
				md = MarkdownIt(markdownItOptions).
					use(MarkdownItAbbr).
					use(MarkdownItCheckbox).
					use(MarkdownItDeflist).
					use(MarkdownItEmoji).
					use(MarkdownItFootnote).
					use(MarkdownItHighlightjs).
					use(MarkdownItIns).
					use(MarkdownItMark).
					use(MarkdownItMath).
					use(MarkdownItSmartarrows).
					use(MarkdownItSub).
					use(MarkdownItSup).
					use(MarkdownItVideo).
					use(MarkdownItContainer, "class", classRenderer);

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
										content: md.render(segment.substr(result[0].length))
									};
								}
								return {
									attributes: "",
									content: md.render(segment)
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
					params: templateParams
				}));

				output.end();
			});
		}
	);
};
