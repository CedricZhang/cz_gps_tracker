/**
 * Created by Cedric Zhang on 2016/8/4.
 */
var Data = (function(){
    var sendLogin = function(password, callback){
        var _result = {};
        $.ajax({
            url:'/login/try',
            type:'POST',
            data:{
                password:password
            },
            success:function(result){
                if(result){
                    _result = result
                }
            },
            error:function(error){
                _result.code='-99999';
                _result.info='登录时服务端发生错误';
                _result.data=error;
            },
            complete:function(){
                if(callback && typeof callback == 'function'){
                    callback(_result);
                }
            }
        })
    };

    return{
        sendLogin:sendLogin
    }
}());

exports.Data = Data;