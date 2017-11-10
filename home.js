$(document).ready(function ()
{


    $(".see").hide();

    $("#toSearch").click(function (e){
        e.preventDefault();
        $("html, body").animate({scrollTop: 800}, 500); // scrolls 800 px down in 500 milliseconds
    });

    $("#toAdd").click(function (e){
        e.preventDefault();
        $("html, body").animate({scrollTop: 1600}, 500); 
    });

    $("#toDelete").click(function (e){
        e.preventDefault();
        $("html, body").animate({scrollTop: 2400}, 500);
    });

    $("#backToTop").click(function (e){
        e.preventDefault();
        $("html, body").animate({scrollTop: 0}, 500);
    });

    //======================================================================================================
    //======================================================================================================

    // These need to be accessed by various functions
    // But they're only set upon clicking the Add or Search buttons
    var name;
    var age;
    var location;
    var id;

    $("#add").click(function (e) {
        e.preventDefault();
        setValues("add");

        if (name == "" || age == "" || location == "") {
            alert("Error: Not all values have been set.");
        }else {
            $.post("/add", {
                name: name,
                age: age,
                location: location
            });
            $("#see_add").show();
        }
    });

    $("#see_add").click(function (e){
        e.preventDefault();
        var inputURL = writeSearch("add");
        window.location.href = "http://localhost:3000/users?" + inputURL;
    });

    $("#search").click(function (e) {
        e.preventDefault();
        var inputURL = writeSearch("search");
        window.location.href = "http://localhost:3000/users?" + inputURL;
    });

    $("#searchByID").click(function (e) {
        e.preventDefault();
        id = $("#search_id").val();
        if (id == "") {
            alert("Error: No ID entered.");
        }else{
            window.location.href = "http://localhost:3000/users?id=" + id;
        }
    });

    $("#delete").click(function (e) {
        e.preventDefault();
        setValues("delete");
        if(name == "" && age == "" && location == "" && id=="") {
            alert("Error: Must enter at least one specification.");
        }else{
            var inputURL = writeSearch("delete");
            if (id != "") {
                inputURL += "&id=" + id;
            }
            $.ajax({
                url: "/delete?"+inputURL,
                type: 'DELETE'
            });
            $("#see_delete").show();
        }
    });

    $("#see_delete").click(function (e){
        e.preventDefault();
        window.location.href = "http://localhost:3000/users?";
    });

    //======================================================================================================
    //======================================================================================================
    function writeSearch(str){
        setValues(str);
        var inputURL = "";
        if (name != "") {
            inputURL += ("&name=" + name);
        }
        if (age != "") {
            inputURL += ("&age=" + age);
        }
        if (location != "") {
            inputURL += ("&location=" + location);
        }
        return inputURL;
    }


    function setValues(str) {
        name = $("#"+str+"_name").val();
        age = $("#"+str+"_age").val();
        location = $("#"+str+"_location").val();
        id = $("#"+str+"_id").val();
    }
});
