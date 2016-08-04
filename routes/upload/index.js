/**
 * Created by Cedric Zhang on 2016/8/4.
 */
var express = require('express');
var router = express.Router();
var uploadPosition = require('../../service/upload_position').uploadPosition;
/* GET upload page. */
router.get('/', function(req, res, next) {
    var paras = {
        datetime:req.query.time || 0,
        lat:req.query.lat || 0,
        lon:req.query.lon,
        acc:req.query.acc,
        spd:req.query.spd,
        dir:req.query.dir,
        prov:req.query.prov,
        batt:req.query.batt
    };
    var result = uploadPosition.upload(paras);
    if(result == 0){
        res.send(0);
        console.log(paras)
    }else{
        res.send("ERR:" + result);
    }
});

module.exports = router;
