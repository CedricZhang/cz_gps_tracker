/**
 * Created by Cedric Zhang on 2016/8/4.
 */
var Listener = (function(){
    var Data = require('./data').Data;
    var Dom = require('./dom').Dom;
    var setLoginListener = function(){
        $('#login_button').click(function(){
            var password = $("#userPassword").val();
            if(password==""){
                Dom.showAlert({
                    title:'登录失败',
                    body:"请输入密码！"
                })
                return
            }
            Data.sendLogin(password,function(result){
                if(result && result.code && result.code >0){//登录成功
                    if(result.data && result.data.session){
                        document.cookie="s="+result.data.session;
                        location.href='/panel'
                    }
                }
                else{
                    Dom.showAlert({
                        title:'登录失败',
                        body:result.info
                    })
                }
            })

        })

    };

    var init = function(){
        setLoginListener();
    };

    return{init:init}
})();

exports.Listener = Listener;