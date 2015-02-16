var mongo = require('mongodb').MongoClient,
    uuid = require('node-uuid'),
    _ = require('underscore'),
    table;

module.exports = function(router) {
  mongo.connect('mongodb://localhost:27017/admin', function(err, connection) {
    if( err ) { throw err; }
    table = connection.collection('recs')
  })

  router.get('/recs', function(req, res) {
    table.find({}).toArray(function(err, docs) {
      if( err ) {
        return res.status(500).end()
      }
      res.json({
        recs: docs
      })
    })
  })

  router.post('/recs', function(req, res) {
    var rec = req.body;

    if( !rec.name ) {
      return res.status(400).json({error: "Name required"})
    } else if( !rec.age ) {
      return res.status(400).json({error: "Age required"})
    } else if( !rec.about ) {
      return res.status(400).json({error: "About required"})
    }

    rec.uuid = uuid.v1()
    table.insert(rec, function(err, result) {
      if( err ) {
        console.error(err)
        return res.status(500).end()
      }
      res.status(204).end()
    })
  })

  router.get('/recs/:uuid', function(req, res) {
    table.find({uuid: req.params.uuid}).toArray(function(err, docs) {
      if( err ) {
        return res.status(500).end()
      }
      if( !docs.length ) {
        return res.status(404).end()
      }
      res.json(docs[0])
    })
  })

  router.patch('/recs/:uuid', function(req, res) {
    var fields = {
      name: req.body.name,
      about: req.body.about,
      age: req.body.age
    }
    table.update({ uuid: req.params.uuid}, { $set: fields }, function(err, result) {
      if( err ) {
        console.error(err)
        return res.status(500).end()
      }
      res.status(204).end()
    })
  })

  router.delete('/recs/:uuid', function(req, res) {
    table.remove({ uuid: req.params.uuid}, function(err, result) {
      if( err ) {
        console.error(err)
        return res.status(500).end()
      }
      res.status(204).end()
    })
  })
}
