;(function(){
    'use strict';
    if(!window.API) window.API = {};

    window.API.user = {
        _login: {},

        changepwd: function(form, cb) {

            var that = this;

            $.post(API.config.api.baseUrl + 'user/password/change/', form)
            .done(function(data) {
                if (data.success) {

                    that.login({
                        username: form.username,
                        password: form.newpass
                    }, cb);

                } else {
                    cb(null,{error : 'error'});
                    return;
                }

            })
            .fail(function(data) {
                app.showMessage('Your password could not be changed.','error');
                return;
            });
        },

        autologin: function(form, cb) {

            var that = this,
                params = ['null',1],
                sql = 'SELECT * FROM user WHERE username != ? AND is_login = ?';

            app.sqlite.query(sql,params,function(user,err){

                if (err || !user) {
                    cb();
                } else {
                    if(user.length){
                        that.login(user[0], cb);

                    }
                }
            });
        },

        login: function(form, cb) {

            var that = this;

            $.ajax({
                url:        API.config.api.baseUrl + 'connection/check/',
                timeout:    5000
            }).done(function(data) {

                $.post(API.config.api.baseUrl + 'user/login/', form)
                .done(function(data) {
                    if (data.success) {
                        var user = data.data;
                        if (data.data.length) {
                            user = data.data[0];
                        }
                        var oUser = {
                            username: user.username,
                            password: form.password,
                            name: user.nama,
                            address: user.alamat,
                            postal_code: user.kodepos,
                            point: user.price,
                            discount: user.discount
                        };

                        that.after_login(oUser, function() {
                            cb(oUser);
                        });
                    } else {
                        cb(new Error('Cannot login'));
                        return;
                    }

                })
                .fail(function(data) {
                    app.showMessage('Cannot login.','error');
                    return;
                });

            })
            .fail(function(data) {

                var user = app.getUser(),
                    params = [form.username || '', form.password || ''],
                    sql = 'SELECT * FROM user WHERE username = ? AND password = ?';

                app.sqlite.query(sql,params,function(data){
                    var _data = data[0];
                    if (data.length) {
                        _data.autologin = true;
                        that.after_login(_data, function(data) {
                            cb(data);
                        });
                    }

                });

            });

        },

        after_login: function(form, cb) {
            // console.log(form);
            var that = this;

            that._login = {
                username: form.username,
                password: form.password,

            };
            // var db = DB.get(DB.OPEN_READWRITE);
            try {

            var params = [form.username,'null'],
                sql = 'DELETE FROM user WHERE username = ? OR username = ?';

                app.sqlite.delete(sql,params,function(res){

                    params = [form.username, form.password, form.name, form.address, form.postal_code, 1, form.point, form.discount];
                    sql = 'INSERT INTO user(username, password, name, address, postal_code,is_login, point, discount) VALUES(?,?,?,?,?,?,?,?)';
                    app.sqlite.insert(sql,params,function(res){
                        // console.log('user login ');
                        app._profile = form;
                        app._user = {
                            username: form.username,
                            password: form.password
                        };

                        Alkitab.User.data.set(form);
                        // console.log(form);

                        // if(typeof(form.autologin) != 'undefined'){
                            app.invoke('bundle.clean_downloads');
                            app.invoke('bundle.update_remote');
                        // }

                        if (cb) cb(form);
                    });

                });

            } catch(e) {
                console.log(e);
                // db.run('ROLLBACK');
            }

        },

        after_logout: function(form, cb) {
            var that = this;
            app.invoke('bundle.clean_downloads');
            app.sqlite.update('UPDATE user SET is_login = 0 WHERE username = ?', [that._login.username]);
            that._login = {};
            if (cb) cb();
        },

        register: function(form, cb) {
            var that = this;
            $.post(API.config.api.baseUrl + 'user/register/', form)
            .done(function(data) {

                if(data.error){

                    Alkitab.User.data.set({
                        username: form.username,
                        password: form.password
                    });

                    app.loading.hide();
                    app.showMessage('Register user baru gagal, email yang anda masukkan sudah aktif sebagai user!', 'error');

                }

                if(data.success){
                    that.login({
                        username: form.username,
                        password: form.password
                    }, cb);
                }

            })
            .fail(function(data) {
                app.loading.hide();
                app.showMessage('Connection error', 'error');
            });
        },

        token: function(form, cb) {

            var that = this;
            $.post(API.config.api.baseUrl + 'user/token/', form)
            .done(function(data) {
                if(cb) cb(data);
            })
            .fail(function(data) {
                app.loading.hide();
                app.showMessage('Connection error', 'error');
            });
        },

        getFb: function(form, cb) {

            var that = this,
                params = [form.username || ''],
                sql = 'SELECT * FROM user_fb WHERE username = ?';

            app.sqlite.query(sql, params, function(data) {
                if(cb) cb(data);
            });

        },

        getAuth: function(form, cb) {

            var that = this,
                params = [form.username || ''],
                sql = 'SELECT * FROM user_auth WHERE username = ?';

            app.sqlite.query(sql, params, function(data) {
                if(cb) cb(data);
            });

        },

    };

})();