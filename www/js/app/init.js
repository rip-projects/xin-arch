;(function() {

	var onDeviceReady = function() {

	    app.start().done(function() {

	    	$('body').show();

	    	if(app.config('db').name) {

				app.invoke('db.init', function() {

	        		app.invoke('db.isDbExist', function(exist) {

	        			if(!exist) {

	        				var fileName = app.config('db').fileName,
	        					uriString = app.config('db').package;

	    					app.invoke('download.download',
		    						fileName,
		    						uriString,
		    						function(success) {

		    							// location.href = 'login.html';
		    							console.log(success);
		    							// console.log('success');

				    					// app.invoke('db.doPackage', function() {

				    					// });
		    						},
		    						function(err) {

		    							console.log('err');
		    							console.log(err);

		    						},
		    						function(progress) {
		    							var percent = (progress.bytesReceived / progress.totalBytesToReceive) * 100;
		    							$('#progressBar').attr('value', percent);
		    						}
	    						);

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