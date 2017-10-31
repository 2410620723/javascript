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
    },
    offset:function (curEle) {
        var totalLeft = null, totalTop = null, par = curEle.offsetParent;
        totalLeft += curEle.offsetLeft;
        totalTop += curEle.offsetTop;
        while (par) {
            //累加父级参照物的边框
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1){
                totalLeft += par.clientLeft;
                totalTop += par.clientTop;
            }
            totalLeft += par.offsetLeft;
            totalTop += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: totalLeft, top: totalTop};
    },
    win:function (attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }
};