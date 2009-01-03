(function() {
	// private method creates the element stack
    var _$ = function(els) {
        this.elements = [];
        for (var i=0; i<els.length; i++) {
            var element = els[i];
            if (typeof element == 'string') {
                var element = document.querySelectorAll(element);
               
                if (element.length == 0) {
                    console.log("No Element Found for Selector - " + els[0]);
                }

                for (var x=0;x<element.length;x++) {          
                    this.elements.push(element[x]);   
                }

            } else {
                this.elements.push(element);
            }
        }       
        return this;
    }


	<% libs = %w(dom event style fx xhr) %>
	<% libs.each do |lib| %>
		<%= import lib %>
	<% end %>	
	

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