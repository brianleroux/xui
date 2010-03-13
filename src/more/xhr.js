xui.extend({
    xhrInner: function(url) {
        return this.xhr('inner', url);
    },
    xhrOuter: function(url) {
        return this.xhr('outer', url);
    },
    xhrTop: function(url) {
        return this.xhr('top', url);
    },
    xhrBottom: function(url) {
        return this.xhr('bottom', url);
    },
    xhrBefore: function(url) {
        return this.xhr('before', url);
    },
    xhrAfter: function(url) {
        return this.xhr('after', url);
    },

    /**
	 * 
	 * Another twist on remoting: lightweight and unobtrusive DOM databinding. Since we are often talking to a server with 
	 * handy JSON objects we added the convienance the map property which allows you to map JSON nodes to DOM elements. 
	 * 
	 * @param {String} url The URL to request.
	 * @param {Object} options The method options including a callback function to invoke when the request returns. 
	 * @return self
	 * @example
	 * 
	 * ### xhrjson 
	 *	
	 * syntax:
	 *
	 * 		xhrjson(url, options);
	 * 
	 * example:
	 *  
	 * The available options are the same as the xhr method with the addition of map. 
	 * 
	 * 		x$('#user').xhrjson( '/users/1.json', {map:{'username':'#name', 'image_url':'img#avatar[@src]'} });
	 * 
	 */
    xhrjson: function(url, options) {
        var that = this;
		var cb = typeof cb != 'function' ? function(x){return x} : options.callback;

        var callback = function() {
            var o = eval('(' + this.responseText + ')');
            for (var prop in o) {
                xui(options.map[prop]).html(cb(o[prop]));
            }
        };
        options.callback = callback;
        this.xhr(url, options);
        return this;
    }
// --
});
