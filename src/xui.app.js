/*
this is how I want this to work.....

xui.app( function( 'blogging' ){
	
	var contact = x$('contact-form');
	var save    = x$('#save-button');
	
	contact.xhrSubmit = function() {
		// disable
		// validate
		// serialize
		// show progress indication
		// callback.apply(success:boolean)
	}
	
	save.click( function() {
		if (contact.valid()) contact.xhrSubmit();
	});
	
});

<div class="title">This is the application</div>

<form id="contact-form" action="/contact">
	<textarea class="required"></textarea>
	<button id="save-button">Save</button>
</form>

*/



//
//	
//
x$.app = function( fn ){
	
	//
	//	private methods
	//
	var that = this;
	
	var box = function( options ) 
	{
		var ctx 	= defaultFor( options.ctx, 'TODO: creates an element');	
		
		var x 		= defaultFor( options.x, 	      0 );
		var y 		= defaultFor( options.y, 	      0 );
		var width 	= defaultFor( options.width,     50 );
		var height 	= defaultFor( options.height,    50 );
		var radius 	= defaultFor( options.radius,     0 );
		var color   = defaultFor( options.color,  '#fff');
		
	  	ctx.beginPath();
	  	ctx.moveTo( x, y+radius );
	  	ctx.lineTo( x, y+height-radius );
	  	ctx.quadraticCurveTo( x, y+height, x+radius, y+height );
	  	ctx.lineTo( x+width-radius, y+height );
	  	ctx.quadraticCurveTo( x+width, y+height, x+width, y+height-radius );
	  	ctx.lineTo( x+width, y+radius );
	  	ctx.quadraticCurveTo( x+width, y, x+width-radius, y );
	  	ctx.lineTo( x+radius, y );
	  	ctx.quadraticCurveTo( x, y, x, y+radius);
		ctx.fillStyle = color;
		ctx.fill();
	};	
	
	var stroke = function( options )
	{
		var ctx = options.ctx;
		ctx.strokeStyle = '#ccc';
		ctx.stroke();
	};
	
	var label = function( text, options )
	{
		var ctx = options.ctx;
		
		ctx.font 	  = defaultFor( options.font, "20px Helvetica Neue" );
	  	ctx.fillStyle = defaultFor( options.color, "Black" );
	
		// order is important here...
		var label = defaultFor( text, "sample string" );;
		var left  = (options.width-ctx.measureText(label).width)/2; 
		var top   = 30;
		
		ctx.fillText(label, left, top);
	};
	
	var shadow = function( options ) 
	{
		var ctx = options.ctx
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 4;
		ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
		ctx.fill();
	}
	
	
	
	// set a default value for an option
	var defaultFor = function( value, defaultValue ) { 
		return value == undefined ? defaultValue : value;
	}
	
	
	/**
	 *  Button 
	 * 
	 	@label:string
		 - defaults to button inner text
	
		@width:integer
	
		@height:integer
	
		@color:string
		 - white (default - #fff)
		 - green (#2daa38)
		 - grey  (#cacaca)
		 - black (#606060)
		 - blue  (#597eaa)
		 - red   (#ce2a27)
		 - any hex code
		
		@shadow
		 - either this or bevel inlay
		
		@gradient:boolean
		 - true (default)
		 - false 
		
		@glass
		
		
		@square:boolean
		 - true
		 - false

		@squareLeft:boolean
		 - true 
		 - false (default)
	
		@squareRight:boolean
		 - true
		 - false (default)
	
		@squareTop:boolean
		 - true
		 - false (default)
	
		@squareBottom:boolean
		 - true
		 - false (default)
	
		@arrowLeft:boolean
		 - true
		 - false (default)
	
		@arrowRight:boolean
		 - true
		 - false (default)
	
		@round:boolean|integer
		 - true (default)
		 - false
		 - integer for a corner radius

	*/	
	var Button = function( options ) 
	{
		var that = this;
		this.options = options;
		
		// the building blocks
		this.element = options.element;
		this.canvas  = document.getElementById(this.element);
		this.context = this.canvas.getContext('2d');
		
		// convienance accessors
		this.width  	= defaultFor( options.width,      100  );
		this.height 	= defaultFor( options.height,      20  );
		this.label  	= defaultFor( options.label,  'submit' );
		this.color  	= defaultFor( options.color,    '#fff' );
		this.fontColor 	= '#000';
		
		this.canvas.onmouseover = function() {
			that.renderOver()
		}
		
		this.render();
	};
	
	Button.prototype = {
		
		press:function() {
			
		},
		
		click:function() {
			
		},
		
		render:function() {
			
			// default profiles
			switch(this.color)
			{
				case'green':
					this.color = '#2daa38';
				break;	
				
				case'grey':
					this.color = '#cacaca';
				break;
				
				case'black':
					this.fontColor = '#fff';
					this.color = '#606060';
				break;
				
				case'blue':
					this.fontColor = '#fff';
					this.color = '#597eaa'
				break;
				
				case'red':
					this.fontColor = '#fff';
					this.color = '#ce2a27'
				break;
			}
		
			// new shadow({ ctx:ctx });
			new box({ ctx:this.context, radius:10, width:300, color:this.color });
			new stroke({ ctx:this.context  });
			new label( 'save', { ctx:this.context, width:300, color:this.fontColor });
			
		},
		
		renderOver:function() {
			
			// default profiles
			switch(this.color)
			{
				case'green':
					this.color = '#000';
				break;	
				
				case'grey':
					this.color = '#cacaca';
				break;
				
				case'black':
					this.fontColor = '#fff';
					this.color = '#606060';
				break;
				
				case'blue':
					this.fontColor = '#fff';
					this.color = '#597eaa'
				break;
				
				case'red':
					this.fontColor = '#fff';
					this.color = '#ce2a27'
				break;
			}
		
			// new shadow({ ctx:ctx });
			new box({ ctx:this.context, radius:10, width:300, color:this.color });
			new stroke({ ctx:this.context  });
			new label( 'save', { ctx:this.context, width:300, color:this.fontColor });
			
		}
		
	};
	
	
	// sets up all the form elements
	var initForms = function(){
		
	};
	
	// sets up all the button elements
	var initButtons = function(){
		
		new Button({ element:'canvas-button' });
		new Button({ element:'canvas-button-green',  color: 'green' });
		new Button({ element:'canvas-button-grey', 	 color:  'grey' });
		new Button({ element:'canvas-button-black',  color: 'black' });
		new Button({ element:'canvas-button-blue', 	 color:  'blue' });
		new Button({ element:'canvas-button-red', 	 color:   'red' });
		new Button({ element:'canvas-button-ffffcc', color:'ffffcc' })

		// get the elements
		// x$('button').each(function(btn){
			
			// via each one replace with canvas element
			
			// grab the convas element context
			
			// draw the button		
		// });
	};
	
	
	// 
	//	public methods
	//
	return {
		
		init:function(){
			initForms();
			initButtons();
			if( typeof fn == 'function' ) fn();
		}
	////-	
	}
////-	
}().init();
