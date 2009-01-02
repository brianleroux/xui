/*

	XUI-App is designed to provide a much higher level view of Mobile Web Development, using XUI as a solid platform to do so.
	
	Broken down into the following areas.
	Design Elements (Buttons, Lists, Headers and Pages)
	Complex Animation 
	Solve common Mobile (iPhone) idioms

*/

//x$.app = function(title,fn) {
x$.app = function(title,fn) {
		
 	var that = this;
 	this.title = title;
	this.uuid = 0;
	this.pageStack = [];
	
	x$(window).load(function() {
 		fn();
	});
	
	this.button = function(label) {
	  return "<button class='xui-button'>" + label + "</button>";
	}
	
	this.header = function(options) {
	  var label = options.text || this.title;
	  var right = options.right || "";
	  var left = options.left || "";

	  return "<div class='xui-header'>"+ left + "<span class='xui-title'>" + label + "</span><span class='xui-right'>"+ right + "</span></div>";
	}
	
	this.guid = function() {
	  var uuid = this.uuid;
		this.uuid++;
		return 'xui_id_' + uuid;
	}
	
	this.action = function(id,options) {

		if (typeof options.load != 'undefined') {

			x$("#" +id).on(options.event,function() {
				x$("#" +id).tween({'left':'-330px'});
				x$.load(options.load);
				x$("#" + options.load).tween({'left':'0px'});
			});
		}
	}
	
	// TODO, GET and Cache any XHR content here.
	this.page = function(options) {
		var id = options.id || this.guid();
		options.id = id;
	  this.pageStack.push(options);
	}
	
	// Checks to see if any page has been loaded before, then sets the id to be loaded.
	this.loaded = function(id) {
		var isLoaded = false;
		for (var i=0; i < this.pageStack.length; i++) {
			if (this.pageStack[i].loaded == true && this.pageStack[i].id != id) {
				isLoaded == true;
				this.pageStack[i].loaded = false
			}
		}

		for (var i=0; i < pageStack.length; i++) {
			if (this.pageStack[i].id == id) {
				this.pageStack[i].loaded = true;
			}
		}

		return isLoaded;
	}
	
	this.load = function(id) {

		if (id == undefined) {
			page = this.pageStack[0];
		} else {

			for (var i=0; i < this.pageStack.length; i++) {
				if (this.pageStack[i].id == id) {
					page = this.pageStack[i];
				}
			}
		}

		x$('.xui').html(page.header);
		x$('.xui').html("<div id='"+ page.id +"' class='xui-page' ></div>","bottom");  

		var sid = "#" + page.id;			
		if (page.content == undefined && page.url != undefined) {
			x$(sid).xhr(page.url);
		} else {
			x$(sid).html(page.content);
		}

		// Apply any actions
		if(typeof page.action == 'object')
			x$.action(page.id,page.action);

		// If No other pages are loaded, then display this one front and center.
		if (!x$.loaded(sid)) {
			x$(sid).css({'left':'0px'});	 	
		}
	}
	
}













