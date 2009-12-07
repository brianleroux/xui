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
  var undefined;

	var xui = function(q) {
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
					break;
				}
			}
			return this;
		}
	};

	var libs = [];

/**
 *
 * @namespace {Dom}
 * @example
 *
 * Dom
 * ---
 *
 * Manipulating the Document Object Model aka the DOM.
 *
 */
var Dom = {

    inner: function(html) {
        return this.html('inner', html);
    },
    outer: function(html) {
        return this.html('outer', html);
    },
    top: function(html) {
        return this.html('top', html);
    },
    bottom: function(html) {
        return this.html('bottom', html);
    },
    remove: function() {
        return this.html('remove');
    },
    before: function(html) {
        return this.html('before', html);
    },
    after: function(html) {
        return this.html('after', html);
    },


    /**
	 * For manipulating HTML markup in the DOM.
	 *
	 * @method
	 * @param {location} [inner|outer|top|bottom|remove|before|after]
	 * @param {html} A string representation of HTML markup.
	 * @return {Element Collection}
	 * @example
	 *
	 * ### html
	 *
	 * Adds elements or changes the content of an element on a page. This method has shortcut aliases:
	 *
	 * - inner
	 * - outer
	 * - top
 	 * - bottom
	 * - remove
	 * - before
	 * - after
	 *
	 * syntax:
	 *
	 * 		x$(window).html( location, html );
	 *
	 * or this method will accept just an html fragment with a default behavior of inner..
	 *
	 * 		x$(window).html( htmlFragment );
	 *
	 * arguments:
	 *
	 * - location:string can be one of inner, outer, top, bottom
	 * - html:string any string of html markup or HTMLElement
	 *
	 * example:
	 *
	 *  	x$('#foo').html( 'inner',  '<strong>rock and roll</strong>' );
	 *  	x$('#foo').html( 'outer',  '<p>lock and load</p>' );
	 * 		x$('#foo').html( 'top',    '<div>bangers and mash</div>');
	 *  	x$('#foo').html( 'bottom', '<em>mean and clean</em>');
	 *  	x$('#foo').html( 'remove');
	 *  	x$('#foo').html( 'before', '<p>some warmup html</p>');
	 *  	x$('#foo').html( 'after', '<p>more html!</p>');
	 *
	 * or
	 *
	 * 		x$('#foo').html('<p>sweet as honey</p>');
	 *
	 */
    html: function(location, html) {

        var getTag = function(el) {

            if (el.firstChild === null) {
                switch (el.tagName) {
                case 'UL':
                    return 'LI';
                case 'DL':
                    return 'DT';
                case 'TR':
                    return 'TD';
                default:
                    return el.tagName;
                }
            }
            return el.firstChild.tagName;
        };

        var wrap = function(xhtml, tag) {

            var attributes = {};
            var re = /^<([A-Z][A-Z0-9]*)([^>]*)>(.*)<\/\1>/i;
            if (re.test(xhtml)) {
                result = re.exec(xhtml);
                tag = result[1];

                if (result[2] !== "") {
                    var attrList = result[2].split(/([A-Z]*\s*=\s*['|"][A-Z0-9:;#\s]*['|"])/i);

                    for (var i = 0; i < attrList.length; i++) {
                        var attr = attrList[i].replace(/^\s*|\s*$/g, "");
                        if (attr !== "" && attr !== " ") {
                            var node = attr.split('=');
                            attributes[node[0]] = node[1].replace(/(["']?)/g, '');
                        }
                    }
                }
                xhtml = result[3];
            }

            var element = document.createElement(tag);

            for (var x in attributes) {
                var a = document.createAttribute(x);
                a.nodeValue = attributes[x];
                element.setAttributeNode(a);
            }

            element.innerHTML = xhtml;
            return element;
        };

        this.clean();

        if (arguments.length == 0) {
            return this.elements[0].innerHTML;
        }
        if (arguments.length == 1 && arguments[0] != 'remove') {
            html = location;
            location = 'inner';
        }

        this.each(function(el) {
            switch (location) {
            case "inner":
                if (typeof html == 'string') {
                    el.innerHTML = html;
                    var list = el.getElementsByTagName('SCRIPT');
                    var len = list.length;
                    for (var i = 0; i < len; i++) {
                        eval(list[i].text);
                    }
                } else {
                    el.innerHTML = '';
                    el.appendChild(html);
                }
                break;
            case "outer":
                if (typeof html == 'string') {
                    html = wrap(html, getTag(el));
                }
                el.parentNode.replaceChild(html, el);
                break;
            case "top":
                if (typeof html == 'string') {
                    html = wrap(html, getTag(el));
                }
                el.insertBefore(html, el.firstChild);
                break;
            case "bottom":
                if (typeof html == 'string') {
                    html = wrap(html, getTag(el));
                }
                el.insertBefore(html, null);
                break;
            case "remove":
                var parent = el.parentNode;
                parent.removeChild(el);
                break;
            case "before":
                var parent = el.parentNode;
                if (typeof html == 'string') {
                    html = wrap(html, getTag(parent));
                }
                parent.insertBefore(html, el);
                break;
            case "after":
                var parent = el.parentNode;
                if (typeof html == 'string') {
                    html = wrap(html, getTag(parent));
                }
                parent.insertBefore(html, el.nextSibling);
                break;
            }
        });
        return this;
    },



    /**
	 * Removes all erronious nodes from the DOM.
	 *
	 * @method
	 * @return {Element Collection}
	 * @example
	 *
	 * ### clean
	 *
	 * Walks the Element Collection removing empty nodes and whitespace.
	 *
	 * syntax:
	 *
	 * 		x$(selector).clean();
	 *
	 * example:
	 *
	 * 		x$(window).clean();
	 */
    clean: function() {
        var ns = /\S/;
        this.each(function(el) {
            var d = el,
            n = d.firstChild,
            ni = -1;
            while (n) {
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

    /**
	 * Attribute getter/setter
	 *
	 * @method
	 * @param {String} attributeName
	 * @param {String} attributeValue
	 * @return {Element Collection|String}
	 * */
    attr: function(attribute, val) {
        if (arguments.length == 2) {
            this.each(function(el) {
                el.setAttribute(attribute, val);
            });

            return this;
        } else {
            var attrs = [];
            this.each(function(el) {
                if (el.getAttribute(attribute) != null)
                attrs.push(el.getAttribute(attribute));

            });
            return attrs;
        }
    }
};

libs.push(Dom);
/**
 *
 * @namespace {Event}
 * @example
 *
 * Event
 * ---
 *
 * A good old fashioned event handling system.
 *
 */
var Event = {

	click: 		   		function(fn) { return this.on('click', 				fn); },
	load: 		   		function(fn) { return this.on('load',				fn); },
	submit: 		   	function(fn) { return this.on('submit',				fn); },
	touchstart:    		function(fn) { return this.on('touchstart',			fn); },
	touchmove: 	   		function(fn) { return this.on('touchmove',			fn); },
	touchend: 	   		function(fn) { return this.on('touchend',			fn); },
	touchcancel:   		function(fn) { return this.on('touchcancel',		fn); },
	gesturestart:  		function(fn) { return this.on('gesturestart',		fn); },
  	gesturechange: 		function(fn) { return this.on('gesturechange',		fn); },
  	gestureend:    		function(fn) { return this.on('gestureend',			fn); },
	orientationchange: 	function(fn) { return this.on('orientationchange',	fn); },

	/**
	 *
	 * Register callbacks to DOM events.
	 *
	 * @method
	 * @param {Event} The event identifier as a string.
	 * @param {Function} The callback function to invoke when the event is raised.
	 * @return {Element Collection}
	 * @example
	 *
	 * ### on
	 *
	 * Registers a callback function to a DOM event on the element collection.
	 *
	 * This method has shortcut aliases for:
	 *
	 * - click
	 * - load
	 * - touchstart
	 * - touchmove
	 * - touchend
	 * - touchcancel
	 * - gesturestart
	 * - gesturechange
	 * - gestureend
	 * - orientationchange
	 *
	 * For more information see:
	 *
	 * - http://developer.apple.com/webapps/docs/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/chapter_7_section_1.html#//apple_ref/doc/uid/TP40006511-SW1
	 *
	 * syntax:
	 *
	 * 		x$('button').on( 'click', function(e){ alert('hey that tickles!') });
	 *
	 * or...
	 *
	 * 		x$('a.save').click(function(e){ alert('tee hee!') });
	 *
	 * arguments:
	 *
	 * - type:string the event to subscribe to click|load|etc
	 * - fn:function a callback function to execute when the event is fired
	 *
	 * example:
	 *
	 * 		x$(window).load(function(e){
	 * 			x$('.save').touchstart( function(evt){ alert('tee hee!') }).css(background:'grey');
	 *  	});
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
	}
};

libs.push(Event);
/**
 *
 * @namespace {Style}
 * @example
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
	 * Sets a single CSS property to a new value.
	 *
	 * @method
	 * @param {String} The property to set.
	 * @param {String} The value to set the property.
	 * @return {Element Collection}
	 * @example
	 *
	 * ### setStyle
	 *
	 * syntax:
	 *
	 * 	x$(selector).setStyle(property, value);
	 *
	 * arguments:
	 *
	 * - property:string the property to modify
	 * - value:string the property value to set
	 *
	 * example:
	 *
	 * 	x$('.txt').setStyle('color', '#000');
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
	 * Retuns a single CSS property. Can also invoke a callback to perform more specific processing tasks related to the property value.
	 *
	 * @method
	 * @param {String} The property to retrieve.
	 * @param {Function} A callback function to invoke with the property value.
	 * @return {Element Collection}
	 * @example
	 *
	 * ### getStyle
	 *
	 * syntax:
	 *
	 * 	x$(selector).getStyle(property, callback);
	 *
	 * arguments:
	 *
	 * - property:string a css key (for example, border-color NOT borderColor)
	 * - callback:function (optional) a method to call on each element in the collection
	 *
	 * example:
	 *
	 *	x$('ul#nav li.trunk').getStyle('font-size');
	 *
	 * 	x$('a.globalnav').getStyle( 'background', function(prop){ prop == 'blue' ? 'green' : 'blue' });
	 *
	 */
	getStyle: function(prop, callback) {

		var gs = function (el,p) {
			return document.defaultView.getComputedStyle(el , "").getPropertyValue(p);
		};

		if(callback === undefined) {
			return gs(this.first(),prop);
		}

 		this.each( function(el) {
		  callback(gs(el,prop));
 		});
  	return this;
	},

	/**
	 *
	 * Adds the classname to all the elements in the collection.
	 *
	 * @method
	 * @param {String} The class name.
	 * @return {Element Collection}
	 * @example
	 *
	 * ### addClass
	 *
	 * syntax:
	 *
	 * 	$(selector).addClass(className);
	 *
	 * arguments:
	 *
	 * - className:string the name of the CSS class to apply
	 *
	 * example:
	 *
	 * 	$('.foo').addClass('awesome');
	 *
	 */
	addClass: function(className) {
		var that = this;
		var hasClass = function(el,className) {
		  var re = that.getClassRegEx(className);
		  return re.test(el.className);
		};

		this.each(function(el) {
			if (hasClass(el,className) === false) {
				el.className += ' ' + className;
			}
		});
		return this;
	},
	/**
	 *
	 * Checks to see if classname is one the element
	 *
	 * @method
	 * @param {String} The class name.
	 * @param {Function} A callback function (optional)
	 * @return {XUI Object - self} Chainable
	 * @example
	 *
	 * ### hasClass
	 *
	 * syntax:
	 *
	 * 	$(selector).hasClass('className');
	 * 	$(selector).hasClass('className', function(element) {});
	 *
	 * arguments:
	 *
	 * - className:string the name of the CSS class to apply
	 *
	 * example:
	 *
	 * 	$('#foo').hasClass('awesome'); // returns true or false
	 * 	$('.foo').hasClass('awesome',function(e){}); // returns XUI object
	 *
	 */
	hasClass: function(className, callback) {
        var that = this;

		if(callback === undefined && this.elements.length == 1) {
            var re = this.getClassRegEx(className);
            return re.test(that.first().className);
		}

 		this.each( function(el) {
            var re = that.getClassRegEx(className);
            if (re.test(el.className) == true) {
                callback(el);
            }
 		});

		return this;
	},

	/**
	 *
	 * Removes the classname from all the elements in the collection.
	 *
	 * @method
	 * @param {String} The class name.
	 * @return {Element Collection}
	 * @example
	 *
	 * ### removeClass
	 *
	 * syntax:
	 *
	 * 	x$(selector).removeClass(className);
	 *
	 * arguments:
	 *
	 * - className:string the name of the CSS class to remove.
	 *
	 * example:
	 *
	 * 	x$('.bar').removeClass('awesome');
	 *
	 */
	removeClass:function(className) {
		if (className === undefined) {
		   this.each(function(el) {
		      el.className = '';
		   });
		} else {
		   var re = this.getClassRegEx(className);
		   this.each(function(el) {
		      el.className = el.className.replace(re, ' ');
		   });
		}
	  return this;
	},


	/**
	 *
	 * Set a number of CSS properties at once.
	 *
	 * @method
	 * @param {Object} An object literal of CSS properties and corosponding values.
	 * @return {Element Collection}
	 * @example
	 *
	 * ### css
	 *
	 * syntax:
	 *
	 * 	x$(selector).css(object);
	 *
	 * arguments:
	 *
	 * - an object literal of css key/value pairs to set.
	 *
	 * example:
	 *
	 * 	x$('h2.fugly').css({ backgroundColor:'blue', color:'white', border:'2px solid red' });
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


	reClassNameCache: {},

	getClassRegEx: function(className) {
	    var re = this.reClassNameCache[className];
	    if (!re) {
	        re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
	        this.reClassNameCache[className] = re;
	    }
	    return re;
	}
};

libs.push(Style);
/**
 *
 * @namespace {Fx}
 * @example
 *
 * Fx
 * ---
 *
 * Animations, transforms and transitions for getting the most out of hardware accelerated CSS.
 *
 */
var Fx = {

	/**
	 *
	 * Tween is a method for transforming a css property to a new value.
	 *
	 * @method
	 * @param {Object} [Array|Object]
	 * @param {Function}
	 * @return {Element Collection}
	 * @example
	 *
	 * ### tween
	 *
	 * syntax:
	 *
	 * x$(selector).tween(obj, callback);
	 *
	 * arguments:
	 *
	 * - properties: object an object literal of element css properties to tween or an array containing object literals of css properties to tween sequentially.
	 * - callback (optional): function to run when the animation is complete
	 *
	 * example:
	 *
	 * 	x$('#box').tween({ left:100px, backgroundColor:'blue' });
	 * 	x$('#box').tween({ left:100px, backgroundColor:'blue' }, function() { alert('done!'); });
	 * 	x$('#box').tween([{ left:100px, backgroundColor:'green', duration:.2 }, { right:'100px' }]);
	 * 	x$('#box').tween({ left:100px}).tween({ left:'100px' });
	 *
	 */
	tween: function( options, opts ) {
		this.each(function(e){
			emile(e, options, opts);
		});
	    return this;
	}
};

libs.push(Fx);
/**
 *
 * @namespace {Xhr}
 * @example
 *
 *
 * Xhr
 * ---
 *
 * Remoting methods and utils.
 *
 */
var Xhr = {

	/**
	 *
	 * The classic Xml Http Request sometimes also known as the Greek God: Ajax. Not to be confused with AJAX the cleaning agent.
	 * This method has a few new tricks. It is always invoked on an element collection and follows the identical behaviour as the
	 * `html` method. If there no callback is defined the response text will be inserted into the elements in the collection.
	 *
	 * @method
	 * @param {location} [inner|outer|top|bottom|before|after]
	 * @param {String} The URL to request.
	 * @param {Object} The method options including a callback function to invoke when the request returns.
	 * @return {Element Collection}
	 * @example
	 *
	 * ### xhr

	 * syntax:
	 *
	 *    xhr(location, url, options)
	 *
	 * or this method will accept just a url with a default behavior of inner...
	 *
	 * 		xhr(url, options);
	 *
	 * location
	 *
	 * options:
	 *
	 * - method {String} [get|put|delete|post] Defaults to 'get'.
	 * - async {Boolen} Asynchronous request. Defaults to false.
	 * - data {String} A url encoded string of parameters to send.
	 * - callback {Function} Called on 200 status (success)
     *
     * response
     * - The response available to the callback function as 'this', it is not passed in.
     * - this.reponseText will have the resulting data from the file.
	 *
	 * example:
	 *
	 * 		x$('#status').xhr('inner', '/status.html');
	 * 		x$('#status').xhr('outer', '/status.html');
	 * 		x$('#status').xhr('top',   '/status.html');
	 * 		x$('#status').xhr('bottom','/status.html');
	 * 		x$('#status').xhr('before','/status.html');
	 * 		x$('#status').xhr('after', '/status.html');
	 *
	 * or
	 *
	 *    x$('#status').xhr('/status.html');
	 *
	 *	  x$('#left-panel').xhr('/panel', {callback:function(){ alert("All Done!") }});
	 *
	 *	  x$('#left-panel').xhr('/panel', function(){ alert(this.responseText) });
	 *
	 */

    xhr:function(location, url, options) {

        if (!/^inner|outer|top|bottom|before|after$/.test(location)) {
         	options = url;
         	url = location;
         	location = 'inner';
        }

        var o = options;

        if (typeof options == "function") {
            o = {};
            o.callback = options;
        }

        if (!options)
            o = {};


        if (this.first().tagName == "FORM") {
            o.callback  = url;
            url         = this.first().action;
            o.data      = this._toQueryString(this.first());
            o.method    = this.first().method;
        }

        var that   = this;
        var req    = new XMLHttpRequest();
        var method = o.method || 'get';
        var async  = o.async || false;
        var params = o.data || null;
        req.queryString = params;

        if (o.headers) {
            for (var i=0; i<o.headers.length; i++) {
              req.setRequestHeader(o.headers[i].name, o.headers[i].value);
            }
        }

        req.open(method,url,async);
        req.onload = (o.callback != null) ? o.callback : function() { that.html(location, this.responseText); };
        req.send(params);

    	return this;
    }
};

libs.push(Xhr);

	for (var i = 0, size = libs.length; i < size; i++) {
	  xui.extend( libs[i] );
  	}

	window.x$ = function() {
		return new xui(arguments);
	};
})();


(function(emile, container){
  var parseEl = document.createElement('div'),
    props = ('backgroundColor borderBottomColor borderBottomWidth borderLeftColor borderLeftWidth '+
    'borderRightColor borderRightWidth borderSpacing borderTopColor borderTopWidth bottom color fontSize '+
    'fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop maxHeight '+
    'maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft '+
    'paddingRight paddingTop right textIndent top width wordSpacing zIndex').split(' ');

  function interpolate(source,target,pos){ return (source+(target-source)*pos).toFixed(3); }
  function s(str, p, c){ return str.substr(p,c||1); }
  function color(source,target,pos){
    var i = 2, j, c, tmp, v = [], r = [];
    while(j=3,c=arguments[i-1],i--)
      if(s(c,0)=='r') { c = c.match(/\d+/g); while(j--) v.push(~~c[j]); } else {
        if(c.length==4) c='#'+s(c,1)+s(c,1)+s(c,2)+s(c,2)+s(c,3)+s(c,3);
        while(j--) v.push(parseInt(s(c,1+j*2,2), 16)); }
    while(j--) { tmp = ~~(v[j+3]+(v[j]-v[j+3])*pos); r.push(tmp<0?0:tmp>255?255:tmp); }
    return 'rgb('+r.join(',')+')';
  }

  function parse(prop){
    var p = parseFloat(prop), q = prop.replace(/^[\-\d\.]+/,'');
    return isNaN(p) ? { v: q, f: color, u: ''} : { v: p, f: interpolate, u: q };
  }

  function normalize(style){
    var css, rules = {}, i = props.length, v;
    parseEl.innerHTML = '<div style="'+style+'"></div>';
    css = parseEl.childNodes[0].style;
    while(i--) if(v = css[props[i]]) rules[props[i]] = parse(v);
    return rules;
  }

  container[emile] = function(el, style, opts){
    el = typeof el == 'string' ? document.getElementById(el) : el;
    opts = opts || {};
    var target = normalize(style), comp = el.currentStyle ? el.currentStyle : getComputedStyle(el, null),
      prop, current = {}, start = +new Date, dur = opts.duration||200, finish = start+dur, interval,
      easing = opts.easing || function(pos){ return (-Math.cos(pos*Math.PI)/2) + 0.5; };
    for(prop in target) current[prop] = parse(comp[prop]);
    interval = setInterval(function(){
      var time = +new Date, pos = time>finish ? 1 : (time-start)/dur;
      for(prop in target)
        el.style[prop] = target[prop].f(current[prop].v,target[prop].v,easing(pos)) + target[prop].u;
      if(time>finish) { clearInterval(interval); opts.after && opts.after(); }
    },10);
  }
})('emile', this);

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
