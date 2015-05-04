if(!window.API) window.API = {};

window.API.db = {

	db: null,

	init: function(callback) {

		var that = this,
			db = app.config('db'),
			scheme = db.scheme,
			schemes = db.schemes[scheme];

		app.db = window.sqlitePlugin.openDatabase({name: app.config('db').name, location: 1});
		app.db.transaction(function(tx) {
			// execute db default scheme
			for (var i = 0; i < that.schemes.default.length; i++) {
				tx.executeSql(that.schemes.default[i]);
			}
			// execute db from user configuration
			for (var j = 0; j < schemes.length; j++) {
				tx.executeSql(schemes[j]);
			}

			if(callback) callback();
		});
	},

	schemes: {
		default: [
			'CREATE TABLE IF NOT EXISTS application	(id INTEGER PRIMARY KEY, name TEXT, description TEXT, keyword TEXT, url TEXT, version TEXT, version_number INTEGER, db_name TEXT, db_scheme TEXT, db_scheme_number INTEGER)',
			'CREATE TABLE IF NOT EXISTS setting		(id INTEGER PRIMARY KEY, app_version TEXT, environment TEXT, api_production TEXT, api_staging TEXT, api_development TEXT)',
			'CREATE TABLE IF NOT EXISTS language	(id INTEGER PRIMARY KEY, app_version TEXT, key TEXT, id TEXT, en TEXT)',
			'CREATE TABLE IF NOT EXISTS user		(id INTEGER PRIMARY KEY, username TEXT, first_name TEXT, last_name TEXT, email TEXT, password TEXT)'
		]
	},

	query: function(query, param, callback) {

		app.db.transaction(function(tx) {

			tx.executeSql(query, param, function(tx, res) {
				if(callback) callback(res);
			}, function(e) {
				if(callback) callback([]);
			});

		});

	},

	isDbExist: function(callback) {

		var exists = false;

		app.db.transaction(function(tx) {

			tx.executeSql("SELECT * FROM application;", [], function(tx, res) {
				if(res.rows.length) exists = true;

				console.log('res.rows');
				console.log(res.rows);

				if(callback) callback(exists);
			}, function(e) {
				console.log('res.rows yYy');
				if(callback) callback(exists);
			});

		});

	},

	doPackage: function(path, manifest, callback, progressCB) {

	}

};