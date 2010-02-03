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
xui.extend({	
 
	/**
	 * 
	 * The classic Xml Http Request sometimes also known as the Greek God: Ajax. Not to be confused with AJAX the cleaning agent. 
	 * This method has a few new tricks. It is always invoked on an element collection and follows the identical behaviour as the
	 * `html` method. If there no callback is defined the response text will be inserted into the elements in the collection. 
	 * 
	 * @param {location} location [inner|outer|top|bottom|before|after]
	 * @param {String} url The URL to request.
	 * @param {Object} options The method options including a callback function to invoke when the request returns. 
	 * @return self
	 * @example
	 *	
	 * ### xhr

	 * syntax:
	 *
	 *    xhr(location, url, options)
	 *
	 * or this method will accept just a url with a default behavior of inner...
	 *
	 * 		xhr(url, options);
	 *
	 * location
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
	 * 		x$('#status').xhr('inner', '/status.html');
	 * 		x$('#status').xhr('outer', '/status.html');
	 * 		x$('#status').xhr('top',   '/status.html');
	 * 		x$('#status').xhr('bottom','/status.html');
	 * 		x$('#status').xhr('before','/status.html');
	 * 		x$('#status').xhr('after', '/status.html');
	 *
	 * or 
	 *
	 *    x$('#status').xhr('/status.html');
	 * 
	 *	  x$('#left-panel').xhr('/panel', {callback:function(){ alert("All Done!") }});
	 *
	 *	  x$('#left-panel').xhr('/panel', function(){ alert(this.responseText) }); 
	 * 
	 */
    xhr : function(url, options) {
			var o = options;
			if (typeof options == "function") {
				o = {};
				o.callback = options;
			}

			if (options === undefined) {
				o = {};
			}

			var that = this;
			var req;
			
			if(window.XMLHttpRequest) {
				req = new XMLHttpRequest();
			}
			else if(window.ActiveXObject) {// Internet Explorer
	   			req = new ActiveXObject("Microsoft.XMLHTTP");
			}
		
			var method = o.method || 'get';
			var async = o.async || false;
			var params = o.data || null;
			req.open(method, url, async);

			//callback has to be called differently...
			//to be compatible with IE
			//callback:function(resp){alert(resp.responseText);}
			//didn't find the way to use the same call :-/
			function handleResponse(){
			if (o.callback != null) {
				if (req.status ==200 ) {
						o.callback(req);
					}
				} else if (req.status ==200 ) {
						that.html(req.responseText);
					}
			}
			
			req.onreadystatechange = testAjax;
			function testAjax(){
				if (req.readyState==4) {
					handleResponse();
				}
			}
			
			if (o.headers) {
				for ( var i = 0; i < o.headers.length; i++) {
					req.setRequestHeader(o.headers[i].name, o.headers[i].value);
				}
			}
			req.send(params);
			if(!async) handleResponse();	
			return this;
		}
// --
});
