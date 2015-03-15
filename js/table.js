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
                            '<tr class="' + (e.status!=null?(e.status?'success':'danger'):'warning') + '">' +
                                '<td>' + e.lastName + ' ' + e.firstName + ' ' + e.middleName + '</td>' +
                                '<td>' + (e.status!=null?(e.status?'Подтвержден':'Отклонен'):'Ожидание') + '</td>' +
                            '</tr>'
                        );
                    });
                    $(document).ready(function(){
                        $('.js-table').DataTable({
                            "language": {
                                "url": "//cdn.datatables.net/plug-ins/f2c75b7247b/i18n/Russian.json"
                            },
                            "pagingType": "simple_numbers",
                            "lengthMenu": [[25, 50, -1], [25, 50, "All"]],
                            "order": [[ 1, 'asc' ], [ 0, 'asc' ]]
                        });
                    });
                }
            }
        },
        fail: function() {
            $('.js-table-wrapper').html('<p>К сожалению список сейчас недоступен.</p>')
        }
    });
});