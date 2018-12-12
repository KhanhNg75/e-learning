var express = require('express')
var router = express.Router()
var ObjectID = require('mongodb').ObjectID

var Class = require('../models/class')
var User = require('../models/user')
var List = require('../models/list')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash('error_msg', 'You are not logged in')
        res.redirect('/')
    }
}

//Slide Upload
router.get('/slide', ensureAuthenticated, function(req, res) {
    var user = req.user
    User.find({ "_id": ObjectID(user._id) }).then(adminProfile => {
        res.render('teacher/fileUpload', { data: adminProfile, layout: 'layoutTeacher' })
    })
})

//Profile
router.get('/profile', ensureAuthenticated, function(req, res) {
    var user = req.user
    User.find({ "_id": ObjectID(user._id) }).then(adminProfile => {
        res.render('teacher/profile', { data: adminProfile, layout: 'layoutTeacher', message: req.flash('success_msg') })
    }).catch(function(err) {
        res.send({ error: 400, message: err })
    })
})

//Edit Profile
router.post('/profile', ensureAuthenticated, (req, res) => {
    var user = req.user
    var fname = req.body.fname
    var lname = req.body.lname
    var cLink = req.body.cLink
    var email = req.body.email
    var username = req.body.username
    var userimage = req.body.userimage

    User.updateOne({ "_id": ObjectID(user._id) }, {
        $set: {
            'fname': fname,
            'lname': lname,
            'channelLink': cLink,
            'email': email,
            'username': username,
            'userimage': userimage
        }
    }, { multi: true }).then(admineditProfile => {
        req.flash('success_msg', 'Profile Updated')
        res.redirect('/teacher/profile')
    }).catch(function(err) {
        res.send({ error: 400, message: err })
    })
})

//Teacher Stream
router.get('/liveStream/:id', ensureAuthenticated, function(req, res) {
    var user = req.user
    var room = req.params.id
    User.find({ "_id": ObjectID(user._id) }).then(adminProfile => {
        Class.find({ "_id": room }).then(result => {
            res.render('teacher/stream', { data: adminProfile, data1: result, layout: 'layoutTeacher' })
        })
    })
})

// View List Of Student

router.get('/listOfStudent/:id', ensureAuthenticated, function(req, res) {
    //Get CourseId From Header
    var courseId = req.params.id
    var user = req.user

    List.find({}).then(function(result) {
        var listArray = []
        for (let i = 0; i < result.length; i++) {
            if (courseId.toString() == result[i].courseid.toString()) {
                listArray.push(result[i])
            }
        }
        User.find({}).then(function(result2) {
            var listArray1 = []
            for (let j = 0; j < result2.length; j++) {
                for (let k = 0; k < listArray.length; k++) {
                    if (listArray[k].studentid.toString() == result2[j]._id.toString()) {
                        listArray1.push(result2[j])
                    }
                }
            }
            User.find({ "_id": ObjectID(user._id) }).then(adminProfile => {
                res.render('teacher/studentList', {
                    data: adminProfile,
                    result: listArray1,
                    courseID: courseId,
                    layout: 'layoutTeacher',
                    message: req.flash('success_msg')
                })
            })
        })
    }).catch(function(err) {
        res.send({ error: 400, message: err })
    })
})



module.exports = router