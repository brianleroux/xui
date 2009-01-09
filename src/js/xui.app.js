

x$(window).load(function(){
	
	var blah = {
		log:function(){console.log('hi');}
	}
	x$(window).extend(blah);
	
	x$('#container').log();
	
});

x$.app = function(title,controller) {

	var _history = [];
	var _viewCache = [];

	var currentRequest = null

	var before_method = null;
	var after_method = null;
	
	var container = controller.container || '#content';
	
	var load = function(url) {


		var u = url.split('/');
		u = u[u.length - 1];

		document.location.hash = u;
		for(var action in controller) {		
			if (typeof action == 'string') {
				var re = new RegExp(u); 
				
				if (re.test(action)) {
					controller[action]();
				}
			}
		}
			
		x$(container).xhr(url,{ callback:function(){
			x$(container).html(this.responseText);
			
			x$('.nav A').click(function(e) { 
				x$(window).stop(e); 
				load(this.href);

				x$('#back').click(function(){					
					load(_history[_history.length-1]);
				});
				


			});
		}});
	}
	
	
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
		//before_method();
		var load_page = null;
		(function() {
			var cp = document.location.hash;
			cp = cp.replace("#",'');
			// if this looks like a partial load it
			load_page = cp;

		})();
		for(var action in controller) {
			if (action == 'index') {
				_history.push(controller[action]);
				load(load_page || controller[action]);
			}
			
		}
		after_method();	
		
	
	});
}

// Back button, animations (fade/swipe), partials 

x$.app('my special app', {
 	after: 		function(){},
 	before: 	function(){ console.log(" From Before");},

	//container: '#content',
 	layout: 	'index.html',
 	index: 	'_index.html',
	'_contribute.html': function() {console.log('fire on this');}

});

