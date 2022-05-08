const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "93e8bb3b9a576c3cfb39ffc79ce8d751";
const IMAGE_ICON = "http://openweathermap.org/img/w/";

$(function () {
    $('#btn').on('click', function () {
        $.ajax({
            url: API_URL + $('#cityname').val() + "&units=metric&appid=" + API_KEY, dataType: 'jsonp',
        }).done(function (data) {
            $('#place').text(data.name); //最温
            $('#temp_max').text(data.main.temp_max); //最低気温
            $('#temp_min').text(data.main.temp_min); //湿度
            $('#humidity').text(data.main.humidity); //速
            $('#speed').text(data.wind.speed); //天気
            $('#weather').text(data.weather[0].main);//天気アイコン
            $('img').attr("src", IMAGE_ICON + data.weather[0].icon + ".png"); $('img').attr("alt", data.weather[0].main);
        }).fail(function (data) {
            alert("通信に失敗しました。")
        });
    });
})
