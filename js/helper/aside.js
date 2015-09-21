function aside (menu, viewport) {
    this.menu = menu;
    this.viewport = viewport;
    this.hideClass = "hide";
    this.hideId = "hideMenu";
    this.hide = "hideMenu";

    this.moveMenu = function (distance, end) {
        end = (end)? "all 0.3s;" : "";
        $("#pane").addClass("noTransition").css ({"transform": "translate3D(" + distance + "px,0,0)", "transition": end});
        // $("#sideMenu").addClass("noTransition").css ("transform", "translate3D(-" + (16 - ((distance / MENU_SIZE) * 16)) + "%,0,0)");
    };
    this.showMenu = function () {
        $('[data-role="pane"]').addClass('toggleDrawer');
        $(this.viewport).removeClass("noTransition").css ("transform", "translate3d(" + MENU_SIZE + "px, 0, 0)");
        $(this.menu).removeClass("noTransition").css ("transform", "").removeClass ("slightlyLeft");
        $("#" + this.hideId).removeClass (this.hideClass);
    };
    this.hideMenu = function () {

        $('[data-role="pane"]').removeClass('toggleDrawer');
        window.menuId = "";
        $(this.viewport).removeClass("noTransition").css ("transform", "translate3d(0, 0, 0)");
        $(this.menu).removeClass("noTransition").css ("transform", "").addClass ("slightlyLeft");

        window.menuSideObject = this;
        // window.setTimeout (function () {
            $("#" + menuSideObject.hideId).addClass (menuSideObject.hideClass);
        // }, 512);
    };

    if ($("#" + this.hideId).length <= 0) $(this.viewport).append ("<div id='" + this.hideId + "' class='" + this.hideClass + "' />");
}
