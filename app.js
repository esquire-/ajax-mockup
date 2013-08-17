//Setup
var express = require('express');
var qs = require('querystring');

var app = express();

//Declarations
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));

//Home
app.get('/', function(req, res) {
	res.render('index',
		{ title : 'Home'}
		);
});

//Ajax lookup
app.get('/lookup/:q', function(req, res) {
	var q = req.params.q;
	q = qs.unescape(q);
	var r = findLookup(q);
	res.json(r);
});

//We're not using a database, just an array
var lookupStrings = new Array();
lookupStrings.push("foo");
lookupStrings.push("bar");
lookupStrings.push("baz");

//Search function
function findLookup(s) {
	var b = false;
	if(lookupStrings.indexOf(s) != -1) {
		b = true;
	}
	var ret = new Object();
	ret.taken = b;
	return ret;
}

//Start
var port = 4000;
app.listen(port);
console.log('Server started on port ' + port);