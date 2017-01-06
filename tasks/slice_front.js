"use strict";


var path = require("path"),
	fs   = require("fs"),
	template = require("lodash.template"),
	yaml = require("yaml");

var MarkdownIt = require("markdown-it"),
	MarkdownItContainer = require("markdown-it-container"),
	MarkdownItSub   = req("markdown-it-sub"),
	MarkdownItSup   = req("markdown-it-sup"),
	MarkdownItFootnote = req("markdown-it-footnote"),
	MarkdownItDeflist  = req("markdown-it-deflist"),
	MarkdownItAbbr  = req("markdown-it-abbr"),
	MarkdownItEmoji = req("markdown-it-emoji"),
	MarkdownItIns   = req("markdown-it-ins"),
	MarkdownItMark  = req("markdown-it-mark"),
	MarkdownItMath  = req("markdown-it-math"),
	MarkdownItVideo = req("markdown-it-video"),
	MarkdownItCheckbox = req("markdown-it-checkbox"),
	MarkdownItSmartarrows = req("markdown-it-smartarrows"),
	MarkdownItHighlightjs = req("markdown-it-highlightjs");


var classRenderer = {
			validate: function(params){
				return params.trim().match(/^class:\s+.*$/);
			},
			render: function (tokens, idx) {
				var m = tokens[idx].info.trim().match(/^class:\s+(.*)$/);
				return tokens[idx].nesting === 1 ? "<div class=\"" + m[1] + "\">" : "</div>";
			}
		};

// conditional require()

function req (name) {
	try {
		return require(name);
	} catch (e) {
		// suppress
	}
	return null;
}


// the main function

module.exports = function(grunt) {
	grunt.registerMultiTask("slice_front",
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
					use(MarkdownItContainer, "class", classRenderer);

			// register available plugins
			[MarkdownItAbbr, MarkdownItCheckbox, MarkdownItDeflist, MarkdownItEmoji,
				MarkdownItFootnote, MarkdownItHighlightjs, MarkdownItIns, MarkdownItMark,
				MarkdownItMath, MarkdownItSmartarrows, MarkdownItSub, MarkdownItSup, MarkdownItVideo].
			forEach(function (plugin) {
				if (plugin) {
					md = md.use(plugin);
				}
			});

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
