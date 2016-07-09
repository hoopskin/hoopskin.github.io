var intervalID = setInterval(function() {run()},5000);

function checkCookie() {
    //Check if the cookie exists
    if (readCookie("userStock") != null) {
        //If it does, put the value in the input and run the function
        $('#stockSymbol').val(readCookie("userStock"));
        run();
    }
    changeInterval(5);
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function updateCookie() {
    eraseCookie("userStock");
    createCookie("userStock",$('#stockSymbol').val(),10);
}

function run() {
    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22" + $('#stockSymbol').val() + "%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",
    function (data) {
        var jsonData = data.query.results.quote;
        $('.row').empty();
        if (jsonData.Name == null) {
            $('.row').append('<h1 style="text-align:center">Not Valid Stock Name</h1>');    
        } else {
            $('.row').append('<h1 style="text-align:center">' + jsonData.Name + '</h1>');
            $('.row').append('<div class="col-md-3">Last Trade Time: ' + jsonData.LastTradeTime + '</div>');
            $('.row').append('<div class="col-md-3">Ask: ' + jsonData.Ask + '</div>');
            $('.row').append('<div class="col-md-3">Book Value: ' + jsonData.BookValue + '</div>');
            $('.row').append('<div class="col-md-3">Percent Change: ' + jsonData.PercentChange + '</div>');
            $('.row').append('<div class="col-md-3">Last Extraction: ' + new Date().toTimeString() + '</div>');
        }
        updateCookie();
    });
}

function changeInterval(seconds) {
    var interval = seconds*1000;
    clearInterval(intervalID);
    intervalID = setInterval(function() {
        run()
    }, interval);
}