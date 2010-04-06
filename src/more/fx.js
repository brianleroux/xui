xui.extend({
	nativeAnimate: function( options, callback ) {
        this.animationStack = [];	    
	    if (options instanceof Array) {
	        for(var i=0; i < options.length; i++) {
	            this.animationStack.push(options[i]);
	        }
	    } else if (options instanceof Object) {
	        this.animationStack.push(options);
	    }

	    this.start(callback);
	    return this;
	},

	// -- private -- //

	// TODO move these methods into the tween method
	animationStack: [],

	start:function(callback) {
	    
	    var t = 0;
	    var len = this.animationStack.length;
	    
	    for (var i = 0; i< this.animationStack.length;i++) {

	        var options = this.animationStack[i];
	        var duration     = options.duration === undefined ? 0.5    : options.duration;
	        // We use setTimeout to stage the animations.
	        setTimeout(function(s,o,i){
      			s.animate(o);
      			if ((i == len - 1) && callback && typeof(callback) == 'function') {
      				callback();
      			}
      		},t*1000*duration,this,options,i);
	        t += duration;
	    }

	    return this;
	},
  
	animate: function(options) {   
	    var that = this;
   
	    var opt_after = options.after;
   
	    var easing = (options.easing === undefined) ? 'ease-in' : options.easing;
	    var before = (options.before === undefined) ? function(){} : options.before;    
	    var after = (opt_after === undefined) ? function(){} : function() {  opt_after.apply(that); };    
	    var duration = (options.duration === undefined) ? 0.5 : options.duration;
   
		var translate = options.by;
		var rotate = options.rotate;
			
	    options.easing = options.rotate = options.by = options.before = options.after = options.duration = undefined;
	    before.apply(before.arguments);
   
	    // this sets duration and easing equation on a style property change
	    this.setStyle('-webkit-transition', 'all ' + duration + 's ' + easing );
   
	    // sets the starting point and ending point for each css property tween
	    this.each( function(el) {
	        for( var prop in options ) {
	            that.setStyle(prop, options[prop]);
	        }
	
			if (translate) {
				that.setStyle('-webkit-transform', that.translateOp(translate[0],translate[1]));
			}
			
			if (rotate) {
				that.setStyle('-webkit-transform', that.rotateOp(rotate[0],rotate[1]));
			}
	    });

	    setTimeout(function(){ that.setStyle('-webkit-transition','none');},duration*1000);
	    setTimeout(function(){ that.setStyle('-webkit-transform','none');},duration*1000);
	    setTimeout(after,duration*1000);

	    return this || that; // haha
	},
	
	translateOp: function(xPixels, yPixels) {
	    return 'translate(' + xPixels + 'px, ' + yPixels + 'px)';
	},
	
	rotateOp: function(axis, degree){
	    return 'rotate' + axis.toUpperCase() + '(' + degree + 'deg)';
	}
// --
});