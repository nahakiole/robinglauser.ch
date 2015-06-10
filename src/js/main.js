

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
                        message: 'Please don\'t send me empty mails!'
                    },
                    stringLength: {
                        min: 10,
                        message: 'This seems a little bit too short.'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'I need your mail address so I can get back to you.'
                    },
                    emailAddress: {
                        message: 'This doesn\' looks like a real mail address.'
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
            $('.contact-feedback h2').html(result);
            return true;
        });
    });
});