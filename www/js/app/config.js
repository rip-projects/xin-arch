;(function(){
	if(!window.config) window.config = {};

	config = {
		name: 		'Kamus Pelayaran',
		desc: 		'kamus Pelayaran',
		version: 	"0.0.1",
		versionCode: 1,
		organization: 'PT. Sagara Xinix Solusitama',
		url: 'http://xinix.co.id',
		package: 	"id.co.xinix.your_app_name",
		environment: 'development',
		TAG: 'Xin Archetype',
		db: {
			// name: 'appDbName.db',
			// version: 1,
			// scheme: 1,
			// package: 'db/dbFile.json'
		},

		api: {
			production: null,
			staging: null,
			testing: null,
			development: null
		}

	};

})();