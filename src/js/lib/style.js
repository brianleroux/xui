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
	* arguments: prop (CSS Key ie: border-color NOT borderColor)
	* if callback is a function, it will pass the value into the function orherwise return the proprty
	* example:
	* TODO: prop should be JS property, not CSS property
	* 
	*/
	getStyle: function(prop,callback) {
      this.each(function(el) {
				var strValue = document.defaultView.getComputedStyle(el, "").getPropertyValue(prop);
				if (typeof callback == 'function') {
					callback(strValue);
				} else {
					return strValue;
				}
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