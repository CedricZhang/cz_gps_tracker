/**
 * Created by Cedric Zhang on 2016/8/4.
 */
var code = require("../setting/status_code").code;
var database = (function(){
    var mysql = require("mysql");
    var dbSetting = require("../setting/database").database;
    var connection = mysql.createConnection({
        host : dbSetting.host ,
        user : dbSetting.user ,
        password : dbSetting.password ,
        database : dbSetting.database
    });
    connection.connect(function(error){
        if (error) {
            console.log("Error connecting database ... " + error.toString());
            return code.CONNE_TO_DB_ERR;
        }
    });

    return {
        connection:connection
    }
}());

exports.database = database;
