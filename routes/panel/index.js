/**
 * Created by Cedric Zhang on 2016/8/4.
 */
/**
 * Created by Cedric Zhang on 2016/8/4.
 */
var express = require('express');
var router = express.Router();
/* GET upload page. */
router.get('/tencent', function(req, res) {
    res.render('panel/tencent', {title: '查看位置记录 腾讯地图'})
});
router.get('/google', function(req, res) {
    res.render('panel/google', {title: '查看位置记录 谷歌地图'})
});
router.get('/', function(req, res) {
    res.render('panel/', {title: '自动选择地图'})
});

module.exports = router;
