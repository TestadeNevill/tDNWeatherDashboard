//Wait for our html content to load before we run our js file.
$(document).ready(function () {
    //Api key for ajax url made global because it will be used in several functions.
    const APIKEY = "01156022c7b693ce99c5e41d6e384ece";
    //create variable from user inputted city name for our api call.
    $("#search-button").on("click", function () {
        var searchValue = $("#search-value").val();
        // clear input box
        $("#search-value").val("");
        //Search Value is the City name
        searchWeather(searchValue);
    });
    function searchWeather(searchValue) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" +
                APIKEY +
                "&units=imperial",
            dataType: "json",
            success: function (data) {
                console.log(data)
            },
        });
    }
})