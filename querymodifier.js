// Here You can type your custom JavaScript...
//alert("page loaded");
var BugNo = "29783206";

function createCookie(cookieName, cookieValue, daysToExpire) {
    var date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString();
}

function accessCookie(cookieName) {
    var name = cookieName + "=";
    var allCookieArray = document.cookie.split(';');
    for (var i = 0; i < allCookieArray.length; i++) {
        var temp = allCookieArray[i].trim();
        if (temp.indexOf(name) == 0)
            return temp.substring(name.length, temp.length);
    }
    return "";
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
        console.log(key + " : " + value);

    });
    return vars;
}

function addBug() {
    var textArea = document.getElementById("text_area");

    var start = textArea.selectionStart;
    var end = textArea.selectionEnd;
    var ttext = "";
    var lines = textArea.value.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var st1 = lines[i];
        if (st1.toLowerCase().startsWith("select /*")) {
            ttext = ttext + st1;
        } else if (st1.toLowerCase().startsWith("select")) {
            var b = "/*Bug " + BugNo + "*/ ";
            var output = [st1.slice(0, 7), b, st1.slice(7)].join('');
            ttext = ttext + output;
        } else ttext = ttext + st1;
        ttext = ttext + "\n";
    }
    textArea.value = ttext;
    textArea.focus();
    textArea.selectionEnd = end + 7;
}
var btnListener=function() {
    var params = getUrlVars();
    console.log(params['target']);
    console.log(accessCookie(params['target']));
    var bug = accessCookie(params['target']);
    if (bug == "") {
        bug = prompt("Please enter bug number", "");
        console.log(bug);
        if (bug != null && bug != "") {
            createCookie(params['target'], bug, 1);

        }
        return;
    }
    BugNo = bug;
    addBug();
    document.location = 'javascript:onEvent("executeSelectedSQL")';
};
(function() {
	alert("loaded");
	var execBtn = document.getElementById("executeBtn");
	execBtn.onclick =btnListener;
    var tds = document.getElementsByTagName("td");
    for (var i = 0; i < tds.length; i++) {
        var valgn = tds[i].getAttribute("valign");
        var algn = tds[i].getAttribute("align");
        if (valgn == "center" && algn == "left") {
            tds[i].setAttribute("valign", "bottom");
        }
    }
})()
//btn.onclick=function(){addBug();};
