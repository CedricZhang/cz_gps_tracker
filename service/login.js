/**
 * Created by Cedric Zhang on 2016/8/4.
 */
var PASSWORD = require('../setting/database').database.loginpassword;
var code = require('../setting/status_code').code
var checkLogin = (function () {
    var check = function(inputPassword){
        if(inputPassword.toString() == PASSWORD){
            return code.SUCCESS
        }else{
            return code.WRONG_PSWD
        }
    };

    return{check:check}
}());

exports.checkLogin = checkLogin;