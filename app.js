// API情報
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "93e8bb3b9a576c3cfb39ffc79ce8d751";
const API_UNITS = "&units=metric&appid=";
const IMAGE_ICON = "http://openweathermap.org/img/w/";
const ALERT_TIME = 7000;

$(function () {
  $("#btn").on("click", function () {
    // DEBUG: 未入力チェック
    if ($("#cityname").val() === "") {
      $("#cityname").focus();
      // アラート通知表示
      $(".alert").text("都市名を入力してください");
      $(".alert-box")
        .slideDown()
        .delay(ALERT_TIME)
        .fadeOut()
        .removeClass("danger success");
      return false;
    }
    // URLを作成
    $.ajax({
      url: API_URL + $("#cityname").val() + API_UNITS + API_KEY,
      dataType: "jsonp",
    })
      // AJAX通信が成功した場合
      .done(function (data) {
        $(".alert").text("通信に成功しました");
        $(".alert-box")
          .removeClass("danger")
          .addClass("success")
          .slideDown()
          .delay(ALERT_TIME)
          .fadeOut();
        // DEBUG: 取得データを表示
        $(".place").text(data.name); //最温
        $("#temp_max").text(data.main.temp_max); //最低気温
        $("#temp_min").text(data.main.temp_min); //湿度
        $("#humidity").text(data.main.humidity); //速
        $("#speed").text(data.wind.speed); //天気
        $("#weather").text(data.weather[0].main); //天気アイコン画像
        $("#img").attr("src", IMAGE_ICON + data.weather[0].icon + ".png");
        $("#img").attr("alt", data.weather[0].main);
      })
      // AJAX通信が失敗した場合
      .fail(function (data) {
        $(".alert").text("通信に失敗しました");
        $(".alert-box")
          .removeClass("success")
          .addClass("danger")
          .slideDown()
          .delay(ALERT_TIME)
          .fadeOut();
      });
  });
});

//　アラートを消す
const removeAlert = () => {
  $(".alert-box")
    .stop(true) /*遅延を無効*/
    .fadeOut(0)
    .removeClass("danger success");
  return;
};

$(".button_close").click(function (e) {
  e.preventDefault();
  removeAlert();
});

$(window).keyup(function (e) {
  // ESCキーが押されたら
  if (e.keyCode == 27) {
    removeAlert();
  }
});

/*
$(".button_open").click(function () {
  $(".alert").text("アラート表示");
  $(".alert-box")
    .slideDown() // スライドダウン
    .delay(3000) // 3000ミリ秒後にfadeOut()を実行
    .fadeOut();
});
*/
