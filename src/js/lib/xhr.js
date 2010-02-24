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

    xhr:function(location, url, options) {

        // this is to keep support for the old syntax (easy as that)
        if (!/^inner|outer|top|bottom|before|after$/.test(location)) {
            options = url;
            url = location;
            location = 'inner';
        }       
        
        var o = options;
        
        if (typeof options == "function") {
            o = {};
            o.callback = options;
        }
        
        if (!options)
            o = {};


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
        
        if (o.headers) {
            for (var i=0; i<o.headers.length; i++) {
              req.setRequestHeader(o.headers[i].name, o.headers[i].value);
            }
        }
        
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        req.onload = (o.callback != null) ? o.callback : function() { that.html(location, this.responseText); };
        req.send(params);
        
        return this;
    }
//---
};

libs.push(Xhr);
