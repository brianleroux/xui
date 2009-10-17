
@projectDescription 	XUI JavaScript library for mobile web applications.

@author	Rob Ellis rob.ellis@nitobi.com
@author	Brian LeRoux brian.leroux@westcoastlogic.com
@author	Brock Whitten brock@sintaxi.com

@version	0.1

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

Minified code is less than 6k!

### Contribute

Clone the source from GitHub:

	git clone git://github.com/brianleroux/xui.git

To build xui: run _rake_ in the shell of your choice from the root of the project directory. (This requires Ruby.)
There are other tasks for code minification, running the specs and generating docs. Run `rake -T` to see them all.

Check out the _example_ directory for a comprehensive example application. Specs are in the _spec_ directory.

API Documentation
===

Welcome the XUI documentation. This is generated from inline documentation in the XUI javascript source.



Basics
---

XUI is available to the entire document as x$. It is a function, that accepts a query selector. The syntax is
mostly chainable and should be familiar to anyone who has worked with jQuery.

	x$('a.navigation').css({ background:'blue' });

The query selection engine is based on the browser implementation of querySelectorAll so its fast. Real fast.
XUI allows for a single expression, an element or an array of elements to be passed

	x$(window);

	x$('ul#globalnav li a.selected');

	x$('li', 'div#foo');

	x$(['li', 'div#foo']);



Array Unique
		 

Array Remove - By John Resig (MIT Licensed)
		 

Has modifies the elements array and reurns all the elements that match (has) a CSS Query
		 

Not modifies the elements array and reurns all the elements that DO NOT match a CSS Query
		 

Adds more DOM nodes to the existing element list.
		 

Returns the first element in the collection.

@return {Element} Returns a single DOM element.
		 

Returns the element in the collection at the
given index

@return {Element} Returns a single DOM element


Returns a collection containing the element
at the given index


Returns the size of the collection

@return {Number} Returns an integer size of collection


Element iterator.

@return {XUI} Returns the XUI object.
		 


@namespace {Dom}
@example

Dom
---

Manipulating the Document Object Model aka the DOM.

 

For manipulating HTML markup in the DOM.

@method
@param {location} [inner|outer|top|bottom|remove|before|after]
@param {html} A string representation of HTML markup.
@return {Element Collection}
@example

### html

Adds elements or changes the content of an element on a page. This method has shortcut aliases:

- inner
- outer
- top
- bottom
- remove
- before
- after

syntax:

		x$(window).html( location, html );

or this method will accept just an html fragment with a default behavior of inner..

		x$(window).html( htmlFragment );

arguments:

- location:string can be one of inner, outer, top, bottom
- html:string any string of html markup or HTMLElement

example:

 	x$('#foo').html( 'inner',  '<strong>rock and roll</strong>' );
 	x$('#foo').html( 'outer',  '<p>lock and load</p>' );
		x$('#foo').html( 'top',    '<div>bangers and mash</div>');
 	x$('#foo').html( 'bottom', '<em>mean and clean</em>');
 	x$('#foo').html( 'remove');
 	x$('#foo').html( 'before', '<p>some warmup html</p>');
 	x$('#foo').html( 'after', '<p>more html!</p>');

or

		x$('#foo').html('<p>sweet as honey</p>');

	 

Removes all erronious nodes from the DOM.

@method
@return {Element Collection}
@example

### clean

Walks the Element Collection removing empty nodes and whitespace.

syntax:

		x$(selector).clean();

example:

		x$(window).clean();
	 

Attribute getter/setter

@method
@param {String} attributeName
@param {String} attributeValue
@return {Element Collection|String}



@namespace {Event}
@example

Event
---

A good old fashioned event handling system.

 


Register callbacks to DOM events.

@method
@param {Event} The event identifier as a string.
@param {Function} The callback function to invoke when the event is raised.
@return {Element Collection}
@example

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

		x$('button').on( 'click', function(e){ alert('hey that tickles!') });

or...

		x$('a.save').click(function(e){ alert('tee hee!') });

arguments:

- type:string the event to subscribe to click|load|etc
- fn:function a callback function to execute when the event is fired

example:

		x$(window).load(function(e){
			x$('.save').touchstart( function(evt){ alert('tee hee!') }).css(background:'grey');
 	});

	 


@namespace {Style}
@example

Style
---

Anything related to how things look. Usually, this is CSS.

 


Sets a single CSS property to a new value.

@method
@param {String} The property to set.
@param {String} The value to set the property.
@return {Element Collection}
@example

### setStyle

syntax:

	x$(selector).setStyle(property, value);

arguments:

- property:string the property to modify
- value:string the property value to set

example:

	x$('.txt').setStyle('color', '#000');

	 


Retuns a single CSS property. Can also invoke a callback to perform more specific processing tasks related to the property value.

@method
@param {String} The property to retrieve.
@param {Function} A callback function to invoke with the property value.
@return {Element Collection}
@example

### getStyle

syntax:

	x$(selector).getStyle(property, callback);

arguments:

- property:string a css key (for example, border-color NOT borderColor)
- callback:function (optional) a method to call on each element in the collection

example:

	x$('ul#nav li.trunk').getStyle('font-size');

	x$('a.globalnav').getStyle( 'background', function(prop){ prop == 'blue' ? 'green' : 'blue' });

	 


Adds the classname to all the elements in the collection.

@method
@param {String} The class name.
@return {Element Collection}
@example

### addClass

syntax:

	$(selector).addClass(className);

arguments:

- className:string the name of the CSS class to apply

example:

	$('.foo').addClass('awesome');

	 


Checks to see if classname is one the element

@method
@param {String} The class name.
@param {Function} A callback function (optional)
@return {XUI Object - self} Chainable
@example

### hasClass

syntax:

	$(selector).hasClass('className');
	$(selector).hasClass('className', function(element) {});

arguments:

- className:string the name of the CSS class to apply

example:

	$('#foo').hasClass('awesome');
	$('.foo').hasClass('awesome',function(e){});

	 


Removes the classname from all the elements in the collection.

@method
@param {String} The class name.
@return {Element Collection}
@example

### removeClass

syntax:

	x$(selector).removeClass(className);

arguments:

- className:string the name of the CSS class to remove.

example:

	x$('.bar').removeClass('awesome');

	 


Set a number of CSS properties at once.

@method
@param {Object} An object literal of CSS properties and corosponding values.
@return {Element Collection}
@example

### css

syntax:

	x$(selector).css(object);

arguments:

- an object literal of css key/value pairs to set.

example:

	x$('h2.fugly').css({ backgroundColor:'blue', color:'white', border:'2px solid red' });

	 


@namespace {Fx}
@example

Fx
---

Animations, transforms and transitions for getting the most out of hardware accelerated CSS.

 


Tween is a method for transforming a css property to a new value.

@method
@param {Object} [Array|Object]
@param {Function}
@return {Element Collection}
@example

### tween

syntax:

x$(selector).tween(obj, callback);

arguments:

- properties: object an object literal of element css properties to tween or an array containing object literals of css properties to tween sequentially.
- callback (optional): function to run when the animation is complete

example:

	x$('#box').tween({ left:100px, backgroundColor:'blue' });
	x$('#box').tween({ left:100px, backgroundColor:'blue' }, function() { alert('done!'); });

	x$('#box').tween([{ left:100px, backgroundColor:'green', duration:.2 }, { right:'100px' }]);

	x$('#box').tween({ left:100px}).tween({ left:'100px' });

	 


@namespace {Xhr}
@example


Xhr
---

Remoting methods and utils.

 


The classic Xml Http Request sometimes also known as the Greek God: Ajax. Not to be confused with AJAX the cleaning agent.
This method has a few new tricks. It is always invoked on an element collection and follows the identical behaviour as the
`html` method. If there no callback is defined the response text will be inserted into the elements in the collection.

@method
@param {location} [inner|outer|top|bottom|before|after]
@param {String} The URL to request.
@param {Object} The method options including a callback function to invoke when the request returns.
@return {Element Collection}
@example

### xhr

Adds elements or changes the content of an element on a page. This method has shortcut aliases:

- xhrInner
- xhrOuter
- xhrTop
- xhrBottom
- xhrBefore
- xhrAfter

syntax:

   xhr(location, url, options)

or this method will accept just a url with a default behavior of inner...

		xhr(url, options);

location

options:

- method {String} [get|put|delete|post] Defaults to 'get'.
- async {Boolen} Asynchronous request. Defaults to false.
- data {String} A url encoded string of parameters to send.
- callback {Function} Called on 200 status (success)

response
- The response available to the callback function as 'this', it is not passed in.
- this.reponseText will have the resulting data from the file.

example:

		x$('#status').xhr('inner', '/status.html');
		x$('#status').xhr('outer', '/status.html');
		x$('#status').xhr('top',   '/status.html');
		x$('#status').xhr('bottom','/status.html');
		x$('#status').xhr('before','/status.html');
		x$('#status').xhr('after', '/status.html');

or

   x$('#status').xhr('/status.html');

		x$('#left-panel).xhr('/panel', {callback:function(){ alert("All Done!") }});

		x$('#left-panel).xhr('/panel', function(){ alert(this.responseText) });
	 


Another twist on remoting: lightweight and unobtrusive DOM databinding. Since we are often talking to a server with
handy JSON objects we added the convienance the map property which allows you to map JSON nodes to DOM elements.

@method
@param {String} The URL to request.
@param {Object} The method options including a callback function to invoke when the request returns.
@return {Element Collection}
@example

### xhrjson

syntax:

		xhrjson(url, options);

example:

The available options are the same as the xhr method with the addition of map.

		x$('#user').xhrjson( '/users/1.json', {map:{'username':'#name', 'image_url':'img#avatar[@src]'} });

	 

TODO
---

- xui-app merge
- look into extend method buggyness
- get jslint passing
- look into activejs doc build system and enhance to generate side by side code like ubiquity
- generators
- canvas progressive enhancement
- prop should be js property insted of a css property

Changelog
---
_oct 16, 2009_

- Modified xhr method to have same behaviour as html method.

_july 31, 2009_

- Changed xhr params, the second param can now be a callback function OR an options object.
- Added hasClass Method - New method to Style object.

_july 22, 2009_

- Exposed xui to the global namespace in order to make xui extandable

_april 13, 2009_

- Make changes to the core selector element to take an element, coma list or array or elements/selectors
- Added add Method - Adds more elements to the origional selector set.
- Added reduce Method - Removes duplicate array elements
- Removed Private Method and Fixed has and not, they both pass the spec now.
- Added Array Remove - By John Resig (MIT Licensed)

_march 13, 2009_

- Added has Method - Modifed the origional Element list
- Added not Method - Modifed the origional Element list

_feb 07, 2009_

- Fixed bug in DOM Regex related to attributes (wrap)

_feb 04, 2009_

- started scriptdoc
- added Dom.html method alias shortcuts for: inner, outer, top, bottom and remove

_jan 30, 2009_

- Fixed bug in html.wrap private - createAttributes was broken

_jan 22, 2009_

- Full support for HTMLElement in DOM.html()

_jan 21, 2009_

- fixed DOM
- added remove

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
