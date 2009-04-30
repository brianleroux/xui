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
//---
};

libs.push(Event);