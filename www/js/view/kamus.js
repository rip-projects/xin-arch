;(function(){
    'use strict';

    $(window).bind('orientationchange', function () {
        var view = app.get('kamus');
        view.$el.find('[data-region="body"]').css({height: $(window).height(), overflow: 'auto'});
    });

    $('.overlay, .exit').on('click', function(evt) {
        $('.overlay, .exit').addClass('hide');
        $('li.viewDetail.active').removeClass('active').addClass('wrapText');
    });

    window.Kamus = xin.ui.View.extend({
        _isLoading: false,
        word: null,
        limit: 25,
        page: 0,
        rows: [],
        events: _.defaults({
            'click .triggerSearch': 'triggerSearch',
            'click .viewDetail': 'viewDetail',
            'keyup .form-search input': 'findWord',
            'scroll .container': 'scrolling',
            'click .overlay, .exit': 'hide'
        }, xin.ui.View.prototype.events),

        hide: function(evt) {
            var view = app.get('kamus');
            $('.overlay, .exit').addClass('hide');
            view.$el.find('.viewDetail.active').removeClass('active').addClass('wrapText');
        },

        scrolling: function(evt) {

            console.log(evt);
            var view = app.get('kamus');
            var $container = view.$el.find('[data-region="body"]');
            var $content = view.$el.find('.result');
            if ($container.scrollTop() >= ($content.height() - $container.height())) {
                if (!this._isLoading) {
                    this.loadOnScroll();
                }
            }

        },

        loadOnScroll: function() {

            var that = this,
                view = app.get('kamus');

            that._isLoading = true;

            $.when((function() {
                var def = new $.Deferred();

                setTimeout(function(){

                    var result = that.load(that.rows, that.limit, that.page);
                    that.page += 1;
                    view.$el.find('div.result ul.list-group').append(result);

                    def.resolve();

                }, 800);

                return def.promise();

            })()).done(function() {

                that._isLoading = false;
                that.page += 1;
                return;

            });
        },

        load: function(rows, limit, page) {

            var _from = (page * limit),
                _end = (page + 1) * limit,
                result = '';
            for (var i = _from; i < _end; i++) {
                var item = rows.item(i);
                if(item) {
                    result += '<li class="viewDetail plain wrapText"><a><p class="title">'+item.keyword+'</p><p class="desc wrap">'+item.description+'</p></a></li>';
                } else {
                    break;
                }
            }
            return result;
        },

        findWord: function(evt) {

            $('.loading').removeClass('hide');
            var that = this;
            this.word = $(evt.target).val();
            if(!this.word) {
                $('.loading').addClass('hide');
                var view = app.get('kamus');
                view.$el.find('div.result ul.list-group').html(null);
            } else {

                app.invoke('db.findWord', this.word, function(res){
                    that.setRows(res);
                });

            }
        },

        setRows: function(res) {

            this.rows = res.rows;
            this.page = 0;
            this._isLoading = false;

            var view = app.get('kamus');

            if(!this.rows.length) {
                view.$el.find('div.result ul.list-group').html('<li class="noResult"><p>Tidak ditemukan untuk <b>'+this.word+'</b></p></li>');
            } else {
                var result = this.load(this.rows, this.limit, this.page);
                this.page += 1;
                view.$el.find('div.result ul.list-group').html(result);
            }

            $('.loading').addClass('hide');
        },

        viewDetail: function(evt) {
            var view = app.get('kamus');
            view.$el.find('.result .listview .list-group li').addClass('wrapText').removeClass('active');
            $(evt.target).parents('li').removeClass('wrapText').addClass('active');
            $('.overlay, span.exit').removeClass('hide');
        },

        triggerSearch: function(evt) {
            var view = app.get('kamus');
            view.$el.find('[data-region="body"]').addClass("searching");
            view.$el.find('.form-search input').focus();

        }

    });

})();