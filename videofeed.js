var nextMapData;
var urlMapData;

var videoID = "start";
var currentNextNodes = [];
var currentNextURLs = [];
var status = 0;
var fullscreen = 0;

$(document).ready(() => {
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
  FS();
  console.log("play called fullscreen...");
  // $(".display")
  //   .width("100%")
  //   .height("100%");
  if (myVideo.paused) myVideo.play();
  else myVideo.pause();
}

function FS() {
  console.log("fullscreen called...", fullscreen);
  if (fullscreen == 0) {
    if (document.body.requestFullscreen) document.body.requestFullscreen();
    // else if (document.body.mozRequestFullScreen)
    //   document.body.mozrequestFullscreen();
    // else if (document.body.webkitRequestFullscreen)
    //   document.body.webkitRequestFullscreen();
    // else if (document.body.msRequestFullscreen)
    //   document.body.msRequestFullscreen();
    fullscreen = 1;
  }
}

function exitFS() {
  console.log("exit fullscreen called...", fullscreen);
  if (fullscreen == 1) {
    if (!document.body.requestFullscreen) document.body.exitFullscreen();
    // else if (document.body.mozCancelFullScreen)
    //   document.body.mozCancelFullScreen();
    // else if (document.body.webkitExitFullscreen)
    //   document.body.webkitExitFullscreen();
    // else if (document.body.msExitFullscreen) document.body.msExitFullscreen();
    fullscreen = 0;
  }
}

function toggleFS() {
  console.log("toggle fullscreen called...", fullscreen);
  if (fullscreen == 0) FS();
  else exitFS();
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
