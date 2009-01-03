//
//  ----- Style methods  -----
//
var STYLE = {
	reClassNameCache: {},
	
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
css: function(o) {
	var that = this;
	this.each(function(el) {
		for (var prop in o) {
			that.setStyle(prop, o[prop]);
		}
	});
	return this || that;
},
position: function () {
	this.each(function(el){
    	var topValue= 0,leftValue= 0;
        var obj = el;
        while(obj) {
            leftValue += obj.offsetLeft;
            topValue  += obj.offsetTop;
            obj 	  =  obj.offsetParent;
        }
        el.leftPos = leftValue;
        el.topPos = topValue;
 	});
   	return this;
 },
}