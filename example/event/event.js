var initEventExample = function() {
	x$('#stage').html(this.responseText);
	
	// via the excellent:
	// http://www.sitepen.com/blog/2008/07/10/touching-and-gesturing-on-the-iphone/
	//
	x$('#drag').touchmove(function(e) { 
		// only deal with one finger
		if(e.touches.length == 1) { 
			e.preventDefault();
			// first finger
			var touch = e.touches[0];  

			x$(touch.target).css({
				position: "absolute",
				left:     touch.pageX + "px",
				top:      touch.pageY + "px"	
			});
		} 
	});
	
	var width = 100, height = 100, rotation = 0;

	x$('#resize-and-rotate').gesturechange(function(e){
	  	x$(e.target).css({
			width: 			 (width * e.scale) + "px",
	  		height: 		 (height * e.scale) + "px",
	  		webkitTransform: "rotate(" + ((rotation + e.rotation) % 360) + "deg)"
		});
	});

	// updates the values for the next time a gesture happens
	x$('#resize-and-rotate').gestureend(function(e){
	  width *= e.scale;
	  height *= e.scale;
	  rotation = (rotation + e.rotation) % 360;
	});
	
//---
}