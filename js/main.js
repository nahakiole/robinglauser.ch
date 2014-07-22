

$(function(){
    $('.btn-scroll-to-contact').on('click', function(e){
        e.preventDefault();
        jQuery('html, body').animate({
            scrollTop: jQuery(".contact").offset().top + 20
        }, 1000, 'easeOutQuint');
    });

    $('.contact').on('submit', function(e){
        e.preventDefault();
        $('.contact-form').slideUp();
        $('.contact-feedback').slideDown();

    });
});