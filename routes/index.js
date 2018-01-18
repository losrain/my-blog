module.exports = function (app) {
	// 注册
	app.use('/signin', require('./sign/signin'))
	// 登陆
	app.use('/login', require('./sign/login'))
	app.use(function (req, res, next) {
		if(req.session.user){
			next();
		}else{
			res.send('用户未登陆');
		}
	})
		// 文章
	app.use('/arctice', require('./arctice/arctice'))
	// 404 page
	app.use(function (req, res) {
	  if (!res.headersSent) {
		res.status(404).render('404')
	  }
	})
  }
  