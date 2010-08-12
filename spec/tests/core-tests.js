function CoreTests() { return this; };
CoreTests.prototype.run = function () {
	module("Selectors by id string", {
		setup:function() {
			x = x$('#item_1');
		},
		teardown:function() {
			x = null;
		}
	});
		test( 'should return array with one element', function(){
			equals(x.length, 1);
		});
		test( 'first element should have text "this is item one"', function(){
		  equals(x[0].innerHTML, 'this is item one');
		});
		
	module( "Selector by class string", {
		setup:function() {
			x = x$(".item");
		},
		teardown:function() { 
			x = null;
		}
	});
		test( 'should return array with three items', function(){
			equals(x.length, 3);
		});
		test( 'should have text "this is item one" in first element.', function(){
			equals(x[0].innerHTML, 'this is item one');
		});
		test( 'should have text "this is item three" in last element', function(){
			equals(x[x.length -1].innerHTML, 'this is item three');
		});

	module( "Selector by element reference", {
		setup:function() {
			el = document.getElementById("item_1"),
			x = x$(el);
		},
		teardown:function() {
			el = null, x = null;
		}
	});
		test( 'should return array with one element', function(){
			equals(x.length, 1);
		});

		test( 'should have text "this is item one" in first element.', function(){
			equals(x[0].innerHTML, 'this is item one');
		});
	
	module( "Selector by non-existent tag name string");
		test( 'should return an empty array', function(){
			var x = x$("item_1");
			equals(x.length, 0);
		});

	module( ".has() and .not()", {
		setup:function() {
			x = x$('ul#has_tests li');
		},
		teardown:function() {
			x = null;
		}
	});
		test( 'should return two elements after including class foo.', function(){
			equals(x.has(".foo").length, 2);
		});

		test( 'should return three elements after omitting class foo.', function(){
			equals(x.not(".foo").length, 3);
		});
	/*

	// ---
	/// style.js specs
	// ---

	context("Style.setStyle", function(){
		var	e = x$('#set-style-element');
		
		test( 'set change the box backgroundColor', function(){
			e.setStyle('backgroundColor', '#008000');
			equals(e[0].style.backgroundColor, 'rgb(0, 128, 0)');
		});
	});

	context( "Style.getStyle", function(){
		var	e = x$('#get-style-element');
		e[0].style.backgroundColor = "#0000FF";

		test( 'return background color of blue if set in passed function', function(){
			stop();
			e.getStyle('background-color', function(v){
				equals(v, 'rgb(0, 0, 255)')
				start();
			});
		});

		test( 'return background color even if no function passed', function(){
			var style = e.getStyle('background-color');
			equals(style, 'rgb(0, 0, 255)');
		});
	});

	context( "Style.addClass", function(){
		var x = x$('#add-class-element');
		x.addClass("foo");

		test( 'add class of foo', function(){
		  equals(x[0].className, "foo");
		});
	});

	context( "Style.removeClass", function(){
		var	x = x$('#remove-class-element');

		test( 'remove the class of bar and keep surrounding classes intact' ,function(){
			x.removeClass('bar');
			equals(x[0].className, 'foo baz');
		});
	});

	context( "Style.hasClass", function(){
		var x = x$('#has-class-element');

		test( 'have the class bar', function(){
			equals(x.hasClass('bar'), true);
		});

		test( 'not have the class zug', function(){
			equals(x.hasClass('zug'), false);
		});
	});

	// --
	/// dom specs
	// --

	context( "Dom.html", function(){
		var	inner  = x$('#html-test-inner');
		var	outer  = x$('#html-test-outer');
		var	top    = x$('#html-test-top');
		var	bottom = x$('#html-test-bottom');
		var	h = x$('#html-test-html');


		test( 'insert html after #html-test-html.', function() {
			h.html('after', '<div>after</div>');
			equals(h[0].nextSibling.innerHTML, 'after');
		});

		test( 'have "p" as tag name in html inserted after.', function() {
			h.html('after', '<p>after</p>');
			equals(h[0].nextSibling.tagName.toLowerCase(), 'p');
		});

		test( 'insert html before #html-test-html', function() {
			h.html('before', '<div>before</div>');
			equals(h[0].previousSibling.innerHTML, 'before');
		});

		test( 'have "p" as tag name in html inserted before.', function() {
			h.html('before','<p>before</p>');
			equals(h[0].previousSibling.tagName.toLowerCase(), 'p');
		});

		test( 'insert html into the #html-test-inner node', function(){
			inner.html('inner', '<p>hello world</p>');
			equals(inner[0].childNodes[0].tagName.toLowerCase(), 'p'); 
		});

		test( 'insert html into the #html-test-outer node', function(){
			outer.html('outer', '<div id="html-test-outer">sneaky</div>'); 
			equals(x$('#html-test-outer')[0].innerHTML, 'sneaky'); 
		});

		test( 'insert html into the #html-test-top node', function(){
			top.html('top', '<div>come out on top</div>');
			equals(top[0].childNodes[0].innerHTML, 'come out on top'); 
		});

		test( 'insert html into the #html-test-bottom node', function(){
			bottom.html('bottom', '<div>undertow</div>');
			var last = bottom[0].childNodes.length - 1;
			equals(bottom[0].childNodes[last].innerHTML, 'undertow'); 
		});

		test( 'return html of #html-test-html node', function(){
			equals(h.html().toLowerCase(), '<p>foo</p>');
		});
		
		test( 'insert list items with newlines', function(){
		  var newListItem = "<li>\nHello\n</li>";
		  x$("#html-list-test").html('bottom', newListItem);
		  equals(x$("#html-list-test")[0].innerHTML, newListItem);
		});
		
		test(' insert complex DOM elements', function () {
		  // putting attributes with empty strings since safari does it anyway
		  // i.e. 'controls' becomes 'controls=""'
		  var myVideo = '<video src="myAwesomeVideo.mp4" id="my_video" autobuffer="" controls=""></video>';
		  x$("#html-complex-test").html('inner', myVideo);
		  equals(x$("#html-complex-test")[0].innerHTML, myVideo);
		})
		
		test('properly insert Number-type elements using .html()', function() {
			h.html(1);
			equals(h[0].innerHTML, "1");
		});
	});


	// --
	/// xhr specs
	// --

	context( "XHR.function", function(){
		var x = x$('#xhr-test-function');

		test( 'insert partial into element', function(){
			x.xhr("helpers/example.html");
			equals(document.getElementById('xhr-test-function').innerHTML, '<h1>this is a html partial</h1>');
		});
		
		test( 'have more tests', function(){
			// test headers
			// test interpolate
			// test callback
			ok(false);
		});
	});

	// --
	/// fx specs
	// --

	context( "Fx.tween", function(){
		test( 'tween something a little bit', function(){
			ok(false);
		})
	});

	// --
	/// event specs
	// --

	context( "Event", function(){
	  var x = x$('#event-test-click');
	  
	  test('bind & fire click', function () {
		x.on('click', function () {
		  this.innerHTML = 'firedclick';
		}).fire('click').un('click');
		
		// needs to async to let the event fire
	  equals(document.getElementById('event-test-click').innerHTML, 'firedclick');
	  });

	  test('bind & unbind click (test by firing event)', function () {
		x.on('click', function () {
		  this.innerHTML = 'unbind';
		}).un('click').fire('click');
		
	  ok(document.getElementById('event-test-click').innerHTML !== 'unbind');
	  });
	  
	  test('bind custom event', function () {
		x.on('brianisadonkey', function () {
		  this.innerHTML = 'and-a-donkey-lover';
		}).fire('brianisadonkey').un('brianisadonkey');
		
	  equals(document.getElementById('event-test-click').innerHTML, 'and-a-donkey-lover');
	  });
	  
	  test('unbinding doesn\'t screw other events', function () {
		x.on('custom', function () {
		  this.innerHTML = 'custom';
		});
		x.on('click', function () {}).un('click');
		x.fire('custom');
	  equals(document.getElementById('event-test-click').innerHTML, 'custom');
	  });
			  
	test('handle multiple events', function () {
	var fired = 0;
	function incfired() {
	  fired++;
	}

	x.on('click', incfired).on('custom1', incfired).on('touchstart', incfired).fire('click').fire('custom1').fire('touchstart');
	equals(fired, 3);
	});
	  
	test('unbind specific events', function () {
	var fired = 0;
	function one() {
	  fired++;
	}
	function two() {
	  fired++;
	}

	x.on('click', one).on('click', two).un('click', one).fire('click');
	equals(fired, 1);
	});
	  
	test('not bubble custom events if stopping propagation', function () {
	var parent = x[0].parentNode,
		fired = 0;
	function incfired() {
	  fired++;
	}
	x$(parent).on('custom', incfired);
	x.on('custom', incfired).fire('custom');
		 equals(fired, 2);
	});
	});
	*/
}