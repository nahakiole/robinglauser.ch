/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    $.getJSON( "/feed", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            items.push( '<div class="col-md-3 col-sm-6 wow fadeIn"> <h3><a href="'+val.link+'" target="_blank">'+val.title+'</a></h3> <p> '+val.summary+'</p> <a href="'+val.link+'" target="_blank">Read article</a> </div>' );
        });
        $( ".blog-feed" ).append(items.join( "" ));
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        4, {
            minFontSize: '80px',
            maxFontSize: '100px'
        }
    );


    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict
