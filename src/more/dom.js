xui.extend({
	inner: function(html) {
	    return this.html('inner', html);
	},
	outer: function(html) {
	    return this.html('outer', html);
	},
	top: function(html) {
	    return this.html('top', html);
	},
	bottom: function(html) {
	    return this.html('bottom', html);
	},
	remove: function() {
	    return this.html('remove');
	},
	before: function(html) {
	    return this.html('before', html);
	},
	after: function(html) {
	    return this.html('after', html);
	}	
// --	
});
