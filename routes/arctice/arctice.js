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
    let findData = {};
    let page = req.body.currentPage || 1;
    let size = req.body.pageSize || 10;
    if(data.title){
      findData = {title: new RegExp(data.title, 'i')};
    }
    mongoss.list(findData, page, size).then(function(result){
        let data = Object.assign({}, res.locals.success);
        result.pageSize = size;
        result.currentPage = page;
        data.data = result;
        res.send(data);
      }).catch(function(err){
        let error = Object.assign({}, res.locals.error);
        error.data = err;
        res.send(error);
      });
  })
module.exports = router  