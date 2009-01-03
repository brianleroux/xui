	//
	//  ----- Remoting methods  -----
	//
var XHR = {	
    // Generic XHR Request
    // url - String (URL)
    // options - Object
    xhr:function(url,options) {   
        var that = this;
        if (options == undefined) var options = {};
        if (typeof url == 'string') {
            var req = new XMLHttpRequest();
            var method = options.method || 'get';
            var async = options.async || false ;
            req.open(method,url,async);
            var params = options.data || null;
           
            req.onload = (options.callback != null) ? options.callback : function() { that.html(this.responseText); }
            req.send(params);
    }
      return this;
    },

    // Options is the same as XHR with map:object and new callback:function
    xhrjson:function(url,options) {
        if (options == undefined) return this;
        var that = this;
                   
        var cb = options.callback;
        if (typeof (cb) != 'function') { var cb = function(x) {return x; }}
   
        var callback = function() {
            var o = eval('(' + this.responseText + ')');
            for (var prop in o) { x$(options.map[prop]).html( cb(o[prop]) ); }
        }
        options.callback = callback;
        this.xhr(url,options);
        return this;
    },
   
    xhrForm: function() {
        var that = this;
      // ideally I would like to return the first form staring at this element selector
      this.each(function(e) {
            if (e.tagName == "FORM") {
                var options = {};
                options.method = e.method;
                options.data = "one=two";
               
                that.xhr(e.action,options);
            }
        });
        return this;
    }
}