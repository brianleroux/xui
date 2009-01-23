/**
*
* Dom
* ---
*	
* Manipulating the document object model (DOM).
* 
*/
var Dom = {

	/**
	*
	* ### html
	*
	* Adds elements or changes the content of an element on a page.
	*	
	* syntax:
	*
	* 	x$(window).html( location, htmlFragment );
	*
	* or..
	*
	* 	x$(window).html( htmlFragment );
	* 
	* arguments:
	* 
	* - location:string can be one of inner, outer, top, bottom
	* - htmlFragment:string any string of html markup or HTMLElement
	*
	* example:
	*
	*  	x$('#foo').html( 'inner',  htmlFragment );
	*  	x$('#foo').html( 'outer',  htmlFragment );
	* 	x$('#foo').html( 'top',    htmlFragment );
	*  	x$('#foo').html( 'bottom', htmlFragment );
	*  	x$('#foo').html( 'remove' );	
	* 
	* or
	* 
	* 	x$('#foo').html('<p>sweet as honey</p>');
	* 
	*/
	
	
    html:function(location, html) {
		
		// private method for finding a dom element 
		var getTag = function(el) {
			
			if (el.firstChild == null) {
				switch(el.tagName) {
					case 'UL': return 'LI'; break;
					case 'DL': return 'DT'; break;
					case 'TR': return 'TD'; break;
					default: return el.tagName;
				}
			}
			return el.firstChild.tagName;
		};
	
		// private method
	    // Wraps the HTML in a TAG, Tag is optional
	    // If the html starts with a Tag, it will wrap the context in that tag.
	    var wrap = function(xhtml,tag) {
	        var attributes = {};
	        var re = /^<([A-Z][A-Z0-9]*)(.*)[^>]*>(.*?)<\/\1>/i;
	        if(re.test(xhtml)) {
	            result = re.exec(xhtml);

	            tag = result[1];
						
	            // if the node has any attributes, convert to object
	            if (result[2] != "") {
									
					var attre = /([a-zA-Z]*\s*=\s*['|"][a-zA-Z0-9:;#\s]*['|"])/;								
	                var attrList = result[2].split(attre);

	                for(var i=0;i<attrList.length;i++){
	                    if (attrList[i] != "" && attrList[i] != " ") {
	                        var node = attrList[i].split('=');
	                        attributes[node[0]];
	                        attributes[node[0]] = node[1].replace(/(["']?)/g,'');
	                    }
	                }
	            }
	            xhtml = result[3];
	        }

	        var element = document.createElement(tag);
	        element.innerHTML = xhtml;
	        for (var i in attributes) {
	            var a = document.createAttribute(i);
	            a.nodeValue = attributes[i];
	            element.setAttributeNode(a);
	        }

	        return element;
	    };

		this.clean();

		if (arguments.length == 1 && arguments[0] != 'remove') {
			html = location;
			location = 'inner';
		}	
						
        this.each(function(el) {
            switch(location) {
                case "inner": 
					if (typeof html == 'string') 
						el.innerHTML = html; 
					else 
						el.innerHTML = ''; 
						el.appendChild(html);
					break;
                case "outer":
                    if (typeof html == 'string') html = wrap(html, getTag(el));
                    el.parentNode.replaceChild(html,el);
                break;
                case "top":
                    if (typeof html == 'string') html = wrap(html, getTag(el));
                    el.insertBefore(html,el.firstChild);
                break;
                case "bottom":
                    if (typeof html == 'string') html = wrap(html, getTag(el));
                    el.insertBefore(html,null);
                break;
				case "remove": 
					var parent = el.parentNode;
					parent.removeChild(el);
				break;
            }
      	});
        return this;
    },


	
	// This is needed el.node will return something useless without it.
	clean:  function() {
  		var ns = /\S/;
 		this.each(function(el) {
			var d = el, n = d.firstChild, ni = -1;
			while(n) {
	 	  		var nx = n.nextSibling;
		 	    if (n.nodeType == 3 && !ns.test(n.nodeValue)) {
		 	    	d.removeChild(n);
		 	    } else {
		 	    	n.nodeIndex = ++ni;
		 	    }
		 	    n = nx;
		 	}
		});
 	  return this;
 	}
};