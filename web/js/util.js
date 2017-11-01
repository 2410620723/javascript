/*
 * Created by zxm on 2017-9-29.
 */
/*
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
    },
    getCss:function (curEle, attr) {
        var value = null;
        if ("getComputedStyle" in window) {
            value = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                value = curEle.currentStyle["filter"];// alpha(opacity=10)
                var oReg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
                value = oReg.test(value) ? oReg.exec(value)[1] / 100 : 1;
            } else {
                value = curEle.currentStyle[attr];
            }
        }
        var reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
        return reg.test(value) ? parseFloat(value) : value;
    },
    children:function(curEle,tagName){
        var arr = [];
        if (/MSIE (6|7|8)/i.test(navigator.userAgent)){
            var nodeList = curEle.childNodes;
            for (var i = 0; i<nodeList.length; i++) {
                var curNode = nodeList[i];
                if (curNode.nodeType === 1) {
                    arr[arr.length] = curNode;
                }
            }
            nodeList = null;
        } else {
            //在标准的浏览器中直接使用children，但是获取到的是元素集合（类数组）
            arr = this.listToArray(curEle.children);
        }
        if (typeof tagName === "string") {
            for (var k = 0; k < arr.length; k++) {
                var curEleNode = arr[k];
                if (curEleNode.nodeName.toLowerCase() != tagName.toLowerCase()) {
                    arr.splice(k,1);
                    k--;
                }
            }
        }
        return arr;
    }
};*/
/*使用惰性思想来封装常用的方法库*/
var utils = (function () {
    // flag 这个变量不销毁，存储的是兼容性判断，可以直接使用他的值，
    // true表示标准浏览器，false表示IE6-8。
    var flag = "getComputedStyle" in window;
    function children(curEle,tagName) {
        var arr = [];
        if (!flag){
            var nodeList = curEle.childNodes;
            for (var i = 0; i<nodeList.length; i++) {
                var curNode = nodeList[i];
                if (curNode.nodeType === 1) {
                    arr[arr.length] = curNode;
                }
            }
            nodeList = null;
        } else {
            //在标准的浏览器中直接使用children，但是获取到的是元素集合（类数组）
            arr = this.listToArray(curEle.children);
        }
        if (typeof tagName === "string") {
            for (var k = 0; k < arr.length; k++) {
                var curEleNode = arr[k];
                if (curEleNode.nodeName.toLowerCase() != tagName.toLowerCase()) {
                    arr.splice(k,1);
                    k--;
                }
            }
        }
        return arr;
    }
    return {
        listToArray:function (likeArr) {
            if (flag) {
                return Array.prototype.slice.call(likeArr);
            } else {
                var arr = [];
                for (var i=0;i<likeArr.length;i++){
                    arr[arr.length] = likeArr[i];
                }
                return arr;
            }
        },
        offset:function (curEle) {
            var totalLeft = null, totalTop = null, par = curEle.offsetParent;
            totalLeft += curEle.offsetLeft;
            totalTop += curEle.offsetTop;
            while (par) {
                //累加父级参照物的边框
                if (flag) {
                    totalLeft += par.clientLeft;
                    totalTop += par.clientTop;
                }
                totalLeft += par.offsetLeft;
                totalTop += par.offsetTop;
                par = par.offsetParent;
            }
            return {left: totalLeft, top: totalTop};
        },
        parseJSON:function (str) {
            return "JSON" in window?JSON.parse(str):eval("("+str+")");
        },
        getCss:function (curEle, attr) {
            var value = null;
            if (flag) {
                value = window.getComputedStyle(curEle, null)[attr];
            } else {
                if (attr === "opacity") {
                    value = curEle.currentStyle["filter"];// alpha(opacity=10)
                    var oReg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
                    value = oReg.test(value) ? oReg.exec(value)[1] / 100 : 1;
                } else {
                    value = curEle.currentStyle[attr];
                }
            }
            var reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
            return reg.test(value) ? parseFloat(value) : value;
        },
        children:children,
        win:function (attr, value) {
            if (typeof value === "undefined") {
                return document.documentElement[attr] || document.body[attr];
            }
            document.documentElement[attr] = value;
            document.body[attr] = value;
        }
    }
})();
