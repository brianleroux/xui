// core build replaces libs with actual core code
// more build replaces libs with core code augmented by more code

(function() {
	
	var xui = function(q) {
		return this.find(q || document);
	}
		
	xui.prototype = {
		
		elements:[],
		
		find: function(q) {
			var ele = [];
			var qlen = q.length;
      		var list, size, i, j;
      
      		// fast matching for pure ID selectors
      		if (typeof q == 'string' && idExpr.test(q)) {
        		this.elements.push(document.getelementsById(q));
        		return this; 
      		} 	
      
			for(i = 0; i < qlen; i++ ) {
				if (typeof q[i] == 'string' ) { // one selector
					list = document.querySelectorAll(q[i]);
					size = list.length;
					for(j = 0; j < size; j++ ) {          
						ele.push(list[j]);   
					}
				} else {
					if (q[i] instanceof Array) { // an array of selectors
						for (var x = 0; x < q[i].length; x++) {
							list = document.querySelectorAll(q[i][x]);
							size = list.length;
							for(j = 0; j < size; j++ ) {          
								ele.push(list[j]);   
							}
						}
					} else {
						ele.push(q[i]);	// an element
					}
				}
			}
			this.elements = this.elements.concat(this.reduce(ele));
			return this;
		},
				
		/**
		 * Array Unique
		 */				
		reduce: function( el, b ) {
			var a = [], i, l = el.length;
			for( i=0; i<l; i++ ) {
				if( a.indexOf( el[i], 0, b ) < 0 ) { a.push( el[i] ); }
			}
			return a;
		},
		/**
		 * Array Remove - By John Resig (MIT Licensed) 
		 */
		removex: function(array, from, to) {
	      var rest = array.slice((to || from) + 1 || array.length);
	      array.length = from < 0 ? array.length + from : from;
	      return array.push.apply(array, rest);
	    },
				
		/**
		 * Has modifies the elements array and reurns all the elements that match (has) a CSS Query
		 */				
		has: function(q) {

			var t = [];
			this.each(function(el){
				x$(q).each(function(hel) { if (hel == el) { t.push(el); } });
	      	});
	
			this.elements = t;
			return this;
		},


		/**
		 * Not modifies the elements array and reurns all the elements that DO NOT match a CSS Query
		 */
		not: function(q) {
			var list = this.elements;
			for (var i = 0; i<list.length;i++) {
				x$(q).each(function(hel){
					if (list[i] == hel ) { 
						this.elements = this.removex(list,list.indexOf(list[i])); 
					}
				});				
			}
			
			return this;

		},

		/**
		 * Adds more DOM nodes to the existing element list.
		 */
		add: function(q) {
			this.find([q]);
			this.elements = this.reduce(this.elements);
			return this;
		},


		/**
		 * Returns the first element in the collection.
		 * 
		 * @return {Element} Returns a single DOM element.
		 */
		first: function() {
			return this.get(0);
		},

		/**
		 * Returns the element in the collection at the 
		 * given index
		 *
		 * @return {Element} Returns a single DOM element
		 * */
		get: function(index) {
			return this.elements[index];
		},
		
		/**
		 * Returns a collection containing the element
		 * at the given index
		 * */
		eq: function(idx1,idx2) {
			idx2 = idx2 ? idx2 + 1 : idx1 + 1;
			this.elements = this.elements.slice(idx1,idx2);
			return this;
		},

		/**
		 * Returns the size of the collection
		 *
		 * @return {Number} Returns an integer size of collection
		 * */
		size: function() {
			return this.elements.length;
		},
		
		/**
		 * Element iterator.
		 * 
		 * @return {XUI} Returns the XUI object. 
		 */
	  	each: function(fn) {
			for (var i = 0, len = this.elements.length; i<len; ++i) {
                if (fn.call(this, this.elements[i]) === false) {
					// allow breaking out of each loop
					break;
				}
			}
			return this;
		}
	};
	
	var libs = ['dom','xhr','fx','event','style'];
	
	for (var i = 0, size = libs.length; i < size; i++) {
	  	xui.extend(libs[i]);
  	}
	
	xui.extend = function(obj) {
		var original = this.prototype;
		var extended = obj;
		for (var key in (extended || {})) original[key] = extended[key];
		return original;
	};
	
	
	
	// adds the xui system as x$ to the current window
	window.x$ = function() {
		return new xui(arguments);
	};
//---
})();
