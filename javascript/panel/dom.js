/**
 * Created by Cedric Zhang on 2016/8/5.
 */
var Dom = (function(){
    var Data = require('./data').Data;
    var initTxMap = function () {
        var windowHeight = $(window).height();
        $("#tx_map").css('height',(windowHeight-200 > 300?windowHeight-200:200)+'px');
        Data.getIpPosition(function(result){
            if(result && result.status==0 && result.result && result.result.location){
                var map = new qq.maps.Map(document.getElementById("tx_map"), {
                    center: new qq.maps.LatLng(result.result.location.lat,result.result.location.lon),      // 地图的中心地理坐标。
                    zoom:8                                                 // 地图的中心地理坐标。
                });
            }else {
                var map = new qq.maps.Map(document.getElementById("tx_map"), {
                    center: new qq.maps.LatLng(39.916527,116.397128),      // 地图的中心地理坐标。
                    zoom:8                                                 // 地图的中心地理坐标。
                });
            }
        })

    };

    return{
        initTxMap:initTxMap
    }
})();

exports.Dom = Dom;