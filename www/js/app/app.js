;(function() {

    window.AuthMiddleware = function() {};

    _.extend(AuthMiddleware.prototype, {
        call: function(a) {

            var d = xin.Deferred();
            if (location.hash === '#login.html') {
                location.href = 'login.html';
                d.reject();
            } else if (location.hash === '#signup.html') {
                location.href = 'signup.html';
                d.reject();
            } else {
                d.resolve();
            }
            return d.promise();
        }
    });

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
            'AuthMiddleware': AuthMiddleware
        },
        providers: {

        }

    });

    _.extend(app, {
        user: {},
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
                delete arguments[0];
                var opt = [],
                    j = 0;
                for (var i in arguments) {
                    opt.push(arguments[i]);
                }
                window.API[api[0]][api[1]].apply(this, opt);
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