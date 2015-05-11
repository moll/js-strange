stRange.js
==========
[![NPM version][npm-badge]](http://badge.fury.io/js/strange)
[npm-badge]: https://badge.fury.io/js/strange.png

stRange.js is a **range object** for JavaScript. It doesn't currently do
anything beyond allowing you to construct it with a beginning and an end, but it
will eventually support both **exclusive and inclusive ranges** and **infinite
ranges**.


Installing
----------
**Note**: stRange.js will follow the [semantic versioning](http://semver.org/)
starting from v1.0.0.

### Installing on Node.js
```
npm install strange
```

### Installing for the browser
stRange.js doesn't yet have a build ready for the browser, but you might be able
to use [Browserify][browserify] to have it run there till then.

[browserify]: https://github.com/substack/node-browserify


Using
-----
Create a Range object by passing in a beginning and end:
```javascript
var Range = require("strange")
var range = new Range(1, 5)
```

Check if something is a range and use it:
```javascript
var Range = require("strange")
if (range instanceof Range) console.log(range.begin, range.end)
```


License
-------
stRange.js is released under a *Lesser GNU Affero General Public License*, which in summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g bug-fixes) you've made to this program.

For more convoluted language, see the `LICENSE` file.


About
-----
**[Andri Möll](http://themoll.com)** typed this and the code.  
[Monday Calendar](https://mondayapp.com) supported the engineering work.

If you find stRange.js needs improving, please don't hesitate to type to me now at [andri@dot.ee](mailto:andri@dot.ee) or [create an issue online](https://github.com/moll/js-strange/issues).
