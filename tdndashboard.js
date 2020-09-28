//Wait for our html content to load before we run our js file.
$(document).ready(function () {
    //create variable from user inputted city name for our api call.
    $("#search-button").on("click", function () {
        var searchValue = $("#search-value").val();
        // clear input box
        $("#search-value").val("");
        //Search Value is the City name
        searchWeather(searchValue);
    });
})