/**
 *
 * @namespace {Fx}
 * @example
 *
 * Fx
 * ---
 * 
 * Animations, transforms and transitions for getting the most out of hardware accelerated CSS.
 * 
 */
xui.extend({

    /**
     *
     * Tween is a method for transforming a css property to a new value.
     * 
     * @param {String} styles
     * @param {Object} options ({Int} duration, {Function} easing, {Function} after)
     * @return self
     * @example
     * 
     * ### tween
     * 
     * syntax:
     * 
     * x$(selector).tween(style, options);
     *
     * arguments:
     * 
     * - styles: String of CSS properties & values to tween
     * - options (optional): object to optionally specify duration, easing function, & callback
     *
     * example:
     *
     *    x$('#box').tween("left: 100px; backgroundColor: 'blue';");
     *    x$('#box').tween("left: 100px; backgroundColor: 'blue';", { after : function() { alert('done!'); } });
     *    x$('#box').tween("left: 100px;").tween(" left: 100px;");
     * 
     */
    tween: function(style, options) {
        // TODO make xui into emile options
        // TODO make queue
        return this.each(function(e){
            emile(e, style, options);
        });
    }
//---
});
