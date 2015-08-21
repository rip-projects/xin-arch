T-Shirt Scroll
==============

T-Shirt Scroll is a momentum scroll event using CSS3 using touch event to use in mobile web app or mobile app.

**Available Configuration**

1. rubber: false // Set it true for rubber effect
1. scrollVertical: true // Set it true to make vertical scroll event
1. scrollHorizontal: false // Set it true to make horizontal event
1. onScroll: function (posX, posY, scaleX, scaleY, originX, originY, transition) {} // Call back when on scroll
1. onReachTop: function (posX, posY, scaleX, scaleY, originX, originY, transition) {} // Call back when scroll reach top
1. onReachBottom: function (posX, posY, scaleX, scaleY, originX, originY, transition) {} // Call back when scroll reach bottom
1. onReachLeft: function (posX, posY, scaleX, scaleY, originX, originY, transition) {} // Call back when scroll reach left
1. onReachRight: function (posX, posY, scaleX, scaleY, originX, originY, transition) {} // Call back when scroll reach right

**How to use**

	$("#scroll").scroll();

Makes sure the #scroll is wrapped in a tag with overflow:hidden in it.
