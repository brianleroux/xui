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
	tween: function( props, options, callback ) {
		// TODO make queue
		
		if (typeof options == 'function') {
		  callback = options;
		  options = {};
		} else if (typeof options == 'number') {
		  options = { duration: options };
		}
		
		// Here be XUI to emile options
		
		if (typeof callback == 'function') {
		  options.after = callback;
		}
		
		// serialise the props
		var serialisedProps = [];
		if (typeof props != string) {
  		for (var key in props) {
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
