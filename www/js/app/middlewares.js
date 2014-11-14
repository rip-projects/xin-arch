;(function(){
    'use strict';
    window.AuthMiddleware = function() {};

    _.extend(AuthMiddleware.prototype, {
        call: function(a) {
            var d = xin.Deferred();
            if (location.hash != '#login' && !sessionStorage.getItem('username')) {
                location.hash = '#login';
                d.reject();
            } else {
                d.resolve();
            }
            return d.promise();
        }
    });

})();