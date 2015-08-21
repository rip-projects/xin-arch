(function ($, window, document) {
	"use strict";

	// Constant
	window.ONSWIPE = false;

	$.fn.scroll = function (options) {
		// Default Settings
		var defaults = {
				rubber: false,
				scrollVertical: true,
				scrollHorizontal: false,
				allowSmaller: false,
				onScroll: function (posX, posY, scaleX, scaleY, originX, originY, transition) {},
				onReachTop: function (posX, posY, scaleX, scaleY, originX, originY, transition) {},
				onReachBottom: function (posX, posY, scaleX, scaleY, originX, originY, transition) {},
				onReachLeft: function (posX, posY, scaleX, scaleY, originX, originY, transition) {},
				onReachRight: function (posX, posY, scaleX, scaleY, originX, originY, transition) {}
			},
			settings = $.extend({}, defaults, options);

		this.each(function () {
			// Get params
			var rubber = settings.rubber,
				scrollVertical = settings.scrollVertical,
				scrollHorizontal = settings.scrollHorizontal,
				allowSmaller = settings.allowSmaller,
				onScroll = settings.onScroll,
				onReachTop = settings.onReachTop,
				onReachBottom = settings.onReachBottom,
				onReachLeft = settings.onReachLeft,
				onReachRight = settings.onReachRight;
			// Determine the map first position
			var matrix = 0,
				mapX = 0,
				mapY = 0
			// Save the first touch positon
			var firstX = 0,
				firstY = 0,
				deltaX = 0,
				deltaY = 0,
				posX = 0,
				posY = 0,
				originX = 0,
				originY = 0,
				scaleX = 1,
				scaleY = 1;
			// To be used to slow down animation
			var acceleratorX = 0,
				acceleratorY = 0,
				velocity = 0,
				transition = "";
			// Current item
			var elem = $(this).parent (),
				timer = 256;
			// Timestamp
			var timestamp;

			// Assign transform CSS
			elem.children ().css ("transform", "translate3d(0,0,0)");

			// Assign touch event
			elem.hammer().on("dragstart drag dragend", function(event) {
				var parent = $(this),
					child = $(this).children ();

				if (event.type === "dragstart") {
					// Map
					matrix = child.css ("transform").split (", ");
					mapX = parseInt(matrix[4]);
					mapY = matrix[5].split (")");
					mapY = parseInt(mapY[0]);

					// Touch
					firstX = event.gesture.center.pageX;
					firstY = event.gesture.center.pageY;

					// Constrain movement
					posX = mapX;
					posY = mapY;
				} else if (event.type === 'drag') {
					// Make a status no element can't be tap
					ONSWIPE = true;
					// Count movement delta
					deltaX = -event.gesture.deltaX;
					deltaY = -event.gesture.deltaY;
					// Constrain movement
					posX = mapX - deltaX;
					posY = mapY - deltaY;

					// Count the viewable boundry
					if (rubber) {
						if ((posX + child.width ()) <= parent.width ()) {
							posX = parent.width () - child.width ();
							originX = 100;
							scaleX = 1 + (deltaX / parent.width ());
						}
						if ((posY + child.height ()) <= parent.height ()) {
							posY = parent.height () - child.height ();
							originY = 100;
							scaleY = 1 + (deltaY / parent.height ());
						}

						if (posX >= 0) {
							originX = posX = 0;
							scaleX = 1 - (deltaX / parent.width ())
						}
						if (posY >= 0) {
							originY = posY = 0;
							scaleY = 1 - (deltaY / parent.height ())
						}
					}

					// Calling the callbacks
					if ((posX + child.width ()) <= parent.width ())  	onReachRight  (posX, posY, scaleX, scaleY, originX, originY, transition);
					if ((posY + child.height ()) <= parent.height ()) 	onReachBottom (posX, posY, scaleX, scaleY, originX, originY, transition);
					if (posX >= 0)   									onReachLeft   (posX, posY, scaleX, scaleY, originX, originY, transition);
					if (posY >= 0)  									onReachTop    (posX, posY, scaleX, scaleY, originX, originY, transition);

					// Get the last acceleration
					acceleratorX = event.gesture.velocityX;
					acceleratorY = event.gesture.velocityY;

					transition = "all 0s linear";
					timestamp = Math.round(+new Date()/300);
				} else if (event.type === 'dragend') {
					// Count the the move speed for slow down animation
					// velocity = duration / distance;
					// if (velocity < 2) {
						if (timestamp === Math.round(+new Date()/300)) {
							posX = mapX - (deltaX * (50 * acceleratorX));
							posY = mapY - (deltaY * (50 * acceleratorY));
						}

						if (scrollHorizontal && !scrollVertical) {
							posY = 0;
							scaleY = 1;
						}
						if (!scrollHorizontal && scrollVertical) {
							posX = 0;
							scaleX = 1;
						}

					// 	transition = "all 0.25s cubic-bezier(0, 0, " + velocity / 2 + ", 1)";
					// } else {
						transition = "all 0.25s cubic-bezier(0, 0, 0.5, 1)";
					// }

					// Count the viewable boundry
					if ((posX + child.width ()) <= parent.width ())
						posX = parent.width () - child.width ();
					if ((posY + child.height ()) <= parent.height ())
						posY = parent.height () - child.height ();

					if (posX >= 0)
						posX = 0;
					if (posY >= 0)
						posY = 0;

					if (child.width () <= parent.width ())
						posX = 0;
					if (child.height () <= parent.height ())
						posY = 0;

					scaleX = scaleY = 1;

					// Make a status no element can be tap
					ONSWIPE = false;
				}

				// It's shorter than container
				if (!allowSmaller) {
					if (child.width () <= parent.width ()) {
						originX = posX = 0;
						scaleX = 1;
					}
					if (child.height () <= parent.height ()) {
						originY = posY = 0;
						scaleY = 1;
					}
				}

				if (scrollHorizontal && !scrollVertical) {
					posY = 0;
					scaleY = 1;
				}
				if (!scrollHorizontal && scrollVertical) {
					posX = 0;
					scaleX = 1;
				}

				child.css ({
					"transform": "translate3d(" + posX + "px," + posY + "px,0) scale3d(" + scaleX + "," + scaleY + ",1)",
					"transform-origin": originX + "% " + originY + "%",
					"transition": transition
				});

				$('[data-twin=' + child.attr("data-twin") + ']').css ({
					"transform": "translate3d(" + posX + "px," + posY + "px,0) scale3d(" + scaleX + "," + scaleY + ",1)",
					"transform-origin": originX + "% " + originY + "%",
					"transition": transition
				});

				onScroll (posX, posY, scaleX, scaleY, originX, originY, transition);
			});

			// Assign Mouse Scroll
			elem.on('mousewheel', function (event) {
				var parent = $(this),
					child = $(this).children ();

				// Map
				matrix = child.css ("transform").split (", ");
				mapX = parseInt(matrix[4]);
				mapY = matrix[5].split (")");
				mapY = parseInt(mapY[0]);

				// Count movement delta
				deltaX = parseInt(event.deltaX);
				deltaY = parseInt(event.deltaY);

				if (deltaX === 0) deltaX = 1;
				if (deltaY === 0) deltaY = 1;

				// Constrain movement
				posX = (mapX -= (deltaX * 1));
				posY = (mapY -= (deltaY * -1));

				transition = "all 0s linear";

				// Count the viewable boundry
				if (rubber) {
					// It's on right
					if ((posX + child.width ()) <= parent.width ()) {
						posX = parent.width () - child.width ();
						originX = 100;
						scaleX = 1 + Math.abs(deltaX / parent.width ());
						onReachRight (posX, posY, scaleX, scaleY, originX, originY, transition);
					}

					// It's on bottom
					if ((posY + child.height ()) <= parent.height ()) {
						posY = parent.height () - child.height ();
						originY = 100;
						scaleY = 1 + Math.abs(deltaY / parent.height ());
						onReachBottom (posX, posY, scaleX, scaleY, originX, originY, transition);
					}

					// It's on left
					if (posX >= 0) {
						originX = posX = 0;
						scaleX = 1 + Math.abs(deltaX / parent.width ());
						onReachLeft (posX, posY, scaleX, scaleY, originX, originY, transition);
					}

					// It's on top
					if (posY >= 0) {
						originY = posY = 0;
						scaleY = 1 + Math.abs(deltaY / parent.height ());
						onReachTop (posX, posY, scaleX, scaleY, originX, originY, transition);
					}
				} else {
					// It's on right
					if ((posX + child.width ()) <= parent.width () && scrollHorizontal) {
						posX -= (1 / (posX * 100));
						if ((posX + child.width ()) <= -(parent.width () * 2) ) posX = -(parent.width () * 2) - child.width ();
						onReachRight (posX, posY, scaleX, scaleY, originX, originY, transition);
					}

					// It's on bottom
					if ((posY + child.height ()) <= parent.height () && scrollVertical) {
						posY -= (1 / (posY * 100));
						if ((posY + child.height ()) <= -(parent.height () * 2) ) posY = -(parent.height () * 2) - child.height ();
						onReachBottom (posX, posY, scaleX, scaleY, originX, originY, transition);
					}

					// It's on left
					if (posX >= 0 && scrollHorizontal) {
						posX += (1 / (deltaX * 100));
						if (posX >= parent.width ()) posX = parent.width ();
						onReachLeft (posX, posY, scaleX, scaleY, originX, originY, transition);
					}

					// It's on top
					if (posY >= 0 && scrollVertical) {
						posY += (1 / (deltaY * 100));
						if (posY >= parent.height ()) posY = parent.height ();
						onReachTop (posX, posY, scaleX, scaleY, originX, originY, transition);
					}
				}

				// It's shorter than container
				if (!allowSmaller) {
					if (child.width () <= parent.width ()) {
						originX = posX = 0;
						scaleX = 1;
					}
					if (child.height () <= parent.height ()) {
						originY = posY = 0;
						scaleY = 1;
					}
				}

				// Make sure the other end not moving
				if (scrollHorizontal && !scrollVertical) {
					posY = 0;
					scaleY = 1;
				}
				if (!scrollHorizontal && scrollVertical) {
					posX = 0;
					scaleX = 1;
				}

				child.css ({
					"transform": "translate3d(" + posX + "px," + posY + "px,0) scale3d(" + scaleX + "," + scaleY + ",1)",
					"transform-origin": originX + "% " + originY + "%",
					"transition": transition
				});
				$('[data-twin=' + child.attr("data-twin") + ']').css ({
					"transform": "translate3d(" + posX + "px," + posY + "px,0) scale3d(" + scaleX + "," + scaleY + ",1)",
					"transform-origin": originX + "% " + originY + "%",
					"transition": transition
				});

				// Save the current element
				window.tempparent = parent;

				// Prevent element to over scrolled - should be on mouse up
				setTimeout (function () {
					tempparent.each(function (){
						// It's on bottom
						if ((posX + child.width ()) <= parent.width ())
							posX = parent.width () - child.width ();
						if ((posY + child.height ()) <= parent.height ())
							posY = parent.height () - child.height ();

						// It's on top
						if (posX >= 0)
							posX = 0;
						if (posY >= 0)
							posY = 0;

						transition = "all 0.25s cubic-bezier(0, 0, 0.5, 1)";

						child.css ({
							"transform": "translate3d(" + posX + "px," + posY + "px,0) scale3d(" + scaleX + "," + scaleY + ",1)",
							"transform-origin": originX + "% " + originY + "%",
							"transition": transition
						});
						$('[data-twin=' + child.attr("data-twin") + ']').css ({
							"transform": "translate3d(" + posX + "px," + posY + "px,0) scale3d(" + scaleX + "," + scaleY + ",1)",
							"transform-origin": originX + "% " + originY + "%",
							"transition": transition
						});
					});
				}, timer);

				onScroll (posX, posY, scaleX, scaleY, originX, originY, transition);

				event.preventDefault();
			});
		});

	}
}(jQuery, window, document));