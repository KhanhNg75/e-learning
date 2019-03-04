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
        res.render('admin/news', {
            data: adminProfile,
            layout: 'layoutAdmin',
            message: req.flash('success_msg') || req.flash('error_msg')
        })
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
                message: req.flash('success_msg') || req.flash('error_msg')
            })
        })
    }).catch(function(err) {
        res.send({ error: 400, message: err })
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
                req.flash('success_msg', 'Teacher Created')
                res.redirect('/dashboard')
            } else {
                req.flash('error_msg', 'User Existed !!!')
                res.redirect('/dashboard')
            }
        })
    }

})

//Delete User
router.get('/deleteUser/:id', ensureAuthenticated, (req, res) => {

    var userId = req.params.id;

    User.deleteOne({
        _id: userId
    }, function(err) {
        if (err) throw err
        else {
            req.flash('success_msg', 'User Deleted')
            res.redirect('/dashboard')
        }
    })

})

//Edit User
router.get('/editUser/:id', ensureAuthenticated, (req, res) => {

    var userId = req.params.id;
    User.getUserById(userId, (err, data) => {
        if (err) throw err
        else {
            res.send(data)
        }
    })

})

router.post('/editUser', ensureAuthenticated, (req, res) => {

    var userid = req.body.userid
    var fname = req.body.fname
    var lname = req.body.lname
    var email = req.body.email
    var username = req.body.username
    var cLink = req.body.cLink

    User.updateOne({ "_id": ObjectID(userid) }, {
        $set: {
            'fname': fname,
            'lname': lname,
            'email': email,
            'username': username,
            'channelLink': cLink
        }
    }, { multi: true }).then(() => {
        req.flash('success_msg', 'Profile Updated')
        res.redirect('/dashboard')
    }).catch(function(err) {
        res.send({ error: 400, message: err })
    })

})

//Course Create
router.get('/course', ensureAuthenticated, (req, res) => {

    var user = req.user

    User.find({ "_id": ObjectID(user._id) }).then(adminProfile => {
        User.find({ role: "teacher" }).then(resultTeacher => {
            res.render('admin/course', {
                data: adminProfile,
                result: resultTeacher,
                layout: 'layoutAdmin',
                message: req.flash('success_msg') || req.flash('error_msg')
            })
        })
    }).catch(function(err) {
        res.send({ error: 400, message: err })
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

// Edit Course
router.get('/editCourse/:id', ensureAuthenticated, (req, res) => {

    var courseId = req.params.id;
    Class.getCourseById(courseId, (err, data) => {
        if (err) throw err
        else {
            res.send(data)
        }
    })

})

router.post('/editCourse', ensureAuthenticated, (req, res) => {

    var courseiid = req.body.ciid
    var courseid = req.body.cid
    var coursename = req.body.cname
    var semester = req.body.csemester
    var year = req.body.cyear
    var date = req.body.cdate
    var time1 = req.body.timestart1
    var time2 = req.body.timestart2
    var description = req.body.cdescrip

    Class.updateOne({ "_id": ObjectID(courseiid) }, {
        $set: {
            'courseid': courseid,
            'coursename': coursename,
            'semester': semester,
            'year': year,
            'date': date,
            'time1': time1,
            'time2': time2,
            'description': description
        }
    }, { multi: true }).then(() => {
        req.flash('success_msg', 'Class Updated')
        res.redirect('/dashboard')
    }).catch(function(err) {
        res.send({ error: 400, message: err })
    })

})

module.exports = router