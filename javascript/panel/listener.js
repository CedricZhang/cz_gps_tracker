/**
 * Created by Cedric Zhang on 2016/8/5.
 */
var Listener = (function () {
    var Dom = require('./dom').Dom;
    var Data = require("./data").Data;
    var setSearchListener = function(){
        $("#go_search").click(function(){
            var tz = $("#time_zone").val();
            var from = $("#from_datetime").val();
            var to = $("#to_datetime").val();
            Data.queryPosition({
                tz:tz,
                from:from,
                to:to
            },
            function(result){
                console.log(result);
                if(result.code == 100){
                    if(result.data.pos.length > 0){
                        for(var i = 0 ;i<result.data.pos.length;i++){
                            var utcTime = new Date(result.data.pos[i].datetime);
                            var tzTime = new Date(utcTime.getTime() + tz*1000*60*60);
                            result.data.pos[i].datetime = tzTime.getFullYear()+"-"+(tzTime.getMonth()+1)+"-"+tzTime.getMinutes()+" "+tzTime.getHours()+":"+tzTime.getMinutes()+":"+tzTime.getSeconds();
                        }
                        Dom.drawPoints(result.data.pos)
                    }
                    else{
                        //TODO 弹出错误莫泰狂
                    }

                }else{
                    //TODO 弹出错误莫泰狂
                }
            })
            
        })
    };

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
        initTimepicker();
        setSearchListener();
        Dom.initTxMap();
    };

    return {init: init}
}());

exports.Listener = Listener;