var vStatus = 0;

// var video = document.getElementById("myVideo");
// var source = document.createElement("source");

// source.setAttribute("src", "http://127.0.0.1:2020/video");

// video.appendChild(source);
// video.play();
//   setTimeout(function() {
//     // video.pause();
//     console.log("change called");
//     // source.setAttribute("src", "http://127.0.0.1:2020/b");
//     // video.load();
//     // video.play();
//   }, 1);
function exitfunc() {
  vStatus = 2;
  changeSource();
}
function Afunc() {
  vStatus = 0;
  changeSource();
  // console.log(vStatus);
  video.play();
}
function Bfunc() {
  vStatus = 1;
  changeSource();
  // console.log(vStatus);
  video.play();
}
function restartfunc() {
  video.src = "http://127.0.0.1:2020/intro";
  vStatus = 0;
  // console.log(vStatus);
  video.play();
}

function hideElements() {
  document.getElementById("buttonDiv").style.display = "none";
}

setInterval(() => {
  var videoDuration = document.getElementById("myVideo").duration.toFixed(2);
  var videoTime = document.getElementById("myVideo").currentTime.toFixed(2);
  console.log(videoTime);
  //   if (videoTime == videoDuration) {
  //     console.log("TRUE ---->  Changing video source....");
  //     changeSource();
  //   }
  if (videoTime == 8.0) {
    document.getElementById(
      "buttonDiv"
    ).innerHTML = `<button style="left:300px;position: absolute;" onclick="hideElements();Afunc();">
      A
    </button>
    <button style="left:250px;position: absolute;" onclick="hideElements();Bfunc();">
      B
    </button>`;
  }
}, 10)();

function changeSource() {
  var video = document.getElementById("myVideo");
  //   console.log("inside chNGEsOURCE");
  //   console.log(vStatus);
  if (vStatus == 0) {
    console.log("video A called");
    video.src = "http://127.0.0.1:2020/a";
    vStatus = 1;
    // console.log(vStatus);
    video.play();
  } else if (vStatus == 1) {
    video.src = "http://127.0.0.1:2020/b";
    video.play();
    vStatus = 2;
  } else if (vStatus == 2) {
    video.src = "http://127.0.0.1:2020/ty";
    video.play();
    vStatus = 3;
  }
}
