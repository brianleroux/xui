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
 
<<<<<<< HEAD:src/js/lib/xhr.js
    /**
     * 
     * The classic Xml Http Request sometimes also known as the Greek God: Ajax. Not to be confused with AJAX the cleaning agent. 
     * This method has a few new tricks. It is always invoked on an element collection and follows the identical behaviour as the
     * `html` method. If there no callback is defined the response text will be inserted into the elements in the collection. 
     * 
     * @method
     * @param {location} [inner|outer|top|bottom|before|after]
     * @param {String} The URL to request.
     * @param {Object} The method options including a callback function to invoke when the request returns. 
     * @return {Element Collection}
     * @example
     * 
     * ### xhr
=======
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
>>>>>>> brian:src/core/xhr.js

     * syntax:
     *
     *    xhr(location, url, options)
     *
     * or this method will accept just a url with a default behavior of inner...
     *
     *     xhr(url, options);
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
<<<<<<< HEAD:src/js/lib/xhr.js
     * 
     * example:
     *
     *     x$('#status').xhr('inner', '/status.html');
     *     x$('#status').xhr('outer', '/status.html');
     *     x$('#status').xhr('top',   '/status.html');
     *     x$('#status').xhr('bottom','/status.html');
     *     x$('#status').xhr('before','/status.html');
     *     x$('#status').xhr('after', '/status.html');
     *
     * or 
     *
     *    x$('#status').xhr('/status.html');
     *
     *    x$('#left-panel').xhr('/panel', {callback:function(){ alert("All Done!") }});
     *
     *    x$('#left-panel').xhr('/panel', function(){ alert(this.responseText) }); 
     * 
     */

=======
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
>>>>>>> brian:src/core/xhr.js
    xhr:function(location, url, options) {

      // this is to keep support for the old syntax (easy as that)
        if (!/^inner|outer|top|bottom|before|after$/.test(location)) {
            options = url;
            url = location;
            location = 'inner';
<<<<<<< HEAD:src/js/lib/xhr.js
        }       
        
        var o = options;
=======
        }

        var o = options ? options : {};
>>>>>>> brian:src/core/xhr.js
        
        if (typeof options == "function") {
            // FIXME kill the console logging
            // console.log('we been passed a func ' + options);
            // console.log(this);
            o = {};
            o.callback = options;
        };
        
        var that   = this,
            req    = new XMLHttpRequest(),
            method = o.method || 'get',
            async  = o.async || false,           
            params = o.data || null,
            i = 0;

<<<<<<< HEAD:src/js/lib/xhr.js

        if (this.first().tagName == "FORM") {
            o.callback  = url;            
            url         = this.first().action;
            o.data      = this._toQueryString(this.first());
            o.method    = this.first().method;
        }

        var that   = this;
        var req    = new XMLHttpRequest();
        var method = o.method || 'get';
        var async  = o.async || false;
        var params = o.data || null;
        req.queryString = params;
        req.open(method,url,async);
        
=======
        req.queryString = params;
        req.open(method, url, async);

>>>>>>> brian:src/core/xhr.js
        if (o.headers) {
            for (; i<o.headers.length; i++) {
              req.setRequestHeader(o.headers[i].name, o.headers[i].value);
            }
        }
<<<<<<< HEAD:src/js/lib/xhr.js
        
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
=======

>>>>>>> brian:src/core/xhr.js
        req.onload = (o.callback != null) ? o.callback : function() { that.html(location, this.responseText); };
        req.send(params);
        
        return this;
    }
// --
});