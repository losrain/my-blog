/**
 * 用户信息
 */
var mongoose = require('../mongo.js'),
    Schema = mongoose.Schema;

var arcticeSchema = new Schema({          
    title : { type: String },                    //用户账号
    content: {type: String},                        //密码
    author: {type: String},                        //年龄
    createTime : { type: Date}                       //创建时间
});
module.exports = mongoose.model('arctice',arcticeSchema);