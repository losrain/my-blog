var Arctice = require("./arctice.js");

module.exports = {
    insert(data) {
		return new Promise(function (resolve, reject) {
			var arctice = new Arctice(data);
			arctice.save(function (err, res) {
				if (err) {
					reject(err)
				} else {
					resolve(res)
				}
			});
		})
    },
    list(data) {
        return new Promise(function (resolve, reject) {
			Arctice.find({}, function(err, res) {
				if (err) {
					reject(err)
				} else {
					resolve(res)
				}
			});
		})
    }
}