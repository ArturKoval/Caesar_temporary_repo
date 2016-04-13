var mongodb = require('mongodb'),
    lock = require('./libs/lock');

console.log('server reset start...');
reset();

function reset (request, response) {
	var MongoClient = mongodb.MongoClient,
		url = 'mongodb://localhost:27017/caeser';
	
    console.log('Please, wait...');

    lock.reset(3).then(function () {
        console.log('All done! Exiting...');
        process.exit();
    });

	getConnection('users', function (collection, db) {
        collection.remove({}, function (err, result) {
            collection.insert(users, function (err, result) {
                    console.log('Succesfully inserted users: ' + result.toString());
                    db.close();
                    lock.check();
                }
            );
        });    
	});
	
	getConnection('groups', function (collection, db) {
        collection.remove({}, function (err, result) {    
    		collection.insert(groups, function (err, result) {
    				console.log('Succesfully inserted groups: ' + result);
    				db.close();
                    lock.check();
    			}
    		);
        });
	});
	
	getConnection('locations', function (collection, db) {
        collection.remove({}, function (err, result) {
    		collection.insert(locations, function (err, result) {
    				console.log('Succesfully inserted locations: ' + result);
    				db.close();
                    lock.check();
    			}
    		);
        });
	});

	function getConnection (name, callback) {
       	MongoClient.connect(url, function (err, db) {
            if (err !== null) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
            	var collection = db.collection(name);
            	callback(collection, db);
            }
        });
    }
}

var users = [{
    "firstName": "John",
    "lastName": "Doe",
    "role": "Teacher",
    "location": "Dnipro",
    "photo": "/default-photo.png",
	"login": "john",
	"password": "1234"
}, {
    "firstName": "Dmytro",
    "lastName": "Petin",
    "role": "Coordinator",
    "location": "Dnipro",
    "photo": "/default-photo.png",
	"login": "dmytro",
	"password": "1234"
}];
			
var locations = [{
    "city": "Dnipro"
}, {
    "city": "Kyiv"
}, {
    "city": "Sofia"
}, {
    "city": "Chernivtsy"
}, {
    "city": "Rivne"
}, {
    "city":"Ivano-Frankivsk"
}, {
    "city": "Lviv"
}];

var groups = [{
    "name": "DP-093-JS",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "WebUI",
    "startDate": "2016-01-02",
    "finishDate": "2016-05-01",
    "teachers": ["D. Petin"],
    "experts": ["N. Varenko"],
    "stage": "in-process",
}, {
    "name": "DP-094-MQC",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "MQC",
    "startDate": "2016-04-20",
    "finishDate": "2016-06-22",
    "teachers": ["D. Petin"],
    "experts": ["I. Kohut"],
    "stage": "in-process"
}, {
    "name": "DP-092-NET",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": ".Net",
    "startDate": "15-02-2016",
    "finishDate": "01-05-2016",
    "teachers": ["O. Reuta"],
    "experts": ["V. Koldovskyy"],
    "stage": "finished"
}, {
    "name": "Lv-087-RD",
    "location": "Lviv",
    "budgetOwner": "SoftServe",
    "direction": "RDBMS",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["O. Krukchov"],
    "experts": ["A. Pertsov"],
    "stage": "finished"
}, {
    "name": "Rv-091-LAMP",
    "location": "Rivne",
    "budgetOwner": "SoftServe",
    "direction": "LAMP",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-1",
    "teachers": ["L. Klakovych"],
    "experts": ["N. Romanenko"],
    "stage": "in-process"
}, {
    "name": "DP-095-JS",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "JavaScript(UI)",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["D. Petin"],
    "experts": ["N. Romanenko"],
    "stage": "boarding"
}, {
    "name": "DP-065-AQC",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "ATQC",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["D. Petin"],
    "experts": ["Testman"],
    "stage": "finished"
}, {
    "name": "DP-027-JS",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "WebUI",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["D. Petin"," I. Tsvietkov"],
    "experts": ["I. Tsvietkov"],
    "stage": "finished"
}, {
    "name": "DP-097-QC",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "MQC",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["D. Petin"],
    "experts": ["M. Omel`chuk"],
    "stage": "boarding"
}, {
    "name": "Lv-084-QB",
    "location": "Lviv",
    "budgetOwner": "SoftServe",
    "direction": "ISTQB",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["I. Tsvietkov"],
    "experts": ["M. Omel`chuk"],
    "stage": "offering"
},
{
    "name": "Lv-045-DL",
    "location": "Lviv",
    "budgetOwner": "SoftServe",
    "direction": "Delphi",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["I. Tsvietkov"],
    "experts": ["M. Omel`chuk"],
    "stage": "in-process"
}, {
    "name": "Lv-077-IOS",
    "location": "Lviv",
    "budgetOwner": "SoftServe",
    "direction": "iOS",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["I. Tsvietkov", "M. Omel`chuk"],
    "experts": ["M. Omel`chuk"],
    "stage": "finished"
}, {
    "name": "Lv-023-UX",
    "location": "Lviv",
    "budgetOwner": "SoftServe",
    "direction": "UX",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["A. Korkuna"],
    "experts": ["I. Tsvietkov"],
    "stage": "in-process"
},
{
    "name": "Sf-089-UX",
    "location": "Sofia",
    "budgetOwner": "SoftServe",
    "direction": "UX",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["A. Korkuna"],
    "experts": ["I. Tsvietkov"],
    "stage": "boarding"
},
{
    "name": "Sf-089-MQC",
    "location": "Sofia",
    "budgetOwner": "SoftServe",
    "direction": "MQC",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["A. Korkuna"],
    "experts": ["I. Tsvietkov"],
    "stage": "in-process"
},
{
    "name": "Sf-089-JS",
    "location": "Sofia",
    "budgetOwner": "SoftServe",
    "direction": "WebUI",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["A. Korkuna"],
    "experts": ["I. Tsvietkov"],
    "stage": "finished"
},
{
    "name": "IF-089-JS",
    "location": "Ivano-Frankivsk",
    "budgetOwner": "SoftServe",
    "direction": "WebUI",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["A. Korkuna"],
    "experts": ["I. Tsvietkov"],
    "stage": "in-process"
},
{
    "name": "Kv-099-LAMP",
    "location": "Kyiv",
    "budgetOwner": "SoftServe",
    "direction": "LAMP",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["A. Korkuna"],
    "experts": ["I. Tsvietkov"],
    "stage": "in-process"
},
{
    "name": "Ch-039-IOS",
    "location": "Chernivtsy",
    "budgetOwner": "SoftServe",
    "direction": "iOS",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["A. Korkuna"],
    "experts": ["I. Tsvietkov"],
    "stage": "in-process"
}
];