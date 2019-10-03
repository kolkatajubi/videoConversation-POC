// var nextMapData = [
//   { Current: "start", Next: "A, B" },
//   { Current: "A", Next: "X, Y, Z" },
//   { Current: "B", Next: "A, P, Q" },
//   { Current: "X", Next: "P, Q, R, S" },
//   { Current: "Y", Next: "A, X" },
//   { Current: "Z", Next: "TY" },
//   { Current: "P", Next: "TY" },
//   { Current: "Q", Next: "TY" },
//   { Current: "R", Next: "TY" },
//   { Current: "S", Next: "TY" }
// ];

// var urlMapData = [
//   { Nodes: "start", URL: "chunu.mp4" },
//   { Nodes: "A", URL: "A10.mp4" },
//   { Nodes: "B", URL: "B20.mp4" },
//   { Nodes: "C", URL: "C10.mp4" },
//   { Nodes: "X", URL: "E1.mp4" },
//   { Nodes: "Y", URL: "E2.mp4" },
//   { Nodes: "Z", URL: "E3.mp4" },
//   { Nodes: "P", URL: "E4.mp4" },
//   { Nodes: "Q", URL: "E5.mp4" },
//   { Nodes: "R", URL: "E6.mp4" },
//   { Nodes: "S", URL: "chunu.mp4" },
//   { Nodes: "TY", URL: "TY.mp4" }
// ];

var nextMapData;
var urlMapData;

var videoID = "start";
var currentNextNodes = [];
var currentNextURLs = [];
var status = 0;

$(document).ready(() => {
  $.ajax({
    url: "https://127.0.0.1:2020/map",
    type: "post",
    dataType: "json",
    contentType: "application/json",
    data: JSON,
    success: resp => {
      console.log("Ajax Success !!");
      nextMapData = resp.data.nextMapData;
      urlMapData = resp.data.urlMapData;
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
      if (videoTime == videoDuration - 2.0) {
        status = 1;
        console.log("2secs left...");
        createButton();
      }
  }, 5);
})();

function createButton() {
  console.log("create button called...");
  // videoID = $("video#myVideo source").attr("id");
  // var id = $(this).attr("id");
  console.log("Video ID : ", videoID);
  getURLs(videoID);
  console.log("next nodes ....", currentNextNodes);
  console.log("next urls ....", currentNextURLs);
  if (currentNextNodes.length > 1)
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
  else changeSource(0);
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
  var video = document.getElementById("myVideo");
  // video.src = currentNextURLs[index];
  video.load();
  video.play();
  console.log("Changesource completed");
  videoID = $("video#myVideo source").attr("id");
  status = 0;
}
