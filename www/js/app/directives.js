;(function() {

	window.ValueDirective = function() {};

	_.extend(ValueDirective.prototype, {
	    matcher: function($el) {
	        return $el.data('value');
	    },

	    run: function($el) {
	        $el.html($el.data('value'));
	    }
	});

})();