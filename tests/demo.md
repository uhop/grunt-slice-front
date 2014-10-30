:: data-x="-1000" data-y="-1500"

# Slide 1

Hello, world!

> Some profound quote...
---
:: data-x="0" data-y="-1500"

# Slide 2
## Note #1
Simple *yet* **powerful** text
_ _ _
:: data-x="1000" data-y="-1500"

# Slide 3
## Note #2
Yes.
## Note #3
No.
************
:: data-x="1000" data-y="0" data-rotate="90"

Headerless slide with a list:

* One.
* Two.
  * Sub-item.
* Three.
  1. Enumerated.
-  -  -  -
:: data-x="0" data-y="0" data-rotate="180"

# Enumeration:

1. One.
1. Two.
   1. Two and a half.
   1. Another one.
1. Three.
   * Bullet.
---
:: data-x="-1000" data-y="0" data-rotate="270"

# And some code:
```js
grunt.loadTasks("tasks");

grunt.registerTask("default", "slice_markdown");
grunt.registerTask("test",    "slice_markdown");
```