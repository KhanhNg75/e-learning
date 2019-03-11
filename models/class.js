var mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID

var ClassSchema = mongoose.Schema({
    courseid: {
        type: String,
        index: true,
        require: true
    },
    coursename: {
        type: String,
        index: true,
        require: true
    },
    coursecredit: {
        type: String
    },
    type: {
        type: String,
    },
    semester: {
        type: String
    },
    year: {
        type: String
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId
    },
    date: {
        type: Date
    },
    time1: {
        type: String
    },
    time2: {
        type: String
    },
    description: {
        type: String
    },
    classimage: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/uploadfile-f177e.appspot.com/o/UserImage%2Fimage-class.png?alt=media&token=e2c4768e-625f-4f53-8d8f-e76d0a4e58db"
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

var Course = module.exports = mongoose.model('class', ClassSchema)

module.exports.createCourse = function(newPost, callback) {
    newPost.save(callback)
}

module.exports.getCourseById = function(id, callback) {
    Course.findById(id, callback)
}

module.exports.updateCourseById = function(newID, callback) {
    newID.update(callback)
}