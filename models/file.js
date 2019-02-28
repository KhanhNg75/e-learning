var mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID

var FileSchema = mongoose.Schema({
    courseid: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        require: true
    },
    teacherid: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        require: true
    },
    filename: {
        type: String
    },
    fileurl: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

var File = module.exports = mongoose.model('file', FileSchema)

module.exports.saveFile = function(userFiledata, callback) {
    userFiledata.save(callback)
}

module.exports.showFile = function(courseid, callback) {
    var query = { courseid: courseid }
    File.find(query, callback)
}