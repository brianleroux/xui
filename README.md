
XUI
===

A basic framework for building mobile web applications.
---

To build xui from source: run _rake_ in the shell of your choice from the root of the project directory. (requires ruby)
There are other tasks for code minification, running the specs and generating docs.

Check out the _example directory_ for a comprehensive example application.

API Documentation
===

Welcome the XUI documentation. This is generated from inline documentation in the xui javascript source.


Dom
---

Manipulating the document object model (DOM).




### clean

Removes empty nodes from the DOM.

syntax:

`x$(window).clean();`

example:

x$(window).clean();




Event
---

A good old fashioned event handling system.




### on

syntax:

`x$('button').on( 'click', function(){ alert('hey that tickles!') });`

arguments:

- type:string the event to subscribe to click|load|etc
- fn:function a callback function to execute when the event is fired

example:




Style
---

Anything related to how things look. Usually, this is CSS.




### setStyle

syntax:

`x$('DIV').setStyle('width','100px');`

arguments:
- prop (JavaScript CSS Key ie: borderColor NOT border-color ), val - String

example:




### getStyle

syntax:
arguments: prop (CSS Key ie: border-color NOT borderColor )
example:
TODO: prop should be JS property, not CSS property




### addClass

syntax:
arguments:
example:




### removeClass

syntax:
arguments:
example:




### css

syntax:

`x$(selector).css(object);`

arguments:

- JSON object of keyvalue paires to setmodify style on.

example:

`x$('#box5').css({ backgroundColor:'blue', width:'100px', border:'2px solid red' });`




Fx
---

Animations mostly but we're not excluding any ideas.




### tween

syntax:

`x$('#box').tween({ left:100px, backgroundColor:'blue' });`

`x$('#box').tween([{ left:100px, backgroundColor:'green', duration:.2 }, { right:100px }]);`

`x$('#box').tween({ left:100px}).tween({ left:100px });`

arguments:

example:




Xhr
---

Remoting methods and ultilites.



### xhr

syntax:

`xhr('pathtofile.html', {});`

arguments:

- url:string the url for request
- options:object
-- method:string get|put|delete|post
-- async:boolen
-- data:string url encoded string of parameters to send

example:



TODO
---

- rock out with renewed authority
- better docs we promise
- more tests
- a more comprehensive exmaple application
- dynamic TODO lists (no shit)
- create docindex.html from markdown
- inspect and generate example from markdown

LICENSE
---

_Copyright (c) 2008 Brian LeRoux, Brock Whitten, Rob Ellis_

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, andor sell copies of the Software, and to
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
