//
//  ----- Animation methods  -----
//
// dependencies
// - xui-core
// - style
// - event
//
var FX = {
	animationStack: [],
   
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

	start:function() {
	    var t = 0;
	    for (var i = 0; i< this.animationStack.length;i++) {
	        var options = this.animationStack[i];
	        var duration     = options.duration == undefined ? .5    : options.duration;
	        setTimeout(function(s,o){s.animate(o);},t*1000*duration,this,options);
	        t += options.duration;
	    }
   
	    return this;
	},
   
	animate: function(options) {   
	    var that = this;
    
	    var opt_after = options.after;
    
	    var easing       = options.easing   == undefined ? 'ease-in' : options.easing;
	    var before       = options.before   == undefined ? function(){} : options.before;    
	    var after        = opt_after        == undefined ? function(){}    : function() {  opt_after.apply(that); };    
	    var duration     = options.duration == undefined ? .5    : options.duration;
    
	    options.easing = options.before = options.after = options.duration = undefined;
    
	    before.apply(before.arguments);
    
	    // this sets duration and easing equation on a style property change
	    this.setStyle( '-webkit-transition', 'all ' + duration + 's ' + easing );
    
	    // sets the starting point and ending point for each css property tween
	    this.each( function(el) {
	        for( var prop in options ) {
	            that.setStyle( prop, options[prop] )
	        }   
	    });
    
	    var killSwitch = setTimeout(function(){ that.setStyle('-webkit-transition','none');},duration*1000)
	    var doAfter = setTimeout(after,duration*1000);

   
	    return this || that; // haha
	}
}