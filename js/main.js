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
          }, 500, "easeInOutQuad");
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


    // contact submittion
    $("#email-form .submit").on("click", function (event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phonenumber = $("input#phonenumber").val();
      var message = $("textarea#email-message").val();
      // let submitButton = $(this);
      // submitButton.prop("disabled", true); // Disable button until AJAX call is complete
      // let submissionData = {name, phonenumber, email, message};
      alert("Sorry " + name + ", it seems that my mail server is not responding. Please try again later!")
      /**
       * $.ajax({
        url: "/mail",
        type: "GET",
        data:submissionData,
        cache: false,
        success: function (data) {
          // Success message
          console.log(data);
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success')
            .append('</div>');
          //clear all fields
          $('#email-form').trigger("reset");
        },
        error: function () {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that my mail server is not responding. Please try again later!"));
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#email-form').trigger("reset");
        },
        complete: function () {
          setTimeout(function () {
            submitButton.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
       * 
       */
      
    });

  })(jQuery); // End of use strict
}
)

