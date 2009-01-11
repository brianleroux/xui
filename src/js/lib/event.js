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
	
	click: 		   		function(fn) { return this.on('click',fn); },
	load: 		   		function(fn) { return this.on('load',fn); },
	touchstart:    		function(fn) { return this.on('touchstart',fn); },
	touchmove: 	   		function(fn) { return this.on('touchmove',fn); },
	touchend: 	   		function(fn) { return this.on('touchend',fn); },
	touchcancel:   		function(fn) { return this.on('touchcancel',fn); },
	gesturestart:  		function(fn) { return this.on('gesturestart',fn); },
  	gesturechange: 		function(fn) { return this.on('gesturechange',fn); },
  	gestureend:    		function(fn) { return this.on('gestureend',fn); },
	orientationchange: 	function(fn) { return this.on('orientationchange',fn); },
	/**
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
	* 	x$('button').on( 'click', function(){ alert('hey that tickles!') });
	*
	* arguments:
	*
	* - type:string the event to subscribe to click|load|etc
	* - fn:function a callback function to execute when the event is fired
	*
	* example:
	* 	
	* 	x$(window).load(function(e){
	* 		x$('.save').touchstart( function(evt){ alert('tee hee!') });	
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
//
//  ,
//  
//  // TODO not chaining?
//  subscribe: function(fn) {
//      this.eventfunctions.push(fn);
//  },
//  
//  unsubscribe: function(fn) {
//      this.eventfunctions = this.eventfunctions.filter (
//          function(el) {
//              if ( el !== fn ) {
//                  return el;
//              }
//          }
//      );
//  },
//  
//  // TODO candicate for a static methods --v ?
//  fire: function(o, thisObj) {
//      var scope = thisObj || window;
//      this.eventfunctions.forEach(
//          function(el) {
//              el.call(scope, o);
//          }
//      );
//  },
//
//  stop: function(e) {
//      if(window.event && window.event.returnValue)
//          window.event.returnValue = false;
//
//      if(e && e.preventDefault)
//          e.preventDefault();
//  },
//
//  bind: function(fn,context) {
//  	var args = [];
//      for (var i = 2; i < arguments.length; i++) {
//      	args[i - 2] = arguments[i];
//      }
//      fn.apply(context,args);       
//      return this;
//   }
};