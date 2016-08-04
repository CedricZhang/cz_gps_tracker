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