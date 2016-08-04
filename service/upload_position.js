/**
 * Created by Cedric Zhang on 2016/8/4.
 */

var uploadPosition = (function () {
    var conn = require('./connect_database').database.connection;
    var code = require('../setting/status_code').code;
    var upload = function (paras) {
        var sql = "INSERT INTO `gpslogger`.`records` " +
            "(`datetime`, `lat`, `lon`, `acc`, `spd`, `dir`, `prov`, `batt`)" +
            " VALUES ('" + (paras.datetime || 0) + "'," +
            (paras.lat || 0 ) + "," +
            (paras.lon || 0 ) + "," +
            (paras.acc || 0 ) + "," +
            (paras.spd || 0 ) + "," +
            (paras.dir || 0 ) + ",'" +
            (paras.prov || 'N/A') + "'," +
            (paras.batt || 0 ) +  ");";
        console.log(sql);
        conn.query(sql, function (error, rows, fields) {
            if (!error) {
                return code.SUCCESS
            } else {
                console.log("Error uploading position data .. " + error.toString());
                return code.INSRT_DATA_ERR
            }

        })
    };

    return {
        upload: upload
    }
}());

exports.uploadPosition = uploadPosition;