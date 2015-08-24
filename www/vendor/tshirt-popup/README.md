T-Shirt Pop Up
==============

T-Shirt Pop Up is a jquery popup plugins made specially with Naked CSS. It's light and responsive.

**Available Configuration**

1. closeButton: true/false, display or hide close button
2. className: "popupContent", class name for outer wrapper of content div
3. animation: "bounceIn", see animate.css for available animation class
4. type: "inline", type of content, right now it's only inline
5. width: "auto", set the width based of number, px or %
6. height: "auto", set the height based of number, px or %
7. url: "". Define the url to use.
8. id: "popupOverflow", Id for the popup
9. disableTouchScroll: true/false, Disable scrolling in touch device
10. iconPrefix: "xn", font-awesome icon prefix
11. target: "", set selector name for target content both external link or internal element

**How to use it**

	$("#popup").popup({
		className: "detailPopup",
		closeButton: false
	});

**Available Method**

Close the popup

	$.fn.popup().close();

**Todo**

1. Load url inside iframe
2. Load youtube or vimeo video
3. Gallery functionality
4. Width becomes auto when the window size is smaller than defined width
