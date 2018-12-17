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
        Open NavBar SP
    ------------------------------------------------------------*/
    $(".dropbtn").on('click', function() {
        event.stopPropagation();
        $('.dropdown-content').slideToggle(200);
    });

    $(".c-header__open").on('click', function() {
        event.stopPropagation();
        $(this).toggleClass("is-open");
        if ($(this).hasClass("is-open")) {
            $(".dropdown-content").hide();
            $('.sidenav').addClass("left-0");
            $('.sidenav').addClass("pad-10");
            $('.c-admin').addClass("pl-220");
            $('.c-teacher').addClass("pl-220");
            $('.c-footer').addClass("pl-220");
            $('.c-header').addClass("pl-220");
            $('.modal-content').addClass("ml-220");
        } else {
            $('.sidenav').removeClass("left-0");
            $('.sidenav').removeClass("pad-10");
            $('.c-admin').removeClass("pl-220");
            $('.c-teacher').removeClass("pl-220");
            $('.c-footer').removeClass("pl-220");
            $('.c-header').removeClass("pl-220");
            $('.modal-content').removeClass("ml-220");
            $(".dropdown-content").hide();
        }
    });

    /*------------------------------------------------------------
	    Admin Create Button
    ------------------------------------------------------------*/
    $(".create-btn").on("click", function() {
        $(".modal").addClass('dp-f');
        $('html, body').addClass('of-h');
    })

    $(".close").on("click", function() {
        $(".modal").removeClass('dp-f');
        document.getElementById("defaultOpen").click();
        $('html, body').removeClass('of-h');
    })

    $("#defaultOpen").on("click", function() {
        $(".modal").removeClass('dp-f');
        $('html, body').removeClass('of-h');
    })

    $(document).on("click", function() {
        $(".dropdown-content").hide();
    });

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
            }
        }
    }

    $('input[type="file"]').each(function() {
        applyFiles.call(this);
    }).change(function() {
        applyFiles.call(this);
    });


    /*------------------------------------------------------------
	    Bottom Foorter
    ------------------------------------------------------------*/

    // function to set the height on fly
    function autoHeight() {
        $('main').css('min-height', 0);
        $('main').css('min-height', (
            $(document).height() -
            $('.c-header').height() -
            $('.c-footer').height()
        ));
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
                });
            });
        });
    });

});