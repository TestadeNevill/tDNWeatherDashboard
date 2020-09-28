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
                // console.log(data)
                $("#today").empty();
                // create html content for current weather
                var title = $("<h3>")
                    .addClass("card-title")
                    .text(data.name + " (" + new Date().toLocaleDateString() + ")");
                var card = $("<div>").addClass("card");
                var wind = $("<p>")
                    .addClass("card-text")
                    .text("Wind Speed: " + data.wind.speed + " MPH");
                var humid = $("<p>")
                    .addClass("card-text")
                    .text("Humidity: " + data.main.humidity + "%");
                var temp = $("<p>")
                    .addClass("card-text")
                    .text("Temperature: " + data.main.temp + " °F");
                var cardBody = $("<div>").addClass("card-body");
                var img = $("<img>").attr(
                    "src",
                    "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
                );
                title.append(img);
                cardBody.append(title, temp, humid, wind);
                card.append(cardBody);
                $("#today").append(card);
                getforecast(searchValue);
                getUv(data.coord.lat, data.coord.lon)
            },
        });
    }
    function getforecast(searchValue) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" +
                APIKEY +
                "&units=imperial",
            dataType: "json",
            success: function (data) {
                console.log(data)
                $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
                console.log(data)
                for (i = 0; i < data.list.length; i++) {
                    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                        var col = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("card bg-primary text-white");
                        var body = $("<div>").addClass("card-body p2");
                        var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                        var tempo = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + "°F");
                        var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");

                        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");

                        col.append(card);
                        card.append(body);
                        body.append(title, tempo, humidity, img);

                        $("#forecast .row").append(col);

                    }

                }
            }
        })
    }
    function getUv(lat, lon) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/uvi?&appid=" +
                APIKEY +
                "&lat=" + lat + "&lon=" + lon,
            dataType: "json",
            success: function (data) {
                console.log(data);
                var uv = $("<p>").text("UV Index: ");
                var btn = $("<span>").addClass("btn btn-sm").text(data.value);
                if (data.value < 3) {
                    btn.addClass("btn-success")
                }
                else if (data.value < 7) {
                    btn.addClass("btn-warning")
                }
                else {
                    btn.addClass("btn-danger")
                }
                $("#today .card-body").append(uv.append(btn));

            }
        })

    }
});