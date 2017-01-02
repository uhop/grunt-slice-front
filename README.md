# grunt-slice-front

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

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- 1.0.0 *Started by cloning [grunt-slice-markdown](https://github.com/uhop/grunt-slice-markdown) 0.3.2.*

## License

BSD

[npm-image]:      https://img.shields.io/npm/v/grunt-slice-front.svg
[npm-url]:        https://npmjs.org/package/grunt-slice-front
[deps-image]:     https://img.shields.io/david/uhop/grunt-slice-front.svg
[deps-url]:       https://david-dm.org/uhop/grunt-slice-front
[dev-deps-image]: https://img.shields.io/david/dev/uhop/grunt-slice-front.svg
[dev-deps-url]:   https://david-dm.org/uhop/grunt-slice-front#info=devDependencies
[travis-image]:   https://img.shields.io/travis/uhop/grunt-slice-front.svg
[travis-url]:     https://travis-ci.org/uhop/grunt-slice-front
