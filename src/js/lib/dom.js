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
	* ### clean
	*
	* Removes empty nodes from the DOM. This is used internally as a helper, but it is also public.
	*	
	* syntax:
	*
	* 	x$(window).clean();
	*
	* example:
	*
	*	x$(window).clean();
	*		
	*/
    clean: function(){
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
     },


		/**
		*
		* ### html
		*
		* Adds elements or changes the content of an element on a page.
		*	
		* syntax:
		*
		* `x$(window).html("String Fragment" [,"top" | "bottom" | "inner" | "outer" ]);`
		*
		* arguments:
		* example:
		* 
		*/
    html:function(html,loc) {
        var that = this;
        this.clean();
        var loc = (loc != null) ? loc : 'inner';
        this.each(function(el) {
            switch(loc) {
                case "inner": el.innerHTML = html; break;
                case "outer":
                    if (typeof html == 'string') html = this.wrap(html,this.getTag(el));
                    el.parentNode.replaceChild(html,el);
                break;
                case "top":
                    if (typeof html == 'string') html = this.wrap(html,this.getTag(el));
                    el.insertBefore(html,el.firstChild);
                break;
                case "bottom":
                    if (typeof html == 'string') html = this.wrap(html,this.getTag(el));
                    el.insertBefore(html,null);
                break;
            }
      });
        return this;
    },


    // Wraps the HTML in a TAG, Tag is optional
    // If the html starts with a Tag, it will wrap the context in that tag.
    // NOT Chainable
    wrap:function(html,tag) {
        var attributes = {};
        var re = /^<([A-Z][A-Z0-9]*)(.*)[^>]*>(.*?)<\/\1>/i;
        if(re.test(html)) {
            result = re.exec(html);
            tag = result[1];
            // if the node has any attributes, convert to object
            if (result[2] != "") {

								var attre = /([a-zA-Z]*\s*=\s*['|"][a-zA-Z0-9:;#\s]*['|"])/;								
                attrList = result[2].split(attre);

                for(var i=0;i<attrList.length;i++){
                    if (attrList[i] != "" && attrList[i] != " ") {
                        var node = attrList[i].split('=');
                        attributes[node[0]];
                        attributes[node[0]] = node[1].replace(/(["']?)/g,'');

                    }
                }
            }
      
            html = result[3];
        }
        var element = document.createElement(tag);
        element.innerHTML = html;
        for (var i in attributes) {
            var a = document.createAttribute(i);
            a.nodeValue = attributes[i];
            element.setAttributeNode(a);
        }
  
        return element;
    },

		// Helper for finding a tag for inserting into the DOM, we are looking for simular tags
    // NOT Chainable
    getTag: function(el) {
        if (el.firstChild == null) {
            switch(el.tagName) {
                case 'UL': return 'LI'; break;
								case 'DL': return 'DT'; break;
								case 'TR': return 'TD'; break;
            }
        }
        return el.firstChild.tagName;
    }
};