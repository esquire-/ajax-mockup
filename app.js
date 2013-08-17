var express = require('express');
var qs = require('querystring');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index',
		{ title : 'Home'}
		);
});

app.get('/lookup/:q', function(req, res) {
	var q = req.params.q;
	q = qs.unescape(q);
	var r = findLookup(q);
	res.json(r);
});

var lookupStrings = new Array();
lookupStrings.push("foo");
lookupStrings.push("bar");
lookupStrings.push("baz");

function findLookup(s) {
	var b = false;
	if(lookupStrings.indexOf(s) != -1) {
		b = true;
	}
	var ret = new Object();
	ret.taken = b;
	return ret;
}

app.listen(4000);
console.log('Server started.');