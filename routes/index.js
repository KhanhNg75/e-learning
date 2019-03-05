var express = require('express')
var router = express.Router()
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var config = require('../config/database')

// // Connection URL
var url = process.env.MONGODB_URL || config.database
    // // Database Name
var dbName = process.env.MONGODB_NAME || config.name

var User = require('../models/user')
var Class = require('../models/class')

router.get('/products', function(req, res) {
    var pageNo = parseInt(req.query.pageNo)
    console.log(pageNo)
    var size = 6
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
        // Find some documents
    Class.countDocuments({}, function(err, totalCount) {
        if (err) {
            response = { "error": true, "message": "Error fetching data" }
        }
        Class.find({}, {}, query, function(err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                var totalPages = Math.ceil(totalCount / size)
                response = { "error": false, "message": data, "pages": totalPages };
            }
            res.send(data)
        });
    })

})

// Get Homepage
router.get('/', (req, res) => {
    res.render('layout', {
        layout: 'layout',
        message: req.flash('success_msg') || req.flash('error_msg')
    })
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
                    User.find({ "role": "student" }).then(studentUser => {
                        Class.find({}).then(classData => {
                            res.render('admin/admin', {
                                data: UserInfor,
                                tUser: teacherUser,
                                sUser: studentUser,
                                cData: classData,
                                layout: 'layoutAdmin',
                                message: req.flash('success_msg') || req.flash('error_msg')
                            })
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
                    studentUser.find({ "_id": ObjectID(user._id) }).toArray().then(function(resultStudent) {
                        listCourse.find({ "studentid": ObjectID(user._id) }).toArray().then(function(registerdClass) {
                            if (resultCourse._id == registerdClass.courseid) {
                                req.session.data = resultCourse
                                res.render('student/student', {
                                    data1: resultCourse,
                                    data: resultStudent,
                                    dataClass: registerdClass,
                                    layout: 'layoutStudent',
                                    message: req.flash('success_msg') || req.flash('error_msg')
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
                                message: req.flash('success_msg') || req.flash('error_msg')
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