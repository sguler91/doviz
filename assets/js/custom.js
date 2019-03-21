(function($) {
  "use strict";

    var message = "Hey, come back! 🤑";
    var original;
    var isPaused = false;
    $(window).focus(function() {
        if(original) {
            document.title = original;
            isPaused = false;
        }
    }).blur(function() {
        var title = $('title').text();
        if(title != message) {
            original = title;
        }
        document.title = message;
        isPaused = true;
    });
 
    doviz();
    setInterval(function() {
        if(!isPaused) {
            doviz()
        }
    }, 3000);
    
})(jQuery); // End of use strict


function doviz() {

    $(".items .item p span strong").removeClass("animated flash");
    var btcPrice = $("#btc_price").text();
    var ethPrice = $("#eth_price").text();
    var xrpPrice = $("#xrp_price").text();
    var altinPrice = $("#altin_price").text();
    var dolarPrice = $("#dolar_price").text();
    var euroPrice = $("#euro_price").text();

    fetch("./api/index.php", {
        method: 'get',
        cache: 'reload'
    })
    .then(res => {
        return res.json()
    })
    .then((response) => {
        if (btcPrice != response["btc"]["price"]) {
            $("#btc_price").addClass("animated flash");
        }
        $("#btc_price").text(response["btc"]["price"]);
        if(response["btc"]["daily"] != true) {
            $("#btc_price").parent().find(".fa").removeClass("fa-chevron-up up");
            $("#btc_price").parent().find(".fa").addClass("fa-chevron-down down");
        } else {
            $("#btc_price").parent().find(".fa").removeClass("fa-chevron-down down");
            $("#btc_price").parent().find(".fa").addClass("fa-chevron-up up");
        }

        if (ethPrice != response["eth"]["price"]) {
            $("#eth_price").addClass("animated flash");
        }
        $("#eth_price").text(response["eth"]["price"]);
        if(response["eth"]["daily"] != true) {
            $("#eth_price").parent().find(".fa").removeClass("fa-chevron-up up");
            $("#eth_price").parent().find(".fa").addClass("fa-chevron-down down");
        } else {
            $("#eth_price").parent().find(".fa").removeClass("fa-chevron-down down");
            $("#eth_price").parent().find(".fa").addClass("fa-chevron-up up");
        }

        if (xrpPrice != response["xrp"]["price"]) {
            $("#xrp_price").addClass("animated flash");
        }
        $("#xrp_price").text(response["xrp"]["price"]);
        if(response["xrp"]["daily"] != true) {
            $("#xrp_price").parent().find(".fa").removeClass("fa-chevron-up up");
            $("#xrp_price").parent().find(".fa").addClass("fa-chevron-down down");
        } else {
            $("#xrp_price").parent().find(".fa").removeClass("fa-chevron-down down");
            $("#xrp_price").parent().find(".fa").addClass("fa-chevron-up up");
        }

        if (altinPrice != response["altin"]["price"]) {
            $("#altin_price").addClass("animated flash");
        }
        $("#altin_price").text(response["altin"]["price"]);
        if(response["altin"]["daily"] != true) {
            $("#altin_price").parent().find(".fa").removeClass("fa-chevron-up up");
            $("#altin_price").parent().find(".fa").addClass("fa-chevron-down down");
        } else {
            $("#altin_price").parent().find(".fa").removeClass("fa-chevron-down down");
            $("#altin_price").parent().find(".fa").addClass("fa-chevron-up up");
        }

        if (dolarPrice != response["dolar"]["price"]) {
            $("#dolar_price").addClass("animated flash");
        }
        $("#dolar_price").text(response["dolar"]["price"]);
        if(response["dolar"]["daily"] != true) {
            $("#dolar_price").parent().find(".fa").removeClass("fa-chevron-up up");
            $("#dolar_price").parent().find(".fa").addClass("fa-chevron-down down");
        } else {
            $("#dolar_price").parent().find(".fa").removeClass("fa-chevron-down down");
            $("#dolar_price").parent().find(".fa").addClass("fa-chevron-up up");
        }

        if (euroPrice != response["euro"]["price"]) {
            $("#euro_price").addClass("animated flash");
        }
        $("#euro_price").text(response["euro"]["price"]);
        if(response["euro"]["daily"] != true) {
            $("#euro_price").parent().find(".fa").removeClass("fa-chevron-up up");
            $("#euro_price").parent().find(".fa").addClass("fa-chevron-down down");
        } else {
            $("#euro_price").parent().find(".fa").removeClass("fa-chevron-down down");
            $("#euro_price").parent().find(".fa").addClass("fa-chevron-up up");
        }

        setTimeout(function(){ $(".item .loader").addClass("hide"); }, 1000);        
    })
}