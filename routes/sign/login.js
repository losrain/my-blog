const express = require('express')
const mongoss = require('../../libs/user/userData')
const router = express.Router()
router.post('/', function (req, res) {
  var reqData = req.body;
  mongoss.login(reqData).then(function(result){
    let resData = Object.assign({}, res.locals.success);
    resData.data = '';
    req.session.user = {'name': result.username, 'id': result._id};
    res.send(resData);
  }).catch(function(err){
    let error = Object.assign({}, res.locals.error);
    error.data = err;
    res.send(error);
  });
})
module.exports = router  