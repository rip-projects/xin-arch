;(function(){
    'use strict';

    window.AuthMiddleware = function() {};

    var inArray = function(needle, arrhaystack) {
        var res = false;
        for (var i in arrhaystack) {
            if(needle.indexOf(arrhaystack[i]) > -1){
                res = true; break;
            }
        }
        return res;
    };

    var
    hideTabstripOnPage = ['login', 'register'],
    hideTabstrip = function() {
        if(!inArray(location.hash, hideTabstripOnPage)) {
            $('.tabstrip').removeClass('hide');
        } else {
            $('.tabstrip').addClass('hide');
        }
    };

    _.extend(AuthMiddleware.prototype, {

        call: function(a) {

            hideTabstrip();

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

})();