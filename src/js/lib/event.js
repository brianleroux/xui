/**
*
* Event
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
	* on
	*	
	* syntax:
	*
	* x$('button').on( 'click', function(){ alert('hey that tickles!') });
	*
	* arguments:
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