(function() {
  	// private constructor
	function _$(els) {
		this.elements = [];
		for (var i=0; i<els.length; i++) {
			var element = els[i];
			if (typeof element == 'string') {
				var element = document.querySelectorAll(element);
				for (var x=0;x<element.length;x++) {				
					this.elements.push(element[x]);	
				}
			} else {
				this.elements.push(element);
			}
		}	
		return this;
	}
  _$.prototype = {
	reClassNameCache: {},
	each: function(fn) {
      	for ( var i = 0, len = this.elements.length; i<len; ++i ) {
        	fn.call(this,this.elements[i]);
      	}
      	return this;
    },
    setStyle: function(prop, val) {
      	this.each(function(el) {
        	el.style[prop] = val;
      	});
      return this;
    },
	getClassRegEx: function(className) {
        var re = this.reClassNameCache[className];
        if (!re) {
            re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
            this.reClassNameCache[className] = re;
        }
        return re;
    },
    addClass: function(className) {
    	this.each(function(el) {
        	el.className += ' '+className;
      	});
      	return this;
    },
	hasClass: function(el,className) {
		var re = this.getClassRegEx(className);
	    return re.test(el.className);
	},
	removeClass:function(className) {
		var re = this.getClassRegEx(className);
		this.each(function(el) {
        	el.className = el.className.replace(re, ' ');
      	});
		return this;
	},
	toggleClass:function(className) {
		var that = this;
		this.each(function(el) {
			(this.hasClass(el,className)==true)? this.removeClass(className) : this.addClass(className);
      	});
		return this;
	},
	// Event System
	eventfunctions : [],
	click: function(fn) { return this.on('click',fn); },
	dblclick: function(fn) { return this.on('dblclick',fn); },
	load: function(fn) { return this.on('load',fn); },
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

    css: function(o) {
		var that = this;
		this.each(function(el) {
			for (var prop in o) {
				that.setStyle(prop, o[prop]);
			}
		});
		return this;
    },
	position: function () {
		this.each(function(el){
			var topValue= 0,leftValue= 0;
		    var obj = el;
			while(obj) {
				leftValue += obj.offsetLeft;
				topValue += obj.offsetTop;
				obj = obj.offsetParent;
		    }
			el.leftPos = leftValue;
			el.topPos = topValue; 
		});
	    
	    return this;
	},
	
	
	// TODO
	// callback function (before/after)
	// reset -webkit-transition property
	// absolutize/offset
	// var isSet 	 = function( prop ) { return ( typeof prop !== 'undefined' )};
	tween: function( options ) {
		
		var that = this;
		
	
		var easing   	= options.easing   == undefined ? 'ease-in'    : options.easing;
		var before	 	= options.before   == undefined ? function(){} : options.before; 	
		var after	 	= options.after    == undefined ? function(){} : function() { options.after.apply(that); }; 	
		var duration 	= options.duration == undefined ? .5	       : options.duration;
	
		options.easing   = undefined;
		options.before   = undefined;
		options.after    = undefined;
		options.duration = undefined;
	
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
	},
	
	/*

	swipe: function(dir) {
		var dir = dir || 'right'; 
		var that = this;
		width = document.getElementsByTagName('body')[0].clientWidth;
		this.each(function(el){
			that.position();
			if (dir == 'right') dist = width - el.leftPos; else dist = el.leftPos - width;
			that.css({
				'-webkit-transform':'translate('+ dist +'px,0)',
	        	'-webkit-transition-duration':'.5s',
	        	'-webkit-transition-timing-function':'ease-in'
			});				
		});
		return this;
	},
	*/
	clean: function(){
        var ns = /\S/;
 	    this.each(function(el){
			var d = el, n = d.firstChild, ni = -1;
			while(n){
	 	        var nx = n.nextSibling;
	 	        if (n.nodeType == 3 && !ns.test(n.nodeValue)){
	 	            d.removeChild(n);
	 	        } else {
	 	            n.nodeIndex = ++ni;
	 	        }
	 	        n = nx;
	 	    }
		});
 	    return this;
 	},
	wrap:function(html,tag) {
		var attributes = {};
		var re = /<([A-Z][A-Z0-9]*)(.*)[^>]*>(.*?)<\/\1>/i;
		if(re.test(html)) {
			result = re.exec(html);
			tag = result[1];
			// if the node has any attributes, convert to object
			if (result[2] != "") {
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
					if (typeof html == 'string') html = this.wrap(html,el.firstChild.tagName);
					el.parentNode.replaceChild(html,el);
				break;
				case "top": 
					if (typeof html == 'string') html = this.wrap(html,el.firstChild.tagName);
					el.insertBefore(html,el.firstChild);
				break;
				case "bottom":
					if (typeof html == 'string') html = this.wrap(html,el.firstChild.tagName);
					el.insertBefore(html,null);
				break;
			}
        });
		return this;
	},
	xhr:function(url,callback) {	
		var that = this;
		if (typeof url == 'string') {
			var req = new XMLHttpRequest();
			var method = 'get';
			var async = false;
			req.open(method,url,async);
			req.onload = (callback != null) ? callback : function() { that.html(this.responseText); }
			req.send(null);
      	}
	  	return this;
	},
	xhrjson:function(url,map) {
		var that = this;
		callback = function() { 
			var o = eval('(' + this.responseText + ')');
			for (var prop in o) { x$(map[prop]).html(o[prop]); }
		}
		this.xhr(url,callback);
		return this;
	}
  };
  var xui = window.x$ = function() {
    return new _$(arguments);
  }
})();



function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}
