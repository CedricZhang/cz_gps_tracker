/**
 * Created by Cedric Zhang on 2016/8/4.
 */
/**
 * Created by Cedric Zhang on 2016/8/4.
 */
var express = require('express');
var router = express.Router();
/* GET upload page. */
router.get('/', function(req, res) {
    res.render('panel/', {title: '查看位置记录'})
});

module.exports = router;
