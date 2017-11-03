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

    function listToArray(likeArr) {
        if (flag) {
            return Array.prototype.slice.call(likeArr);
        } else {
            var arr = [];
            for (var i = 0; i < likeArr.length; i++) {
                arr[arr.length] = likeArr[i];
            }
            return arr;
        }
    }

    function parseJSON(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }

    function children(curEle, tagName) {
        var arr = [];
        if (!flag) {
            var nodeList = curEle.childNodes;
            for (var i = 0; i < nodeList.length; i++) {
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
                    arr.splice(k, 1);
                    k--;
                }
            }
        }
        return arr;
    }

    function offset(curEle) {
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
    }

    function getCss(curEle, attr) {
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
    }

    function win(attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    /*获取上一个哥哥节点
     * 首先获取当前元素的上一个哥哥节点，判断是否为元素节点，不是的话，继续向上找，直到找到，找不到的话返回null
     * */
    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    /*获取下一个弟弟节点*/
    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var next = curEle.nextSibling;
        while (next && next.nodeType !== 1) {
            next = next.nextSibling;
        }
        return next;
    }

    /*获取所有哥哥节点*/
    function prevAll(curEle) {
        var arr = [];
        var pre = this.prev(curEle);
        while (pre) {
            arr.unshift(pre);// 把数据放在数组开头
            pre = this.prev(pre);
        }
        return arr;
    }

    function nextAll(curEle) {
        var arr = [];
        var next = this.next(curEle);
        while (next) {
            arr.push(next);
            next = this.next(next);
        }
        return arr;
    }

    /*获取相邻的两个元素节点*/
    function sibling(curEle) {
        var pre = this.prev(curEle);
        var next = this.next(curEle);
        var arr = [];
        pre ? arr.push(pre) : null;
        next ? arr.push(next) : null;
        return arr;
    }

    /*获取所有的兄弟节点*/
    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    }

    /*获取当前元素的索引*/
    function index(curEle) {
        return this.prevAll(curEle).length;
    }

    /*获取第一个元素子节点*/
    function firstChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[0] : null;
    }

    /*获取最后一个元素子节点*/
    function lastChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[chs.length - 1] : null;
    }

    /*向指定元素的末尾追加元素*/
    function append(newEle, container) {
        container.appendChild(newEle);
    }

    /*向指定元素的开头追加元素*/
    function prepend(newEle, container) {
        var firstC = this.firstChild(container);
        if (firstC) {
            container.insertBefore(newEle, firstC);
            return;
        }
        container.appendChild(newEle);
    }

    /*向指定元素的前面追加元素*/
    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    /*向指定元素的后面追加元素*/
    function insertAfter(newEle, oldEle) {
        var oldEleNext = this.next(oldEle);
        if (oldEleNext) {
            oldEleNext.parentNode.insertBefore(newEle, oldEle);
            return;
        }
        oldEle.parentNode.appendChild(newEle);
    }

    /*判断是否存在某一个样式类名*/
    function hasClass(curEle, className) {
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className);
    }

    /*增加样式类名*/
    function addClass(curEle, className) {
        // 解决传入多个class
        var classArr = className.split(/ +/g);
        for (var i = 0; i < classArr.length; i++) {
            var curClass = classArr[i];
            if (!this.hasClass(curEle, curClass)) {
                curEle.className += " " + curClass;
            }
        }
    }

    /*删除样式类名*/
    function removeClass(curEle, className) {
        var classArr = className.split(/ +/g);
        for (var i = 0; i < classArr.length; i++) {
            var curClass = classArr[i];
            if (this.hasClass(curEle, curClass)) {
                var reg = new RegExp("(^| +)" + curClass + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ");
            }
        }
    }

    /*getElementsByClassName的兼容处理*/
    function getElementsByClassName(className, context) {
        context = context || document;
        if (flag) {
            return this.listToArray(context.getElementsByClassName(className));
        }
        var nodeArr = [], classArr = className.replace(/(^ +| +$)/).split(/ +/g),
            nodeList = context.getElementsByTagName("*");
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            var isOk = true;
            for (var j = 0; j < classArr.length; j++){
                var reg = new RegExp("(^| +)" + classArr[j] + "( +|$)");
                if (!reg.test(curNode.className)) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                nodeArr.push(curNode);
            }
        }
        return nodeArr;
    }
    /*给当前元素的某一个样式属性设置属性值（增加在行内样式上的）*/
    function setCss(curEle, attr, value) {
        // 如果是opacity
        if (attr === "opacity") {
            curEle["style"]["opacity"] = value;
            curEle["style"]["filter"] = "alpha(opacity="+ value * 100 + ")";
            return;
        }
        if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
            return;
        }

        // 如果某些属性传进来的属性值没有单位，我们需要添加一个默认的单位。
        var reg = /^(width|height|top|left|bottom|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
        if (reg.test(attr)) {
            // 判断是否加单位
            if (!isNaN(value)) {
                // 是有效数字表示没有加单位
                value += "px";
            }
        }
        curEle["style"][attr] = value;
    }

    function setGroupCss(curEle, obj) {
        if (Object.prototype.toString.call(obj) !== "[object Object]") {
            return;
        }
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                this.setCss(curEle, key, obj[key]);
            }
        }
    }

    function css(curEle) {
        var secondParam = arguments[1];
        if (Object.prototype.toString.call(secondParam) === "[object String]") {
            // 第二个参数是字符串，如果没有第三个参数，则表示获取属性值，否则就是设置属性值
            var thirdParam = arguments[2];
            if (typeof thirdParam === "undefined") {
                return getCss.apply(this, arguments);
            }
            setCss.apply(this, arguments);
        }
        if (Object.prototype.toString.call(secondParam) === "[object Object]") {
            setGroupCss.apply(this, arguments);
        }
    }

    return {
        listToArray: listToArray,
        offset: offset,
        parseJSON: parseJSON,
        getCss: getCss,
        children: children,
        win: win,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElementsByClassName: getElementsByClassName,
        setCss: setCss,
        setGroupCss: setGroupCss,
        css: css
    }
})();
