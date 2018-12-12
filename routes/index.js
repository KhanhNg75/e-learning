var express = require('express')
var router = express.Router()
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID


// // Connection URL
var url = process.env.MONGODB_URL || 'mongodb://KhanhNg:Khanh7596@ds161653.mlab.com:61653/elearning-web'
    // // Database Name
var dbName = process.env.MONGODB_NAME || 'elearning-web'

var User = require('../models/user')
var Class = require('../models/class')

router.get('/test', function(req, res) {
    console.log('aaa');
})

// Get Homepage
router.get('/', (req, res) => {
    res.render('layout', { layout: 'layout', message: req.flash('success_msg') || req.flash('error_msg') })
});

router.get('/favicon.ico', (req, res) => res.status(204));

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    var user = req.user
    var session_data = req.session.data
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            return res.send({ error: "mongoErr", message: "err" })
        }
        var db = client.db(dbName)
        if (user.role == "admin") {
            User.find({ "_id": ObjectID(user._id) }).then(UserInfor => {
                User.find({ "role": "teacher" }).then(teacherUser => {
                    Class.find({}).then(classData => {
                        res.render('admin/admin', {
                            data: UserInfor,
                            tUser: teacherUser,
                            cData: classData,
                            layout: 'layoutAdmin',
                            message: req.flash('success_msg')
                        })
                    })
                })
            })
        } else if (user.role == "student") {

            var classess = db.collection('classes')
            var studentUser = db.collection('users')
            var listCourse = db.collection('lists')

            classess.aggregate([{
                        $lookup: {
                            from: "users",
                            localField: "teacher",
                            foreignField: "_id",
                            as: "inventory"
                        }
                    },
                    { $sort: { "inventory": 1 } },
                ]).toArray()
                .then((resultCourse) => {
                    studentUser.find({ "_id": ObjectID(user._id) }).toArray()
                        .then(function(resultStudent) {
                            listCourse.find({ "studentid": ObjectID(user._id) }).toArray()
                                .then(function(registerdClass) {
                                    if (resultCourse._id == registerdClass.courseid) {
                                        req.session.data = resultCourse
                                        res.render('student/student', {
                                            data1: resultCourse,
                                            data: resultStudent,
                                            dataClass: registerdClass,
                                            layout: 'layoutStudent',
                                            message: req.flash('success_msg')
                                        })
                                        client.close()
                                    }
                                })
                        })
                }).catch(function(err) {
                    res.send({ error: 400, message: err })
                })
        } else if (user.role == "teacher") {
            var classess = db.collection('classes')
            var teacherUser = db.collection('users')

            classess.aggregate([{
                    $lookup: {
                        from: "users",
                        localField: "teacher",
                        foreignField: "_id",
                        as: "inventory"
                    }
                }]).toArray()
                .then(function(resultCourse) {
                    var courseArray = []
                    for (let i = 0; i < resultCourse.length; i++) {
                        if (user._id.toString().trim() == resultCourse[i].teacher.toString().trim()) {
                            courseArray.push(resultCourse[i])
                        }
                    }
                    teacherUser.find({ "_id": ObjectID(user._id) }).toArray()
                        .then(function(resultTeacher) {
                            res.render('teacher/teacher', {
                                data1: courseArray,
                                data: resultTeacher,
                                layout: 'layoutTeacher',
                                message: req.flash('success_msg')
                            })
                            client.close()
                        });
                }).catch(function(err) {
                    res.send({ error: 400, message: err })
                })
        }
    })
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/')
    }
}

module.exports = router