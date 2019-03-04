var socket = io.connect();

socket.on('connect', function() {
    socket.emit('creat-room', $('#linkroom').val(), $('#username').val());
});

socket.on('announcement', function(username, data) {
    // $('#conversation').append('<p>' + username + ':</p> ' + data + '<br>');
    socket.emit("user-chat", { username: username, message: data });
});
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
    var Username = $('#username').val();
    $("#right ul").append("<li>" + data.username + " : " + data.message + "</li>");
    $("#right").animate({ scrollTop: $("#right")[0].scrollHeight }, 'fast');
});

$(document).ready(function() {

    $("#txtMessage").keypress(function(e) {
        if ((e.keyCode || e.which) == 13) {
            $('#btnChat').click();
        }
    });

    $("#btnChat").click(function() {
        var username = $('#username').val();
        var message = $("#txtMessage").val();
        socket.emit("user-chat", { username: username, message: message });
        $("#txtMessage").val("");
    });

});