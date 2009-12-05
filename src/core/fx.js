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
var Fx = {

	/**
	 *
	 * Tween is a method for transforming a css property to a new value.
	 * 
	 * @method
	 * @param {Object} [Array|Object]
	 * @param {Function} 
	 * @return {Element Collection}
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
	 * 	x$('#box').tween([{ left:100px, backgroundColor:'green', duration:.2 }, { right:'100px' }]);
	 * 	x$('#box').tween({ left:100px}).tween({ left:'100px' });
	 * 
	 */
	tween: function( options, opts ) {
		// TODO make xui into emile options
		// TODO make queue
		// TODO make chainable
		this.each(function(e){		
			emile(e, options, opts);
		});
	    return this;
	}
//---	
};

libs.push(Fx);
