;(function() {

	var onDeviceReady = function() {

	    app.start().done(function() {

	    	document.body.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);

	    	$('body').show();

    		// ============== CUSTOM JS ================
	    	if(navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS (7|8)_\d/i)) {
				$('body').addClass('ios');
			}

			$("#scrolling .scroll").scroll({
				scrollVertical: true
			});

			$('div[data-uri="home"] .scroll').scroll({
				scrollVertical: true
			});

			$(".drawer-button").click(function() {
				$('[data-role="pane"]').toggleClass('toggleDrawer');
			});

			$('[data-region="body"]').on('click', function(evt){
				$('[data-role="pane"]').removeClass('toggleDrawer');
			});

			$(".searchButton").click(function(){
				$(this).parent().siblings(".search").addClass("show");
				$("input:text:visible:first").focus();
			});

			$(".search .cancel").click(function(){
				$(this).parent().parent(".search").removeClass("show");
			});

			$(".navButton").click(function(){
				// $(this).toggleClass("clicked").parent().siblings(".subMenu").slideToggle(128).addClass("showAfter");
				$(this).addClass("out").siblings(".in").addClass("showAfter").parent().siblings(".subMenu").addClass("show");
			});
			$(".in").click(function(){
				$(this).removeClass("showAfter").siblings(".navButton").removeClass("out").parent().siblings(".subMenu").removeClass("show");
			});


			$(".pageSlide").owlCarousel({
				pagination: true,
				navigation: false
			});

			$(".bannerArea").owlCarousel({
				autoPlay : true,
				pagination: true,
				navigation: false
			});

			$(".gridMenu.slide").owlCarousel({
				itemsCustom : [
					[0, 4],
					[480, 4],
					[768, 4],
					[1024, 4],
					[1400, 5],
					[1600, 6],
				],
				autoPlay : false,
				pagination: false,
				navigation: false
			});


			$('#masonry').masonry({
				itemSelector: '.item',
				isAnimated: true
			});


			$(".actionShow").click(function(){
				$(".actionSheet").addClass("show");
				$(".actionSheet .actionArea").addClass("slideInUp").removeClass("slideOutDown");
				$(".actionSheet .actionList").addClass("slideInUp").removeClass("slideOutDown");
			});

			$(".actionSheet .cancel").click(function(){
				$(".actionSheet .actionArea").removeClass("slideInUp").addClass("slideOutDown");
	    		setTimeout(function() {
					$(".actionSheet").removeClass("show");
	    		}, 300);
			});

			$(".actionSheet .close").click(function(){
				$(".actionSheet .actionList").removeClass("slideInUp").addClass("slideOutDown");
	    		setTimeout(function() {
					$(".actionSheet").removeClass("show");
	    		}, 300);
			});

			// var $container = $('#masonry');
			// $container.imagesLoaded(function(){
			// 	$container.masonry({
			// 		itemSelector : '.item',
			// 		columnWidth : 200,
			// 		gutterWidth: 20,
			// 		percentPosition: true
			// 	});
			// });





	    	if(app.config('db')) {

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

		    							$('hr.progressBar').width(0);
		    							$('hr.progressBar').removeClass('active');

		    							console.log(success);

				    					// app.invoke('db.doPackage', function() {

				    					// });

		    						},
		    						function(err) {
		    							console.log('err');
		    							console.log(err);
		    						},
		    						function(progress) {

		    							var percent = (progress.bytesReceived / progress.totalBytesToReceive) * 100;
		    							$('hr.progressBar').addClass('active');
		    							$('hr.progressBar').width(percent + '%');

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