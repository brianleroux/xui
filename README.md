
XUI
===

A simple javascript framework for building mobile web applications.
---

### WHY?!

We hear your words. _Why another JavaScript framework?!_ When development of PhoneGap was under way we noticed slow
load times for modern JavaScript frameworks (such as Prototype, MooTools, YUI, Ext and (yes) even jQuery. 
A big reason why these libraries are so big is because  is mostly they contain a great deal of cross browser 
compatability code. The mobile space has less browser implementations (so far) and different needs. Thus XUI.

XUI strives to be a framework for first class mobile device browsers such as WebKit, Fennec and Opera with future 
support under consideration for IE Mobile and BlackBerry.

### Authors

- Rob Ellis
- Brock Whitten
- Brian LeRoux

### Download

Minified code is less than 6k! _official builds coming soonish - Brian Jan 6, 2009_

### Contribute

Clone the source from GitHub:

	git clone git://github.com/brianleroux/xui.git

To build xui: run _rake_ in the shell of your choice from the root of the project directory. (This requires Ruby.)
There are other tasks for code minification, running the specs and generating docs. Run `rake -T` to see them all.

Check out the _example_ directory for a comprehensive example application. Specs are in the _spec_ directory. 

API Documentation
===

Welcome the XUI documentation. This is generated from inline documentation in the xui javascript source.



Basics
---
	
XUI is available to the entire document as x$. It is a function, that accepts a query selector. The syntax is 
mostly chainable and should be familiar to anyone who has worked with jQuery.

	x$('a.navigation').css({ background:'blue' });

The query selection engine is based on the browser implementation of querySelectorAll so its fast. Real fast.
XUI allows for a single expression, an element or an array of elements to be passed

	x$(window);





Dom
---
	
Manipulating the document object model (DOM).

		


### html

Adds elements or changes the content of an element on a page.
	
syntax:

	x$(window).html( location, htmlFragment );

or..

	x$(window).html( htmlFragment );

arguments:

- location:string can be one of inner, outer, top, bottom
- htmlFragment:string any string of html markup

example:

 	x$('#foo').html( 'inner',  htmlFragment );
 	x$('#foo').html( 'outer',  htmlFragment );
	x$('#foo').html( 'top',    htmlFragment );
 	x$('#foo').html( 'bottom', htmlFragment );

or

	x$('#foo').html('<p>sweet as honey</p>');

			


Event
---
	
A good old fashioned event handling system.

		


### on

Registers a callback function to a DOM event on the element collection.

This method has shortcut aliases for: 

- click
- load
- touchstart
- touchmove
- touchend
- touchcancel
- gesturestart
- gesturechange
- gestureend
- orientationchange

For more information see:

- http://developer.apple.com/webapps/docs/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/chapter_7_section_1.html#//apple_ref/doc/uid/TP40006511-SW1

syntax:

	x$('button').on( 'click', function(){ alert('hey that tickles!') });

arguments:

- type:string the event to subscribe to click|load|etc
- fn:function a callback function to execute when the event is fired

example:
	
	x$(window).load(function(e){
		x$('.save').touchstart( function(evt){ alert('tee hee!') });	
 	});
	
			


Style
---
	
Anything related to how things look. Usually, this is CSS.

		


### setStyle
	
syntax: 

	x$(selector).setStyle(property, value);

arguments: 

- property:string the property to modify
- value:string the property value to set

example:

	x$('.txt').setStyle('color', '#000');

			


### getStyle
	
syntax: 

	x$(selector).getStyle(property, callback);

arguments: 

- property:string a css key (for example, border-color NOT borderColor)
- callback:function (optional) a method to call on each element in the collection 

example:

	x$('ul#nav li.trunk').getStyle('font-size');
	
	x$('a.globalnav').getStyle( 'background', function(prop){ prop == 'blue' ? 'green' : 'blue' });

			


### addClass
	
syntax:

	$(selector).addClass(className);

arguments:

- className:string the name of the CSS class to apply

example:

	$('.foo').addClass('awesome');

			


### removeClass
	
syntax:

	x$(selector).removeClass(className);

arguments:

- className:string the name of the CSS class to remove.

example:

	x$('.awesome').removeClass('awesome');

			


### css
	
syntax: 

	x$(selector).css(object);

arguments: 

- an object literal of css key/value pairs to set/modify style on.

example:

	x$('#box5').css({ backgroundColor:'blue', width:'100px', border:'2px solid red' });
 
			


Fx
---
	
Animations mostly but we're not excluding any ideas.

		


### tween
	
syntax:

	x$('#box').tween({ left:100px, backgroundColor:'blue' });
	
	x$('#box').tween([{ left:100px, backgroundColor:'green', duration:.2 }, { right:100px }]);
	
	x$('#box').tween({ left:100px}).tween({ left:100px });

arguments:

properties:object an object literal of element properties to tween.

_or_

queue:array an array literal of objects which contain properties to tween sequentially.

example:

			


Xhr
---
	
Remoting methods and ultilites.  

		

### xhr 
	
syntax:

`xhr('path/to/file.html', {});`

arguments:

url:string the url for request

options:object

- method:string get|put|delete|post default get
- async:boolen default false
- data:string url encoded string of parameters to send
- callback:function to call on 200 status

- Returns responseText back 
example:

			

### xhrjson 
	
syntax:

`xhr('path/to/file.html', {});`

arguments:

url:string the url for request

options:object (Options is the same as XHR with map:object and new callback:function)

- method:string get|put|delete|post default get
- async:boolen default false
- data:string url encoded string of parameters to send
- map:object {'dom selector':'json key'}
- callback:function - this function is applied to each json value

			

TODO
---

- look into lib loading / extend method buggyness
- more tests!!!
- better docs (generate side by side code like ubiquity)
- inspect and generate example from markdown
- generators
- canvas progressive enhancement
- prop should be JS property, not CSS property

Changelog
---

_Jan 18, 2009_

- more documentation for core, etc
- after cat getting out of the bag on ajaxian we're working furiously to get this production ready

_Jan 13, 2009_

- merged robs fixes and cleanup

_Jan 11, 2009_

- added mobile safari events (these will need testing in android, etc)
- cleaned up Dom.html and documented
- documented event a little

_Jan 10, 2009_

- removed Dom.clean for now
- made Dom.getTag and Dom.wrap private 
- documented Dom
- more Dom tests

_Jan 9, 2009_

- more docs for xui core, xhr, style and fx

_Jan 7, 2009_

- style spec passing
- xui app phase one
- testing approch resolved
- hasClass now private

_Jan 6, 2009_

- rock out with renewed authority
- better docs we promise
- create doc/index.html from markdown

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
