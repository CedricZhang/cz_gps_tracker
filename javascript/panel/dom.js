/**
 * Created by Cedric Zhang on 2016/8/5.
 */
var Dom = (function () {
    var Data = require('./data').Data;
    var initTxMap = function () {
        var windowHeight = $(window).height();
        $("#tx_map").css('height', (windowHeight - 200 > 300 ? windowHeight - 200 : 200) + 'px');
        Data.getIpPosition(function (result) {
            if (result && result.status == 0 && result.result && result.result.location) {
                var map = new qq.maps.Map(document.getElementById("tx_map"), {
                    center: new qq.maps.LatLng(result.result.location.lat, result.result.location.lng),      // 地图的中心地理坐标。
                    zoom: 8                                                 // 地图的中心地理坐标。
                });
            } else {
                var map = new qq.maps.Map(document.getElementById("tx_map"), {
                    center: new qq.maps.LatLng(39.916527, 116.397128),      // 地图的中心地理坐标。
                    zoom: 8                                                 // 地图的中心地理坐标。
                });
            }
        })

    };

    var drawPoints = function (pointList) {

        var i = 0;
        var aveLat = 0.0;
        var aveLon = 0.0;

        for (i = 0; i < pointList.length; i++) {
            aveLat += pointList[i]['lat'];
            aveLon += pointList[i]['lon'];
        }
        aveLat = aveLat / pointList.length;
        aveLon = aveLon / pointList.length;

        var center = new qq.maps.LatLng(aveLat, aveLon);
        var map = new qq.maps.Map(document.getElementById('tx_map'), {
            center: center,
            zoom: 13
        });
        var info = new qq.maps.InfoWindow({
            map: map
        });

        var pureCorList = [];
        for (i = 0; i < pointList.length; i++) {
            pureCorList.push(new qq.maps.LatLng(pointList[i]['lat'], pointList[i]['lon']))
        }

        qq.maps.convertor.translate(pureCorList, 1, function (res) {
            console.log("!!!", res)
            for (i = 0; i < res.length; i++) {
                var marker = new qq.maps.Marker({
                    position: res[i],
                    map: map,
                    zIndex: 1500
                });
                var circle = new qq.maps.Circle({
                    center: res[i],
                    fillColor: new qq.maps.Color(0, 15, 255, 0.3),
                    map: map,
                    radius: pointList[i]['acc'],
                    visible: true,
                    zIndex: 1000
                });


                marker.ownData = pointList[i];
                console.log(res[i])
                qq.maps.event.addListener(marker, 'mouseover', function (event) {
                    console.log(event)
                    info.setContent('<div style="text-align:center;white-space:nowrap;' +
                        'margin:10px;">' +
                        "<div>" + event.target.ownData.datetime + "</div><div>" +
                        "<b>GPS坐标</b>: " + event.target.ownData.lat + " " + event.target.ownData.lon + "<br/>" +
                        "<b>腾讯坐标</b>: " + event.latLng + "<br/>" +
                        "<b>精度</b>: " + event.target.ownData.acc + " 米 " +
                        "<b>定位方式</b>: " + event.target.ownData.prov + "<br/>" +
                        "<b>速度</b>: " + (event.target.ownData.prov == 'gps' ? ((event.target.ownData.spd * 3.6).toFixed(2)) : "N/A") + " km/h " +
                        "<b>方向</b>: " + (event.target.ownData.prov == 'gps' ? event.target.ownData.dir : "N/A") + "<br/>" +
                        "<b>设备电量</b>: " + event.target.ownData.batt + "%<br/>" +
                        "</div>"
                        + '</div>');
                    info.setPosition(event.latLng);
                    info.open();
                });

            }
        });
    };

    return {
        initTxMap: initTxMap,
        drawPoints: drawPoints
    }
})();

exports.Dom = Dom;