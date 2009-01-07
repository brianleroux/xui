/*
* XUI
* ===
* 
* A basic framework for building mobile web applications.
* ---
*
* ### why?!
*
* We hear your words. Why another JavaScript framework?! When development of PhoneGap was under way we noticed slow
* load times for modern JavaScript frameworks (such as Prototype, MooTools, YUI, Ext and even jQuery. This is mostly 
* because these libraries contain a great deal of cross browser compatability code. XUI strives to be a framework for
* mobile device browsers such as WebKit, Fennec and Opera. Future support is being considered for IE and BlackBerry.
*
* ### Authors
*
* - [Rob Ellis]:(mailto//:rob.ellis@nitobi.com/)
* - [Brock Whitten]:(mailto//:brock@sintaxi.com/)
* - [Brian LeRoux]:(mailto://brian@westcoastlogic.com/)
* 
* ### Download
* 
* - full development source (includes an example app) [zip]:"http://github.com/brianleroux/xui/zipball/master" or [tar]:"http://github.com/brianleroux/xui/tarball/master"
* - just the code with inline documentation
* - minified code (<7k!)
* 
* ### Contribute
*
* Clone the source from GitHub:
*
* `git clone git://github.com/brianleroux/xui.git`
*
* To build xui: run _rake_ in the shell of your choice from the root of the project directory. (This requires Ruby.)
* There are other tasks for code minification, running the specs and generating docs. Run `rake -T` to see them all.
* 
* Check out the _example directory_ for a comprehensive example application. Specs are in the _spec directory_. 
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
				
		/**
		*
		* Dom
		* ---
		*	
		* Manipulating the document object model (DOM).
		* 
		*/
		var Dom = {
			
			/**
			*
			* ### clean
			*
			* Removes empty nodes from the DOM.
			*	
			* syntax:
			*
			* `x$(window).clean();`
			*
			* example:
			*
			*	x$(window).clean();
			*		
			*/
		    clean: function(){
		      	var ns = /\S/;
				this.each(function(el) {
		        	var d = el, n = d.firstChild, ni = -1;
		            while(n) {
			            var nx = n.nextSibling;
			            if (n.nodeType == 3 && !ns.test(n.nodeValue)) {
			            	d.removeChild(n);
			            } else {
			                n.nodeIndex = ++ni;
			            }
			        	n = nx;
		      		}
		        });
		       return this;
		     },
		
		    // Wraps the HTML in a TAG, Tag is optional
		    // If the html starts with a Tag, it will wrap the context in that tag.
		    // NOT Chainable
		    wrap:function(html,tag) {
		        var attributes = {};
		        var re = /^<([A-Z][A-Z0-9]*)(.*)[^>]*>(.*?)<\/\1>/i;
		        if(re.test(html)) {
		            result = re.exec(html);
		            tag = result[1];
		            // if the node has any attributes, convert to object
		            if (result[2] != "") {
										// TODO - BUG - Split space will break on style='border:1px solid red'
		                attrList = result[2].split(' ');
		
		                for(var i=0;i<attrList.length;i++){
		
		                    if (attrList[i] != "") {
		                        var node = attrList[i].split('=');
		                        attributes[node[0]];
		                        attributes[node[0]] = node[1].replace(/(["']?)/g,'');
		                    }
		                }
		            }
		      
		            html = result[3];
		        }
		        var element = document.createElement(tag);
		        element.innerHTML = html;
		        for (var i in attributes) {
		            var a = document.createAttribute(i);
		            a.nodeValue = attributes[i];
		            element.setAttributeNode(a);
		        }
		  
		        return element;
		    },
		
		    html:function(html,loc) {
		        var that = this;
		        this.clean();
		        var loc = (loc != null) ? loc : 'inner';
		        this.each(function(el) {
		            switch(loc) {
		                case "inner": el.innerHTML = html; break;
		                case "outer":
		                    if (typeof html == 'string') html = this.wrap(html,this.getTag(el));
		                    el.parentNode.replaceChild(html,el);
		                break;
		                case "top":
		                    if (typeof html == 'string') html = this.wrap(html,this.getTag(el));
		                    el.insertBefore(html,el.firstChild);
		                break;
		                case "bottom":
		                    if (typeof html == 'string') html = this.wrap(html,this.getTag(el));
		                    el.insertBefore(html,null);
		                break;
		            }
		      });
		        return this;
		    },
		
			// Helper for finding a tag for inserting into the DOM, we are looking for simular tags
		    // NOT Chainable
		    getTag: function(el) {
		        if (el.firstChild == null) {
		            switch(el.tagName) {
		                case 'UL': return 'LI'; break;
										case 'DL': return 'DT'; break;
										case 'TR': return 'TD'; break;
		            }
		        }
						console.log(el.firstChild.tagName);
		        return el.firstChild.tagName;
		    }
		};
		
		
		/**
		*
		* Event
		* ---
		*	
		* A good old fashioned event handling system.
		* 
		*/
		var Event = {
		
			eventfunctions : [],
			click: function(fn) { return this.on('click',fn); },
			dblclick: function(fn) { return this.on('dblclick',fn); },
			load: function(fn) { return this.on('load',fn); },
		
			/**
			*
			* ### on
			*	
			* syntax:
			*
			* `x$('button').on( 'click', function(){ alert('hey that tickles!') });`
			*
			* arguments:
			*
			* - type:string the event to subscribe to click|load|etc
			* - fn:function a callback function to execute when the event is fired
			*
			* example:
			* 
			*/
			on: function(type, fn) {
			    var listen = function(el) {
			        if (window.addEventListener) {
			            el.addEventListener(type, fn, false);
			        }
			    };
			    this.each(function(el) {
			        listen(el);
			    });
			    return this;
			},
			
			subscribe: function(fn) {
			    this.eventfunctions.push(fn);
			},
			
			unsubscribe: function(fn) {
			    this.eventfunctions = this.eventfunctions.filter (
			        function(el) {
			            if ( el !== fn ) {
			                return el;
			            }
			        }
			    );
			},
			fire: function(o, thisObj) {
			    var scope = thisObj || window;
			    this.eventfunctions.forEach(
			        function(el) {
			            el.call(scope, o);
			        }
			    );
			},
		
		    stop: function(e) {
		        if(window.event && window.event.returnValue)
		            window.event.returnValue = false;
		
		        if(e && e.preventDefault)
		            e.preventDefault();
		    },
		
		    bind: function(fn,context) {
		    	var args = [];
		        for (var i = 2; i < arguments.length; i++) {
		        	args[i - 2] = arguments[i];
		        }
		        fn.apply(context,args);       
		        return this;
		     }
		};
		
		
		/**
		*
		* Style
		* ---
		*	
		* Anything related to how things look. Usually, this is CSS.
		* 
		*/
		var Style = {
		
			/**
			*
			* ### setStyle
			*	
			* syntax: 
			*
			* `x$('DIV').setStyle('width','100px');`
			*
			* arguments: 
			* - prop (JavaScript CSS Key ie: borderColor NOT border-color ), val - String
			*
			* example:
			* 
			*/
			setStyle: function(prop, val) {
		      this.each(function(el) {
		        el.style[prop] = val;
		      });
			  return this;
			},
		
			/**
			*
			* ### getStyle
			*	
			* syntax: 
			* arguments: prop (CSS Key ie: border-color NOT borderColor )
			* example:
			* TODO: prop should be JS property, not CSS property
			* 
			*/
			getStyle: function(prop,callback) {
		      	this.each(function(el) {
					var strValue = document.defaultView.getComputedStyle(el, "").getPropertyValue(prop);
					console.log(strValue);
					callback(strValue);
		      	});
			  	return this;
			},
		
			/**
			*
			* ### addClass
			*	
			* syntax:
			* arguments:
			* example:
			* 
			*/
			addClass: function(className) {
				this.each(function(el) {
					if (this.hasClass(el,className)==false)
						el.className += ' '+className;
				});
				return this;
			},
			
			/**
			*
			* ### removeClass
			*	
			* syntax:
			* arguments:
			* example:
			* 
			*/
			removeClass:function(className) {
			    var re = this.getClassRegEx(className);
			    this.each(function(el) {
			        el.className = el.className.replace(re, ' ');
			      });
			    return this;
			},
			
			/**
			*
			* ### css
			*	
			* syntax: 
			*
			* `x$(selector).css(object);`
			*
			* arguments: 
			*
			* - JSON object of key/value paires to set/modify style on.
			*
			* example:
			* 
			* `x$('#box5').css({ backgroundColor:'blue', width:'100px', border:'2px solid red' });`
			*  
			*/
			css: function(o) {
				var that = this;
				this.each(function(el) {
					for (var prop in o) {
						that.setStyle(prop, o[prop]);
					}
				});
				return this || that;
			},
			
			// -- private methods -- //
			
			reClassNameCache: {},
		
			getClassRegEx: function(className) {
			    var re = this.reClassNameCache[className];
			    if (!re) {
			        re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
			        this.reClassNameCache[className] = re;
			    }
			    return re;
			},
			
			hasClass: function(el,className) {
			    var re = this.getClassRegEx(className);
			    return re.test(el.className);
			}
			
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
		
		};
		
		
		/**
		*
		* Fx
		* ---
		*	
		* Animations mostly but we're not excluding any ideas.
		* 
		*/
		var Fx = {
		
			// TODO should this be private __animationStack?
			animationStack: [],
		  
			/**
			*
			* ### tween
			*	
			* syntax:
			* 
			* `x$('#box').tween({ left:100px, backgroundColor:'blue' });`
			*
			* `x$('#box').tween([{ left:100px, backgroundColor:'green', duration:.2 }, { right:100px }]);`
			*
			* `x$('#box').tween({ left:100px}).tween({ left:100px });`
			*
			* arguments:
			*
			* example:
			* 
			*/
			tween: function( options ) {
			    if (options instanceof Array) {
			        for(var i=0;i<options.length;i++) {
			            this.animationStack.push(options[i]);                   
			        }
			    } else if (options instanceof Object) {
			        this.animationStack.push(options);
			    }
		  
			    this.start();
			    return this;
			},
		
			start:function() {
			    var t = 0;
			    for (var i = 0; i< this.animationStack.length;i++) {
			        var options = this.animationStack[i];
			        var duration     = options.duration == undefined ? .5    : options.duration;
			        setTimeout(function(s,o){s.animate(o);},t*1000*duration,this,options);
			        t += options.duration;
			    }
		  
			    return this;
			},
		  
			animate: function(options) {   
			    var that = this;
		   
			    var opt_after = options.after;
		   
			    var easing       = options.easing   == undefined ? 'ease-in' : options.easing;
			    var before       = options.before   == undefined ? function(){} : options.before;    
			    var after        = opt_after        == undefined ? function(){}    : function() {  opt_after.apply(that); };    
			    var duration     = options.duration == undefined ? .5    : options.duration;
		   
			    options.easing = options.before = options.after = options.duration = undefined;
		   
			    before.apply(before.arguments);
		   
			    // this sets duration and easing equation on a style property change
			    this.setStyle( '-webkit-transition', 'all ' + duration + 's ' + easing );
		   
			    // sets the starting point and ending point for each css property tween
			    this.each( function(el) {
			        for( var prop in options ) {
			            that.setStyle( prop, options[prop] )
			        }   
			    });
		   
			    var killSwitch = setTimeout(function(){ that.setStyle('-webkit-transition','none');},duration*1000)
			    var doAfter = setTimeout(after,duration*1000);
		
		  
			    return this || that; // haha
			}
		};
		
		
		/**
		*
		* Xhr
		* ---
		*	
		* Remoting methods and ultilites.  
		* 
		*/
		var Xhr = {	
			/**
			* ### xhr 
			*	
			* syntax:
			*
			* `xhr('path/to/file.html', {});`
			* 
			* arguments:
			*
			* - url:string the url for request
			* - options:object
			* -- method:string get|put|delete|post
			* -- async:boolen
			* -- data:string url encoded string of parameters to send
			*
			* example:
			* 
			*/
		    xhr:function(url,options) {   
		         
		        if (options == undefined) var options = {};
		
		    	var that   = this;
		    	var req    = new XMLHttpRequest();
		        var method = options.method || 'get';
		        var async  = options.async || false ;            
		        var params = options.data || null;
		        
		        req.open(method,url,async);
		        req.onload = (options.callback != null) ? options.callback : function() { that.html(this.responseText); }
		        req.send(params);
		    	
		      	return this;
		    },
		
		    // Options is the same as XHR with map:object and new callback:function
		    xhrjson:function(url,options) {
		        if (options == undefined) return this;
		        var that = this;
		                  
		        var cb = options.callback;
		        if (typeof (cb) != 'function') { var cb = function(x) {return x; }}
		  
		        var callback = function() {
		            var o = eval('(' + this.responseText + ')');
		            for (var prop in o) { x$(options.map[prop]).html( cb(o[prop]) ); }
		        }
		        options.callback = callback;
		        this.xhr(url,options);
		        return this;
		    },
		  
		    xhrForm: function() {
		        var that = this;
		      // ideally I would like to return the first form staring at this element selector
		      this.each(function(e) {
		            if (e.tagName == "FORM") {
		                var options = {};
		                options.method = e.method;
		                options.data = "one=two";
		              
		                that.xhr(e.action,options);
		            }
		        });
		        return this;
		    }
		};
		

	
		var libs = [Dom,Event,Style,Fx,Xhr];
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
