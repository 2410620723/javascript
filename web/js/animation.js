/*
 * 动画库
 * Created by zxm on 2017-11-7.
 */
~function () {
    var effect = {
        // 匀速运动
        linear: function (currentTime, begin, total, duration) {
            return currentTime / duration * total + begin;
        }
    };
    function move(curEle, target, duration, callback) {
        clearInterval(curEle.timer);
        var begin = {}, change = {};
        for (var key in target) {
            // 不需要遍历那些共有的属性
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }
        var time = 0;
        curEle.timer = setInterval(function () {
            time += 10;
            if (time >= duration) {
                utils.css(curEle, target);
                callback && callback.call(curEle);
                clearInterval(curEle.timer);
                return;
            }
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    var curPos = effect.linear(time, begin[key], change[key], duration);
                    utils.css(curEle, key, curPos);
                }
            }
        },10);
    }
    window.myAnimate = move;
}();
