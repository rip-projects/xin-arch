;(function(){
	if(!window.config) window.config = {};

	config = {
		name: 		'KamusKu',
		desc: 		'Kamus English - Indonesia',
		version: 	'0.0.1',
		versionCode: 1,
		organization: 'Xinix Technology',
		url: 'http://xinix.co.id/product/kamusku',
		package: 	"id.co.xinix.kamusku",
		environment: 'development',
		TAG: 'KamusKu',
		db: {
			// name: 		'kamusku.db',
			version: 	1,
			scheme: 	'0.0.1',
			fileName: 	'enid.zip',
			package: 	'http://192.168.0.16/cdn/kamusku/enid.zip',
			packageType: 'zip',
			log: 		{1: '0.0.1'},
			schemes: {
				'0.0.1': [
					'CREATE TABLE IF NOT EXISTS dictionary			(id TEXT PRIMARY KEY, from TEXT, to TEXT, term TEXT, pron TEXT)',
					'CREATE TABLE IF NOT EXISTS bookmark			(dictionary_id TEXT)',
					'CREATE TABLE IF NOT EXISTS definition			(id INTEGER PRIMARY KEY, dictionary_id TEXT, definition TEXT)',
					'CREATE TABLE IF NOT EXISTS translation			(id INTEGER PRIMARY KEY, dictionary_id TEXT, translation TEXT)',
					'CREATE TABLE IF NOT EXISTS favorite			(dictionary_id TEXT)',
					'CREATE TABLE IF NOT EXISTS history				(id TEXT PRIMARY KEY, term TEXT)',
					'CREATE TABLE IF NOT EXISTS most_searched		(dictionary_id TEXT, counter INTEGER)',
					'CREATE TABLE IF NOT EXISTS notes				(dictionary_id TEXT, note TEXT)',
				]
			},
			collections: {
				// default value apllication
				// '0.0.1': {
				// 	"INSERT INTO payer (user_id, name) VALUES (?,?)": [
				// 		{param: [null, 'My Employer']},
				// 		{param: [null, 'My Bank']},
				// 		{param: [null, 'My Government']},
				// 		{param: [null, 'My Pension']},
				// 		{param: [null, 'NA']},
				// 	],
				// 	"INSERT INTO expense_category (user_id, name) VALUES (?,?)": [
				// 		{
				// 			param: [null, 'Automobile'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'AAA or Road Services']},
				// 					{param: [null, 'Fuel']},
				// 					{param: [null, 'Insurance']},
				// 					{param: [null, 'Lease']},
				// 					{param: [null, 'Maintenance']},
				// 					{param: [null, 'Mileage']},
				// 					{param: [null, 'Other']},
				// 					{param: [null, 'Registration & Tax']}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			param: [null, 'Entertainment'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Concert']},
				// 					{param: [null, 'Movies']},
				// 					{param: [null, 'Other']},
				// 					{param: [null, 'Party']},
				// 					{param: [null, 'Sports']}
				// 				]
				// 			}
				// 		}
				// 	]
				// }
			}
		},

		api: {
			production: null,
			staging: null,
			testing: null,
			development: null
		},

		getApi: function(path) {
			return app.config('api')[app.config('environment')] + path;
		},

		uri: {
			// packages: {
			// 	enid: '/cdn/kamusku/enid.zip',
			// 	iden: '/cdn/kamusku/iden.zip'
			// }
		}

	};

})();