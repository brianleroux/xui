/**
 * Based on iScroll by Matteo Spinelli, http://cubiq.org/
 * http://cubiq.org/dropbox/mit-license.txt
 */

function scrollable(el)
{
	this.element = el;
	this.position = 0;
	this.refresh();
	this.element.style.webkitTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
	this.acceleration = 0.009;

	this.element.addEventListener('touchstart', this, false);
}

scrollable.prototype = {
	handleEvent: function(e) {
		switch(e.type) {
			case 'touchstart': this.onTouchStart(e); break;
			case 'touchmove': this.onTouchMove(e); break;
			case 'touchend': this.onTouchEnd(e); break;
			case 'webkitTransitionEnd': this.onTransitionEnd(e); break;
		}
	},

	get position() {
		return this._position;
	},
	
	set position(pos) {
		this._position = pos;
		this.element.style.webkitTransform = 'translate(0, ' + this._position + 'px)';
	},
	
	refresh: function() {
		this.element.style.webkitTransitionDuration = '0';

		if( this.element.offsetHeight<this.element.parentNode.clientHeight )
			this.maxScroll = 0;
		else		
			this.maxScroll = this.element.parentNode.clientHeight - this.element.offsetHeight;
	},
	
	onTouchStart: function(e) {
		e.preventDefault();

		this.element.style.webkitTransitionDuration = '0';	// Remove any transition
		var theTransform = parseInt(window.getComputedStyle(this.element,null).webkitTransform.split(',')[13]);
		if( theTransform!=this.position )
			this.position = theTransform;
		
		this.startY = e.targetTouches[0].clientY;
		this.scrollStartY = this.position;
		this.scrollStartTime = e.timeStamp;
		this.moved = false;

		this.element.addEventListener('touchmove', this, false);
		this.element.addEventListener('touchend', this, false);

		return false;
	},
	
	onTouchMove: function(e) {
		if( e.targetTouches.length != 1 )
			return false;
		
		var topDelta = e.targetTouches[0].clientY - this.startY;
		if( this.position>0 || this.position<this.maxScroll ) topDelta/=2;
		this.position = this.position + topDelta;
		this.startY = e.targetTouches[0].clientY;
		this.moved = true;

		// Prevent slingshot effect
		if( e.timeStamp-this.scrollStartTime>100 ) {
			this.scrollStartY = this.position;
			this.scrollStartTime = e.timeStamp;
		}

		return false;
	},
	
	onTouchEnd: function(e) {
		this.element.removeEventListener('touchmove', this, false);
		this.element.removeEventListener('touchend', this, false);

		// If we are outside of the boundaries, let's go back to the sheepfold
		if( this.position>0 || this.position<this.maxScroll ) {
			this.scrollTo(this.position>0 ? 0 : this.maxScroll);
			return false;
		}

		if( !this.moved ) {
			var theTarget = e.target;
			if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;
			var theEvent = document.createEvent("MouseEvents");
			theEvent.initEvent('click', true, true);
			theTarget.dispatchEvent(theEvent);
			return false
		}

		// Lame formula to calculate a fake deceleration
		var scrollDistance = this.position - this.scrollStartY;
		var scrollDuration = e.timeStamp - this.scrollStartTime;

		var newDuration = (2 * scrollDistance / scrollDuration) / this.acceleration;
		var newScrollDistance = (this.acceleration / 2) * (newDuration * newDuration);
		
		if( newDuration<0 ) {
			newDuration = -newDuration;
			newScrollDistance = -newScrollDistance;
		}

		var newPosition = this.position + newScrollDistance;
		
		if( newPosition>this.element.parentNode.clientHeight/2 )
			newPosition = this.element.parentNode.clientHeight/2;
		else if( newPosition>0 )
			newPosition/= 1.5;
		else if( newPosition<this.maxScroll-this.element.parentNode.clientHeight/2 )
			newPosition = this.maxScroll-this.element.parentNode.clientHeight/2;
		else if( newPosition<this.maxScroll )
			newPosition = (newPosition - this.maxScroll) / 1.5 + this.maxScroll;
		else
			newDuration*= 6;

		this.scrollTo(newPosition, Math.round(newDuration) + 'ms');

		return false;
	},
	
	onTransitionEnd: function() {
		this.element.removeEventListener('webkitTransitionEnd', this, false);
		this.scrollTo( this.position>0 ? 0 : this.maxScroll );
	},
	
	scrollTo: function(dest, runtime) {
		this.element.style.webkitTransitionDuration = runtime ? runtime : '300ms';
		this.position = dest ? dest : 0;

		// If we are outside of the boundaries at the end of the transition go back to the sheepfold
		if( this.position>0 || this.position<this.maxScroll )
			this.element.addEventListener('webkitTransitionEnd', this, false);
	}
};





x$(window).load( function(){ setTimeout(function(){ new scrollable(x$('#scroller').first())) }, 100) };
