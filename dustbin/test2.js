function changeSource() {
  //   console.log("inside chNGEsOURCE");
  //   console.log(vStatus);
  if (vStatus == 0) {
    console.log("video A called");
    var video = document.getElementById("myVideo");
    video.src = "http://127.0.0.1:2020/a";
    vStatus = 1;
    // console.log(vStatus);
    video.play();
  } else if (vStatus == 1) {
    var video = document.getElementById("myVideo");
    video.src = "http://127.0.0.1:2020/b";
    video.play();
    vStatus = 2;
  } else if (vStatus == 2) {
    var video = document.getElementById("myVideo");
    video.src = "http://127.0.0.1:2020/ty";
    video.play();
    vStatus = 3;
  }
}
