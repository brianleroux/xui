/**
* XUI Apps
* ---
* 
* Lightweight MVC for building rich mobile applications. 
*
* An XUI app has at a minimum a name and often a controller. Controllers are impolmented as object literals wherein 
* the keys represent the templates to load and the values are callback functions which are executed once a template
* has loaded. Models are up to you to implement but we try to make things a little nicer with json smart partials.
*
* Rendered templates that contain lists with links become link groups as in the native guis. These links are unobtrusively
* enhanced with XUI app goodness: they call actions on your controller objects.
*
* syntax:
* 
* 	x$.app( title, controller );
* 
* arguments:
* 
* - title:string an appropriate name for your application
* - controller:object the controller object define application functionality. also accepts an array of controllers.
* 
* example:
* 
* This app demonstrates all the defaults for a controller.
*
* 	x$.app('hello world app', { 
*	
*   	// application filters
*   	after: 	   function(){console.log('called before every action is called')},
*   	before:    function(){console.log('called after every action is called')},
*
* 		// layout templating
*   	layout:    'index.html',  // default layout used
*   	container: '#content',    // default element action results will be rendered in
*   	index: 	   '_index.html', // default action to load
*   
* 		// action called after an action has loaded 
* 		// the action key is a path to the template to be rendered and the method to call is the value
* 		'_index.html':function(){ console.log('_index.html has been loaded')}
*   });
*
* 
* A slightly more complex app construction allowing for private members (sometimes called the module pattern).
*
* 	x$.app('hello world app', function(){
*	
* 		var Person = {};	
* 
*		var isAuthenicated = function() {
* 			return Person.username && Person.password;
* 		};
* 
* 		var checkAuth = function() {
* 			if(!isAuthenticated())
				load('login.html');
* 		};
*
* 		return {
*			before:checkAuth,
* 
*			'login.html':function(){},
* 			'register.html':function(){},
* 			'logout.html':function(){},
*			'forgotpwd.html':function(){},
* 			'account.html':function(){}
* 		}
* 	});
*/ 
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
				e.preventDefault();
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
		before_method();
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
};
