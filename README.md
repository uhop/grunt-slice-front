# grunt-slice

[![Build Status](https://secure.travis-ci.org/uhop/grunt-slice-markdown.png?branch=master)](http://travis-ci.org/uhop/grunt-slice-markdown) [![Dependency Status](https://david-dm.org/uhop/grunt-slice-markdown.png)](https://david-dm.org/uhop/grunt-slice-markdown) [![devDependency Status](https://david-dm.org/uhop/grunt-slice-markdown/dev-status.png)](https://david-dm.org/uhop/grunt-slice-markdown#info=devDependencies)

> Slices a Markdown file in segments, generates HTML, and applies a template to the result.

## Getting Started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-slice --save-dev
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
        markedOptions: {
          gfm: true,
          smartLists: true
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

Please consult [Wiki](https://github.com/uhop/grunt-slice-markdown/wiki) and
[FAQ](https://github.com/uhop/grunt-slice/wiki/FAQ).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- 0.1.0 *the initial release.*
