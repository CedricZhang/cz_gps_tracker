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
	var Listener = __webpack_require__(4).Listener;

	Listener.init()

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Cedric Zhang on 2016/8/5.
	 */
	var Listener = (function () {
	    var Dom = __webpack_require__(5).Dom;
	    var Data = __webpack_require__(6).Data;
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
	                            result.data.pos[i].datetime = tzTime.getFullYear()+"-"+(tzTime.getMonth()+1)+"-"+tzTime.getDay()+" "+tzTime.getHours()+":"+tzTime.getMinutes()+":"+tzTime.getSeconds();
	                        }
	                        Dom.drawPoints(result.data.pos)
	                    }
	                    else{
	                        //TODO 弹出错误莫泰狂
	                    }

	                }else{
	                    //TODO 弹出错误莫泰狂
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
	        Dom.initTxMap();
	    };

	    return {init: init}
	}());

	exports.Listener = Listener;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Cedric Zhang on 2016/8/5.
	 */
	var Dom = (function () {
	    var Data = __webpack_require__(6).Data;
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
	                    info.setContent('<div style="text-align:center;white-space:nowrap; margin:10px;">' +
	                        "<div><p style='color:#900000;font-size: 20px;'>" + event.target.ownData.datetime + "</p></div><div>" +
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

/***/ },
/* 6 */
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