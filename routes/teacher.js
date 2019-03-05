var express = require('express')
var router = express.Router()
var ObjectID = require('mongodb').ObjectID

var firebase = require('firebase-admin')

var serviceAccount = require('../serviceAccountKey.json');
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://uploadfile-f177e.firebaseio.com'
});

var dbFirebase = firebase.database();
var ref = dbFirebase.ref("UserFile/");

var Class = require('../models/class')
var User = require('../models/user')
var List = require('../models/list')
var File = require('../models/file')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash('error_msg', 'You are not logged in')
        res.redirect('/')
    }
}

//Slide Upload
router.get('/showSlide/:id', ensureAuthenticated, function(req, res) {

    var courseid = req.params.id;
    File.showFile(courseid, (err, data) => {
        if (err) throw err
        else {
            res.send(data)
        }
    })

})

router.post('/uploadSlide', ensureAuthenticated, (req, res) => {
    var userid = req.user._id;
    var courseid = req.body.classId;
    var filename = req.body.testinput;
    var fileurl = req.body.fileurl;

    var userFiledata = new File({
            courseid: courseid,
            teacherid: userid,
            filename: filename,
            fileurl: fileurl
        })
        // Upload to firebase database
        // var newPostKey = ref.push().key;

    // var updates = {};

    // updates[newPostKey] = userFiledata;

    // return ref.update(updates);

    // Upload file to mlab
    File.saveFile(userFiledata, function(err, data) {
        if (err) { throw err }
    })

})

//Profile
router.get('/profile', ensureAuthenticated, function(req, res) {

    var user = req.user

    User.find({ "_id": ObjectID(user._id) }).then(adminProfile => {
        res.render('teacher/profile', {
            data: adminProfile,
            layout: 'layoutTeacher',
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
            res.render('teacher/stream', {
                data: adminProfile,
                data1: result,
                layout: 'layoutTeacher'
            })
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
                var data = {
                    userData: listArray1,
                    courseID: courseId
                }
                res.send(data)
                    // res.render('teacher/studentList', {
                    //     data: adminProfile,
                    //     result: listArray1,
                    //     courseID: courseId,
                    //     layout: 'layoutTeacher',
                    //     message: req.flash('success_msg') || req.flash('error_msg')
                    // })
            })
        })
    }).catch(function(err) {
        res.send({ error: 400, message: err })
    })

})

module.exports = router