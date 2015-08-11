;(function() {

	'use strict';

	app.router.route('login', function() {
	    var view = app.get('page.login');
	    $('.tabstrip').addClass('hide');
	    xin.ui.show(view);

	});
	
	app.router.route('login-input', function() {
	    var view = app.get('page.login-input');
	    $('.tabstrip').addClass('hide');
	    xin.ui.show(view);

	});

	app.router.route('register', function() {
	    var view = app.get('page.register');
	    $('.tabstrip').addClass('hide');
	    xin.ui.show(view);

	});

	app.router.route('anu', function() {
	    alert('anu');
	});


})();