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

	var _history = [];
	var _viewCache = [];

	var currentRequest = null

	for(var action in controller) {
		if (action == 'before')
			controller[action]();
	}


	for(var action in controller) {
		if (action == 'after')
			controller[action]();
	}
	
}




x$.app('my special app', {

	 	'layout':'index.html',
	 	'default':'_index.html',
	 	'before':function(){ alert("Before");},
	 	'after':function(){alert("After");},
	 	
	 	'about':function(options){ 
	 		alert('page onload callback') 
	 		$('#content').xhrjson('/get_json_from_sinatra', {partial:'_foo', map:{head:'.header', body:'.body'}})
	 	}

});

