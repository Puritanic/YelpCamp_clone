
var mongoose            = require('mongoose'),
passportLocalMongoose   = require('passport-local-mongoose');


// User schema

var UserSchema = new mongoose.Schema({
<<<<<<< HEAD
    username: {type: String, unique: true, required: true},
=======
    username: String,
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
    password: String,
    avatar: String,
    firstName: String,
    lastName: String,
<<<<<<< HEAD
    email: {type: String, unique: true, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
=======
    email: String,
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
    isAdmin: {
        type: Boolean,
        default: false
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);