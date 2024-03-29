const uploadFolder = __basedir + '/uploads/';
const fs = require('fs');

exports.uploadFile = (req, res) => {
    res.send('File uploaded successfully! -> filename = ' + req.file.filename);
}

exports.listAllFiles = (req, res) => {
    fs.readdir(uploadFolder, (err, files) => {
        res.send(files);
    })
}

exports.downloadFile = (req, res) => {
    var filename = req.params.filename;
    res.download(uploadFolder + filename);
}