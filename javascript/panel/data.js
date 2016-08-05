/**
 * Created by Cedric Zhang on 2016/8/5.
 */
var Data = (function(){
    var queryPosition = function(paras,callback){
        var _result = {};
        $.ajax({
            url:'/api/query',
            type:'POST',
            data:{
                tz:paras.tz,
                from:paras.from,
                to:paras.to
            },
            success:function(result){
                if(result){
                    _result = result
                }
            },
            error:function(error){
                _result.code='-99999';
                _result.info='查询服务端发生错误';
                _result.data=error;
            },
            complete:function(){
                if(callback && typeof callback == 'function'){
                    callback(_result);
                }
            }
        })
    };

    var getIpPosition = function(callback){
        var _result = {};
        $.ajax({
            url:'http://apis.map.qq.com/ws/location/v1/ip?&key=5YIBZ-F322X-G3D4K-ZJLFF-QVGT5-5DBYS',
            type:'GET',
            success:function(result){
                if(result){
                    _result = result
                }
            },
            error:function(error){
                _result.code='-99999';
                _result.info='请求腾讯定位服务器错误';
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
        queryPosition:queryPosition,
        getIpPosition:getIpPosition
    }
}());

exports.Data = Data;