;(function(window, document) {
	if ( 'NodeList' in window && ! NodeList.prototype.forEach ) {
		NodeList.prototype.forEach = function ( callback, currentArg ) {
			currentArg = currentArg || window;
			for ( var i = 0; i < this.length; i++) {
				callback.call( currentArg, this[i], i, this );
			}
		};
	}
}( typeof window !== "undefined" ? window : this, document ) );