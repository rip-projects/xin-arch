;(function() {

    window.app = new xin.App({
        el: xin.$('body'),
        directives: {
            '[data-role=app]': xin.directive.AppDirective,
            '[data-role]': xin.directive.RoleDirective,
            '[data-uri]': xin.directive.URIDirective,
            '[data-bind]': xin.directive.BindDirective,
            '[data-value]': ValueDirective
        },
        middlewares: {
            // 'AuthMiddleware': AuthMiddleware
        },
        providers: {

        }

    });

    _.extend(app, {

        config: function(param) {

            if(param) {
                return window.config[param];
            } else {
                return window.config;
            }

        },

        invoke: function(api, param, cb) {
            api = api.split('.');
            if(typeof(param) == "function") {
                window.API[api[0]][api[1]](param);
            } else {
                window.API[api[0]][api[1]](param, cb);
            }
        },

        loading: {

            show: function(options) {
                ActivityIndicator.show(options);
            },
            hide: function() {
                ActivityIndicator.hide();
            }

        }

    });

})();