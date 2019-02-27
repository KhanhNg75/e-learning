var socket = io.connect();

socket.on('connect', function() {
    socket.emit('creat-room', $('#linkroom').val(), $('#username').val());
});

socket.on('announcement', function(username, data) {
    $('#conversation').append('<p>' + username + ':</p> ' + data + '<br>');
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
    $("#right ul").append("<li>" + data.username + ":" + data.message + "</li>");
    // if (data.username == Username) {
    //     $("#right ul li").addClass('userChat');
    //     if ($("#right ul li").hasClass('otherUserChat')) {
    //         $("#right ul li").removeClass('userChat');
    //     }
    // } else {
    //     $("#right ul li").addClass('otherUserChat');
    //     if ($("#right ul li").hasClass('userChat')) {
    //         $("#right ul li").removeClass('otherUserChat');
    //     }
    // }
    $("#right").animate({ scrollTop: $("#right")[0].scrollHeight }, 'fast');
});

$(document).ready(function() {

    // $("#txtMessage").keypress(() => {
    //     socket.emit('typing', $('#username').val())
    // })

    // socket.on('typing', (data) => {
    //     $("#right ul").html("<li>" + data + " is typing a message" + "</li>");
    // })

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