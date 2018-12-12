var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

//User Schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    role: {
        type: String,
        default: "student",
        enum: ["student", "admin", "teacher"]
    },
    created: {
        type: Date,
        default: Date.now
    },
    userimage: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/uploadfile-f177e.appspot.com/o/UserImage%2Fuser-image.png?alt=media&token=ff08b521-9dd6-4ff3-aad7-81f7c483c4f4"
    },
    channelLink: {
        type: String
    },
    fLink: {
        type: String
    },
    tLink: {
        type: String
    }
})

var User = module.exports = mongoose.model('User', UserSchema)

module.exports.createUser = function(newUser, callback) {
    User.find({ username: newUser.username }, function(err, docs) {
        if (docs.length) {
            callback(null, 'Existed')
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    newUser.password = hash
                    newUser.save(callback)
                })
            })
        }
    })
}

module.exports.getUserByUsername = function(username, callback) {
    var query = { username: username }
    User.findOne(query, callback)
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback)
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err
        callback(null, isMatch)
    })
}