const express = require('express')
const mongoss = require('../../libs/user/userData')
const router = express.Router()
router.post('/', function (req, res) {
  var data = req.body;
  data.createTime = new Date();
  mongoss.insert(data).then(function(result){
    let data = Object.assign({}, res.locals.success);
    data.data = result;
    req.session.user = {'name': result.username, 'id': result._id};
    res.send(data);
  }).catch(function(err){
    let error = Object.assign({}, res.locals.error);
    error.data = err;
    res.send(error);
  });
})
module.exports = router  