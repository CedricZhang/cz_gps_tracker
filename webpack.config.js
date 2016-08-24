/**
 * Created by Cedric Zhang on 2016/8/4.
 */
module.exports = {


    entry: {
        login: "./javascript/login/index.js",
        panel: "./javascript/panel/index.js",
        google:"./javascript/panel/google/index.js",
        tencent:"./javascript/panel/tencent/index.js"
        //page2: ["./entry1", "./entry2"]
    },
    output: {
        path: "./public/javascripts",
        publicPath: "./public/",
        filename: "[name].bundle.js"
        //chunkFilename: "[id].bundle.js"
    }
};