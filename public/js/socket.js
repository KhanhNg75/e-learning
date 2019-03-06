var socket = io.connect();

socket.on('connect', function() {
    var a = $('#fname').val() + ' ' + $('#lname').val();
    var data = {
        linkroom: $('#linkroom').val(),
        username: a
    }
    socket.emit('creat-room', data);
});

// socket.on('announcement', function(username, data) {
//     socket.emit("user-chat", { username: username, message: data });
// });
socket.on('update-users', function(data) {
    $('#users').empty();
    $.each(data, function(key, value) {
        $('#users').append('<div>' + key + '</div>');
    });
});

socket.on("server-send-room-socket", function(data) {
    $("#currentRoom").html(data);
});

socket.on("server-chat", function(data) {
    $("#right ul").append('<li>' +
        '<img class="chat-image" src=' + data.image + '/>' +
        '<p>' + data.username + ': ' + '<small>' + data.message + '</small>' + '</p>' +
        '</li>');
    $("#right").animate({ scrollTop: $("#right")[0].scrollHeight }, 'fast');
});

$(document).ready(function() {

    $("#txtMessage").keypress(function(e) {
        if ((e.keyCode || e.which) == 13) {
            $('#btnChat').click();
        }
    });

    $("#btnChat").click(function() {
        var a = $('#fname').val() + ' ' + $('#lname').val();
        var data = {
            username: a,
            message: $("#txtMessage").val(),
            image: $('#img').val()
        }
        socket.emit("user-chat", data);
        $("#txtMessage").val("");
    });

});