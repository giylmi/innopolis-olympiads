/**
 * Created by giylmi on 03.03.2015.
 */
$(document).ready(function () {
    $.ajax({
        type: 'POST',
        url: 'http://pcms.university.innopolis.ru/olympiads/contestants',
        success: function (response) {
            if (response) {
                var data = eval(response);
                if (data) {
                    $(data).each(function (i, e) {
                        $('.js-table-body').append(
                            '<tr class="' + (e.status?'success':'danger') + '">' +
                                '<td>' + e.lastName + ' ' + e.firstName + e.middleName + '</td>' +
                                '<td>' + e.status + '</td>' +
                            '</tr>'
                        );
                    });
                }
            }
        },
        fail: function() {
            $('.js-table-wrapper').html('<p>К сожалению список сейчас недоступен.</p>')
        }
    });
});