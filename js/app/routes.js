;(function() {

	'use strict';

	app.router.route('anu', function() {
	    alert('anu');
	});

	app.router.route('masonry', function() {

	    var 
	    view = app.get('page.masonry');

	    xin.ui.show(view);
	    setTimeout(function() {
	    	var
	    	msn = $('#masonry').data('masonry');
	    	msn.resize();

	    }, 300);

	});

})();