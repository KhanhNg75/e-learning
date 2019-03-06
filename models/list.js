var mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID

var ListStudentSchema = mongoose.Schema({
    courseid: {
        type: mongoose.Schema.Types.ObjectId
    },
    studentid: {
        type: mongoose.Schema.Types.ObjectId
    },
    registered_date: {
        type: Date,
        default: Date.now
    }
})

var List = module.exports = mongoose.model('lists', ListStudentSchema)

module.exports.createStudentList = function(newStudent, callback) {
    List.find({ courseid: newStudent.courseid, studentid: newStudent.studentid }, function(err, docs) {
        if (docs.length) {
            callback(null, 'All Ready Registered')
        } else {
            newStudent.save(callback)
        }
    })
}