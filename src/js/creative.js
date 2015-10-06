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

    $('.contributions').find('.list-group-item-heading').each(function(){
        var that = this;
        githubStars($(this).text(), function(count){
            $(that).prev('.badge').html(count.replace(/./g, function(c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            })+'<i class="fa fa-star"></i>')
        });
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
