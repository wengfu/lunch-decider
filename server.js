var express = require('express');
var app = express();

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
  res.sendfile('index.html', {root: __dirname + '/app'});
});

app.listen(3001, function(){
  console.log('Express server listening on port 3001');
});