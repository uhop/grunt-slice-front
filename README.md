# grunt-slice-front

[![Greenkeeper badge](https://badges.greenkeeper.io/uhop/grunt-slice-front.svg)](https://greenkeeper.io/)

[![Build status][travis-image]][travis-url]
[![Dependencies][deps-image]][deps-url]
[![devDependencies][dev-deps-image]][dev-deps-url]
[![NPM version][npm-image]][npm-url]

> Slices a Markdown file in segments separating a front matter in YAML, generates HTML, and applies a template to the result. Useful to generate web pages.

## Getting Started

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-slice-front --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-slice-front');
```

## The "slice_front" task

### Overview

In your project's Gruntfile, add a section named `slice_front` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  slice_front: {
    plain: {
      options: {
        markdownItOptions: {
          html: true,
          linkify: true
        },
        templateParams: {
          title: "Demo"
        }
      },
      src:  "tests/demo.md",
      dest: "tests/demo-plain.html"
    }
  }
});
```

### Documentation

Please consult [Wiki](https://github.com/uhop/grunt-slice-front/wiki).

#### Grunt Options

```js
{
	// options.splitter is a regex that separates the sections of the markdown document.
	splitter:     /^(?:\-(?:\s*\-){2,})|(?:_(?:\s*_){2,})|(?:\*(?:\s*\*){2,})\s*$/gm,

	// options.templateFile is, unsurprisingly, a path to the template file.
	templateFile: path.resolve(__dirname, "../resources/template.jst"),

	// options.templateOptions is a Lodash.template options object. See https://lodash.com/docs#template.
	templateOptions = {},

	// options.templateParams is an arbitrary hash of task-wide variables, made available to the template as params.
	templateParams  = {},

	// options.markdownItOptions is a hash of MarkdownIt options.
	markdownItOptions = {
		typographer: true,
		html:        true
	}
}
```

#### Template Variables

The task exposes three different variables to the template file:

- `page` is a hash of all the YAML variables.
- `body` is an array of the markdown content and each item in the array a string of converted HTML.
- `params` is a hash of the data in `options.templateParams`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- 1.0.4 *Refreshed dependencies.*
- 1.0.3 *Bugfix by @lukehler to support embedded folders, and reduce dependencies.*
- 1.0.2 *Switched to js-yaml from yaml. Less plugins included by default. New version.*
- 1.0.1 *Fixed task's name. Made almost all plugins optional.*
- 1.0.0 *Started by cloning [grunt-slice-markdown](https://github.com/uhop/grunt-slice-markdown) 0.3.2.*

## License

BSD

[npm-image]:      https://img.shields.io/npm/v/grunt-slice-front.svg
[npm-url]:        https://npmjs.org/package/grunt-slice-front
[deps-image]:     https://img.shields.io/david/uhop/grunt-slice-front.svg
[deps-url]:       https://david-dm.org/uhop/grunt-slice-front
[dev-deps-image]: https://img.shields.io/david/dev/uhop/grunt-slice-front.svg
[dev-deps-url]:   https://david-dm.org/uhop/grunt-slice-front?type=dev
[travis-image]:   https://img.shields.io/travis/uhop/grunt-slice-front.svg
[travis-url]:     https://travis-ci.org/uhop/grunt-slice-front
