(function() {
  // private constructor
  function _$(els) {
    this.elements = [];
    for (var i=0; i<els.length; i++) {
      var element = els[i];
      if (typeof element == 'string') {
        element = document.getElementById(element);
      }
      this.elements.push(element);
    }
    return this.elements[0];
  }
  _$.prototype = {
	reClassNameCache: {},
	each: function(fn) {
      	for ( var i = 0, len = this.elements.length; i<len; ++i ) {
        	fn.call(this, this.elements[i]);
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
	hasClass:function(el,className) {
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
    on: function(type, fn) {
		var listen = function(el) {
			if (window.addEventListener) {
				el.addEventListener(type, fn, false);
			} else if (window.attachEvent) {
				el.attachEvent('on'+type, function() {
					fn.call(el, window.event);
				});
			}
		};
		this.each(function(el) {
			listen(el);
		});
		return this;
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
	wrap:function(html,tag) {
		var element = document.createElement(tag);
		element.innerHTML = html;
		return element;
	},
	html:function(html,loc) {
		var that = this;
		loc = (loc != null) ? loc : 'inner'; 
		this.each(function(el) {
			switch(loc) {
				case "inner": el.innerHTML = html; break;
				case "outer":
					if (typeof html == 'string') html = this.wrap(html,'span');
					el.parentNode.replaceChild(html,el);
				break;
				case "top": 
					if (typeof html == 'string') html = this.wrap(html,'span');
					el.insertBefore(html,el.firstChild);
				break;
				case "bottom":
					if (typeof html == 'string') html = this.wrap(html,'span');
					el.insertBefore(html,null);
				break;
			}
        });
		return this;
	},
	ajax_options:{method:'get',async:false},
	load:function(url,callback) {	
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
	loadjson:function(url,map) {
		var that = this;
		callback = function() { 
			var o = eval('(' + this.responseText + ')');
			for (var prop in o) { x$(map[prop]).html(o[prop]); }
		}
		this.load(url,callback);
		return this;
	}
  };
  var xui = window.x$ = function() {
    return new _$(arguments);
  }
})();