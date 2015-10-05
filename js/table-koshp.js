/**
 * Created by giylmi on 03.03.2015.
 */
$(document).ready(function () {
    var russian = {
        "processing": "Подождите...",
        "search": "Поиск:",
        "lengthMenu": "Показать _MENU_ записей",
        "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
        "infoEmpty": "Записи с 0 до 0 из 0 записей",
        "infoFiltered": "(отфильтровано из _MAX_ записей)",
        "infoPostFix": "",
        "loadingRecords": "Загрузка записей...",
        "zeroRecords": "Записи отсутствуют.",
        "emptyTable:": "В таблице отсутствуют данные",
        "paginate": {
            "first": "Первая",
            "previous": "<span><i class='glyphicon glyphicon-arrow-left'></i></span>",
            "next": "<span><i class='glyphicon glyphicon-arrow-right'></i></span>",
            "last": "Последняя"
        },
        "aria": {
            "sortAscending": ": активировать для сортировки столбца по возрастанию",
            "sortDescending": ": активировать для сортировки столбца по убыванию"
        }
    };
    $.ajax({
        type: 'POST',
        url: 'http://pcms.university.innopolis.ru/olympiads/values/koshp-registration-form-ViewObject',
        success: function (response) {
            if (response) {
                var data = eval(response);
                if (data) {
                    $(data).each(function (i, e) {
                        $('.js-table-body').append(
                            '<tr class="' + (e.status!=null?(e.status?'success':'danger'):'warning') + '">' +
								'<td>' + e.team_name + '</td>' +
                                '<td>' + e.con1_lname + ', ' + e.con2_lname + ', ' + e.con3_lname + '</td>' +
                                '<td>' + (e.status!=null?(e.status?'Подтвержден':'Отклонен'):'Ожидание') + '</td>' +
                            '</tr>'
                        );
                    });
                    $('.js-table').DataTable({
                        "language": russian,
                        "pagingType": "simple_numbers",
                        "lengthMenu": [[25, 50, -1], [25, 50, "All"]],
                        "order": [[ 0, 'asc' ]]
                    });
                }
            }
        },
        fail: function() {
            $('.js-table-wrapper').html('<p>К сожалению список сейчас недоступен.</p>')
        }
    });
});
