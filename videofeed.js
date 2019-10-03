var nextMapData = [
  { Current: "start", Next: "A, B" },
  { Current: "A", Next: "X, Y, Z" },
  { Current: "B", Next: "A, P, Q" },
  { Current: "X", Next: "P, Q, R, S" },
  { Current: "Y", Next: "A, X" },
  { Current: "Z", Next: "TY" },
  { Current: "P", Next: "TY" },
  { Current: "Q", Next: "TY" },
  { Current: "R", Next: "TY" },
  { Current: "S", Next: "TY" }
];

var urlMapData = [
  { Nodes: "start", URL: "chunu.mp4" },
  { Nodes: "A", URL: "A10.mp4" },
  { Nodes: "B", URL: "B20.mp4" },
  { Nodes: "C", URL: "C10.mp4" },
  { Nodes: "X", URL: "E1.mp4" },
  { Nodes: "Y", URL: "E2.mp4" },
  { Nodes: "Z", URL: "E3.mp4" },
  { Nodes: "P", URL: "E4.mp4" },
  { Nodes: "Q", URL: "E5.mp4" },
  { Nodes: "R", URL: "E6.mp4" },
  { Nodes: "S", URL: "chunu.mp4" },
  { Nodes: "TY", URL: "TY.mp4" }
];

var videoID = "";
var currentNextNodes = [];
var currentNextURLs = [];

(() => {
  setInterval(() => {
    var videoDuration = document.getElementById("myVideo").duration.toFixed(2);
    var videoTime = document.getElementById("myVideo").currentTime.toFixed(2);
    // console.log(videoTime);
    if (videoTime == videoDuration - 2.0) {
      console.log("2secs left...");
      createButton();
    }
  }, 10);
})();

function createButton() {
  console.log("create button called...");
  videoID = $("video#myVideo source").attr("id");
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
      currentNextNodes = nextMapData[i].Next.split(", ");
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
}
