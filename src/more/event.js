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
 * 
 */
// xui.extend({});


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