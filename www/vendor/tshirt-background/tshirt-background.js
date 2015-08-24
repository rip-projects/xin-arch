"use strict";

var ready = function (object, callback) {
		if (object == null || typeof(object) == 'undefined') return;
		if (object.readyState != 'loading'){
			callback();
		} else if (object.addEventListener) {
			object.addEventListener('DOMContentLoaded', callback);
		} else {
			object.attachEvent('onreadystatechange', function() {
				if (object.readyState != 'loading')
					callback();
			});
		}
	},
	addEvent = function(object, type, callback) {
		if (object == null || typeof(object) == 'undefined') return;
		if (object.addEventListener) {
			object.addEventListener(type, callback, false);
		} else if (object.attachEvent) {
			object.attachEvent("on" + type, callback);
		} else {
			object["on"+type] = callback;
		}
	},
	responsiveBackground = function () {
		var elements = document.querySelectorAll("[data-background]");

		// Loop for every available element
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i],
				windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
				backgroundResponsiveMatched = false,
				backgroundResponsiveShorted = [];

			// Check the avilable matched rules
			if (element.backgroundResponsiveShorted == null) {
				for (var j = 0; j < element.attributes.length; j++) {
					var attribute = element.attributes[j];

					if (attribute.name.indexOf("data-background-") === 0) {
						var responsiveWidth = parseInt(attribute.name.split("data-background-")[1]);

						backgroundResponsiveShorted.push([responsiveWidth, attribute.value]);
					}
				}

				// Sort the attributes
				backgroundResponsiveShorted.sort(function (a, b) {
					return b[0]-a[0];
				});

				// Assign it to
				element.backgroundResponsiveShorted = backgroundResponsiveShorted;
			}

			// Apply the matched rules
			for (var j = 0; j < element.backgroundResponsiveShorted.length; j++) {
				if (windowWidth <= element.backgroundResponsiveShorted[j][0]) {
					element.style.background = element.backgroundResponsiveShorted[j][1];
					backgroundResponsiveMatched = true;
				}
			}

			// If no matching rules, use default one
			if (!backgroundResponsiveMatched) {
				element.style.background = element.attributes["data-background"].value;
			}
		}
	};

// Run it on the beginning
ready(document, function () {
	responsiveBackground ();
});

// Run it when the window get resized
addEvent (window, "resize", function() {
	responsiveBackground ();
});