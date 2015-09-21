"use strict";

window.touchShadow = {
    draw: function (zIndex, element) {
        element = (element === undefined)? "#pane": element;

        if ($("#touchShadow").length === 0) $(element).append ("<div id='touchShadow' class='full' />");

        $("#touchShadow").css ("z-index", zIndex);
    },
    set: function (opacity) {
        $("#touchShadow").css ({
            "background-color":  "rgba(0,0,0," + opacity + ")",
            "transition": "all 0s linear"
        });
    },
    destroy: function (opacity) {
        opacity = (opacity === undefined)? 0: opacity;

        $("#touchShadow").css ({
            "background-color":  "rgba(0,0,0," + opacity + ")",
            "transition": ""
        });
        setTimeout(function() {
            if (!touch.onSwipe)
                $("#touchShadow").remove ();
        }, 312);
    }
};

window.touch = {
    touchX:0,
    touchY:0,
    onSwipe:false,
    freezeMap:false,
    changeHash: function (items) {
        if (items[1] === "slideLeft") {
            if (items[0] != "#room" && items[0] != "#unit" && items[0] != "#manageGroupsDetail")
                location.hash = items[2] + "/" + items[0].replace("#", "");
            else if (items[0] === "#manageGroupsDetail")
                location.hash = "#manage/groups/" + items[3];
        } else {
            if(items[2] === '#list' && items[1] === "slideRight") {
                location.hash = "#overview/" + items[2].replace("#", "");
            } else if(items[2] === '#room') {
                if (items[3] !== undefined)
                    location.hash = items[2]+'/'+items[3];
            } else if(items[2] === "#manageGroups") {
                location.hash = "#manage/groups";
            } else {
                location.hash = items[2];
            }
        }
    },
    getCurrentTouchCoordinate: function (param) {
        var event = false;

        if (param !== undefined) event = param;

        if (event) {
            touch.touchX = event.gesture.center.pageX;
            touch.touchY = event.gesture.center.pageY;
        } else {
            touch.touchX = $("body").width() / 2;
            touch.touchY = $("body").height() / 2;
        }

        return touch;
    },
    sideMenu: function () {
        // Configure Side Menu action
        var sideMenu = new aside ("#sideMenu", "#pane");
        // Side menu tap and swipe

        var startDistance = 0;

        $("div.showDrawer").hammer().on("tap", function(event) {
            // On Tap
            touchShadow.draw ($("#pane").css ("z-index") - 1, 'body');
            touchShadow.set (0.64);
            setTimeout(function() {
                touchShadow.destroy (0);
            }, 10);

            sideMenu.showMenu ();
        }).on("dragright", function(event) {
            this.onSwipe = true;
            touchShadow.draw ($("#pane").css ("z-index") - 1, 'body');
            touchShadow.set (0.64 - ((event.gesture.deltaX / MENU_SIZE) * 0.64));

            // if(startDistance < event.gesture.distance) {
                startDistance = event.gesture.distance;
                sideMenu.moveMenu (event.gesture.distance);
            // }

        }).on("dragend", function(event) {
            console.log('END >>>>>>>>>>');

            sideMenu.moveMenu (startDistance, true);

            if (event.gesture.deltaX >= (MENU_SIZE / 3)) {
                sideMenu.showMenu ();
                touchShadow.destroy (0);
            } else {
                sideMenu.hideMenu ();
                touchShadow.destroy (0.64 - ((event.gesture.deltaX / MENU_SIZE) * 0.64));
            }

            startDistance = 0;
            this.onSwipe = false;
        });

        // Side menu hide tap and swipe
        $("#hideMenu").hammer().on("tap", function(event) {
            touchShadow.draw ($("#pane").css ("z-index") - 1, 'body');
            touchShadow.set (0);
            setTimeout(function() {
                touchShadow.destroy (0.64);
            }, 10);

            sideMenu.hideMenu ();
        }).on("dragleft", function(event) {
            this.onSwipe = true;

            touchShadow.draw ($("#pane").css ("z-index") - 1, 'body');
            touchShadow.set ((-event.gesture.deltaX / MENU_SIZE) * 0.64);

            if(!startDistance) startDistance = (MENU_SIZE + event.gesture.deltaX);
            // if(startDistance >= (MENU_SIZE + event.gesture.deltaX)) {
                startDistance = (MENU_SIZE + event.gesture.deltaX);
                sideMenu.moveMenu (startDistance);
                // sideMenu.moveMenu (MENU_SIZE + event.gesture.deltaX);
            // }
        }).on("dragend", function(event) {
            sideMenu.moveMenu (startDistance, true);
            if (event.gesture.deltaX <= -(MENU_SIZE / 3)) {
                sideMenu.hideMenu ();
                touchShadow.destroy (0.64);
            } else {
                sideMenu.showMenu ();
                touchShadow.destroy (0);
            }
            startDistance = 0;
            this.onSwipe = false;
        });
    },
    tapAction: function(actions, target) {
        var items = [];

        $("input").blur ();

        for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
            items = actions[actionIndex].split('/');

            if (items[1] !== undefined) {
                var theItem = (items[2] === undefined) ? $(items[0]) : $(items[0] + " " + items[2]);
                switch (items[1]) {
                    case "select" :
                        var open = function (elem) {
                            console.log ("TODO: This click doesn't work in Desktop");
                            if (document.createEvent) {
                                var e = document.createEvent("MouseEvents");
                                e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                                elem[0].dispatchEvent(e);
                            } else if (element.fireEvent) {
                                elem[0].fireEvent("onmousedown");
                            }
                        }

                        if (app.isTouch ()) {
                            setTimeout (function () {
                                open ($(items[0]));
                            }, 64);
                        } else {
                            open ($(items[0]));
                        }
                    break;
                    case "addClass":
                        $(items[0]).removeClass ("noTransition").addClass (items[2]);
                    break;
                    case "removeClass":
                        $(items[0]).removeClass ("noTransition").removeClass (items[2]);
                    break;
                    case "toggleClass":
                        $(items[0]).removeClass ("noTransition").toggleClass (items[2]);
                    break;
                    case "show":
                        theItem.removeClass ("noTransition").removeClass ("hide positionTop positionBottom positionLeft positionRight");
                    break;
                    case "showQuickly":
                        theItem.addClass ("noTransition").removeClass ("hide positionTop positionBottom positionLeft positionRight");
                    break;
                    case "hide":
                        theItem.removeClass ("noTransition").addClass ("hide");
                    break;
                    case "moveRight":
                        theItem.removeClass ("noTransition").removeClass ("hide positionTop positionBottom positionLeft positionRight");
                    break;
                    case "enable":
                        $(items[0] + " " + items[2]).addClass ("enable noSwipe");
                    break;
                    case "disable":
                        $(items[0] + " " + items[2]).removeClass ("enable noSwipe");
                    break;
                    case "slideUp":
                        theItem.removeClass ("noTransition").addClass ("positionTop");
                    break;
                    case "slideDown":
                        theItem.removeClass ("noTransition").addClass ("positionBottom");
                    break;
                    case "slideLeft":
                        touchShadow.draw ($(items[0]).css ("z-index") - 1);
                        touchShadow.set (0);

                        $(items[0]).removeClass("noTransition").css ("transform", "").removeClass ("positionRight");
                        $(items[2]).removeClass("noTransition").css ("transform", "").addClass ("slightlyLeft");

                        setTimeout(function() {
                            touchShadow.destroy (0.64);
                        }, 32);

                        // Change the Hash
                        this.changeHash (items);
                    break;
                    case "slideRight":
                        touchShadow.draw ($(items[0]).css ("z-index") - 1);
                        touchShadow.set (0.64);

                        if (!this.onSwipeCanceled) {
                            $(items[0]).removeClass("noTransition").css ("transform", "").addClass ("positionRight");
                            $(items[2]).removeClass("noTransition").css ("transform", "").removeClass ("slightlyLeft");

                            setTimeout(function() {
                                touchShadow.destroy (0);
                            }, 32);
                        }

                        this.onSwipeCanceled = false;

                        // Change the Hash
                        this.changeHash (items);
                    break;

                    case "slide":
                        var slideLength = 0;
                        if (window.slideNavPosition === undefined) window.slideNavPosition = 0;

                        $(items[2] + " .prev").css ("opacity", "1");
                        $(items[2] + " .next").css ("opacity", "1");

                        slideLength = $(items[0]).children ().length;

                        if (slideLength > 1) {
                            if (items[3] === "next") {
                                window.slideNavPosition--;
                                if (window.slideNavPosition <= -(slideLength - 1)) {
                                    window.slideNavPosition = -(slideLength - 1);
                                    $(items[2] + " .next").css ("opacity", "0.32");
                                }
                            } else {
                                window.slideNavPosition++;
                                if (window.slideNavPosition >= 0) {
                                    window.slideNavPosition = 0;
                                    $(items[2] + " .prev").css ("opacity", "0.32");
                                }
                            }
                        } else {
                            $(items[2] + " .prev").css ("opacity", "0.32");
                            $(items[2] + " .next").css ("opacity", "0.32");
                        }

                        $(items[0]).children ().each (function (index, value){
                            $(this).css ("transform", "translate3d(" + ((index + window.slideNavPosition) * 100) + "%, 0, 0)");
                        });
                    break;

                    case "messages":
                        switch (items[2]) {
                            case "show":
                                var view = app.get('hive.messages');
                                view.draw(items[3]);
                            break;
                        }
                    break;

                    case "iconUnit":
                        switch (items[2]) {
                            case "show":
                                var view = app.get('hive.iconUnit');

                                view.draw(items[3]);
                            break;
                        }
                    break;

                    case "groupUnit":
                        switch (items[2]) {
                            case "show":
                                var view = app.get('hive.groupUnit');

                                view.draw(items[3]);
                            break;
                        }
                    break;

                    case "floorUnit":
                        switch (items[2]) {
                            case "show":
                                var view = app.get('hive.floorUnit');

                                view.draw(items[3]);
                            break;
                        }
                    break;

                    case "unit":
                        switch (items[2]) {
                            case "select":
                                var unit = $(items[0]);

                                if (unit.attr("data-selected") == "true") {
                                    unit.removeClass("selected").attr("data-selected", "false");
                                } else {
                                    unit.addClass("selected").attr("data-selected", "true");
                                }
                            break;
                            case "delete":
                                var deleteUnits = popup.window(l("deleteUnits"), l("areYouSureDeleteUnits"), {
                                    1: l('yes'),
                                    2: "|" + l('no')
                                });

                                $(deleteUnits).hammer().on("dragstart", function(event) {
                                    popup.close();
                                });
                            break;
                        }
                    break;
                    case "room":
                        switch (items[2]) {
                            case "edit":
                                map.fromToolbar = true;

                                // Activate actions in data-target-deactive
                                dataTarget.enableTarget (items[0] + " .unit", "1,1");
                            break;
                        }
                    break;
                    case "floor":
                        switch (items[2]) {
                            case "delete":
                            case "save":
                            case "cancel":
                            case "show":
                                if (map.actionsFloor) {
                                    map.fromToolbar = true;
                                    map.actionsFloor(items[2], items[0], target);
                                }
                            break;
                        }
                    break;
                }
            }
        }
    },

    register: function (target) {
        if (target == undefined) target = $("[data-target]");

        // Determine the map first position
        target.matrix = 0;
        target.mapX = 0;
        target.mapY = 0;

        // Save the first touch posiiton
        target.firstX = 0;
        target.firstY = 0;
        target.deltaX = 0;
        target.deltaY = 0;
        target.posX = 0;
        target.posY = 0;

        // Common touch action
        target.onSwipe = false;
        target.onSwipeCanceled = false;

        var that = this,
            info = (target == undefined)? "global": target;


        $(target).hammer().on("tap", function(event) {
            var actions = $(this).attr ("data-target").split('|');

            $("input").blur ();

            that.getCurrentTouchCoordinate (event);

            if (!$(this).hasClass ("disableTouch") && !this.onSwipe) {
                that.tapAction(actions, target);
            }
        }).on("dragstart drag dragend", function(event) {
            console.log('masup kesini ....');
            var actions         = $(this).attr ("data-target").split('|'),
                items           = [],
                slideItems      = "",
                freeMoveItems   = "";

            if (!$(this).hasClass ("disableTouch")) {
                for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
                    items = actions[actionIndex].split('/');

                    if (items[1] === "slideRight" && event.gesture.deltaX >= 0) {
                        if (!this.onSwipe) {
                            touchShadow.draw ($(items[0]).css ("z-index") - 1);
                            this.onSwipe = true;
                            this.onSwipeCanceled = false;
                        }

                        $(items[0]).addClass("noTransition").css ("transform", "translate3D(" + event.gesture.deltaX + "px,0,0)");
                        $(items[2]).addClass("noTransition").css ("transform", "translate3D(-" + (16 - ((event.gesture.deltaX / $(window).width ()) * 16)) + "%,0,0)");
                        touchShadow.set (0.64 - (event.gesture.deltaX / $(window).width () / 2));

                        if (event.type === 'dragend') {
                            if (event.gesture.deltaX >= 100) {
                                this.onSwipe = false;
                                $(items[0]).removeClass("noTransition").css ("transform", "").addClass ("positionRight");
                                $(items[2]).removeClass("noTransition").css ("transform", "").removeClass ("slightlyLeft");
                                touchShadow.destroy (0);

                                // Change the Hash
                                touch.changeHash (items);
                            } else {
                                this.onSwipe = false;
                                this.onSwipeCanceled = true;
                                $(items[0]).removeClass("noTransition").css ("transform", "translate3D(0,0,0)");
                                $(items[2]).removeClass("noTransition").css ("transform", "").addClass ("slightlyLeft");
                                touchShadow.destroy (0.64);
                            }
                        }
                    } else if (items[1] === "freeMove") {
                        var isItMove = false;

                        if (!this.onSwipe) {
                            touch.onSwipe = this.onSwipe = true;
                            this.onSwipeCanceled = false;
                            ONSWIPE = false;

                            // Map
                            this.matrix = $(items[0]).css ("transform").split (", ");
                            this.mapX = this.matrix[4];
                            this.mapY = this.matrix[5].split (")");
                            this.mapY = this.mapY[0];

                            // Set the first position
                            this.firstX = event.gesture.center.pageX;
                            this.firstY = event.gesture.center.pageY;
                        }

                        if (event.type === 'drag') {
                            ONSWIPE = true;
                            touch.freezeMap = true;

                            // Count movement delta
                            this.deltaX = -event.gesture.deltaX;
                            this.deltaY = -event.gesture.deltaY;

                            // Assign the position movement
                            this.posX = this.mapX - this.deltaX;
                            this.posY = this.mapY - this.deltaY;

                            $(items[0]).addClass ("noTransition").css ({
                                "transform": "translate3d(" + this.posX + "px," + this.posY + "px,0)",
                                "z-index": "2"
                            });
                        } else if (event.type === 'dragend') {
                            touch.onSwipe = this.onSwipe = false;
                            touch.freezeMap = false;

                            var regExp = /\(([^)]+)\)/,
                                matches = regExp.exec($(items[0]).css('transform')),
                                coords  = matches[1].split(','),
                                x       = parseInt(coords[4].trim()),
                                y       = parseInt(coords[5].trim());

                            if ($(items[0]).hasClass('room')) {
                                var roomId = $(items[0]).attr('id');

                                roomId = roomId.split('-')[1];

                                var model = _.first(_.where(app.get('hive.overview').temporaryData.rooms, { id: parseInt(roomId) }));

                                if (model) {
                                    model.posX = x;
                                    model.posY = y;
                                } else {
                                    model = _.first(_.where(app.get('hive.overview').temporaryData.rooms, { id: roomId }));

                                    if (model) {
                                        model.posX = x;
                                        model.posY = y;
                                    } else {
                                        // Something bad happen
                                        console.log("TODO: make a popup to inform that can't create new room", roomId);
                                    }
                                }
                            }

                            setTimeout(function() {
                                ONSWIPE = false;
                            }, 32);

                            $(items[0]).css ("z-index", "").removeClass ("noTransition");
                        }
                    }
                }
            }
        });
    }
}