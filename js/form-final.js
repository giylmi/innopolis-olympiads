/**
 * Created by giylmi on 02.03.2015.
 */
$(document).ready(function () {
    $.fn.serializeObject = function()
    {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    $('.js-form').on('submit', function (e) {
        e.preventDefault();
        var $form = $(this);
        $form.find('.has-error').each(function (i, e) {
            $(e).removeClass('has-error');
        });
        $form.find('.js-error').html('');
        $('.js-user-notsaved').hide();
        $('.js-user-saved').hide();
        $.ajax({
            type: 'POST',
            url: 'http://pcms.university.innopolis.ru/olympiads/save/final-registration-form',
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
                                if (key == 'final-registration-form'){
                                    $('.js-user-notsaved').show();
                                } else {
                                    var $error = $('.js-' + key + '-error');
                                    $error.html('');
                                    for (var error in data[key])
                                        $error.append('<li>' + data[key][error] + '</li>');
                                    $error.parent().addClass('has-error');
                                }
                            }

                        }
                        if (!hasProps) {
                            $('.js-user-saved').show();
                        }
                    }
                }
            },
            fail: function(){
                $('.js-user-notsaved').show();
            }
        });
    });

    $('.my-checkbox').on('click', function () {
        var $this = $(this);
        if ($this.is(':checked')) $('.js-password').attr('type', 'text');
        else $('.js-password').attr('type', 'password');
    })
});

