const path = require('path');
const express = require('express');

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const config = require('config-lite')(__dirname);
const pkg = require('./package')

const routes = require('./routes/index')
const app = express();
const bodyParser = require('body-parser')
// bodyParser中间间
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
// session 中间件
app.use(session({
	name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
	secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
	resave: true, // 强制更新 session
	saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
	cookie: {
	  maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
	},
	store: new MongoStore({// 将 session 存储到 mongodb
	  url: config.mongodb// mongodb 地址
	})
  }))
// 跨域问题解决
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Credentials', true);

	if (req.method == 'OPTIONS') {
		//让options请求快速返回/
		res.send(200);
	} else {
		next();
	}
});
// 添加模板必需的三个变量
app.use(function (req, res, next) {
	res.locals.success = {
		success: true
	}
	res.locals.error = {
		success: false
	}
	next()
})
routes(app)
app.listen(config.port, function () {
	console.log(`${pkg.name} listening on port ${config.port}`);
})