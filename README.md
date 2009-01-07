
XUI
===

A basic framework for building mobile web applications.
---

### why?!

We hear your words. Why another JavaScript framework?! When development of PhoneGap was under way we noticed slow
load times for modern JavaScript frameworks (such as Prototype, MooTools, YUI, Ext and even jQuery. This is mostly 
because these libraries contain a great deal of cross browser compatability code. XUI strives to be a framework for
mobile device browsers such as WebKit, Fennec and Opera. Future support is being considered for IE and BlackBerry.

### Authors

- [Rob Ellis]:(mailto//:rob.ellis@nitobi.com/)
- [Brock Whitten]:(mailto//:brock@sintaxi.com/)
- [Brian LeRoux]:(mailto://brian@westcoastlogic.com/)

### Download

- full development source (includes an example app) [zip]:"http://github.com/brianleroux/xui/zipball/master" or [tar]:"http://github.com/brianleroux/xui/tarball/master"
- just the code with inline documentation
- minified code (<7k!)

### Contribute

Clone the source from GitHub:

`git clone git://github.com/brianleroux/xui.git`

To build xui: run _rake_ in the shell of your choice from the root of the project directory. (This requires Ruby.)
There are other tasks for code minification, running the specs and generating docs. Run `rake -T` to see them all.

Check out the _example directory_ for a comprehensive example application. Specs are in the _spec directory_. 

API Documentation
===

Welcome the XUI documentation. This is generated from inline documentation in the xui javascript source.

// merges sub lib objects
// adds the xui system as x$ to the current window


Dom
---
	
Manipulating the document object model (DOM).

		


### clean

Removes empty nodes from the DOM.
	
syntax:

`x$(window).clean();`

example:

	x$(window).clean();
		
			
// Wraps the HTML in a TAG, Tag is optional
// If the html starts with a Tag, it will wrap the context in that tag.
// NOT Chainable
// if the node has any attributes, convert to object
// TODO - BUG - Split space will break on style='border:1px solid red'
// Helper for finding a tag for inserting into the DOM, we are looking for simular tags
// NOT Chainable


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

- JSON object of key/value paires to set/modify style on.

example:

`x$('#box5').css({ backgroundColor:'blue', width:'100px', border:'2px solid red' });`
 
			
// -- private methods --
//toggleClass:function(className) {
//    var that = this;
//    this.each(function(el) {
//        (this.hasClass(el,className)==true)? this.removeClass(className) : this.addClass(className);
//      });
//    return this;
//},
//
//position: function () {
//	this.each(function(el){
//    	var topValue= 0,leftValue= 0;
//        var obj = el;
//        while(obj) {
//            leftValue += obj.offsetLeft;
//            topValue  += obj.offsetTop;
//            obj 	  =  obj.offsetParent;
//        }
//        el.leftPos = leftValue;
//        el.topPos = topValue;
// 	});
//   	return this;
//}


Fx
---
	
Animations mostly but we're not excluding any ideas.

		
// TODO should this be private __animationStack?


### tween
	
syntax:

`x$('#box').tween({ left:100px, backgroundColor:'blue' });`

`x$('#box').tween([{ left:100px, backgroundColor:'green', duration:.2 }, { right:100px }]);`

`x$('#box').tween({ left:100px}).tween({ left:100px });`

arguments:

example:

			
// this sets duration and easing equation on a style property change
// sets the starting point and ending point for each css property tween
// haha


Xhr
---
	
Remoting methods and ultilites.  

		

### xhr 
	
syntax:

`xhr('path/to/file.html', {});`

arguments:

- url:string the url for request
- options:object
-- method:string get|put|delete|post
-- async:boolen
-- data:string url encoded string of parameters to send

example:

			
// Options is the same as XHR with map:object and new callback:function
// ideally I would like to return the first form staring at this element selector

TODO
---

- rock out with renewed authority
- better docs we promise
- more tests
- a more comprehensive exmaple application
- dynamic TODO lists (no shit)
- create doc/index.html from markdown
- inspect and generate example from markdown

LICENSE
---

_Copyright (c) 2008 Brian LeRoux, Brock Whitten, Rob Ellis_

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
