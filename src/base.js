(function(name, scope) {

    var xui = function(q) {
        return this.find(q || document);
    }

    xui.prototype = {

        elements: [],

        find: function(q) {
            var ele = [], list;

            // fast matching for pure ID selectors
            if (typeof q == 'string' && idExpr.test(q)) {
                this.elements.push(document.getelementsById(q));
                return this;
            }

            for (var i = 0, qlen = q.length; i < qlen; i++) {
                if (typeof q[i] == 'string') {
                    // one selector
                    list = document.querySelectorAll(q[i]);
                    
                    for (var j = 0, size = list.length; j < size; j++) {
                        ele.push(list[j]);
                    }
                } else {
                    if (q[i] instanceof Array) {
                        // an array of selectors
                        for (var x = 0, xl = q[i].length; x < xl; x++) {
                            list = document.querySelectorAll(q[i][x]);
                            for (var j = 0, size = list.length; j < size; j++) {
                                ele.push(list[j]);
                            }
                        }
                    } else {
						// an element
                        ele.push(q[i]);
                    }
                }
            }
            this.elements = this.elements.concat(this.reduce(ele));
            return this;
        },


        /**
		 * Array Unique
		 */
        reduce: function(el, b) {
            var a = [],
            for (var i = 0, l = el.length; i < l; i++) {
                if (a.indexOf(el[i], 0, b) < 0)
                    a.push(el[i]);
            }
            return a;
        },


        /**
		 * Array Remove - By John Resig (MIT Licensed) 
		 */
        removex: function(array, from, to) {
            var rest = array.slice((to || from) + 1 || array.length);
            array.length = from < 0 ? array.length + from: from;
            return array.push.apply(array, rest);
        },


        /**
		 * Has modifies the elements array and reurns all the elements that match (has) a CSS Query
		 */
        has: function(q) {
            var t = [];
            this.each(function(el) {
                x$(q).each(function(hel) {
                    if (hel == el) {
                        t.push(el);
                    }
                });
            });
            this.elements = t;
            return this;
        },


        /**
		 * Not modifies the elements array and reurns all the elements that DO NOT match a CSS Query
		 */
        not: function(q) {
            var list = this.elements;
            for (var i = 0; i < list.length; i++) {
                x$(q).each(function(hel) {
                    if (list[i] == hel) {
                        this.elements = this.removex(list, list.indexOf(list[i]));
                    }
                });
            }
            return this;
        },


        /**
		 * Element iterator.
		 * 
		 * @return {XUI} Returns the XUI object. 
		 */
        each: function(fn) {
            for (var i = 0, len = this.elements.length; i < len; ++i) {
                if (fn.call(this, this.elements[i]) === false)
                    break;
            }
            return this;
        }
    };


    // ---
    /// import :js=>['core/*', 'packages/emile'], :as=>'xui-core'
    /// import :js=>['core/*', 'packages/emile', 'more/*'], :as=>'xui-more'
    // ---


    scope[name] = function() {
        return new xui(arguments);
    };
// ---
})('x$', this);
