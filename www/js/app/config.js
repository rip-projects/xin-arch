;(function(){
	if(!window.config) window.config = {};

	config = {
		name: 		'KamusKu',
		desc: 		'Kamus English - Indonesia',
		version: 	'0.0.1',
		versionCode: 1,
		organization: 'Xinix Technology',
		url: 'http://xinix.co.id',
		package: 	"id.co.xinix.kamusku",
		environment: 'development',
		TAG: 'KamusKu',
		db: {
			name: 		'kamusku.db',
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
				// 	"INSERT INTO payee (user_id, name) VALUES (?,?)": [
				// 		{param: [null, 'Book Store']},
				// 		{param: [null, 'Carrefour']},
				// 		{param: [null, 'Amazon']},
				// 		{param: [null, 'Giant']},
				// 		{param: [null, 'McD']},
				// 		{param: [null, 'KFC']},
				// 		{param: [null, 'Walmart']},
				// 		{param: [null, 'Pertamina']},
				// 		{param: [null, 'Shell']},
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
				// 		},
				// 		{
				// 			param: [null, 'Family'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Child Care']},
				// 					{param: [null, 'Child Education']},
				// 					{param: [null, 'Other']},
				// 					{param: [null, 'Toy']}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			param: [null, 'Food'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Groceries']},
				// 					{param: [null, 'Other']},
				// 					{param: [null, 'Restaurant']},
				// 					{param: [null, 'Snack']}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			param: [null, 'Health Care'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Dental']},
				// 					{param: [null, 'Eye Care']},
				// 					{param: [null, 'Health Insurance']},
				// 					{param: [null, 'Medical']},
				// 					{param: [null, 'Nutrition']},
				// 					{param: [null, 'Other']},
				// 					{param: [null, 'Prescription']}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			param: [null, 'Home Office'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Computer']},
				// 					{param: [null, 'Electronics']},
				// 					{param: [null, 'Office Furniture']},
				// 					{param: [null, 'Office Supply']},
				// 					{param: [null, 'Other']},
				// 					{param: [null, 'Stationery']}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			param: [null, 'Household'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Appliance']},
				// 					{param: [null, 'Consumables']},
				// 					{param: [null, 'Home Maintenance']},
				// 					{param: [null, 'Homeowner Fees']},
				// 					{param: [null, 'Household Tools']},
				// 					{param: [null, 'Misc Household Items']},
				// 					{param: [null, 'other']},
				// 					{param: [null, 'Postage']},
				// 					{param: [null, 'Rent']}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			param: [null, 'Insurance'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Auto']},
				// 					{param: [null, 'Health']},
				// 					{param: [null, 'Home']},
				// 					{param: [null, 'Life']},
				// 					{param: [null, 'Other']}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			param: [null, 'Loans'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Auto']},
				// 					{param: [null, 'Home Equity']},
				// 					{param: [null, 'Mortgage']},
				// 					{param: [null, 'Other']},
				// 					{param: [null, 'Student']}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			param: [null, 'Other'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Other']}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			param: [null, 'Personal'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Clothing']},
				// 					{param: [null, 'Donation']},
				// 					{param: [null, 'Gift']},
				// 					{param: [null, 'Other']},
				// 					{param: [null, 'Personal Care']}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			param: [null, 'Tax'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Other']},
				// 					{param: [null, 'Property Tax']}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			param: [null, 'Travel'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Airplane']},
				// 					{param: [null, 'Car Rental']},
				// 					{param: [null, 'Food']},
				// 					{param: [null, 'Hotel']},
				// 					{param: [null, 'Misc']},
				// 					{param: [null, 'Other']},
				// 					{param: [null, 'Other Transportation']},
				// 					{param: [null, 'Taxi']}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			param: [null, 'Utilities'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Water']},
				// 					{param: [null, 'Cable TV']},
				// 					{param: [null, 'Electric']},
				// 					{param: [null, 'Garbage & Recycling']},
				// 					{param: [null, 'Gas']},
				// 					{param: [null, 'Internet']},
				// 					{param: [null, 'Telephone']}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			param: [null, 'Vacation'],
				// 			children: {
				// 				"INSERT INTO sub_category (expense_category_id, user_id, name) VALUES (?, ?, ?)": [
				// 					{param: [null, 'Airplane']},
				// 					{param: [null, 'Car Rental']},
				// 					{param: [null, 'Food']},
				// 					{param: [null, 'Hotel']},
				// 					{param: [null, 'Misc']},
				// 					{param: [null, 'Other']},
				// 					{param: [null, 'Other Transportation']},
				// 					{param: [null, 'Taxi']}
				// 				]
				// 			}
				// 		},
				// 	],
				// 	"INSERT INTO payment_method (user_id, name) VALUES (?,?)": [
				// 		{param: [null, 'Cash']},
				// 		{param: [null, 'Check']},
				// 		{param: [null, 'Credit Card']},
				// 		{param: [null, 'Debit']},
				// 		{param: [null, 'Electric Transfer']}
				// 	],
				// 	"INSERT INTO status (user_id, name) VALUES (?,?)": [
				// 		{param: [null, 'Uncleared']},
				// 		{param: [null, 'Cleared']},
				// 		{param: [null, 'Reconciled']},
				// 		{param: [null, 'Void']}
				// 	],
				// 	"INSERT INTO tag (user_id, name) VALUES (?,?)": [
				// 		{param: [null, 'Business']},
				// 		{param: [null, 'Vacation']},
				// 		{param: [null, 'Project']},
				// 		{param: [null, 'Client']},
				// 		{param: [null, 'Untracked']},
				// 		{param: [null, 'Reimburse']}
				// 	],

				// }
			}
		},

		api: {
			production: null,
			staging: null,
			testing: null,
			development: null
		}

	};

})();