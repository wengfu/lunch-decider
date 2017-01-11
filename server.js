var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendfile('index.html', {root: ''});
});

app.listen(3000, function(){
  console.log('Express server listening on port 3000');
});