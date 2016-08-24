/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./public/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Cedric Zhang on 2016/8/5.
	 */
	var Listener = __webpack_require__(1).Listener;

	Listener.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Cedric Zhang on 2016/8/5.
	 */
	var Listener = (function () {
	    var Dom = __webpack_require__(2).Dom;
	    var Data = __webpack_require__(3).Data;
	    var setSearchListener = function(){
	        $("#go_search").click(function(){
	            var tz = $("#time_zone").val();
	            var from = $("#from_datetime").val();
	            var to = $("#to_datetime").val();
	            Data.queryPosition({
	                tz:tz,
	                from:from,
	                to:to
	            },
	            function(result){
	                console.log(result);
	                if(result.code == 100){
	                    if(result.data.pos.length > 0){
	                        for(var i = 0 ;i<result.data.pos.length;i++){
	                            var utcTime = new Date(result.data.pos[i].datetime);
	                            var tzTime = new Date(utcTime.getTime() + tz*1000*60*60);
	                            result.data.pos[i].datetime = tzTime.getUTCFullYear()+"-"+(tzTime.getUTCMonth()+1)+"-"+tzTime.getUTCDate()+" "+tzTime.getUTCHours()+":"+tzTime.getUTCMinutes()+":"+tzTime.getUTCSeconds();
	                        }
	                        Dom.drawPoints(result.data.pos)
	                    }
	                    else{
	                        Dom.showAlert({
	                            title:"无数据",
	                            body:"选定的时间段内没有数据"
	                        })
	                    }

	                }else{
	                    Dom.showAlert({
	                        title:"查询错误",
	                        body:"查询错误 错误代码："+result.code+" "+result.info
	                    })
	                }
	            })
	            
	        })
	    };

	    var initTimepicker = function () {
	        $("#from_form_datetime").datetimepicker({
	            format: "yyyy-mm-dd hh:ii",
	            autoclose: true,
	            todayBtn: true,
	            todayHighlight: true,
	            initialDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
	            pickerPosition: "bottom-left",
	            weekStart: 1,
	            endDate:new Date()
	        });
	        $("#to_form_datetime").datetimepicker({
	            format: "yyyy-mm-dd hh:ii",
	            autoclose: true,
	            todayBtn: true,
	            todayHighlight: true,
	            initialDate: new Date(),
	            pickerPosition: "bottom-left",
	            weekStart: 1,
	            endDate:new Date()
	        });
	    };
	    var init = function () {
	        initTimepicker();
	        setSearchListener();
	        Dom.initGoogleMap();
	    };

	    return {init: init}
	}());

	exports.Listener = Listener;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Cedric Zhang on 2016/8/5.
	 */
	var Dom = (function () {
	    var Data = __webpack_require__(3).Data;
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

/***/ },
/* 3 */
/***/ function(module, exports) {

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
	            url:'http://apis.map.qq.com/ws/location/v1/ip?&key=5YIBZ-F322X-G3D4K-ZJLFF-QVGT5-5DBYS&output=jsonp',
	            type:'GET',
	            dataType:'jsonp',
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

/***/ }
/******/ ]);