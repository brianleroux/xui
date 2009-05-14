var control = {
	
	defaultAction:null,
	history:null,
	
	init:function(e) {
		// stop the default scroll behavior
		e.preventDefault();
		
		// set up the display
		control.hideUrl();
		control.setOrientation();
		
		// watch for orientation change events
		x$(window).orientationchange(function(e){
			control.setOrientation();
		});
		
		// control enable links
		x$('ul li a').click(function(e) {
			var action = x$(this).attr('href');
			control.render(action);
			e.preventDefault();
			return false;
		});
		
		// set our default action and populate the history
		control.defaultAction = '#' + x$('.default').first().id;
		control.history = [control.defaultAction];
		
		// hide back button at root level
		if (control.history.length == 1)
			x$('#header a.back').css({display:'none'});
		
		// enables the back button
		x$('#header a.back').click(function(e){
			control.history.pop();
			var action = control.history[control.history.length - 1]
			control.render(action);
			e.preventDefault();
			return false;		
		});
	},
	
	// Three types of navigation:
	// - in page anchor (inPage)
	// - remote partial (remotePartial)
	// - remote page    (remotePage)
	render:function(action) {
		if (action == null) return false; // pointless link is pointless
		
		var finalPath  = action.split('/')[action.split('/').length - 1];
		var firstGlyph = finalPath.substr(0, 1);
		var navigate   = (firstGlyph == '#' ? 'inPage' : (firstGlyph == '_' ? 'remotePartial' : 'remotePage'));
		
		control.history.push(action);
		x$('#header a.back').css({display:'inline'});
		
		var navigationOptions = {
			'inPage':function() {
				x$('.page').css({display:'none'});
				x$(action).css({display:'block'});
			},
			'remotePartial':function() {
				x$('#content').bottom('<div id="remote-control" class="page"></div>');
				x$('#remote-control').xhr(action);
				
				x$('.page').css({display:'none'});
				x$('#remote-control').css({display:'block'});
			},
			'remotePage':function() {
				document.location = action;
			}
		}[navigate]();
	},
	
	// ------------------------ //
	//			helpers			//
	// ------------------------ //
	
	// hides the url bar on iPhones
	hideUrl:function() {
		setTimeout( scrollTo, 0, 0, 1);
	},
	
	// sets a class on the body tag (portrait or landscape)
	setOrientation:function() {
		x$(document.body).addClass((window.orientation == 0 || window.orientation == null) ? 'portrait' : 'landscape');	
	}
};

x$(window).load(control.init);