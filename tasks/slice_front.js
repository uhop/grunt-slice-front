"use strict";


var path     = require("path"),
	template = require("lodash.template"),
	yaml     = require("js-yaml");

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
			validate: function (params) {
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

module.exports = function (grunt) {
	grunt.registerMultiTask("slice_front",
		"Slices a Markdown file in segments separating a front matter in YAML, generates HTML, and applies a template to the result.",
		function () {

			// read options

			var
				options = this.options({
						splitter:     /^(?:\-(?:\s*\-){2,})|(?:_(?:\s*_){2,})|(?:\*(?:\s*\*){2,})\s*$/gm,
						templateFile: path.resolve(__dirname, "../resources/template.jst")
					}),
				markdownItOptions = options.markdownItOptions || {
						typographer: true,
						html:        true
					},
				templateOptions = options.templateOptions || {},
				templateParams  = options.templateParams  || {};

			// prepare a template, a Markdown parser, and its plug-ins

			var tmpl = template(grunt.file.read(options.templateFile), null, templateOptions);

			var md = new MarkdownIt(markdownItOptions).use(MarkdownItContainer, "class", classRenderer);

			// register available plugins
			[MarkdownItAbbr, MarkdownItCheckbox, MarkdownItDeflist, MarkdownItEmoji,
				MarkdownItFootnote, MarkdownItHighlightjs, MarkdownItIns, MarkdownItMark,
				MarkdownItMath, MarkdownItSmartarrows, MarkdownItSub, MarkdownItSup, MarkdownItVideo].
			forEach(function (plugin) {
				if (plugin) {
					md = md.use(plugin);
				}
			});

			// main

			this.files.forEach(function (file) {

				// read and transform sections

				var sections = [];
				file.src.forEach(function (name) {
					sections.push.apply(sections,
						grunt.file.read(name).
							split(options.splitter).
							filter(function (segment) {
								// not empty
								return !/^\s*$/.test(segment);
							}).
							map(function (segment, index, segments) {
								if (index) {
									// body
									return md.render(segment);
								} else {
									// front matter
									return yaml.safeLoad(segment);
								}
							}));
				});

				if (sections.length) {
					// create a file
					grunt.file.write(file.dest, tmpl({
						page: sections[0],
						body: sections.slice(1),
						params: templateParams
					}));
				} else {
					grunt.fatal("task: slice_front: " + this.target + " has no useful sections, exiting.");
				}
			});
		}
	);
};
