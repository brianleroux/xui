// x$(window).load(function(){
// 	
// 	// load the default content by default 
// 	x$('#content').xhr('_index.html');
// 	
// 	// relative links loaded via ajax and animated in (with a left to right swipe by default)
// 	x$('div#stage ul.nav li a').click(function(e) {
// 		var url = this.href;
// 		
// 		x$(this).stop(e);
// 	
// 		this.blur();
// 		// ---------
// 	
// 		x$('#stage').tween({'left':'-330px'});
// 		
// 	});
// });	

x$.app = function(title,controller) {
	console.log(title);
	controller.apply(this);
}


x$.app('my special app', function(){
  // private methods
	var _history = [];
	var _viewCache = [];

	// controllers methods that point to views 
	// views may or may not contain headers
	return {
	 	'layout':'index.html',
	 	'default':'_index.html',
	 	'before':function(){},
	 	'after':function(){},
	 	
	 	'about':function(options){ 
	 		alert('page onload callback') 
	 		$('#content').xhrjson('/get_json_from_sinatra', {partial:'_foo', map:{head:'.header', body:'.body'}})
	 	}
	// 	
	// 	'contribute':function(){ alert('page onload callback') },
	// 	'foo/bar/exmaple.html':function(){ alert('page onload callback') },
	}
});


