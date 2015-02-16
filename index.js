var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    api = require('./server/api'),
    router = express.Router();

app.use(express.static(__dirname + '/dist'))
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use('/api', api)

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)
})
