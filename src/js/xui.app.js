x$(window).load(function(){
	
	// load the default content by default 
	x$('#content').xhr('_index.html');
	
	// relative links loaded via ajax and animated in (with a left to right swipe by default)
	x$('div#stage ul.nav li a').click(function(e) {
		var url = this.href;
		
		x$(this).stop(e);
	
		this.blur();
		// ---------
	
		x$('#stage').tween({'left':'-330px'});
		
	});
});	