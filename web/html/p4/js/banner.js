/*
 * Created by zxm on 2017-11-13.
 */
(function () {
    // 实现数据绑定：ajax请求数据，按照字符串拼接的方式绑定数据
    var banner = document.getElementById("banner"),
        bannerInner = utils.firstChild(banner),
        bannerTip = utils.children(banner, "ul")[0],
        oLi = bannerTip.getElementsByTagName("li"),
        bannerLeft = utils.children(banner, "a")[0],
        bannerRight = utils.children(banner, "a")[1],
        imgList = bannerInner.getElementsByTagName("img");
    var jsonData = null;
    ~function () {
        var xhr = new XMLHttpRequest;
        xhr.open("get", "json/banner.txt?_=" + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
                jsonData = utils.parseJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    }();
    ~function () {
        // 绑定图片区域
        var str = "";
        if (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                var curData = jsonData[i];
                str += '<div><img src="" trueImg="' + curData['img'] + '"></div>';
            }
            // 为了实现无缝滚动
            str += '<div><img src="" trueImg="' + jsonData[0]['img'] + '"></div>';
        }
        bannerInner.innerHTML = str;
        utils.css(bannerInner, "width", (jsonData.length + 1) * 790);
    }();
    // 绑定焦点
    str = "";
    if (jsonData) {
        for (var i = 0; i < jsonData.length; i++) {
            i === 0 ? str += '<li class="bg"></li>' : str += '<li></li>';
        }
    }
    bannerTip.innerHTML = str;
    //图片延迟加载
    function lazyImg() {
        for (var i = 0; i < imgList.length; i++) {
            ~function (i) {
                var cunImg = imgList[i];
                var oImg = new Image;
                oImg.src = cunImg.getAttribute("trueImg");
                oImg.onload = function () {
                    cunImg.src = this.src;
                    cunImg.style.display = "block";
                    myAnimate(cunImg, {opacity: 1}, 300);
                }
            }(i);
        }
    }

    setTimeout(lazyImg, 500);
    // 实现自动轮播
    var step = 0;// 记录的是步长（当前是哪张图片，0表示第一张图）
    var autoTimer = setInterval(autoMove, 2000);

    function autoMove() {
        if (step >= jsonData.length) {
            step = 0;
            utils.css(bannerInner, "left", 0);
        }
        step++;
        myAnimate(bannerInner, {left: -step * 790}, 500);
        changeTip();
    }

    //实现焦点对齐
    function changeTip() {
        var tempStep = step >= oLi.length ? 0 : step;
        for (var i = 0; i < oLi.length; i++) {
            var curLi = oLi[i];
            i === tempStep ? utils.addClass(curLi, "bg") : utils.removeClass(curLi, "bg");
        }
    }

    // 停止和开启自动轮播
    banner.onmouseover = function () {
        clearInterval(autoTimer);
        bannerLeft.style.display = "block";
        bannerRight.style.display = "block";
    };
    banner.onmouseout = function () {
        autoTimer = setInterval(autoMove, 2000);
        bannerLeft.style.display = "none";
        bannerRight.style.display = "none";
    };

    // 点击焦点的时候实现切换
    ~function () {
        for (var i = 0; i < oLi.length; i++) {
            var curLi = oLi[i];
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                changeTip();
                myAnimate(bannerInner, {left: -step * 790}, 500);
            }
        }
    }();
    // 实现左右切换
    bannerRight.onclick = autoMove;
    bannerLeft.onclick = function () {
        if (step <=0) {
            step = jsonData.length;
            utils.css(bannerInner,"left",-step * 790);
        }
        step--;
        changeTip();
        myAnimate(bannerInner, {left: -step * 790}, 500);
    }
})();