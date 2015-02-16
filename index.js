var express = require('express'),
    app = express(),
    router = express.Router();

app.use(express.static(__dirname + '/dist'))
app.use(express.static(__dirname + '/public'))

router.get('/', function(req, res) {
  res.json({ message: 'Hey'});
})
router.post('/recs', function(req, res) {
  res.status(204).end()
})
app.use('/api', router)

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)
})
