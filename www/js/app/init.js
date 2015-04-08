;(function() {

	var onDeviceReady = function() {

	    app.start().done(function() {

		    // window.touchShadow = {
		    //     draw: function (zIndex, element) {
		    //         element = (element === undefined)? "#pane": element;

		    //         if ($("#touchShadow").length === 0) {
		    //             $(element).append ("<div id='touchShadow' class='full' />");
		    //         }
		    //         $("#touchShadow").css ("z-index", zIndex);
		    //     },
		    //     set: function (opacity) {
		    //         $("#touchShadow").css ({
		    //             "opacity":  opacity,
		    //             "transition": "all 0s linear"
		    //         });
		    //     },
		    //     destroy: function (opacity) {
		    //         opacity = (opacity === undefined)? 0: opacity;

		    //         $("#touchShadow").css ({
		    //             "opacity":  opacity,
		    //             "transition": ""
		    //         });
		    //         setTimeout(function() {
		    //             $("#touchShadow").remove ();
		    //         }, 444);
		    //     }
		    // };

		    // function aside (menu, viewport) {
		    //     this.menu = menu;
		    //     this.viewport = viewport;
		    //     this.hideClass = "hide";
		    //     this.hideId = "hideMenu";
		    //     this.hide = "hideMenu";

		    //     this.moveMenu = function (distance) {
		    //         $('[data-role="pane"]').addClass("noTransition").css ("transform", "translate3D(" + distance + "px,0,0)");
		    //         $('[data-target="#sideMenu"]').addClass("noTransition").css ("transform", "translate3D(-" + (16 - ((distance / MENU_SIZE) * 16)) + "%,0,0)");
		    //     };

		    //     this.showMenu = function () {
		    //         $(this.viewport).removeClass("noTransition").css ("transform", "translate3d(" + MENU_SIZE + "px, 0, 0)");
		    //         $(this.menu).removeClass("noTransition").css ("transform", "").removeClass ("slightlyLeft");
		    //         $("#" + this.hideId).removeClass (this.hideClass);
		    //     };

		    //     this.hideMenu = function () {
		    //         window.menuId = "";
		    //         $(this.viewport).removeClass("noTransition").css ("transform", "translate3d(0, 0, 0)");
		    //         $(this.menu).removeClass("noTransition").css ("transform", "").addClass ("slightlyLeft");

		    //         window.menuSideObject = this;
		    //         window.setTimeout (function () {
		    //             $("#" + menuSideObject.hideId).addClass (menuSideObject.hideClass);
		    //         }, 512);
		    //     };

		    //     if ($("#" + this.hideId).length <= 0) $(this.viewport).append ("<div id='" + this.hideId + "' class='" + this.hideClass + "' />");
		    // }

		    // // Configure Side Menu action
		    // var sideMenu = new aside ('[data-target="#sideMenu"]', '[data-role="pane"]');

		    // $('[data-target="#sideMenu"]').swipe({
		    //     tap: function (event, target) {
		    //         if (!this.onSwipe) {
		    //             touchShadow.draw ($('[data-role="pane"]').css ("z-index") - 1, 'body');
		    //             touchShadow.set (0.65);
		    //             setTimeout(function() {
		    //                 touchShadow.destroy (0);
		    //             }, 10);

		    //             sideMenu.showMenu ();
		    //         } else {
		    //             this.onSwipe = false;
		    //         }
		    //     },
		    //     swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerdata) {

		    //         if (direction == "right") {

		    //     		console.log('dddd');

		    //             this.onSwipe = true;

		    //             touchShadow.draw ($('[data-role="pane"]').css ("z-index") - 1, 'body');
		    //             touchShadow.set (0.65 - ((distance / MENU_SIZE) * 0.65));

		    //             sideMenu.moveMenu (distance);

		    //             if (phase == 'end' || distance >= MENU_SIZE + 100) {
		    //                 this.onSwipe = false;
		    //                 sideMenu.showMenu ();
		    //                 touchShadow.destroy (0);
		    //             } else if (phase == "cancel") {
		    //                 sideMenu.hideMenu ();
		    //                 touchShadow.destroy (0.65);
		    //             }
		    //         }
		    //     },
		    //     triggerOnTouchEnd:true,
		    //     cancelThreshold:MENU_SIZE / 2,
		    //     maxTimeThreshold:MENU_SIZE * 2
		    // });

		    // $("#hideMenu").swipe({
		    //     tap: function (event, target) {
		    //         if (!this.onSwipe) {
		    //             touchShadow.draw ($('[data-role="pane"]').css ("z-index") - 1, 'body');
		    //             touchShadow.set (0);
		    //             setTimeout(function() {
		    //                 touchShadow.destroy (0.65);
		    //             }, 10);

		    //             sideMenu.hideMenu ();
		    //         } else {
		    //             this.onSwipe = false;
		    //         }
		    //     },
		    //     swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerdata) {
		    //         if (direction == "left") {
		    //             if (distance < MENU_SIZE - 50) {
		    //                 this.onSwipe = true;

		    //                 touchShadow.draw ($('[data-role="pane"]').css ("z-index") - 1, 'body');
		    //                 touchShadow.set ((distance / MENU_SIZE) * 0.65);

		    //                 sideMenu.moveMenu (MENU_SIZE - distance);
		    //             }
		    //             if (phase == 'end' || distance >= MENU_SIZE - 50) {
		    //                 this.onSwipe = false;
		    //                 sideMenu.hideMenu ();
		    //                 touchShadow.destroy (0.65);
		    //             } else if (phase=="cancel") {
		    //                 sideMenu.showMenu ();
		    //                 touchShadow.destroy (0);
		    //             }
		    //         }
		    //     },
		    //     triggerOnTouchEnd:true,
		    //     cancelThreshold:MENU_SIZE / 2,
		    //     maxTimeThreshold:MENU_SIZE * 2
		    // });

	    	$('body').show();

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