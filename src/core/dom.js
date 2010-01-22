/**
 *
 * @namespace {Dom}
 * @example
 *
 * Dom
 * ---
 *	
 * Manipulating the Document Object Model aka the DOM.
 * 
 */
xui.extend({

    /**
	 * For manipulating HTML markup in the DOM.
	 *	
	 * syntax:
	 *
	 * 		x$(window).html( location, html );
	 *
	 * or this method will accept just an html fragment with a default behavior of inner..
	 *
	 * 		x$(window).html( htmlFragment );
	 * 
	 * arguments:
	 * 
	 * - location:string can be one of inner, outer, top, bottom
	 * - html:string any string of html markup or HTMLElement
	 *
	 * example:
	 *
	 *  	x$('#foo').html( 'inner',  '<strong>rock and roll</strong>' );
	 *  	x$('#foo').html( 'outer',  '<p>lock and load</p>' );
	 * 		x$('#foo').html( 'top',    '<div>bangers and mash</div>');
	 *  	x$('#foo').html( 'bottom', '<em>mean and clean</em>');
	 *  	x$('#foo').html( 'remove');	
	 *  	x$('#foo').html( 'before', '<p>some warmup html</p>');
	 *  	x$('#foo').html( 'after', '<p>more html!</p>');
	 * 
	 * or
	 * 
	 * 		x$('#foo').html('<p>sweet as honey</p>');
	 * 
	 */
    html: function(location, html) {

        // private method for finding a dom element
        var getTag = function(el) {

            if (el.firstChild === null) {
                switch (el.tagName) {
                case 'UL':
                    return 'LI';
                case 'DL':
                    return 'DT';
                case 'TR':
                    return 'TD';
                default:
                    return el.tagName;
                }
            }
            return el.firstChild.tagName;
        };

        // private method
        // Wraps the HTML in a TAG, Tag is optional
        // If the html starts with a Tag, it will wrap the context in that tag.
        var wrap = function(xhtml, tag) {

            var attributes = {};
            var re = /^<([A-Z][A-Z0-9]*)([^>]*)>(.*)<\/\1>/i;
            if (re.test(xhtml)) {
                result = re.exec(xhtml);
                tag = result[1];

                // if the node has any attributes, convert to object
                if (result[2] !== "") {
                    var attrList = result[2].split(/([A-Z]*\s*=\s*['|"][A-Z0-9:;#\s]*['|"])/i);

                    for (var i = 0; i < attrList.length; i++) {
                        var attr = attrList[i].replace(/^\s*|\s*$/g, "");
                        if (attr !== "" && attr !== " ") {
                            var node = attr.split('=');
                            attributes[node[0]] = node[1].replace(/(["']?)/g, '');
                        }
                    }
                }
                xhtml = result[3];
            }

            var element = document.createElement(tag);

            for (var x in attributes) {
                var a = document.createAttribute(x);
                a.nodeValue = attributes[x];
                element.setAttributeNode(a);
            }

            element.innerHTML = xhtml;
            return element;
        };

        this.clean();

        if (arguments.length == 0) {
            return this[0].innerHTML;
        }
        if (arguments.length == 1 && arguments[0] != 'remove') {
            html = location;
            location = 'inner';
        }

        this.each(function(el) {
            switch (location) {
            case "inner":
                if (typeof html == string) {
                    el.innerHTML = html;
                    var list = el.getElementsByTagName('SCRIPT');
                    var len = list.length;
                    for (var i = 0; i < len; i++) {
                        eval(list[i].text);
                    }
                } else {
                    el.innerHTML = '';
                    el.appendChild(html);
                }
                break;
            case "outer":
                if (typeof html == string) {
                    html = wrap(html, getTag(el));
                }
                el.parentNode.replaceChild(html, el);
                break;
            case "top":
                if (typeof html == string) {
                    html = wrap(html, getTag(el));
                }
                el.insertBefore(html, el.firstChild);
                break;
            case "bottom":
                if (typeof html == string) {
                    html = wrap(html, getTag(el));
                }
                el.insertBefore(html, null);
                break;
            case "remove":
                var parent = el.parentNode;
                parent.removeChild(el);
                break;
            case "before":
                var parent = el.parentNode;
                if (typeof html == string) {
                    html = wrap(html, getTag(parent));
                }
                parent.insertBefore(html, el);
                break;
            case "after":
                var parent = el.parentNode;
                if (typeof html == string) {
                    html = wrap(html, getTag(parent));
                }
                parent.insertBefore(html, el.nextSibling);
                break;
            }
        });
        return this;
    },


    /**
	 * Removes all erronious nodes from the DOM.
	 * 
	 */
    clean: function() {
        var ns = /\S/;
        this.each(function(el) {
            var d = el,
            n = d.firstChild,
            ni = -1;
            while (n) {
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
	 * Attribute getter/setter
	 *
	 */
    attr: function(attribute, val) {
        if (arguments.length == 2) {
            this.each(function(el) {
                el.setAttribute(attribute, val);
            });

            return this;
        } else {
            var attrs = [];
            this.each(function(el) {
                if (el.getAttribute(attribute) != null)
                attrs.push(el.getAttribute(attribute));

            });
            return attrs;
        }
    }
// --
});
