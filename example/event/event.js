var initEventExample = function() {
	// via the excellent:
	// http://www.sitepen.com/blog/2008/07/10/touching-and-gesturing-on-the-iphone/
	x$('#drag').touchmove(function(e) { 
		if(e.touches.length == 1) { // Only deal with one finger 
			e.preventDefault();
			var touch = e.touches[0]; // Get the information for finger #1 
			var node = touch.target;  // Find the node the drag started from 
			
			node.style.position = "absolute"; 
			node.style.left = touch.pageX + "px"; 
			node.style.top = touch.pageY + "px"; 
		} 
	});
	
	var width = 100, height = 100, rotation = 0;

	x$('#resize-and-rotate').gesturechange(function(e){
	  var node = e.target;
	  // scale and rotation are relative values,
	  // so we wait to change our variables until the gesture ends
	  node.style.width = (width * e.scale) + "px";
	  node.style.height = (height * e.scale) + "px";
	  node.style.webkitTransform = "rotate(" + ((rotation + e.rotation) % 360) + "deg)";
	});

	x$('#resize-and-rotate').gestureend(function(e){
	  // Update the values for the next time a gesture happens
	  width *= e.scale;
	  height *= e.scale;
	  rotation = (rotation + e.rotation) % 360;
	});
}