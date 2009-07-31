/**
 *
 * @namespace {Xhr}
 * @example
 *
 *
 * Xhr
 * ---
 *	
 * Remoting methods and utils. 
 * 
 */
var Xhr = {	

	/**
	 * 
	 * The classic Xml Http Request sometimes also known as the Greek God: Ajax. Not to be confused with AJAX the cleaning agent. 
	 * This method has a few new tricks. It is always invoked on an element collection. If there no callback is defined the response 
	 * text will be inserted into the elements in the collection. 
	 * 
	 * @method
	 * @param {String} The URL to request.
	 * @param {Object} The method options including a callback function to invoke when the request returns. 
	 * @return {Element Collection}
	 * @example
	 *	
	 * ### xhr 
	 *	
	 * syntax:
	 *
	 * 		xhr(url, options);
	 * 
	 * options:
	 *
	 * - method {String} [get|put|delete|post] Defaults to 'get'.
	 * - async {Boolen} Asynchronous request. Defaults to false.
	 * - data {String} A url encoded string of parameters to send.
	 * - callback {Function} Called on 200 status (success)
     *
     * response 
     * - The response available to the callback function as 'this', it is not passed in. 
     * - this.reponseText will have the resulting data from the file.
	 * 
	 * example:
	 * 
	 * 		x$('#status').xhr('/status.html');
	 * 
	 *		x$('#left-panel).xhr('/panel', {callback:function(){ alert("All Done!") }});
	 *
	 *		x$('#left-panel).xhr('/panel', function(){ alert(this.responseText) });    // New Callback Syntax
	 */
    xhr:function(url,options) {   
        var o = options;
        
        if (typeof options == "function") {
            o = {};
            o.callback = options;
        }
        
        if (options === undefined) {
            o = {};
        }

        var that   = this;
        var req    = new XMLHttpRequest();
        var method = o.method || 'get';
        var async  = o.async || false;            
        var params = o.data || null;

        if (o.headers) {
            for (var i=0; i<o.headers.length; i++) {
              req.setRequestHeader(o.headers[i].name, o.headers[i].value);
            }
        }
    
    
        req.open(method,url,async);
        req.onload = (o.callback != null) ? o.callback : function() { that.html(this.responseText); };
        req.send(params);
  	
    	return this;
    },

	/**
	 * 
	 * Another twist on remoting: lightweight and unobtrusive DOM databinding. Since we are often talking to a server with 
	 * handy JSON objects we added the convienance the map property which allows you to map JSON nodes to DOM elements. 
	 * 
	 * @method
	 * @param {String} The URL to request.
	 * @param {Object} The method options including a callback function to invoke when the request returns. 
	 * @return {Element Collection}
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
    xhrjson:function(url,options) {
      if (options === undefined) {
        return this;
      }
      var that = this;

      var cb = options.callback;
      if (typeof cb != 'function') {
		    cb = function(x){ return x; };
	    }

      var callback = function() {
        var o = eval('(' + this.responseText + ')');
        for (var prop in o) { 
  				x$(options.map[prop]).html(cb(o[prop])); 
  			}
      };
      options.callback = callback;
      this.xhr(url, options);
      return this;
    }
//---
};

libs.push(Xhr);