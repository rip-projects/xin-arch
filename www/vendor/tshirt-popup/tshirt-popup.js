(function ($, window, document) {
	"use strict";

	$.fn.popup = function (options) {
		// Default Settings
		var defaults = {
				url: "",
				id: "popupOverflow",
				target: "",
				type: "inline",
				className: "popupContent",
				animation: "bounceIn",
				iconPrefix: "xn",
				width: "auto",
				height: "auto",
				closeButton: true,
				disableTouchScroll: true,
				onClick: function () {}
			},
			popup = this,
			settings = $.extend({}, defaults, options);

		this.close = function () {
			$("#" + settings.id).fadeOut(128);
			$("#" + settings.id + " > div > div > div").removeClass("animated " + settings.animation).html("");
		};

		return this.each(function () {
			var elem = $(this),
				url = elem.attr("href"),
				youtube_id = "";

			// If url is predefine
			if (settings.url !== "") {
				url = settings.url;
			}

			if (url !== undefined) {
				// See if it's a youtube link
				youtube_id = url.match(/(\?v=|\/\d\/|\/embed\/|\/v\/|\.be\/)([a-zA-Z0-9\-\_]+)/);
				if (youtube_id !== null) {
					settings.type = "iframe";
				}

				// If target is defined
				if (settings.target !== "") {
					url = url + " " + settings.target;
				}
			}

			elem.click(function (e) {
				// Append all the necessary divs
				if ($("#popupOverflow").length === 0) {
					$("body").append("<div id='" + settings.id + "' style='display:none'><div id='popupTable'><div id='popupMargin'></div></div></div>");
				}

				// Add loading content
				$("#" + settings.id + " > div > div").html("<div id='popupContent' class='" + settings.className + "'><div class='content'><p class='loading'><i class='" + settings.iconPrefix +" " + settings.iconPrefix +"-circle-o-notch " + settings.iconPrefix +"-spin " + settings.iconPrefix +"-5x'></i></p></div></div>");

				// Set Height and Width
				if (settings.width != "auto") {
					$("#" + settings.id + " > div > div > div > div").width (settings.width);
				}
				if (settings.height != "auto") {
					$("#" + settings.id + " > div > div > div > div").height (settings.height);
				}

				// Draw close button
				if (settings.closeButton) {
					$("#" + settings.id + " > div > div > div").append("<a href='#' class='close'><i class='" + settings.iconPrefix +" " + settings.iconPrefix +"-close'></i></a>");
				} else {
					$("#" + settings.id + " .close").remove();
				}

				// Display popup and prevent touch scroll event
				$("#" + settings.id).fadeIn(100).on('touchmove', function(e) {
					if (settings.disableTouchScroll) {
						e.preventDefault();
					}
				});

				// Assign close action to close button
				if (settings.closeButton) {
					$("#" + settings.id + " .close").click(function (e) {
						popup.close();
						e.preventDefault();
					});
				}

				// Type of the popup is inline
				if (settings.type === "inline") {
					if (url !== undefined) {
						// Ajax call
						$("#" + settings.id + " > div > div > div > div").load( url, function( response, status, xhr ) {
							// Ir url is not found or connection is broken
							if ( status === "error" ) {
								if ($("#popupOverflow .close").length === 0) {
									$("#" + settings.id + " > div > div > div").append("<a href='#' class='close'><i class='" + settings.iconPrefix +" " + settings.iconPrefix +"-close'></i></a>");
									$("#" + settings.id + " .close").click(function (e) {
										popup.close();
										e.preventDefault();
									});
								}

								$("#" + settings.id + " > div > div > div").addClass("animated " + settings.animation)
								$("#" + settings.id + " > div > div > div > div").html("<p class='error'><i class='" + settings.iconPrefix +" " + settings.iconPrefix +"-chain-broken " + settings.iconPrefix +"-5x'></i><br />Error while loading your content<br />Please close this popup and try again</p>");
							}
						});
					} else if (settings.target !== "") {
						$("#" + settings.id + " > div > div > div > div").html($(settings.target).html ());
					}


				// Type of the popup is iframe
				} else if (settings.type === "iframe") {
					if (youtube_id !== null) {
						$("#" + settings.id + " > div > div > div > div").addClass("youtube").html ('<iframe width="800" height="450" src="https://www.youtube.com/embed/' + youtube_id[2] + '" frameborder="0" allowfullscreen></iframe>');
					} else {
						$("#" + settings.id + " > div > div > div > div").html ("<iframe src='" + url + "' width='100%' height='100%' frameborder='0' />");
					}
				}

				// Display or not close button
				if (!settings.closeButton) {
					$("#" + settings.id + " .close").remove();
				}

				// Add animation
				$("#" + settings.id + " > div > div > div").addClass("animated " + settings.animation);

				settings.onClick ();

				e.preventDefault();
			});
		});
	};
}(jQuery, window, document));
