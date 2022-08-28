/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict
    // jQuery for page scrolling feature - requires jQuery Easing plugin


    $('.navbar-toggle').bind('click', function(event) {

        $('.navbar-collapse').toggleClass('collapse');
    });

    $.getJSON( "/feed", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            items.push( '<div class="col-md-3 col-sm-6 wow fadeIn"> <h3><a href="'+val.link+'" target="_blank">'+val.title+'</a></h3> <p> '+val.summary+'</p> <a href="'+val.link+'" target="_blank">Read article</a> </div>' );
        });
        $( ".blog-feed" ).append(items.join( "" ));
    });

})(jQuery); // End of use strict
