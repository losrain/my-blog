const express = require('express')
const mongoss = require('../../libs/arctice/arcticeData')
const router = express.Router()
router.post('/add', function (req, res) {
  var data = req.body;
  data.createTime = new Date();
  data.author = req.session.user.name;
  mongoss.insert(data).then(function(result){
    let data = Object.assign({}, res.locals.success);
    data.data = result;
    res.send(data);
  }).catch(function(err){
    let error = Object.assign({}, res.locals.error);
    error.data = err;
    res.send(error);
  });
})
router.post('/list', function (req, res) {
    var data = req.body;
    // data.createTime = new Date();
    // data.author = req.session.user.name;
    mongoss.list(data).then(function(result){
        let data = Object.assign({}, res.locals.success);
        data.data = result;
        res.send(data);
      }).catch(function(err){
        let error = Object.assign({}, res.locals.error);
        error.data = err;
        res.send(error);
      });
  })
module.exports = router  