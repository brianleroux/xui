/**
*
* Dom
*	
* Manipulating the document object model (DOM).
* 
*/
var Dom = {
	
	/**
	*
	* clean
	*
	* Removes empty nodes from the DOM.
	*	
	* syntax:
	*
	* x$(window).clean();
	*
	* arguments:
	* example:
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
                attrList = result[2].split(' ');
                for(var i=0;i<attrList.length;i++){
                    if (attrList[i] != "") {
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

	// Helper for finding a tag for inserting into the DOM, we are looking for simular tags
    // NOT Chainable
    getTag: function(el) {
        if (el.firstChild == null) {
            switch(el.tagName) {
                case 'UL': return 'LI'; break;
            }
        }
        return el.firstChild.tagName;
    }
};