(function() {
	// private method creates the element stack
    var _$ = function(els) 
	{
        this.elements = [];
		
		var size = els.length;
		
        for(var i = 0; i < size; i++ ) 
		{
            var element = els[i];

            if( typeof element == 'string' ) 
			{
                var element = document.querySelectorAll(element);
               	var len = element.length;

                if (element.length == 0) 
				{
                    console.log("No Element Found for Selector - " + els[0]);
                }
					
                for(var x = 0; x < len; x++ ) 
				{          
                    this.elements.push(element[x]);   
                }

            } 
			else 
			{
                this.elements.push(element);
            }
        }       
        return this;
    };

	
	_$.prototype = {
		
		// each iterator for walking the element stack
    	each: function(fn) {
        	for ( var i = 0, len = this.elements.length; i<len; ++i ) {
            	fn.call(this,this.elements[i]);
          	}
          	return this;
    	},

		// merges sub lib objects
		merge: function( libObj ) 
		{
			for(var x in libObj)
			{
				this[x] = libObj[x];
			}
		}
	};
	

	// adds the xui system as x$ to the current window
	var xui = window.x$ = function() 
	{
		<%= build_sub_libraries %>
	
		var libs = <%= "[#{ libs_to_build.map {|x| x.upcase }.join(',') }]" %>;
		var size = libs.length;
		var that = new _$(arguments);
		
		for( var i = 0; i < size; i++ )
		{
			that.merge( libs[i] );
		}
	
		return that;
	}

})();