/*------------------------------------------------------------
Go up
------------------------------------------------------------*/
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        $('.back-to-top').addClass('dp-i');
    } else {
        $('.back-to-top').removeClass('dp-i');
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

$('.back-to-top').bind('click', function() {
    $('html, body').animate({
        scrollTop: 0
    }, $(window).scrollTop() / 3);
    return false;
});

/*------------------------------------------------------------
Scroll bar
------------------------------------------------------------*/

$("body").niceScroll({
    cursorcolor: "#0178bc",
    cursorwidth: "10px",
    zindex: 999
});

/*------------------------------------------------------------
	Anchor
------------------------------------------------------------*/

$('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                        $target.focus();
                    };
                });
            }
        }
    });

/*-----------------------------------------------------------------------------------*/
/* Preloader Cover
/*-----------------------------------------------------------------------------------*/
$(window).load(function() {
    let preloader = function preloader() {
        $('#preloader').addClass('loaded');
    }
    setInterval(preloader, 1000);
});

/*-----------------------------------------------------------------------------------*/
/* Confirm Delete
/*-----------------------------------------------------------------------------------*/
$('.btn1--color4').click(function() {
    return confirm("Are you sure?");
});

$(function() {
    /*------------------------------------------------------------
	    Alert Message
    ------------------------------------------------------------*/
    if ($.trim($('.alert').text()).length == 0) {
        $('.alert').hide();
    } else {
        $('.alert').delay(3000).fadeOut(300);
    }

    /*------------------------------------------------------------
	    Log In Animation
    ------------------------------------------------------------*/
    $(".info-w3lsitem .btn").click(function() {
        $(".main-agileinfo").toggleClass("log-in");
    });
    $(".container-form .btn").click(function() {
        $(".main-agileinfo").addClass("active");
    });

    /*------------------------------------------------------------
	    User Modal BTN
    ------------------------------------------------------------*/
    $('.modal-adminbtn').click(function() {
        var buttonId = $(this).attr('id');
        if (buttonId === 'one') {
            $('#modal-container1').removeAttr('class').addClass(buttonId);
        } else if (buttonId === 'two') {
            $('#modal-container2').removeAttr('class').addClass(buttonId);
        } else if (buttonId === 'three') {
            $('#modal-container3').removeAttr('class').addClass(buttonId);
        } else if (buttonId === 'four') {
            $('#modal-container4').removeAttr('class').addClass(buttonId);
        } else if (buttonId === 'five') {
            $('#modal-container5').removeAttr('class').addClass(buttonId);
        } else if (buttonId === 'six') {
            $('#modal-container6').removeAttr('class').addClass(buttonId);
        }
        $('html,body').addClass('of-h');
    })

    // BTN 1
    $('#modal-container1 .btn1--color3').click(function() {
        modalOut1($('#modal-container1'));
    });

    $('#modal-container1 .btn1--color2').click(function() {
        modalOut2($('#modal-container1'));
    });

    // BTN 2
    $('#modal-container2 .btn1--color3').click(function() {
        modalOut1($('#modal-container2'));
    });

    $('#modal-container2 .btn1--color2').click(function() {
        modalOut2($('#modal-container2'));
    });

    // BTN 3
    $('#modal-container3 .btn1--color3').click(function() {
        modalOut1($('#modal-container3'));
    });

    $('#modal-container3 .btn1--color2').click(function() {
        modalOut1($('#modal-container3'));
    });

    // BTN 4
    $('#modal-container4 .btn1--color3').click(function() {
        modalOut1($('#modal-container4'));
    });

    $('#modal-container4 .btn1--color2').click(function() {
        modalOut2($('#modal-container4'));
    });

    // BTN 5
    $('#modal-container5 ').click(function() {
        modalOut1($('#modal-container5'));
    });

    // $('#modal-container5 .btn1--color2').click(function() {
    // modalOut2($('#modal-container5'));
    // });

    // BTN 6
    $('#modal-container6 ').click(function() {
        modalOut1($('#modal-container6'));
    });

    if ($('.chat-image').attr('src', 'undefined/')) {
        $(this).addClass('dp-n');
    }


    /*------------------------------------------------------------
	    Credit Calculate
    ------------------------------------------------------------*/
    var sum = 0;

    $(".c-table__content tbody tr").each(function() {
        var value = $(this).find(".credit-course").html();
        var a = parseInt(value, 10)
        sum += a;
    });

    if (sum >= 24) {
        $(".out-credit").toggleClass('dp-b');
        $('.btn1--color2').click(function() { return false; });
        $(".btn1--color2").addClass("no-c");
    }

    /*------------------------------------------------------------
	    Stop page loading
    ------------------------------------------------------------*/
    $('.registed').on("click", function(e) {
        e.preventDefault();
    })

    /*------------------------------------------------------------
	    Choose File Name
    ------------------------------------------------------------*/
    var applyFiles = function() {
        if (this.files.length <= 0) {
            $('.choose-file').html('No file choosen');
        } else {
            $('.choose-file').empty();

            for (var i = 0; i < this.files.length; ++i) {
                $('.choose-file').append($('<li>').html(this.files[i].name));
                $('.filename').val(this.files[i].name);
            }
        }
    }

    $('input[type="file"]').each(function() {
        applyFiles.call(this);
    }).change(function() {
        applyFiles.call(this);
    });


    /*------------------------------------------------------------
	    Bottom Footer
    ------------------------------------------------------------*/
    if ($('header').hasClass('c-header')) {
        function autoHeight() {
            $('main').css('min-height', 0);
            $('main').css('min-height', (
                $(document).height() +
                $('.c-header').height() -
                $('.c-footer').height()
            ));
        }
    }

    // onDocumentReady
    // function bind
    $(document).ready(function() {
        autoHeight();
    });

    // onResize bind of the
    // function
    $(window).resize(function() {
        autoHeight();
    });

    /*------------------------------------------------------------
	    Tabs Admin
    ------------------------------------------------------------*/
    $(document).ready(function() {

        // Variables
        var clickedTab = $(".tabs > .active");
        var tabWrapper = $(".tab__content");
        var activeTab = tabWrapper.find(".active");
        var activeTabHeight = activeTab.outerHeight();

        // Show tab on page load
        activeTab.show();

        // Set height of wrapper on page load
        tabWrapper.height(activeTabHeight);

        $(".tabs > li").on("click", function() {

            // Remove class from active tab
            $(".tabs > li").removeClass("active");

            // Add class active to clicked tab
            $(this).addClass("active");

            // Update clickedTab variable
            clickedTab = $(".tabs .active");

            // fade out active tab
            activeTab.fadeOut(250, function() {

                // Remove active class all tabs
                $(".tab__content > li").removeClass("active");

                // Get index of clicked tab
                var clickedTabIndex = clickedTab.index();

                // Add class active to corresponding tab
                $(".tab__content > li").eq(clickedTabIndex).addClass("active");
                // update new active tab
                activeTab = $(".tab__content > .active");

                // Update variable
                activeTabHeight = activeTab.outerHeight();

                // Animate height of wrapper to new tab height
                tabWrapper.stop().delay(50).animate({
                    height: activeTabHeight
                }, 500, function() {

                    // Fade in active tab
                    activeTab.delay(50).fadeIn(250);
                    $('body').getNiceScroll().resize();
                });
            });
        });
    });

    /*------------------------------------------------------------
	    Student Fix Header
    ------------------------------------------------------------*/
    var $header = $('.c-header');
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $header.addClass('fixed');
        } else {
            $header.removeClass('fixed');
        }
    });

    /*------------------------------------------------------------
	    Upload BTN Animate
    ------------------------------------------------------------*/
    var button = $('.upload-btn');

    button.click(function(e) {
        e.preventDefault();
        setTimeout(function() {
            $('.upload-btn').addClass('is-completed')
            $('.choose-file li').html('')
        }, 4000);

        setTimeout(function() {
            $('.upload-btn').removeClass('is-completed')
            $('.choose-file li').html('No file choosen')
            $('#fileupload').submit()
        }, 7000);

    });

    /*------------------------------------------------------------
	    Password Validation
    ------------------------------------------------------------*/
    $("#inputpw1").keyup(validatePassword1);
    $("#inputpw2").keyup(validatePassword2);
});

function validatePassword1() {
    var password1 = $("#inputpw1").val();

    if (!password1.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@%!]{6,}$/))
        $(".registrationFormAlert").html("Password does not Strong Enough").css('color', 'red');
    else
        $(".registrationFormAlert").html("Password Valid").css('color', 'green');
}

function validatePassword2() {
    var password1 = $("#inputpw1").val();
    var password2 = $("#inputpw2").val();
    if (password1 != password2)
        $(".registrationFormAlert").html("Password does not Match").css('color', 'red');
    else
        $(".registrationFormAlert").html("Password Match").css('color', 'green');
}

function modalOut1(dataAttribute1) {
    $(dataAttribute1).addClass('out');
    $('html,body').removeClass('of-h');
}

function modalOut2(dataAttribute2) {
    setTimeout(function() {
        $(dataAttribute2).addClass('out');
        $('html,body').removeClass('of-h');
    }, 3000);
}