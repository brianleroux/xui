var cache = {};

/**
 *
 * @namespace {Event}
 * @example
 *
 * Event
 * ---
 *	
 * A good new skool fashioned event handling system.
 * 
 */
xui.extend({
	/**
	 *
	 * Register callbacks to DOM events.
	 * 
	 * @param {Event} type The event identifier as a string.
	 * @param {Function} callback The callback function to invoke when the event is raised.
	 * @return self
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
    return this.each(function (el) {
	if (window.addEventListener) {
		el.addEventListener(type, _createResponder(el, type, fn), false);
	}
	else {
		el.attachEvent('on' + type, fn); //doesn't support _createResponder for the moment...
	}
    });
  },

  un: function(type) {
    var that = this;
    return this.each(function (el) {
      var id = _getEventID(el), responders = _getRespondersForEvent(id, type), i = responders.length;

      while (i--) {
        el.removeEventListener(type, responders[i], false);
      }
      
      delete cache[id];
	  });
	},
	
	fire: function (type, data) {
	  return this.each(function (el) {
      if (el == document && !el.dispatchEvent)
        el = document.documentElement;

      var event = document.createEvent('HTMLEvents');
      event.initEvent(type, true, true);
      event.data = data || {};

      event.eventName = type;
      el.dispatchEvent(event);
	  });
	}
//---
});

// lifted from Prototype's (big P) event model
function _getEventID(element) {
  if (element._xuiEventID) return element._xuiEventID[0];
  return element._xuiEventID = [++_getEventID.id];
}

_getEventID.id = 1;

function _getRespondersForEvent(id, eventName) {
  var c = cache[id] = cache[id] || {};
  return c[eventName] = c[eventName] || [];
}

function _createResponder(element, eventName, handler) {
  var id = _getEventID(element), r = _getRespondersForEvent(id, eventName);

  var responder = function(event) {
    if (handler.call(element, event) === false) {
      event.preventDefault();
      event.stopPropagation();
    } 
  };

  responder.handler = handler;
  r.push(responder);
  return responder;
}

"click load submit touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend orientationchange".split(' ').forEach(function (event) {
  xui.fn[event] = function (fn) { return fn ? this.on(event, fn) : this.fire(event); };
});

// patched orientation support - Andriod 1 doesn't have native onorientationchange events
if (!eventSupported('onorientationchange')) {
  (function () {
    var w = window.innerWidth, h = window.innerHeight;
    
    xui(window).on('resize', function () {
      var portraitSwitch = (window.innerWidth < w && window.innerHeight > h) && (window.innerWidth < window.innerHeight),
          landscapeSwitch = (window.innerWidth > w && window.innerHeight < h) && (window.innerWidth > window.innerHeight);
      if (portraitSwitch || landscapeSwitch) {
        window.orientation = portraitSwitch ? 0 : 90; // what about -90? Some support is better than none
        $('body').fire('orientationchange'); // will this bubble up?
        w = window.innerWidth;
        h = window.innerHeight;
      }
    });
  })();
}