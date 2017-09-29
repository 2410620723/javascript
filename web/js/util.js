/**
 * Created by zxm on 2017-9-29.
 */
var utils = {
    listToArray:function (likeArr) {
        var arr = [];
        try{
            arr = Array.prototype.slice.call(likeArr);
        } catch(e) {
            for (var i=0;i<likeArr.length;i++){
                arr[arr.length] = likeArr[i];
            }
        }
        return arr;
    },
    parseJSON:function (str) {
        return "JSON" in window?JSON.parse(str):eval("("+str+")");
    }
};