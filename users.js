$(document).ready(function ()
{
    $("#byID").click(function (e) {
        e.preventDefault();
        reOrder("id");
    });

    $("#byName").click(function (e) {
        e.preventDefault();
        reOrder("name");
    });

    $("#byAge").click(function (e) {
        e.preventDefault();
        reOrder("age");
    });

    $("#byLocation").click(function (e) {
        e.preventDefault();
        reOrder("location");
    });

    $("#returnHome").click(function (e) {
        e.preventDefault();
        window.location.href = "http://localhost:3000/";
    });

 //====================================================================================

    function reOrder(str){
    	var curURL = window.location.href;
        var params = curURL.split("&"); // splits by param pairs
        var orderPair = params[params.length-1].split("="); // splits last parameter pair into two

        if(orderPair[0]!="orderBy"){ // if the last pair isn't for orderBy (ex. if it's for name)
        	window.location.href+= ("&orderBy="+str);
        }else{
        	var curOrder = orderPair[1];
        	window.location.href= window.location.href.replace("orderBy="+curOrder, "orderBy="+str);
        }
    }
});
