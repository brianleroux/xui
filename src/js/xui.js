/*
* @projectDescription 	XUI JavaScript library for mobile web applications.
*
* @author	Rob Ellis rob.ellis@nitobi.com
* @author	Brian LeRoux brian.leroux@westcoastlogic.com
* @author	Brock Whitten brock@sintaxi.com
*
* @version	0.1 
*
* XUI
* ===
* 
* A simple javascript framework for building mobile web applications.
* ---
*
* ### WHY?!
*
* We hear your words. _Why another JavaScript framework?!_ When development of PhoneGap was under way we noticed slow
* load times for modern JavaScript frameworks (such as Prototype, MooTools, YUI, Ext and (yes) even jQuery. 
* A big reason why these libraries are so big is because  is mostly they contain a great deal of cross browser 
* compatability code. The mobile space has less browser implementations (so far) and different needs. Thus XUI.
* 
* XUI strives to be a framework for first class mobile device browsers such as WebKit, Fennec and Opera with future 
* support under consideration for IE Mobile and BlackBerry.
*
* ### Authors
*
* - Rob Ellis
* - Brock Whitten
* - Brian LeRoux
* 
* ### Download
* 
* Minified code is less than 6k! 
* 
* ### Contribute
*
* Clone the source from GitHub:
*
* 	git clone git://github.com/brianleroux/xui.git
*
* To build xui: run _rake_ in the shell of your choice from the root of the project directory. (This requires Ruby.)
* There are other tasks for code minification, running the specs and generating docs. Run `rake -T` to see them all.
* 
* Check out the _example_ directory for a comprehensive example application. Specs are in the _spec_ directory. 
* 
* API Documentation
* ===
* 
* Welcome the XUI documentation. This is generated from inline documentation in the XUI javascript source.
*
* 
* 
* Basics
* ---
*	
* XUI is available to the entire document as x$. It is a function, that accepts a query selector. The syntax is 
* mostly chainable and should be familiar to anyone who has worked with jQuery.
*
* 	x$('a.navigation').css({ background:'blue' });
* 
* The query selection engine is based on the browser implementation of querySelectorAll so its fast. Real fast.
* XUI allows for a single expression, an element or an array of elements to be passed
* 
* 	x$(window);
*	
*	x$('ul#globalnav li a.selected');
*	
*	x$('li', 'div#foo');
*
*	x$(['li', 'div#foo']);
* 
*/   

var xui;

(function() {
    xui = function(q) {
		q = q || document;
		return this.find(q);
	},
	
	idExpr = /^#([\w-]+)$/;
		
	xui.extend = function(obj) {
		var original = this.prototype;
		var extended = obj;
		for (var key in (extended || {})) original[key] = extended[key];
		return original;
	};
	
	xui.prototype = {
		
		elements:[],
		
		find: function(q) {
			var ele = [];
			var qlen = q.length;
      		var list, size;
      		var i, j;
      
      		// fast matching for pure ID selectors
      		if (typeof q == 'string' && idExpr.test(q)) {
        		this.elements.push(document.getelementsById(q));
        		return this; 
      		} 	
      
			for(i = 0; i < qlen; i++ ) {
				if (typeof q[i] == 'string' ) { // one selector
					list = document.querySelectorAll(q[i]);
					size = list.length;
					for(j = 0; j < size; j++ ) {          
						ele.push(list[j]);   
					}
				} else {
					if (q[i] instanceof Array) { // an array of selectors
						for (var x = 0; x < q[i].length; x++) {
							list = document.querySelectorAll(q[i][x]);
							size = list.length;
							for(j = 0; j < size; j++ ) {          
								ele.push(list[j]);   
							}
						}
					} else {
						ele.push(q[i]);	// an element
					}
				}
			}
			this.elements = this.elements.concat(this.reduce(ele));
			return this;
		},
				
		/**
		 * Array Unique
		 */				
		reduce: function( el, b ) {
			var a = [], i, l = el.length;
			for( i=0; i<l; i++ ) {
				if( a.indexOf( el[i], 0, b ) < 0 ) { a.push( el[i] ); }
			}
			return a;
		},
		/**
		 * Array Remove - By John Resig (MIT Licensed) 
		 */
		removex: function(array, from, to) {
	      var rest = array.slice((to || from) + 1 || array.length);
	      array.length = from < 0 ? array.length + from : from;
	      return array.push.apply(array, rest);
	    },
				
		/**
		 * Has modifies the elements array and reurns all the elements that match (has) a CSS Query
		 */				
		has: function(q) {

			var t = [];
			this.each(function(el){
				x$(q).each(function(hel) { if (hel == el) { t.push(el); } });
	      	});
	
			this.elements = t;
			return this;
		},


		/**
		 * Not modifies the elements array and reurns all the elements that DO NOT match a CSS Query
		 */
		not: function(q) {
			var list = this.elements;
			for (var i = 0; i<list.length;i++) {
				x$(q).each(function(hel){
					if (list[i] == hel ) { 
						this.elements = this.removex(list,list.indexOf(list[i])); 
					}
				});				
			}
			
			return this;

		},

		/**
		 * Adds more DOM nodes to the existing element list.
		 */
		add: function(q) {
			this.find([q]);
			this.elements = this.reduce(this.elements);
			return this;
		},


		/**
		 * Returns the first element in the collection.
		 * 
		 * @return {Element} Returns a single DOM element.
		 */
		first: function() {
			return this.get(0);
		},

		/**
		 * Returns the element in the collection at the 
		 * given index
		 *
		 * @return {Element} Returns a single DOM element
		 * */
		get: function(index) {
			return this.elements[index];
		},
		
		/**
		 * Returns a collection containing the element
		 * at the given index
		 * */
		eq: function(idx1,idx2) {
			idx2 = idx2 ? idx2 + 1 : idx1 + 1;
			this.elements = this.elements.slice(idx1,idx2);
			return this;
		},

		/**
		 * Returns the size of the collection
		 *
		 * @return {Number} Returns an integer size of collection
		 * */
		size: function() {
			return this.elements.length;
		},
		
		/**
		 * Element iterator.
		 * 
		 * @return {XUI} Returns the XUI object. 
		 */
	  	each: function(fn) {
			for (var i = 0, len = this.elements.length; i<len; ++i) {
                if (fn.call(this, this.elements[i]) === false) {
					// allow breaking out of each loop
					break;
				}
			}
			return this;
		}
	};
	
	var libs = [];
	
	//= require <dom>
	//= require <event>
	//= require <style>
	//= require <fx>
	//= require <xhr>
	
	for (var i = 0, size = libs.length; i < size; i++) {
	  xui.extend( libs[i] );
  	}

	// adds the xui system as x$ to the current window
	window.x$ = function() {
		return new xui(arguments);
	};
//---
})();

//= require <emile>

/* LICENSE
* ---
* 
* _Copyright (c) 2008 Brian LeRoux, Brock Whitten, Rob Ellis_
* 
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
* IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
* CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
* TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
* SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
