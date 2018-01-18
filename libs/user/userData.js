var User = require("./user.js");

/**
 * 插入
 */
module.exports = {
	insert(data) {
		return new Promise(function (resolve, reject) {
			var user = new User(data);
			user.save(function (err, res) {
				if (err) {
					reject(err)
				} else {
					resolve(res)
				}
			});
		})
	},
	login(wherestr) {
		return new Promise(function (resolve, reject) {
			User.findOne(wherestr, function (err, res) {
				if (err) {
					reject(err)
				} else {
					if (res) {
						resolve(res)
					} else {
						reject(res)
					}

				}
			})
		})
	}
}