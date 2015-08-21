;(function(){
	if(!window.config) window.config = {};

	config = {
		name: 		'Your Application name',
		desc: 		'Your Application description',
		version: 	'0.0.1',
		versionCode: 1,
		organization: 'Xinix Technology',
		url: 'http://xinix.co.id/your_awesome_app',
		package: 	"id.co.xinix.your_awesome_app",

		// Change the environment as your needs
		environment: 'development', // production, staging, testing, development

		TAG: 'MyTaggingOfApplication',
		db: {
			name: 		'app.db',
			version: 	1,
			scheme: 	'0.0.1',
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
			development: null,
		},

		getApi: function(path) {
			var split = path.split('.'),
				res = app.config('uri');
			for (var i = 0; i < split.length; i++) {
				res = res[split[i]];
			}
			return app.config('api')[app.config('environment')] + res;
		},

		uri: {
			user: {
				register: 	'/user/register',
				forgot: 	'/user/forgot',
				login: 		'/user/login'
			}
		},

	};

})();