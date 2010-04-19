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
	 * @param {Object} options [Array|Object]
	 * @param {Function} callback
	 * @return self
	 * @example
	 * 
	 * ### tween
	 *	
	 * syntax:
	 * 
	 * x$(selector).tween(obj, callback);
	 *
	 * arguments:
	 * 
	 * - properties: object an object literal of element css properties to tween or an array containing object literals of css properties to tween sequentially.
	 * - callback (optional): function to run when the animation is complete
	 *
	 * example:
	 *
	 * 	x$('#box').tween({ left:100px, backgroundColor:'blue' });
	 * 	x$('#box').tween({ left:100px, backgroundColor:'blue' }, function() { alert('done!'); });
	 
	 * 	x$('#box').tween([{ left:100px, backgroundColor:'green', duration:.2 }, { right:'100px' }]); // WTF? is this a sequence?
	 * 	x$('#box').tween({ left:100px}).tween({ left:'100px' });
	 * 
	 */
	// options: duration, after, easing
	tween: function( props, callback ) {
		// TODO make queue
	
		var options = {};
		"duration after easing".split(' ').forEach( function(p) {
    		if (props[property]) {
    		    options[property] = props[property];
    		    delete props[property];
    		}
		});
		
		// Here be XUI to emile options
		if (typeof callback == 'function') options.after = callback;
		
		// serialise the props
		var serialisedProps = [], key;
		if (typeof props != 'string') {
  		    for (key in props) {
  		        if (key == 'duration') {
  		            options.duration = props[key];
  		        } else {
                    serialisedProps.push(key + ':' + props[key]);  		    
  		        }
		    }
  		    serialisedProps = serialisedProps.join(';');
		} else {
		    serialisedProps = props;
		}
		
		return this.each(function(e){
			emile(e, serialisedProps, options, callback);
		});
	}
//---
});