/**
 * Created by giylmi on 02.03.2015.
 */
$(document).ready(function () {
    var $forms = $('.js-form');
    $forms.on('submit', function (e) {
        e.preventDefault();
        var $form = $(this);
        $form.find('.has-error').each(function (i, e) {
            $(e).removeClass('has-error');
        });

        var $jsError = $form.find('.js-error');
        var $jsUserNotSaved = $form.find('.js-user-notsaved');
        var $jsUserSaved = $form.find('.js-user-saved');

        $jsError.html('');
        $jsUserNotSaved.hide();
        $jsUserSaved.hide();

        $.ajax({
            type: 'POST',
            url: 'https://pcms.university.innopolis.ru/olympiads/save/' + $form.attr('id'),
            //contentType: "application/json",
            data: $form.serialize(),
            success: function (response) {
                if (response) {
                    var data = eval(response);
                    if (data){
                        var hasProps = false;
                        for (var key in data) {
                            if (data.hasOwnProperty(key)) {
                                hasProps = true;
                                if (key == 'form'){
                                    $jsUserNotSaved.show();
                                } else {
                                    var $error = $form.find('.js-' + key + '-error');
                                    $error.html('');
                                    for (var error in data[key])
                                        $error.append('<li>' + data[key][error] + '</li>');
                                    $error.parent().addClass('has-error');
                                }
                            }

                        }
                        if (!hasProps) {
                            $jsUserSaved.show();
                        }
                    }
                }
            },
            fail: function(){
                $jsUserNotSaved.show();
            }
        });
    });

    $('.my-checkbox').on('click', function () {
        var $this = $(this);
        var $password = $this.parents('.js-form').find('.js-password');
        if ($this.is(':checked')) $password.attr('type', 'text');
        else $password.attr('type', 'password');
    })
});

