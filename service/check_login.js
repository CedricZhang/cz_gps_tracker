/**
 * Created by Cedric Zhang on 2016/8/4.
 */
var checkLogin = function (req, res, next) {
    var flag = true;
    var aesjs = require('aes-js');
    console.log('checkAuth ' + req.url);
    if (req.cookies && req.cookies.s) {
        var sessionKey = require('../setting/database').database.sessionKey;
        var key = aesjs.util.convertStringToBytes(sessionKey);
        var session = req.cookies.s;
        var now = new Date().getTime();
        var encryptedBytes = aesjs.util.convertStringToBytes(session, 'hex');
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);

        var decryptedText = aesjs.util.convertBytesToString(decryptedBytes);
        var sessionTime = parseInt(decryptedText);
        if (now - sessionTime < 1000 * 60 * 60) {//一小时
            flag = false;
        }
    }
    if (flag) {
        res.redirect('/login');
        return;
    }
    next();
};

module.exports = checkLogin;