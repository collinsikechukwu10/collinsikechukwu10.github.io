$(document).ready(function () {
  (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 53)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });

    $('html, body').on('mousewheel', function () {
      $('html, body').stop(); // Stops auto-scrolling upon manual scrolling
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
      $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#navigation-bar',
      offset: 110
    });

    // Collapse Navbar
    var navbarCollapse = function () {
      if ($("#navigation-bar").offset().top > 180) {
        $("#navigation-bar").addClass("navbar-shrink");
      } else {
        $("#navigation-bar").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);



    // Scroll to top button appear
    $(document).scroll(function () {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });


  })(jQuery); // End of use strict
}
)

