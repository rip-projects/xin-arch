if(!window.API) window.API = {};

window.API.db = {

	db: null,
	init: function(callback) {

		this.db = window.sqlitePlugin.openDatabase({name: app.config('db').name });

		this.db.transaction(function(tx) {
			// the main table: dictionary
			tx.executeSql('CREATE TABLE IF NOT EXISTS dictionary 	(id INTEGER PRIMARY KEY, keyword TEXT, description TEXT)');
			// bookmark table
			tx.executeSql('CREATE TABLE IF NOT EXISTS bookmark 		(id INTEGER PRIMARY KEY, dictionary_id INTEGER)');
			// what word the most read by user
			tx.executeSql('CREATE TABLE IF NOT EXISTS favorite 		(id INTEGER PRIMARY KEY, dictionary_id TEXT)');
			// keyword most searched by user, triggered by key up wait for 3 sec, or trigger submit
			tx.executeSql('CREATE TABLE IF NOT EXISTS keyword 		(id INTEGER PRIMARY KEY, keyword TEXT, count INTEGER)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS db_app 		(id INTEGER PRIMARY KEY, name TEXT, version INTEGER, scheme INTEGER)');
			if(callback) callback();
		});

	},

	findWord: function(word, callback) {

		this.db.transaction(function(tx) {
			tx.executeSql("SELECT * FROM dictionary WHERE keyword LIKE '%"+word+"%';", [], function(tx, res) {
				if(callback) callback(res);
			}, function(e) {
				if(callback) callback([]);
			});
		});

	},

	isDbExist: function(callback) {

		var exists = false;

		this.db.transaction(function(tx) {

			tx.executeSql("SELECT * FROM db_app;", [], function(tx, res) {
				if(res.rows.length) exists = true;
				if(callback) callback(exists);
			}, function(e) {
				if(callback) callback(exists);
			});

		});

	},

	doPackage: function(callback) {

		var that = this,
			jobs = [],
			_data = [],
			index = 0;

		$.getJSON( app.config('db').package, function( data ) {

			$('body').prepend('<section id="splashscreen" class="splashscreen"><span>Indexing Database <i class="fa fa-spinner fa-spin"></i></span></section>');

			for (var i = 0; i < data.length; i++) {

				_data.push(data[i]);
				jobs.push(function() {

                    var perc = parseFloat(((index / _data.length ) * 100).toFixed(2));
					$('#splashscreen span').html('Indexing Database ' + perc + '%');

					that.db.transaction(function(tx) {

						tx.executeSql("INSERT INTO dictionary (keyword, description) VALUES (?,?)", [_data[index].name, _data[index].description], function(tx, res) {
							index++;
							if(jobs[index]) jobs[index]();
							else { // finish

								var _db = app.config('db');
								tx.executeSql("INSERT INTO db_app (name, version, scheme) VALUES (?, ?, ?)", [_db.name, _db.version, _db.scheme], function(tx, res) {
									$('#splashscreen').remove();
									if(callback) callback();
								});
							}
						});
					});

				});

			}

			jobs[0]();

		});
	}

};