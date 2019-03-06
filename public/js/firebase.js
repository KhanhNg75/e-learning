// Initialize Firebase
var config = {
    apiKey: "AIzaSyAg3DE1Ua7iyskKRy0H_2aY1Sd2E8h37VE",
    authDomain: "uploadfile-f177e.firebaseapp.com",
    databaseURL: "https://uploadfile-f177e.firebaseio.com",
    projectId: "uploadfile-f177e",
    storageBucket: "uploadfile-f177e.appspot.com",
    messagingSenderId: "424757438968"
};

firebase.initializeApp(config);

//User Image
var fileButton = document.getElementById('fileButton');
if (fileButton) {
    fileButton.addEventListener('change', function(e) {
        var file = e.target.files[0];
        var storageRef = firebase.storage().ref('UserImage/' + file.name);
        var task = storageRef.put(file);
        task.on('state_changed',

            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + percentage + '% done');
                var uploader = document.getElementById('progress');
                uploader.value = percentage;
            },
            function error(err) {
                switch (err.code) {
                    case 'storage/unauthorized':
                        console.log('Unauthorized User');
                        break;
                    case 'storage/canceled':
                        console.log('Upload is Canceled');
                        break;
                    case 'storage/unknown':
                        console.log('Unknown Error');
                        break;
                }
            },
            function() {
                storageRef.getDownloadURL().then(function(linkUrl) {
                    var img = document.getElementById('myimg');
                    var valImg = document.getElementById('myVal');
                    valImg.value = linkUrl;
                    img.src = linkUrl;
                    downloadURL = linkUrl;
                });
                storageRef.getMetadata().then(function(metadata) {
                    console.log(metadata);
                });
            });
    }, false);
}

//User Slide , File
var fileButton = document.getElementById('testfile');
let userid = $('#userid').val();

if (fileButton) {
    fileButton.addEventListener('change', function(e) {

        var file = e.target.files[0];
        var storageRef = firebase.storage().ref('UserFile/' + file.name);
        var task = storageRef.put(file);

        task.on('state_changed',

            function progress(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                var uploader = document.getElementById('progress');
                uploader.value = progress;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            function error(err) {
                switch (err.code) {
                    case 'storage/unauthorized':
                        console.log('Unauthorized User');
                        break;
                    case 'storage/canceled':
                        console.log('Upload is Canceled');
                        break;
                    case 'storage/unknown':
                        console.log('Unknown Error');
                        break;
                }
            },
            function() {
                storageRef.getDownloadURL().then(function(linkUrl) {
                    console.log("File available at", linkUrl);
                    var SlideHolder = document.getElementById('userSlide');
                    SlideHolder.value = linkUrl;
                });
            });
    }, false);
}