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

	var before_method = null;
	var after_method = null;
	
	x$(window).load(function(){
	
		for(var action in controller) {
			if (action == 'before') {
				before_method = controller[action];
			}
			
			if (action == 'after') {
				after_method = controller[action];
			}
		}


		// Main Flow Loop
		before_method();
		for(var action in controller) {
			// Do shit
			if (action == 'default') {
				x$('#content').xhr(controller[action],{after:function(){
					x$('.nav A').click(function() { console.log('DO SOmething');});	
				}});
				

			}
			console.log(action);
		}
		after_method();	
	
	
	});
}




x$.app('my special app', {

	 	'layout':'index.html',
	 	'default':'_index.html',
	 	'after':function(){console.log(" From After");},
	 	'before':function(){ console.log(" From Before");},

	 	
	 	'about':function(options){ 
	 		alert('page onload callback') 
	 		$('#content').xhrjson('/get_json_from_sinatra', {partial:'_foo', map:{head:'.header', body:'.body'}})
	 	}

});


