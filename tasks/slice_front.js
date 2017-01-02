"use strict";


var path = require("path"),
	fs   = require("fs"),
	template = require("lodash.template"),
	yaml = require("yaml");

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
		"Slices a Markdown file in segments separating a front matter in YAML, generates HTML, and applies a template to the result.",
		function(){
			var done = this.async(),
				options = this.options({
					splitter:     /^(?:\-(?:\s*\-){2,})|(?:_(?:\s*_){2,})|(?:\*(?:\s*\*){2,})\s*$/gm,
					templateFile: path.resolve(__dirname, "../resources/template.jst")
				});

			var markdownItOptions = options.markdownItOptions || {
						typographer: true,
						html:        true
					},
				md = new MarkdownIt(markdownItOptions).
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
						String(fs.readFileSync(name, {options: "utf8"})).
							split(options.splitter).
							filter(function (segment) {
								// not empty
								return !/^\s*$/.test(segment);
							}).
							map(function(segment, index, segments){
								if (index) {
									// body
									return md.render(segment);
								} else {
									// front matter
									return yaml.eval("---\n  " + segment.split(/\r?\n/g).join("\n  ") + "\n");
								}
							}));
				});

				if(sections.length < 1){
					grunt.fatal("task: slice_front: " + this.target + " has no useful sections, exiting.");
					done();
					return;
				}

				// create a file

				var output = fs.createWriteStream(file.dest);
				output.on("finish", function(){
					done();
				});

				output.write(tmpl({
					page: sections[0],
					body: sections.slice(1),
					params: templateParams
				}));

				output.end();
			});
		}
	);
};
