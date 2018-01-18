/**
 * 用户信息
 */
var mongoose = require('../mongo.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({          
    username : { type: String },                    //用户账号
    userpwd: {type: String},                        //密码
    userage: {type: Number},                        //年龄
    createTime : { type: Date}                       //创建时间
});
module.exports = mongoose.model('User',UserSchema);