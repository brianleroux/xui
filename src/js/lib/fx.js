/**
*
* Fx
* ---
*	
* Animations mostly but we're not excluding any ideas.
* 
*/
var Fx = {

	/**
	*
	* ### tween
	*	
	* syntax:
	* 
	* 	x$('#box').tween({ left:100px, backgroundColor:'blue' });
	* 	
	* 	x$('#box').tween([{ left:100px, backgroundColor:'green', duration:.2 }, { right:100px }]);
	* 	
	* 	x$('#box').tween({ left:100px}).tween({ left:100px });
	*
	* arguments:
	* 
	* properties:object an object literal of element properties to tween.
	* 
	* _or_
	*
	* queue:array an array literal of objects which contain properties to tween sequentially.
	*
	* example:
	* 
	*/
	tween: function( options ) {
	    if (options instanceof Array) {
	        for(var i=0;i<options.length;i++) {
	            this.animationStack.push(options[i]);                   
	        }
	    } else if (options instanceof Object) {
	        this.animationStack.push(options);
	    }
  
	    this.start();
	    return this;
	},

	// -- private -- //

	// TODO should this be private __animationStack?
	animationStack: [],

	start:function() {
	    var t = 0;
	    for (var i = 0; i< this.animationStack.length;i++) {
	        var options = this.animationStack[i];
	        var duration     = options.duration == undefined ? .5    : options.duration;
	        setTimeout(function(s,o){s.animate(o);},t*1000*duration,this,options);
	        t += duration;
	    }
  
	    return this;
	},
  
	animate: function(options) {   
	    var that = this;
   
	    var opt_after = options.after;
   
	    var easing = (options.easing == undefined) ? 'ease-in' : options.easing;
	    var before = (options.before == undefined) ? function(){} : options.before;    
	    var after = (opt_after == undefined) ? function(){} : function() {  opt_after.apply(that); };    
	    var duration = (options.duration == undefined) ? .5 : options.duration;
   
			var translate = options.by;
			var rotate = options.rotate;
			
	    options.easing = options.rotate = options.by = options.before = options.after = options.duration = undefined;
	    before.apply(before.arguments);
   
	    // this sets duration and easing equation on a style property change
	    this.setStyle( '-webkit-transition', 'all ' + duration + 's ' + easing );
   
	    // sets the starting point and ending point for each css property tween
	    this.each( function(el) {
	        for( var prop in options ) {
	            that.setStyle( prop, options[prop] )
	        }
	 				if (translate) {
						that.setStyle('-webkit-transform', that.translateOp(translate[0],translate[1]));
					}
					
					// if (rotate) {
					// 	for(var x in rotate) {
					// 		that.setStyle('-webkit-transform', that.rotateOp(x,rotate[x]));
					// 	}
					// }

	    });

	    setTimeout(function(){ that.setStyle('-webkit-transition','none');},duration*1000)
	    setTimeout(function(){ that.setStyle('-webkit-transform','none');},duration*1000)	
	    setTimeout(after,duration*1000);

	    return this || that; // haha
	},
	
	translateOp: function(xPixels, yPixels) {
	    return 'translate(' + xPixels + 'px, ' + yPixels + 'px)';
	},
	
	rotateOp: function(axis, degree){
	    return 'rotate' + axis + '(' + degree + 'deg)';
	}
	
};