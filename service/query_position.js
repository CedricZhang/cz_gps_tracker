/**
 * Created by Cedric Zhang on 2016/8/5.
 */
var QueryPosition = (function () {
    var conn = require('./connect_database').database.connection;
    var code = require('../setting/status_code').code;

    var query = function (paras, callback) {
        if (paras && paras.from && paras.to) {
            var sql = "SELECT *  FROM `gpslogger`.`records` WHERE " +
                "`datetime` >= '" + paras.from + "' AND " +
                "`datetime` <= '" + paras.to + "'";
            console.log("!!!", sql);
            conn.query(sql, function (error, rows, fields) {
                var _result = {};
                if (!error) {
                    _result =   {code: code.SUCCESS, result: rows}
                } else {
                    console.log("Error querying position data .. " + error.toString());
                    _result =   {code: code.QUERY_DATA_ERR}
                }
                if(callback && typeof callback == 'function'){
                    callback(_result)
                }
            });

        }else{
            if(callback && typeof callback == 'function'){
                callback({code: code.QUERY_DATA_ERR_EMPTY_PARAS})
            }
        }
    };

    return {query: query}
}());

exports.QueryPosition = QueryPosition;