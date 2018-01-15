// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  // console.log(JSON.stringify(request.headers["user-agent"]));
  //"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
  // console.log(JSON.stringify(request.headers["accept-language"]));
  // console.log(JSON.stringify(request.headers["x-forwarded-for"]));
  //"180.188.197.10,::ffff:10.10.10.171,::ffff:10.10.10.47"
  var ipaddress = request.headers["x-forwarded-for"]
  var numberIp = ipaddress.indexOf(',')
  var software = request.headers["user-agent"]
  var start = software.indexOf('(')
  var stop = software.indexOf(')')
 
  // response.sendFile(__dirname + '/views/index.html');
   var result = {
                ipaddress:ipaddress.slice(0,numberIp),
                language:request.headers["accept-language"],
                software:software.slice(start+1,stop)
              };
   
        if (result) {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(result))
      } else {
        response.writeHead(404)
        response.end()
      }
    })



// app.get("/dreams", function (request, response) {
//   response.send(dreams);
// });

// // could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.bopp.post("/dreams", function (request, response) {
//   dreams.push(request.query.dream);
//   response.sendStatus(200);
// });

// Simple in-memory store for now
// var dreams = [
//   "Find and count some sheep",
//   "Climb a really tall mountain",
//   "Wash the dishes"
// ];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
