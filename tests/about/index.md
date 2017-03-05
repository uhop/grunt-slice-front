author: Luke Ehler
---

# Nested page test

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
- `params` is how you access the data in `options.templateParams`.
