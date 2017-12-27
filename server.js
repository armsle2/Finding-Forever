var express = require('express');
var bodyParser = require('body-parser');
var friends = require('./app/data/friends');
// console.log(friends);

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}) );
app.use(bodyParser.json());
app.use(express.static('./app/public'));

app.get('/', function(req, res){
	res.send(friends[0].photo);
});

app.get('/api/friends', function(req, res){
	res.json(friends);
});


app.listen(PORT, function(){
	console.log(`Listening to PORT ${PORT}`);
});