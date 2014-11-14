;(function() {

	var onDeviceReady = function() {

	    app.start().done(function() {

	    	$('body').show();

	    	if(app.config('db').name) {

				app.invoke('db.init', function() {

	        		app.invoke('db.isDbExist', function(exist) {

	        			if(!exist) {

	    					app.invoke('db.doPackage', function() {

	    					});

	        			} else {

	        			}

	        		});
				});

	    	}

	    });

	};

	if(typeof cordova == "undefined") xin.$(onDeviceReady);
    else document.addEventListener("deviceready", onDeviceReady, false);

})();