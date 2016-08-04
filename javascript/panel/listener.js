/**
 * Created by Cedric Zhang on 2016/8/5.
 */
var Listener = (function () {
    var initTimepicker = function () {
        $("#from_form_datetime").datetimepicker({
            format: "yyyy-mm-dd hh:ii",
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            initialDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
            pickerPosition: "bottom-left",
            weekStart: 1,
            endDate:new Date()
        });
        $("#to_form_datetime").datetimepicker({
            format: "yyyy-mm-dd hh:ii",
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            initialDate: new Date(),
            pickerPosition: "bottom-left",
            weekStart: 1,
            endDate:new Date()
        });
    };
    var init = function () {
        initTimepicker()
    };

    return {init: init}
}());

exports.Listener = Listener;