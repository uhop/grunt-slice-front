# grunt-slice-markdown

[![Build status][travis-image]][travis-url]
[![Dependencies][deps-image]][deps-url]
[![devDependencies][dev-deps-image]][dev-deps-url]
[![NPM version][npm-image]][npm-url]

> Slices a Markdown file in segments, generates HTML, and applies a template to the result. Useful to generate slide shows.

## Getting Started

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-slice-markdown --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-slice-markdown');
```

## The "slice_markdown" task

### Overview

In your project's Gruntfile, add a section named `slice_markdown` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  slice_markdown: {
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

Please consult [Wiki](https://github.com/uhop/grunt-slice-markdown/wiki).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- 0.3.1 *refreshed dependencies.*
- 0.3.0 *added `attrProcessor()`.*
- 0.2.4 *refreshed dependencies.*
- 0.2.3 *new dependencies for Grunt 1.0.0.*
- 0.2.2 *refreshed dependencies.*
- 0.2.1 *refreshed dependencies.*
- 0.2.0 *switched from marked to MarkedownIt.*
- 0.1.1 *refreshed dependencies.*
- 0.1.0 *the initial release.*

## License

BSD

[npm-image]:      https://img.shields.io/npm/v/grunt-slice-markdown.svg
[npm-url]:        https://npmjs.org/package/grunt-slice-markdown
[deps-image]:     https://img.shields.io/david/uhop/grunt-slice-markdown.svg
[deps-url]:       https://david-dm.org/uhop/grunt-slice-markdown
[dev-deps-image]: https://img.shields.io/david/dev/uhop/grunt-slice-markdown.svg
[dev-deps-url]:   https://david-dm.org/uhop/grunt-slice-markdown#info=devDependencies
[travis-image]:   https://img.shields.io/travis/uhop/grunt-slice-markdown.svg
[travis-url]:     https://travis-ci.org/uhop/grunt-slice-markdown
