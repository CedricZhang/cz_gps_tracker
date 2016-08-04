/**
 * Created by Cedric Zhang on 2016/8/4.
 */
var express = require('express');
var router = express.Router();
var loginCheck = require('../../service/login').checkLogin;
var code = require('../../setting/status_code').code;
var aesjs = require('aes-js');
var sessionKey = require('../../setting/database').database.sessionKey;

router.get('/', function (req, res) {
    res.render('login/', {title: 'Express'});
});
router.post('/try', function (req, res) {
    if (req.body && req.body.password) {
        var result = loginCheck.check(req.body.password);
        if (result == code.SUCCESS) {
            var key = aesjs.util.convertStringToBytes(sessionKey);
            var timeNow = new Date().getTime(); //fixme 应该转换为UTC时间，不过暂时这样问题不大
            var text = timeNow.toString();
            var textBytes = aesjs.util.convertStringToBytes(text);
            var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedBytes = aesCtr.encrypt(textBytes);
            var encryptedText = aesjs.util.convertBytesToString(encryptedBytes,'hex');
            res.json({
                code:code.SUCCESS,
                info:"",
                data:{
                    session:encryptedText
                }
            });
            return;
        } else {
            res.json({
                code: result,
                info: '登陆失败'
            });
            return;
        }
    }
    res.json({
        code:code.BAD_REQUEST,
        info:'非法请求'
    })
});

module.exports = router;