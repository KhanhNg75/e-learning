var express = require('express')
var router = express.Router()
var ObjectID = require('mongodb').ObjectID

var Class = require('../models/class')
var User = require('../models/user')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/')
    }
}

//News
router.get('/news', ensureAuthenticated, (req, res) => {
    var user = req.user
    User.find({ "_id": ObjectID(user._id) }).then(adminProfile => {
        res.render('admin/news', { data: adminProfile, layout: 'layoutAdmin', message: req.flash('success_msg') })
    }).catch(function(err) {
        res.send({ error: 400, message: err });
    })
})

//Profile
router.get('/profile', ensureAuthenticated, (req, res) => {
    var user = req.user
    User.find({ "_id": ObjectID(user._id) }).then(adminProfile => {
        res.render('admin/profile', {
            data: adminProfile,
            layout: 'layoutAdmin',
            message: req.flash('success_msg')
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
        res.redirect('/admin/profile')
    }).catch(function(err) {
        res.send({ error: 400, message: err })
    })
})

//Teacher Create
router.get('/teacher', ensureAuthenticated, (req, res) => {
    var user = req.user
    User.find({ "_id": ObjectID(user._id) }).then(adminProfile => {
        User.find({ "role": "teacher" }).then(teacherUser => {
            res.render('admin/admin', {
                data: adminProfile,
                tUser: teacherUser,
                layout: 'layoutAdmin',
                message: req.flash('success_msg')
            })
        })
    }).catch(function(err) {
        res.send({ error: 400, message: err })
    })
})

router.get('/deleteTeacher/:id', ensureAuthenticated, (req, res) => {
    var teacherId = req.params.id;
    User.deleteOne({
        _id: teacherId
    }, function(err) {
        if (err) throw err
        else {
            req.flash('success_msg', 'Teacher Deleted')
            res.redirect('/dashboard')
        }
    })
})

router.post('/teacher', ensureAuthenticated, (req, res) => {
    var param = req.body

    var cLink = param.cLink
    var email = param.email
    var username = param.username
    var password = param.password
    var role = "teacher"

    // Validation
    req.checkBody('cLink', 'Channel Link is required').notEmpty()
    req.checkBody('email', 'Email is not valid').isEmail()
    req.checkBody('username', 'Username is required').notEmpty()
    req.checkBody('password', 'Password is required').notEmpty()

    var errors = req.validationErrors();

    if (errors) {
        for (var i = 0; i < errors.length; i++) {
            req.flash('error_msg', errors[i].msg)
            res.redirect('/dashboard')
        }
    } else {
        var newUser = new User({
            channelLink: cLink,
            email: email,
            username: username,
            password: password,
            role: role
        })
        User.createUser(newUser, function(err, user) {
            if (err) {
                throw err
            } else if (user) {
                req.flash('error_msg', 'User Existed !!!')
                res.redirect('/dashboard')
            } else {
                req.flash('success_msg', 'Teacher Created')
                res.redirect('/dashboard')
            }
        })
    }
})

//Course Create
router.get('/course', ensureAuthenticated, (req, res) => {
    var user = req.user
    User.find({ "_id": ObjectID(user._id) }).then(adminProfile => {
        User.find({ role: "teacher" }).then(resultTeacher => {
            res.render('admin/course', { data: adminProfile, result: resultTeacher, layout: 'layoutAdmin', message: req.flash('success_msg') })
        })
    }).catch(function(err) {
        res.send({ error: 400, message: err })
    })
})

router.get('/deleteCourse/:id', ensureAuthenticated, (req, res) => {
    var courseId = req.params.id;
    Class.deleteOne({
        _id: courseId
    }, function(err) {
        if (err) throw err
        else {
            req.flash('success_msg', 'Course Deleted')
            res.redirect('/dashboard')
        }
    })
})

router.post('/course', ensureAuthenticated, (req, res) => {
    var param = req.body

    var courseid = param.courseid
    var coursename = param.coursename
    var coursecredit = req.params.coursecredit
    var semester = param.semester
    var year = param.year
    var teacher = param.teacher
    var date = param.datestart
    var time1 = param.timestart1
    var time2 = param.timestart2
    var descrip = param.description

    // Validation
    req.checkBody('courseid', 'Course ID is required').notEmpty()
    req.checkBody('coursename', 'Course Name is required').notEmpty()
    req.checkBody('coursecredit', 'Course Credit is required').notEmpty()
    req.checkBody('semester', 'Semester is required').notEmpty()
    req.checkBody('year', 'Year is required').notEmpty()
    req.checkBody('teacher', 'Teacher Name is required').notEmpty()

    var errors = req.validationErrors();

    if (errors) {
        for (var i = 0; i < errors.length; i++) {
            req.flash('error_msg', errors[i].msg)
            res.redirect('/dashboard')
        }
    } else {
        var newPost = new Class({
            courseid: courseid,
            coursename: coursename,
            coursecredit: coursecredit,
            semester: semester,
            year: year,
            teacher: teacher,
            date: date,
            time1: time1,
            time2: time2,
            description: descrip
        })

        Class.createCourse(newPost, function(err, post) {
            if (err) throw err
        })
        req.flash('success_msg', 'Course Created')
        res.redirect('/dashboard')
    }
})

module.exports = router