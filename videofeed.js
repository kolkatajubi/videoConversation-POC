var nextMapData;
var urlMapData;

var videoID = "start";
var currentNextNodes = [];
var currentNextURLs = [];
var status = 0;

$(document).ready(() => {
  var FS = document.getElementById("fs");
  FS.addEventListener(
    "click",
    function() {
      console.log("inside full screen...");
      //var videoElement = document.getElementsByClassName("display");
      document.body.requestFullscreen();
      $(".display")
        .width("100%")
        .height("100%");
    },
    false
  );

  $.ajax({
    url: "https://pixie.jubi.ai/videopoc/map",
    type: "get",
    dataType: "json",
    contentType: "application/json",
    success: resp => {
      console.log("Ajax Success !!");
      nextMapData = resp.nextMapData;
      urlMapData = resp.urlMapData;
    },
    error: err => {
      console.log("Error");
    }
  });
});

(() => {
  setInterval(() => {
    console.log(videoID);
    var videoDuration = document.getElementById("myVideo").duration.toFixed(2);
    var videoTime = document.getElementById("myVideo").currentTime.toFixed(2);
    // console.log(videoTime);
    if (status == 0)
      if (videoTime >= videoDuration - 2.0) {
        status = 1;
        console.log("2secs left...");
        createButton();
      }
  }, 5);
})();

function playPause() {
  if (myVideo.paused) myVideo.play();
  else myVideo.pause();
}

function createButton() {
  console.log("create button called...");
  // videoID = $("video#myVideo source").attr("id");
  // var id = $(this).attr("id");
  console.log("Video ID : ", videoID);
  getURLs(videoID);
  console.log("next nodes ....", currentNextNodes);
  console.log("next urls ....", currentNextURLs);
  for (var i in currentNextNodes) {
    $(".chat").append(
      "<button id=" +
        currentNextNodes[i] +
        " onclick='changeSource(" +
        i +
        ");'>" +
        currentNextNodes[i] +
        "</button>"
    );
  }
}

function getURLs(current) {
  console.log("getURLs called...");
  currentNextNodes = [];
  for (i in nextMapData) {
    if (nextMapData[i].Current === current) {
      currentNextNodes = nextMapData[i].Next.split(",");
      for (t in currentNextNodes) {
        currentNextNodes[t] = currentNextNodes[t].trim();
      }
      console.log(currentNextNodes);
      currentNextURLs = [];
      for (i in currentNextNodes) {
        for (x in urlMapData) {
          if (currentNextNodes[i] === urlMapData[x].Nodes) {
            currentNextURLs.push(urlMapData[x].URL);
            console.log(currentNextURLs);
          }
        }
      }
      return;
    }
  }
}

function changeSource(index) {
  console.log("changeSource called .....");
  $(".chat").empty();
  $("#myVideo").empty();
  $("#myVideo").append(
    "<source id=" +
      currentNextNodes[index] +
      " type='video/mp4' src=" +
      currentNextURLs[index] +
      " />"
  );
  $("#myVideo").attr("poster", "");
  var video = document.getElementById("myVideo");
  // video.src = currentNextURLs[index];
  video.load();
  video.play();
  console.log("Changesource completed");
  videoID = $("video#myVideo source").attr("id");
  status = 0;
}
