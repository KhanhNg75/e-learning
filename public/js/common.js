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
        }
        $('html,body').addClass('of-h');
    })

    $('#modal-container1').add('#modal-container1 .btn1--color2').add('#modal-container1 .close').add('#modal-container1 .btn1--color3').on("click", function() {
        $("#modal-container1").addClass('out');
        $('html,body').removeClass('of-h');
    });

    // $('#modal-container1 .close').click(function() {
    //     $("#modal-container1").addClass('out');
    //     $('html,body').removeClass('of-h');
    // });

    $('#modal-container2 .btn1--color2').click(function() {
        $("#modal-container2").addClass('out');
        $('html,body').removeClass('of-h');
    });

    $('#modal-container2 .close').click(function() {
        $("#modal-container2").addClass('out');
        $('html,body').removeClass('of-h');
    });

    /*------------------------------------------------------------
	    Admin Create Button
    ------------------------------------------------------------*/
    // $(".create-btn").on("click", function() {
    //     $(".modal").addClass('dp-f');
    //     $('html, body').addClass('of-h');
    // })

    // $(".close").on("click", function() {
    //     $(".modal").removeClass('dp-f');
    //     document.getElementById("defaultOpen").click();
    //     $('html, body').removeClass('of-h');
    // })

    // $("#defaultOpen").on("click", function() {
    //     $(".modal").removeClass('dp-f');
    //     $('html, body').removeClass('of-h');
    // })

    // $(document).on("click", function() {
    //     $(".dropdown-content").hide();
    // });

    /*------------------------------------------------------------
	    Admin Edit Button
    ------------------------------------------------------------*/
    // $(".edit-btn").on("click", function() {
    //     $(".modal1").addClass('dp-f');
    //     $('html, body').addClass('of-h');
    // })

    // $(".close").on("click", function() {
    //     $(".modal1").removeClass('dp-f');
    //     document.getElementById("defaultOpen1").click();
    //     $('html, body').removeClass('of-h');
    // })

    // $("#defaultOpen1").on("click", function() {
    //     $(".modal1").removeClass('dp-f');
    //     $('html, body').removeClass('of-h');
    // })

    /*------------------------------------------------------------
	    Admin Edit Class Button
    ------------------------------------------------------------*/
    // $(".edit-btn1").on("click", function() {
    //     $(".modal2").addClass('dp-f');
    //     $('html, body').addClass('of-h');
    // })

    // $(".close").on("click", function() {
    //     $(".modal2").removeClass('dp-f');
    //     document.getElementById("defaultOpen2").click();
    //     $('html, body').removeClass('of-h');
    // })

    // $("#defaultOpen2").on("click", function() {
    //     $(".modal2").removeClass('dp-f');
    //     $('html, body').removeClass('of-h');
    // })

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
                $('.testinput').val(this.files[i].name);
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

    button.click(function() {
        setTimeout(function() {
            button.addClass('is-completed');
        }, 2000);
        setTimeout(function() {
            button.removeClass('is-completed');
        }, 5000);
    });

});