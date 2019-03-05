$(function() {
    /*------------------------------------------------------------
	    Send AJAX Teacher File
    ------------------------------------------------------------*/
    $('#fileupload').on('submit', function(e) {
        $('.testHolder').val($('#mySlide').attr('src'));
        $.ajax({
            type: 'post',
            url: '/teacher/uploadSlide',
            data: $('#fileupload').serialize(),
            success: function(success_msg) {
                console.log("Email has been sent!");
                console.log(success_msg);
            }
        });

        $('.choose-file li').html('');
        e.preventDefault();
    });

    /*------------------------------------------------------------
	    GET AJAX Teacher File
    ------------------------------------------------------------*/
    $("#btnGetFiles2").click((e) => {
        var href = $('#btnGetFiles2').attr('href');
        $.ajax({
            type: "GET",
            url: href,
            success: (data) => {
                //clear old data
                $("#listFiles2").html("");
                $("#listFiles2").append('<ul>');
                $.each(data, (index, file) => {
                    $("#listFiles2 ul").append('<li><a target="_blank" href=' + file.fileurl + '>' + file.filename + '</a></li>');
                });
                $("#listFiles2").append('</ul>');
                $('body').getNiceScroll().resize();
            }
        });
        e.preventDefault();
    });

    /*------------------------------------------------------------
	    Admin Ajax Edit Information User
    ------------------------------------------------------------*/
    $(".adminEditInfor").each(function() {
        $(this).on("click", function(e) {
            var href = $(this).attr('href');
            $.ajax({
                type: "GET",
                url: href,
                success: (data) => {
                    //clear old data
                    $("#modal-container3 .uid").val(data._id);
                    $("#modal-container3 .uname").val(data.username);
                    $("#modal-container3 .email").val(data.email);
                    $("#modal-container3 .fname").val(data.fname);
                    $("#modal-container3 .lname").val(data.lname);
                    $("#modal-container3 .cLink").val(data.channelLink);
                }
            });
            async: false
            e.preventDefault();
        })
    })

    /*------------------------------------------------------------
	    Admin Ajax Edit Information Class
    ------------------------------------------------------------*/
    $(".adminEditClass").each(function() {
        $(this).on("click", function(e) {
            var href = $(this).attr('href');
            $.ajax({
                type: "GET",
                url: href,
                success: (data) => {
                    //clear old data
                    $("#modal-container4 .ciid").val(data._id);
                    $("#modal-container4 .cid").val(data.courseid);
                    $("#modal-container4 .cname").val(data.coursename);
                    $("#modal-container4 .csemester").val(data.semester);
                    $("#modal-container4 .cyear").val(data.year);
                    $("#modal-container4 .cdate").val(moment(data.date).format("YYYY-MM-DD"));
                    $("#modal-container4 .tstart1").val(data.time1);
                    $("#modal-container4 .tstart2").val(data.time2);
                    $("#modal-container4 .cdescrip").val(data.description);
                }
            });
            async: false
            e.preventDefault();
        })
    })

    /*------------------------------------------------------------
	    Teacher View Student list
    ------------------------------------------------------------*/
    $(".studentList").each(function() {
        $(this).on("click", function(e) {
            var href = $(this).attr('href');
            $.ajax({
                type: "GET",
                url: href,
                success: (data) => {
                    $("#modal-container6 .c-table__content tbody").html("");
                    $("#modal-container6 .c-table__content tbody").append('<tr>');
                    $.each(data.userData, (index, file) => {
                        $("#modal-container6 .c-table__content tbody").append('<tr>' +
                            '<td>' + file.fname + ' ' + file.lname + '</td>' +
                            '<td>' + file.email + '</td>' +
                            '<td>' + moment(file.created).format("YYYY-MM-DD") + '</td>' +
                            '</tr>')
                    });
                    $("#modal-container6 .c-table__content tbody").append('</tr>');
                    $("#modal-container6 .c-btn a").attr('href', '/teacher/liveStream/' + data.courseID)
                }
            });
            async: false
            e.preventDefault();
        })
    })

    /*------------------------------------------------------------
	    Admin Ajax Paginate BTN
    ------------------------------------------------------------*/
    // $(".paginateBTN").each(function() {
    //     $(this).on("click", function(e) {
    //         var href = $(this).attr('href');
    //         var datas = href.substring(href.lastIndexOf("?") + 1)
    //         console.log(datas)
    //         $.ajax({
    //             type: "GET",
    //             url: '/products',
    //             data: datas,
    //             success: (data) => {
    //                 //clear old data
    //                 console.log(data)
    //                 $(".c-table__content tbody").html("");
    //                 $(".c-table__content tbody").append('<tr>');
    //                 $.each(data, (index, file) => {
    //                     $(".c-table__content tbody").append('<tr>' +
    //                         '<td>' + file.courseid + '</td>' +
    //                         '<td>' + file.coursename + '</td>' +
    //                         '<td>' + file.semester + '</td>' +
    //                         '<td>' + file.year + '</td>' +
    //                         '<td>' + moment(file.date).format("YYYY-MM-DD") + '</td>' +
    //                         '<td>' + file.time1 + "-" + file.time2 + '</td>' +
    //                         '<td>' + moment(file.created_date).format("YYYY-MM-DD") + '</td>' +
    //                         '<td>' +
    //                         '<div class="edit-btn1" id="myBtn">' +
    //                         '<a class="btn1 btn1--color2 adminEditClass" href=/admin/editCourse/' + file._id + '>Edit</a>' +
    //                         '</div>' +
    //                         '<a class="btn1 btn1--color4" href=/admin/deleteCourse/' + file._id + '>Delete</a>' +
    //                         '</td>' +
    //                         '</tr>')
    //                 });
    //                 $(".c-table__content tbody").append('</tr>');
    //             }
    //         });
    //         async: false
    //         e.preventDefault();
    //     })
    // })

});