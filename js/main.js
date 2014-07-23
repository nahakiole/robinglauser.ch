

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
            },
            captcha_code: {
                validators: {
                    notEmpty: {
                        message: 'We need this for security reasons'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();

        // Get the form instance
        var $form = $(e.target);

        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');

        // Use Ajax to submit form data
        $.post($form.attr('action'), $form.serialize(), function(result) {
            if (result == 'captcha'){
                bv.resetField('captcha_code', true).updateMessage('captcha_code', '', 'Wrong Captcha');
                document.getElementById('captcha').src = '/captcha?' + Math.random();
                return false;
            }
            $('.contact-form').slideUp();
            $('.contact-feedback').slideDown();
            console.log(result);
            $('.contact-feedback h2').html(result);
            return true;
        });
    });
});