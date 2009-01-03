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

	
	<%= build_sub_libraries %>
	

  	// each iterator for walking the element stack
	_$.prototype = {
    	each: function(fn) {
        	for ( var i = 0, len = this.elements.length; i<len; ++i ) {
            	fn.call(this,this.elements[i]);
          	}
          	return this;
    	},
	};
	
      
	// adds the xui system as x$ to the current window
	var xui = window.x$ = function() {
		return new _$(arguments);
	}

})();