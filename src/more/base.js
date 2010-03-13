xui.extend({
    
	/**
	 * Adds more DOM nodes to the existing element list.
	 */
	add: function(q) {
	  [].push.apply(this, [].slice.call(xui(q)));
	  return this.set(this.reduce());
	},

	/**
	 * Returns the first element in the collection.
	 * 
	 * @return Returns a single DOM element.
	 */
	first: function() {
		return this.get(0);
	},

	/**
	 * Returns the element in the collection at the 
	 * given index
	 *
	 * @return Returns a single DOM element
	 * */
	get: function(index) {
		return this[index];
	},
	
	/**
	 * Returns a collection containing the element
	 * at the given index
	 * */
	eq: function(idx1,idx2) {
		idx2 = idx2 ? idx2 + 1 : idx1 + 1;
		return this.set([].slice.call(this, idx1, idx2));
	},

	/**
	 * Returns the size of the collection
	 *
	 * @return Returns an integer size of collection (use xui.length instead)
	 * */
	size: function() {
		return this.length;
	}
// --	
});	
