xui.extend({
    
	/**
	 * Adds more DOM nodes to the existing element list.
	 */
	add: function(q) {
    this.elements = this.elements.concat(this.reduce(xui(q).elements)); 
    return this;
	},

  // required? supports easier conversion of jQuery plugins to XUI - better off in more
  end: function () {
    this.elements = this.cache || document;
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
	}
// --	
});	
