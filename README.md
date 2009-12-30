XUI
===

A lightweight, dead simple, microtiny, super modular JavaScript framework for building mobile web applications.


### XUI Application Authors and Hackers

Its true: the minified code is _super tiny_. You can find more information, downloads and documentation at http://xuijs.com ---if you want to build your own custom XUI or help contribute: please read on!

### XUI Contributors and Hackers

To build xui: run _rake_ in the shell of your choice from the root of the project directory. (This requires Ruby.)
There are other tasks for code minification, running the specs and generating docs. Run `rake -T` to see them all.

### Source Tree

	xui
	 |-Rakefile ................. tasks for building, testing, etc. see them all by running rake -T
	 |-README.md ................ you are reading it!
	 | 
	 |-src
	 | |-base.js ................ bare essentials for dom node retrieval
	 | |
	 | |-core ................... essentials:
	 | | |-dom.js ............... - dom node manipulation
	 | | |-event.js ............. - event subscribe/publish
	 | | |-fx.js ................ - animation
	 | | |-style.js ............. - css hackery
	 | | '-xhr.js ............... - remoting
	 | |
	 | '-more ................... extras (yagni unless ygni)
	 |   |-base.js  
	 |   |-dom.js  	
	 |   |-event.js	
	 |   |-form.js .............. form handlers, serialization
	 |   |-fx.js	
	 |   |-xhr.js  
	 |   '-json.js .............. json utilities
	 |  
	 |-spec ..................... the spec
	 | |-core.html
	 | '-more.html
	 | 
	 |-packages ................. 3rd party libs utilized by XUI (gitsubmodules)
	 | |-qunit .................. - awesome async friendly test lib by John Resig
	 | |-shoulda-js ............. - bdd sugar for qunit with mobile friendly output
	 | '-emile .................. - amazing tiny effects lib by Thomas Fuchs
	 |
	 |-lib ...................... build directory (not in version control)
	 | |-xui-core-1.0.0.js
	 | |-xui-more-1.0.0.js
	 | |-xui-core-min-1.0.0.js
	 | '-xui-more-min-1.0.0.js
	 | 
	 '-util .................... utils for minification, obfuscation, verification



TODO
---

- fix broken xui-core specs
- author xui-more specs
- complete effects port to emile system
- get jslint/rake check passing
- figure out how to supress google barfing error messages 


CREATORS
---

- http://github.com/brianleroux
- http://github.com/silentrob
- http://github.com/sintaxi


CONTRIBUTORS 
---

- http://github.com/rmurphey 
- http://github.com/remy
- http://github.com/filmaj
- http://github.com/alunny
- http://github.com/gdagley
- http://github.com/slexaxton

(If I missed you pls let us know!)

LICENSE
---

_Copyright (c) 2008, 2009, 2010 Brian LeRoux, Brock Whitten, Rob Ellis_

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
