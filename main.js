// http://api.apixu.com/v1/forecast.json?key=dd39280551e44f1bb34221739171701&q=38.4127,27.1384&days=5

$(document).ready(function() {
    // var latitude,longitude;
    var api_key = "dd39280551e44f1bb34221739171701&q=";
    var loc;

    $.getJSON('http://ipinfo.io', function(d) {
        loc = d.loc.split(",");

        var apiLink = "http://api.apixu.com/v1/forecast.json?key=";
        var days5 = "&days=5";
        var api = apiLink + api_key + loc[0] + ',' + loc[1] + days5;


        $.getJSON(api, function(v1) {
            var city = v1.location.region;
            var country = v1.location.country;
            var localtime = new Date();
            var hours = localtime.getHours();
            var temp_f = v1.current.temp_f;
            var temp_c = v1.current.temp_c;
            var humidity = v1.current.humidity;
            var wind_kph = v1.current.wind_kph;
            var wind_mph = v1.current.wind_mph;
            var weatherText = v1.current.condition.text;
            var icon = v1.current.condition.icon;
            var currentIconCode = v1.current.condition.code;
            var tempSwap = true;
            var windSwap = true;
            var tempSwapForecast = true;
            var iconsLinkNight = "//cdn.apixu.com/weather/64x64/night/";
            var iconsLinkDay = "//cdn.apixu.com/weather/64x64/day/";

            var clear = [1000],
                partlyCloudy = [1003],
                cloudy = [1006, 1009],
                lightRain = [1072, 1050, 1053, 1168, 1080, 1183, 1171, 1063, 1083, 1086, 1089, 1240, 1273,1153],
                heavyRain = [1192, 1195, 1198, 1201, 1243, 1246],
                thunder = [1087, 1276],
                fog = [1030, 1135, 1147],
                icePellets = [1237, 1261, 1264],
                lightSnow = [1066, 1069, 1204, 1249, 1207, 1210, 1213, 1216, 1219, 1252, 1255],
                snow = [1114, 1117, 1222, 1225, 1258, 1279, 1282];

            var nightTimes = [18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6];


            var forecastdayData = v1.forecast.forecastday;

            var days = forecastdayData.map(function(x) {
                return x.day;
            });

            var maxtempc = days.map(function(x) {
                return x.maxtemp_c;
            });

            var mintempc = days.map(function(x) {
                return x.mintemp_c;
            });

            var maxtempf = days.map(function(x) {
                return x.maxtemp_f;
            });

            var mintempf = days.map(function(x) {
                return x.mintemp_f;
            });




            (function backgroundImageChange() {
                // if weather clear
                if (clear.indexOf(currentIconCode) !== -1 && nightTimes.indexOf(hours) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(/img/clear.jpg)');
                } else if (clear.indexOf(currentIconCode) !== -1 && hours < 18 && hours > 6) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/sunny.jpg)');
                }

                // if weather partly cloudy
                if (partlyCloudy.indexOf(currentIconCode) !== -1 && nightTimes.indexOf(hours) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(/img/partly-cloudy-night.jpg)');
                } else if (partlyCloudy.indexOf(currentIconCode) !== -1 && hours < 18 && hours > 6) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/partly-cloudy-day.jpg)');
                    console.log("hellooooo");
                }

                // if weather Cloudy
                if (cloudy.indexOf(currentIconCode) !== -1 && nightTimes.indexOf(hours) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(/img/cloudy-night.jpg)');
                } else if (cloudy.indexOf(currentIconCode) !== -1 && hours < 18 && hours > 6) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/cloudy-day.jpg)');
                }


                // if weather lightRain
                if (lightRain.indexOf(currentIconCode) !== -1 && nightTimes.indexOf(hours) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(/img/light-rain-night.jpg)');
                } else if (lightRain.indexOf(currentIconCode) !== -1 && hours < 18 && hours > 6) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/light-rain-day.jpg)');
                }

                // if weather heavyRain
                if (heavyRain.indexOf(currentIconCode) !== -1 && nightTimes.indexOf(hours) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(/img/heavy-rain-night.jpg)');
                } else if (heavyRain.indexOf(currentIconCode) !== -1 && hours < 18 && hours > 6) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/heavy-rain-day.jpg)');
                }

                // if weather thunder
                if (thunder.indexOf(currentIconCode) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(/img/thunder.jpg)');
                }

                // if weather fog
                if (fog.indexOf(currentIconCode) !== -1 && nightTimes.indexOf(hours) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(/img/fog-night.jpg)');
                } else if (fog.indexOf(currentIconCode) !== -1 && hours < 18 && hours > 6) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/fog-day.jpg)');
                }

                // if weather icePellets
                if (icePellets.indexOf(currentIconCode) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(/img/ice-pellets.jpg)');
                }

                // if weather lightSnow
                if (lightSnow.indexOf(currentIconCode) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(/img/snow-light.jpg)');
                }

                // if weather Snow
                if (snow.indexOf(currentIconCode) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(/img/snow.jpg)');
                }
            })();



            (function forecastDays() {
                var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


                var now = new Date();
                var dayIdx = now.getDay();

                $('.forecastText').each(function(idx, el) {
                    $(el).html(daysOfWeek[(dayIdx + idx) % 7]);
                });

                //other solution way
                //Date.prototype.getDayName = function() {
                //    return daysOfWeek[this.getDay()];
                //};

                // $('.forecastText:first').html(day);
                //   var currentDayNumber = daysOfWeek.indexOf(day);
                //   currentDayNumber = (currentDayNumber + 1);
                // $('.forecastText:not(:first)').each(function(el) {
                //   $(this).html(daysOfWeek[currentDayNumber]);
                //   currentDayNumber = (currentDayNumber + 1)%7;
                // });
            })();


            (function forecastData() {

                $('.forecasticons img').each(function(i) {
                    $(this).attr('src', days[i].condition.icon);

                });


                $('.frc-temp').each(function(i) {
                    // Added a 'units' property, so the temperature
                    //  can track what type of unit it is displaying.
                    $(this).data("units", "c");
                    $(this).html(Math.round(maxtempc[i]) + " - " + Math.round(mintempc[i]));

                });

                $('.frc-degree').on("click", function() {
                    // As we use the .frc-temp el often, reference it once.
                    var myTempEl = $(this).parent().find(".frc-temp");
                    // This is the unique index of the clicked day.

                    var myIndex = $(".forecastday").index(
                        $(this).parents(".forecastday")
                    );


                    /****
                     * Above, we created a data attribute on the
                     *  .frc-temp element to store the units. By
                     *  doing this, the element becomes self-
                     *  contained. Here, we can toggle the units
                     *  based on that data attribute.
                     ****/
                    if (myTempEl.data("units") === "f") {
                        // First, switch the unit attribute...
                        myTempEl.data("units", "c");
                        // Then, replace the contents of the temp el
                        myTempEl.hide().html(
                            Math.round(maxtempc[myIndex]) +
                            " - " +
                            Math.round(mintempc[myIndex])).fadeIn(700);
                        // Then, set the contents of this to 'c'
                        $(this).html(" &deg;C");
                        tempSwapForecast = true;
                    } else {
                        myTempEl.data("units", "f");
                        myTempEl.hide().html(
                            Math.round(maxtempf[myIndex]) +
                            " - " +
                            Math.round(mintempf[myIndex])).fadeIn(700);
                        $(this).html("&deg;F");
                        tempSwapForecast = false;
                    }
                });
            })();


            (function cityBox() {
                $("#city-box").html(city + " , " + country);

                $('#city-box').prepend('<div class="row"><img class="icon" alt="weather-icon" src="' + icon + '"></div>');
                $('#weather').html(Math.round(temp_c));
                $('#wind').html(wind_kph);
                $('#textTemp').html(weatherText);
            })();
            

            (function buttonDegree() {
                $('#btn-degree').click(function() {
                    /* Act on the event */
                    if (tempSwap === false) {
                        $('#weather').hide().html(Math.round(temp_c)).fadeIn(700);
                        $('#btn-degree').html("&deg;C");
                        tempSwap = true;
                    } else {
                        $('#weather').hide().html(Math.round(temp_f)).fadeIn(700);
                        $('#btn-degree').html("&deg;F");
                        tempSwap = false;
                    }
                });
            })();


            (function buttonWind() {
                $('#btn-wind').click(function() {
                    /* Act on the event */
                    if (windSwap === false) {
                        $('#wind').hide().html(wind_kph).fadeIn(700);
                        $('#btn-wind').html("<strong>kph</strong>");
                        windSwap = true;
                    } else {
                        $('#wind').hide().html(wind_mph).fadeIn(700);
                        $('#btn-wind').html("<strong>mph</strong>");
                        windSwap = false;
                    }
                });
            })();
        });
    });
});
