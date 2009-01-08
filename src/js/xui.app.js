
x$.app = function(title,controller) {

	var _history = [];
	var _viewCache = [];

	var currentRequest = null

	var before_method = null;
	var after_method = null;
	
	var container = controller.container || '#content';
	
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
			if (action == '_default') {
				_history.push(controller[action]);
				load(controller[action]);			
			}
			
			var load = function(url) {
				console.log("Loading " + url);
				x$(container).xhr(url,{ callback:function(){
					x$(container).html(this.responseText);
					
					x$('.nav A').click(function(e) { 
						x$(window).stop(e); 
						x$(container).xhr(this.href);

						x$('#back').click(function(){					
							load(_history[_history.length-1]);
						});

					});
				}});
			}
		}
		after_method();	
	
	
	});
}

// Back button, animations (fade/swipe), partials 



x$.app('my special app', {
		container: '#content',
	 	layout: 	'index.html',
	 	_default: 	'_index.html',
<<<<<<< HEAD:src/js/xui.app.js
	 	after: 		function(){ console.log(" From After"); },
	 	before: 	function(){ console.log(" From Before"); }
=======
	 	after: 		function(){console.log(" From After");},
	 	before: 	function(){ console.log(" From Before");},

	 	'about':function(options){ 
	 		alert('page onload callback') 
	 		$('#content').xhrjson('/get_json_from_sinatra', {partial:'_foo', map:{head:'.header', body:'.body'}})
	 	},
	
		'/foo/bar/index.html':function() {
			alert('once index.html has been loaded');
		}
>>>>>>> 23eac651671b7a577e1eb170ff0052ca8e9cfef3:src/js/xui.app.js

});

