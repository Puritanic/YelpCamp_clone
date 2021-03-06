
var mongoose            = require('mongoose'),
passportLocalMongoose   = require('passport-local-mongoose');


// User schema

var UserSchema = new mongoose.Schema({
<<<<<<< HEAD
    username: {type: String, unique: true, required: true},
    username: String,
    password: String,
    avatar: String,
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    email: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
