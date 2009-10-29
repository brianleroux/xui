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
	
	// -- private methods -- //
	
	reClassNameCache: {},

	getClassRegEx: function(className) {
	    var re = this.reClassNameCache[className];
	    if (!re) {
	        re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
	        this.reClassNameCache[className] = re;
	    }
	    return re;
	}
//---
};

libs.push(Style);