

$(function(){
    $('.btn-scroll-to-contact').on('click', function(e){
        e.preventDefault();
        jQuery('html, body').animate({
            scrollTop: jQuery(".contact").offset().top + 20
        }, 1000, 'easeOutQuint');
    });

//    $('.contact').on('submit', function(e){
//
//        $('.contact-form').slideUp();
//        $('.contact-feedback').slideDown();
//
//    });


    $('.contact').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            textarea: {
                trigger: 'blur',
                message: '',
                validators: {
                    notEmpty: {
                        message: 'I don\'t like empty messages!'
                    },
                    stringLength: {
                        min: 10,
                        message: 'I don\'t like short messages either!'
                    }
                }
            },
            email: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: 'The email is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            }
        }
    });
});