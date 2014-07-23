

$(function(){
    $('.btn-scroll-to-contact').on('click', function(e){
        e.preventDefault();
        jQuery('html, body').animate({
            scrollTop: jQuery(".contact").offset().top + 20
        }, 1000, 'easeOutQuint');
    });

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
    }).on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();


        $('.contact-form').slideUp();
        $('.contact-feedback').slideDown();

        // Get the form instance
        var $form = $(e.target);

        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');

        // Use Ajax to submit form data
        $.post($form.attr('action'), $form.serialize(), function(result) {
            // ... Process the result ...
        }, 'json');
    });;
});