var socket = io.connect();

socket.on('connect', function() {
    socket.emit('creat-room', $('#linkroom').val());
});

// socket.on('new_client', function(username) {
//     $('#chat_zone').prepend('<p><em>' + username + ' has joined the chat!</em></p>');
// })

socket.on('usernames', function(data) {
    console.log(data);
    // var html = '';
    // for (i = 0; i < data.length; i++) {
    //     html += '<div class="user" name="' + data[i] + '">' + data[i] + '</div>';
    // }

    // console.log(html);
    // $('.chat_body').html(html);
    // usernameClick();
});

socket.on("server-send-room-socket", function(data) {
    $("#roomHienTai").html(data);
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