/**
 * Created by Cedric Zhang on 2016/8/5.
 */
var Dom = (function () {
    var Data = require('./data').Data;
    var showAlert = function (message) {
        var modal = $('#modal');
        modal.find('.modal-dialog').removeClass("modal-sm").removeClass("modal-lg").addClass("modal-sm");
        $('#modal_title').html(message.title || '警告');
        $('#modal_body').html(message.body || '发生错误');
        modal.modal();
    };
    var initGoogleMap = function () {
        var windowHeight = $(window).height();
        $("#google_map").css('height', (windowHeight - 200 > 300 ? windowHeight - 200 : 200) + 'px');
        Data.getIpPosition(function (result) {
            if (result && result.status == 0 && result.result && result.result.location) {
                var map = new google.maps.Map(document.getElementById("google_map"), {
                    center: new google.maps.LatLng(result.result.location.lat, result.result.location.lng),      // 地图的中心地理坐标。
                    zoom: 10,                                                // 地图的中心地理坐标。
                    scaleControl: true
                });
            } else {
                var map = new google.maps.Map(document.getElementById("google_map"), {
                    center: new google.maps.LatLng(38.8997187,-77.0507879),      // 地图的中心地理坐标。
                    zoom: 10,                                                 // 地图的中心地理坐标。
                    scaleControl: true
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

        var center = new google.maps.LatLng(aveLat, aveLon);
        $("#google_map").html("");
        var map = new google.maps.Map(document.getElementById('google_map'), {
            center: center,
            zoom: 13,
            scaleControl: true
        });
        var info = new google.maps.InfoWindow({
            map: map
        });
        for(i=0;i<pointList.length;i++){
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(pointList[i]['lat'], pointList[i]['lon']),
                map: map,
                zIndex: 1500,
                animation: google.maps.Animation.DROP
            });
            var circle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.3,
                map: map,
                center: new google.maps.LatLng(pointList[i]['lat'], pointList[i]['lon']),
                radius: pointList[i]['acc']
            });
            if(pointList[i]['prov'] =='gps' && pointList[i]['spd'] > 0){
                console.log("HAHAHA")
                var directionMarker = new google.maps.Marker({
                    position:   new google.maps.LatLng(pointList[i]['lat'], pointList[i]['lon']),
                    map:        map,
                    draggable:  false,
                    title:      "test"
                });
                directionMarker.setIcon({
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 6,
                    rotation: pointList[i]['dir']
                });
            }
            marker.ownData = pointList[i];
            google.maps.event.addListener(marker,'mouseover', function (event) {
                info.setContent('<div style="text-align:center;white-space:nowrap; margin:10px;">' +
                    "<div><p style='color:#900000;font-size: 20px;'>" + this.ownData.datetime + "</p></div><div>" +
                    "<b>GPS坐标</b>: " + this.ownData.lat + " " + this.ownData.lon + "<br/>" +
                    "<b>精度</b>: " + this.ownData.acc + " 米 " +
                    "<b>定位方式</b>: " + this.ownData.prov + "<br/>" +
                    "<b>速度</b>: " + (this.ownData.prov == 'gps' ? ((this.ownData.spd * 3.6).toFixed(2)) : "N/A") + " km/h " +
                    "<b>方向</b>: " + (this.ownData.prov == 'gps' ? this.ownData.dir : "N/A") + "<br/>" +
                    "<b>设备电量</b>: " + this.ownData.batt + "%<br/>" +
                    "</div>"
                    + '</div>');
                info.setPosition(this.position);
                info.open(map,this);
            });
            
        }
    };

    return {
        initGoogleMap: initGoogleMap,
        drawPoints: drawPoints,
        showAlert:showAlert
    }
})();

exports.Dom = Dom;