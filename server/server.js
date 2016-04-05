var http = require('http'),
    fs = require('fs'),
    path = require('path');
    body = [],
    hash=[];
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/academy';

http.createServer(function(request, response) {
   startFileServer(request, response);
}).listen(3000);

function startFileServer (request, response) {
    var fileExtentions = {'.html':'text/html','.css':'text/css','.js':'text/javascript', '.json':'text/json'},
        filePath = checkBuildTypeAndPath() + request.url,
        id = request.url.replace('/locations/',''),
        extention = path.extname(request.url), 
        type = fileExtentions[extention],
        method = request.method;
   
        MongoClient.connect(url, function(err, db) {
              assert.equal(null, err);
              fs.exists(filePath, function (exists) {
                    switch (request.url) {
                        case '/locations' :
                            switch (method) {
                                case 'GET': 
                                    response.writeHead(200, {'Content-Type': type});
                                    findLocs(db, function () {
                                        console.log(hash);
                                        response.writeHead(200);
                                        response.write(JSON.stringify(hash));
                                        response.end();
                                        db.close();
                                    });
                                    
                                break;

                                case 'POST':
                                    request.on('data', function (chunk) {
                                        body.push(chunk);
                                    });

                                    request.on('end', function () {
                                        body = Buffer.concat(body).toString();
                                        body = JSON.parse(body);
                                        insertLocs(db, body, function () {
                                            db.close();
                                            response.writeHead(200);
                                            response.write(JSON.stringify(body)); 
                                            response.end();
                                        });
                                    });
                                break;
                            }
                            break;

                        case '/locations/'+ id :
                            switch (method) {
                                case 'PATCH':
                                  request.on('data', function (chunk) {
                                      body.push(chunk);
                                  });

                                request.on('end', function () {
                                    body = Buffer.concat(body).toString();
                                    body = JSON.parse(body);
                                    updateLocs(db, {city: body.city}, body, function () { // !!!! изменить
                                          db.close();
                                        response.writeHead(200);
                                        response.write(JSON.stringify(body));
                                        response.end();
                                    });
                                });
                                break;

                                case 'DELETE': 
                                  var res =  db.collection('locations').remove({_id: id}, function () {
                                    console.log(res);
                                    db.close();
                                     response.writeHead(200);
                                     response.end();
                                  });
                                 
                                break;
                            }
                        break;

                        default:
                        if (request.url.indexOf('.')>-1) {
                            fs.exists(filePath, function (exists) {
                                if (exists) {
                                  fs.readFile(filePath, function (err, data){
                                      console.log(filePath);
                                      response.writeHead(200, {'Content-Type': type});
                                      response.write(data);
                                      response.end();
                                      db.close();
                                  });
                                } else {
                                  fs.readFile('../client/home.html', function (err, data){
                                      //console.log(filePath);
                                      response.writeHead(200, {'Content-Type': 'text/html'});
                                      response.write(data);
                                      response.end();
                                      db.close();
                                  });
                                }
                          });
                        } else {
                              response.writeHead(500);
                              response.end();
                        }
                        
                            
                    }
              });
              //db.close();
        });

   
    }

function findLocs (db, callback) {
   hash = [];
   var cursor = db.collection('locations').find();
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        hash.push(doc);
      } else {
        callback();
      }
   });
};

function updateLocs (db, criteria, object, callback) {
    db.collection('locations').update(criteria, object, callback);
}

function insertLocs (db, document, callback) {
    db.collection('locations').insert(document, callback);
}

function generateId (arr) {
    var max=0;
    arr.forEach(function (model, id) {
        if (max < id) {
            max = id;
        }
    });
    return max+1;
}

function checkBuildTypeAndPath () {
  var arguments = process.argv,
      projectPath = '';
  if (arguments[2] === '-p') {
     projectPath = 'server/public'; // build type = debugging
  } else {
      projectPath = '../client'; // buildType = production
  }
  return projectPath;
}

console.log('Server started! Browse to http://localhost:3000/home.html');