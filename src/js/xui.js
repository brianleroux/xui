/*
* XUI
* ===
* 
* A basic framework for building mobile web applications.
* ---
* 
* To build xui from source: run _rake_ in the shell of your choice from the root of the project directory. (requires ruby)
* There are other tasks for code minification, running the specs and generating docs.
* 
* Check out the _example directory_ for a comprehensive example application.
* 
* API Documentation
* ===
* 
* Welcome the XUI documentation. This is generated from inline documentation in the xui javascript source.
*/
(function() {
    var _$ = function(els) 
	{
        this.elements = [];
		var size = els.length;
		
		for(var i = 0; i < size; i++ ) {
			var element = els[i];

			if( typeof element == 'string' ) {
				var element = document.querySelectorAll(element);
				var len = element.length;
					
				for(var x = 0; x < len; x++ ) {          
					this.elements.push(element[x]);   
				}

			} else {
				this.elements.push(element);
			}
		}       
		return this;
	};
	
	_$.prototype = {
				
		first: function() {
			return this.elements[0];
		},
		
	    each: function(fn) {
	    	for ( var i = 0, len = this.elements.length; i<len; ++i ) {
					fn.call(this,this.elements[i]);
				}
				return this;
	    },

		// merges sub lib objects
		merge: function( libObj ) {
			
			for(var x in libObj) {
				this[x] = libObj[x];
			}
		}
	};
	

	// adds the xui system as x$ to the current window
	var xui = window.x$ = function() {
		<%= build_sub_libraries %>
	
		var libs = <%= "[#{ libs_to_build.map {|x| x.capitalize }.join(',') }]" %>;
		var size = libs.length;
		var that = new _$(arguments);
		
		for( var i = 0; i < size; i++ ) {
			that.merge( libs[i] );
		}
	
		return that;
	}

})();
/*
* TODO
* ---
* 
* - rock out with renewed authority
* - better docs we promise
* - more tests
* - a more comprehensive exmaple application
* - dynamic TODO lists (no shit)
* - create doc/index.html from markdown
* - inspect and generate example from markdown
* 
* LICENSE
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