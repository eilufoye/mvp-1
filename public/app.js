var express = require('express');

var app = express();

app.get('/', function(req, res){

	// res.send('this is the homepage baby');
		res.sendFile(__dirname + '/index.html');

})


app.get('/dash', function(req, res){

	res.send('this is the dashbaor man');
})


app.get('/profile/:id', function(req, res){

	res.send('you requested to see a profile with the id of '+ req.params.id);
})
app.listen(3000);