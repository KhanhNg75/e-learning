var express = require('express')
var router = express.Router()
var ObjectID = require('mongodb').ObjectID

var User = require('../models/user')
var List = require('../models/list')
var Class = require('../models/class')

//Profile
router.get('/profile', ensureAuthenticated, function(req, res) {

    var user = req.user
    User.find({ "_id": ObjectID(user._id) }).then(adminProfile => {
        res.render('student/profile', {
            data: adminProfile,
            layout: 'layoutStudent',
            message: req.flash('success_msg') || req.flash('error_msg')
        })
    }).catch(function(err) {
        res.send({ error: 400, message: err })
    })

})

//Edit Profile
router.post('/profile', ensureAuthenticated, (req, res) => {

    var user = req.user
    var fname = req.body.fname
    var lname = req.body.lname
    var email = req.body.email
    var username = req.body.username
    var userimage = req.body.userimage

    User.updateOne({ "_id": ObjectID(user._id) }, {
        $set: {
            'fname': fname,
            'lname': lname,
            'email': email,
            'username': username,
            'userimage': userimage
        }
    }, { multi: true }).then(admineditProfile => {
        req.flash('success_msg', 'Profile Updated')
        res.redirect('/student/profile')
    }).catch(function(err) {
        res.send({ error: 400, message: err })
    })

})

//Register Class
router.get('/registClass/:id', ensureAuthenticated, function(req, res) {

    var user = req.user
    var courseid = req.params.id
    var studentid = user._id

    var newStudent = new List({
        courseid: courseid,
        studentid: studentid
    })

    List.createStudentList(newStudent, function(err, post) {
        if (err) throw err
    })

    req.flash('success_msg', 'Register Class Successfull')
    res.redirect('/dashboard')

});

// Delete Registed Class
router.get('/deleteClass/:id', ensureAuthenticated, (req, res) => {

    var classId = req.params.id;
    var userid = req.user._id;
    List.deleteOne({
        "courseid": classId,
        "studentid": userid
    }, function(err) {
        if (err) throw err
        else {
            req.flash('success_msg', 'Class Deleted')
            res.redirect('/student/course')
        }
    })

})

//Registered Course
router.get('/course', ensureAuthenticated, function(req, res) {

    var user = req.user
    var userid = user._id

    List.find({}).then(function(resultList) {
        var studentCourse = []
        for (let i = 0; i < resultList.length; i++) {
            if (userid.toString().trim() == resultList[i].studentid.toString().trim()) {
                studentCourse.push(resultList[i])
            }
        }

        Class.find({}).sort({ _id: 1 }).then(function(resultClass) {
            var studentClass = []
            for (let j = 0; j < resultClass.length; j++) {
                for (let k = 0; k < studentCourse.length; k++) {
                    if (studentCourse[k].courseid.toString() == resultClass[j]._id.toString()) {
                        studentClass.push(resultClass[j])
                    }
                }
            }

            User.find({ "_id": ObjectID(user._id) }).then(adminProfile => {
                res.render('student/course', {
                    data: adminProfile,
                    result: studentClass,
                    layout: 'layoutStudent',
                    message: req.flash('success_msg') || req.flash('error_msg')
                })
            })
        })
    }).catch(function(err) {
        res.send({ error: 400, message: err })
    })

})

//Student Watch Lesson
router.get('/watch/:id', ensureAuthenticated, function(req, res) {

    var user = req.user
    var room = req.params.id

    User.find({ "_id": ObjectID(user._id) }).then(adminProfile => {
        Class.find({ "_id": room }).then(result => {
            for (var i = 0; i < result.length; i++) {
                User.find({ "_id": ObjectID(result[i].teacher) }).then(teacherIDwatch => {
                    res.render('student/watch', {
                        data: adminProfile,
                        data1: result,
                        data2: teacherIDwatch,
                        layout: 'layoutStudent',
                        message: req.flash('success_msg') || req.flash('error_msg')
                    })
                })
            }
        })
    }).catch(function(err) {
        res.send({ error: 400, message: err });
    })

})

//Student Class Information
router.get('/classInfor/:id', ensureAuthenticated, (req, res) => {

    var classId = req.params.id;
    Class.getCourseById(classId, (err, data) => {
        if (err) throw err
        else {
            res.send(data)
        }
    })

})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash('error_msg', 'You are not logged in')
        res.redirect('/')
    }
}

module.exports = router