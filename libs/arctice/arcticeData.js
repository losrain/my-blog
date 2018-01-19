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
		});
    },
    list(findData, page, size) {
			let result = {};
			return Promise.all([
				new Promise(function (resolve, reject) {
					Arctice.find(findData, function(err, res) {
						if (err) {
							reject(err);
						} else {
							result.data = res;
							resolve(result)
						}
					}).skip(page*size-size).limit(size)
				}),
				new Promise(function (resolve, reject) {
					Arctice.count(findData, function(err, res){
						if (err) {
							reject(err);
						} else {
							result.total = res;
							resolve(result)
						}
					})
				})
			]).then(function(res) {
				return result
			})
    }
}