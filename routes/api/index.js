/**
 * Created by Cedric Zhang on 2016/8/5.
 */
var express = require('express');
var router = express.Router();
var code = require('../../setting/status_code').code;
var queryPosition = require('../../service/query_position').QueryPosition;

router.post('/query', function (req, res) {

    var formatDatetime = function (date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
            ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    };


    if (req.body && req.body.from && req.body.to) {
        var tz = req.body.tz || 0;
        var utcFrom = new Date(new Date(req.body.from).getTime() - (tz * 1000 * 60 * 60));
        var utcTo = new Date(new Date(req.body.to).getTime() - (tz * 1000 * 60 * 60));

        queryPosition.query({
            from: formatDatetime(utcFrom),
            to: formatDatetime(utcTo)
        }, function (result) {
            if (result && result.code && result.code == code.SUCCESS) {
                var newResult = {code:code.SUCCESS,data:{pos:[]}};
                for(var i = 0; i < result.result.length;i++){
                    newResult.data.pos.push(result.result[i]);   //fixme 可以做进一步的处理
                }
                res.json(newResult);
            } else {
                res.json({
                    code: result.code || -99999,
                    info: '查询失败'
                })
            }
        });


    }
    else {
        res.json({
            code: code.BAD_REQUEST,
            info: '非法请求'
        })
    }

});

module.exports = router;