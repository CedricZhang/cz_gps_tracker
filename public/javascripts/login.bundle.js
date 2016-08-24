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
	 * Created by Cedric Zhang on 2016/8/4.
	 */
	var Listener = __webpack_require__(4).Listener;

	Listener.init();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Cedric Zhang on 2016/8/4.
	 */
	var Listener = (function(){
	    var Data = __webpack_require__(5).Data;
	    var Dom = __webpack_require__(6).Dom;
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

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Created by Cedric Zhang on 2016/8/4.
	 */
	var Dom = (function(){
	    var showAlert = function(message){
	        var modal = $('#modal');
	        modal.find('.modal-dialog').removeClass("modal-sm").removeClass("modal-lg").addClass("modal-sm");
	        $('#modal_title').html(message.title || '警告');
	        $('#modal_body').html(message.body || '发生错误');
	        console.log(message)
	        modal.modal();
	    };
	    return{showAlert:showAlert};
	}());

	exports.Dom = Dom;

/***/ }
/******/ ]);