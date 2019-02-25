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
    created_date: {
        type: Date,
        default: Date.now
    }
})

var Course = module.exports = mongoose.model('class', ClassSchema)

module.exports.createCourse = function(newPost, callback) {
    newPost.save(callback)
}

module.exports.updateCourseById = function(newID, callback) {
    newID.update(callback)
}