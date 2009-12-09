xui.extend({
    click: function(fn) {
        return this.on('click', fn);
    },
    load: function(fn) {
        return this.on('load', fn);
    },
    submit: function(fn) {
        return this.on('submit', fn);
    },
    touchstart: function(fn) {
        return this.on('touchstart', fn);
    },
    touchmove: function(fn) {
        return this.on('touchmove', fn);
    },
    touchend: function(fn) {
        return this.on('touchend', fn);
    },
    touchcancel: function(fn) {
        return this.on('touchcancel', fn);
    },
    gesturestart: function(fn) {
        return this.on('gesturestart', fn);
    },
    gesturechange: function(fn) {
        return this.on('gesturechange', fn);
    },
    gestureend: function(fn) {
        return this.on('gestureend', fn);
    },
    orientationchange: function(fn) {
        return this.on('orientationchange', fn);
    }
});
