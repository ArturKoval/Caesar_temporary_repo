var http = require('http'),
	mongodb = require('mongodb');

http.createServer(reset).listen(3000);
console.log('server reset...');

function reset (request, response) {
	var MongoClient = mongodb.MongoClient,
		url = 'mongodb://localhost:27017/caeser';
		
	getConnection('users', function (collection, db) {
        collection.remove({}, function (err, result) {
            collection.insert(users, function (err, result) {
                console.log(err)
                    console.log('Succesfully inserted users: ' + result.toString());
                    db.close();
                }
            );
        });    
	});
	
	getConnection('groups', function (collection, db) {
        collection.remove({}, function (err, result) {    
    		collection.insert(groups, function (err, result) {
    				console.log('Succesfully inserted groups: ' + result);
    				db.close();
    			}
    		);
        });
	});
	
	getConnection('locations', function (collection, db) {
        collection.remove({}, function (err, result) {
    		collection.insert(locations, function (err, result) {
    				console.log('Succesfully inserted locations: ' + result);
    				db.close();
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
    "role": "ITA Teacher",
    "location": "Dnipro",
    "photo": "/default-photo.png",
	"login": "john",
	"password": "1234"
}, {
    "firstName": "Dmytro",
    "lastName": "Petin",
    "role": "ITA Coordinator",
    "location": "Dnipro",
    "photo": "/default-photo.png",
	"login": "dmytro",
	"password": "1234"
}];
			
var locations = [{"city": "Dnipro"}, {"city": "Kiev"}, {"city": "Sofia"}, {"city": "Chernivtsy"}, {"city": "Rivne"}];
var groups = [{
    "name": "DP-093-JS",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "Web UI",
    "startDate": "2016-01-02",
    "finishDate": "2016-05-01",
    "teachers": ["Dmytro Petin"],
    "experts": ["Nodarii"],
    "stage": "in process"
}, {
    "name": "DP-094-MQC",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "Manual Control Quality Systems",
    "startDate": "2016-04-20",
    "finishDate": "2016-06-22",
    "teachers": ["Dmytro Petin"],
    "experts": ["Testman"],
    "stage": "in process"
}, {
    "name": "DP-092-NET",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "ASP.NET developing",
    "startDate": "15-02-2016",
    "finishDate": "01-05-2016",
    "teachers": ["Dmytro Petin"],
    "experts": ["Testman"],
    "stage": "in process"
}, {
    "name": "Lv-087-MQC",
    "location": "Lviv",
    "budgetOwner": "SoftServe",
    "direction": "Manual Control Quality Systems",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["Oleg Krukchov"],
    "experts": ["Testman"],
    "stage": "finished"
}, {
    "name": "Rv-091-MQC",
    "location": "Rivne",
    "budgetOwner": "SoftServe",
    "direction": "Manual Control Quality Systems",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-1",
    "teachers": ["Danylo Golubev"],
    "experts": ["Testman"],
    "stage": "in process"
}, {
    "name": "DP-095-JS",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "Web UI",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["Dmytro Petin"],
    "experts": ["Testman"],
    "stage": "planned"
}, {
    "name": "DP-065-QC",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "Manual Control Quality Systems",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["Dmytro Petin"],
    "experts": ["Testman"],
    "stage": "planned"
}, {
    "name": "DP-027-JS",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "Web UI",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["Dmytro Petin"],
    "experts": ["Testman"],
    "stage": "planned"
}, {
    "name": "DP-035-QC",
    "location": "Dnipro",
    "budgetOwner": "SoftServe",
    "direction": "Manual Control Quality Systems",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["Dmytro Petin"],
    "experts": ["Testman"],
    "stage": "planned"
}, {
    "name": "Lv-084-MQC",
    "location": "Lviv",
    "budgetOwner": "SoftServe",
    "direction": "Manual Control Quality Systems",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["Oleg Krukchov"],
    "experts": ["Testman"],
    "stage": "finished"
}, {
    "name": "Lv-077-MQC",
    "location": "Lviv",
    "budgetOwner": "SoftServe",
    "direction": "Manual Control Quality Systems",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["Oleg Krukchov"],
    "experts": ["Testman"],
    "stage": "finished"
}, {
    "name": "Lv-023-MQC",
    "location": "Lviv",
    "budgetOwner": "SoftServe",
    "direction": "Manual Control Quality Systems",
    "startDate": "2016-02-15",
    "finishDate": "2016-05-01",
    "teachers": ["Oleg Krukchov"],
    "experts": ["Testman"],
    "stage": "finished"
}];