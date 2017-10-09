/**
 * Created by zxm on 2017-10-9.
 */
var oTab = document.getElementById("tab");
var tHead = oTab.tHead;
var oThs = tHead.rows[0].cells;
var tBody = oTab.tBodies[0];
var oRows = tBody.rows;
var data = null;
//1.获取后台数据（data.txt）中的数据，JSON格式的字符串 -> ajax
var xhr = new XMLHttpRequest;
xhr.open("get", "data.txt", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && /^2\d{2}/.test(xhr.status)) {
        var val = xhr.responseText;
        data = utils.parseJSON(val);
    }
};
xhr.send(null);

//2.实现数据绑定

function bind() {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        var oTr = document.createElement("tr");
        for (var key in cur) {
            var oTd = document.createElement("td");
            if (key === "sex") {
                console.log(cur[key] === 0);
                oTd.innerHTML = cur[key] === 0 ? "男" : "女";
            } else {
                oTd.innerHTML = cur[key];
            }
            oTr.appendChild(oTd);
        }
        frag.appendChild(oTr);
    }
    tBody.appendChild(frag);
    frag = null;
}
bind();

//隔行变色
function changeBg() {
    for (var i = 0; i < oRows.length; i++) {
        oRows[i].className = i % 2 === 1 ? "bg" : null;
    }
}
changeBg();

function sortAge(n) {
    var arr = utils.listToArray(oRows);
    // oThs[1].flag *= -1;//升降序实现
    var _this = this;
    for (var k=0;k<oThs.length;k++){
        if(oThs[k] !== this){//不是当前列的话，将flag置为-1
            oThs[k].flag = -1;
        }
    }
    _this.flag *= -1;
    arr.sort(function (a, b) {
        var curInn = a.cells[n].innerHTML,nextInn = b.cells[n].innerHTML;
        var curInnNum = parseFloat(curInn),nextInnNum = parseFloat(nextInn);
        if(isNaN(curInnNum) || isNaN(nextInnNum)){
            return (curInn.localeCompare(nextInn,"zh"))* _this.flag;
        }else{
            return (curInnNum - nextInnNum) * _this.flag;
        }

    });
    var frag = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
        frag.appendChild(arr[i]);
    }
    tBody.appendChild(frag);
    frag = null;
    changeBg();
}
//点击排序：所有具有class="cursor"的
for (var i=0;i<oThs.length;i++){
    var curTh = oThs[i];

    if(curTh.className==="cursor"){
        curTh.index = i;
        curTh.flag = -1;
        curTh.onclick = function () {
            sortAge.call(this,this.index);
        }
    }
}
/*oThs[1].flag = -1;
oThs[1].onclick = function () {
    // sortAge();
    sortAge.call(this);
};*/
