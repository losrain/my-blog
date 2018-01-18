module.exports = {
	port: 3300,
	session: {
		secret: 'myblog',
		key: 'myblog',
		maxAge: 3*60*60*1000
	},
	mongodb: 'mongodb://localhost:27017/myblog'
}