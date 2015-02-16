module.exports = function(router) {
  router.post('/recs', function(req, res) {
    var rec = req.body;

    if( !rec.name ) {
      return res.status(400).json({error: "Name required"})
    } else if( !rec.age ) {
      return res.status(400).json({error: "Age required"})
    } else if( !rec.about ) {
      return res.status(400).json({error: "About required"})
    }

    console.log("got rec", req.body)
    res.status(204).end()
  })
}
