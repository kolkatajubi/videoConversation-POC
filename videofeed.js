const x = require("xlsx");

setInterval(() => {
  var videoDuration = document.getElementById("myVideo").duration.toFixed(2);
  var videoTime = document.getElementById("myVideo").currentTime.toFixed(2);
  console.log(videoTime);
  var button = `<button style="left:300px;position: absolute;" onclick="hideElements();Afunc();">
  A
</button>
<button style="left:250px;position: absolute;" onclick="hideElements();Bfunc();">
  B
</button>`;
  if (videoTime == videoDuration - 2.0) {
    document.getElementById("chat").innerHTML = createButton();
  }
}, 10)();

// --------------------------------------------------------------------
$.ajax({
  url: "127.0.0.1:2020/nextMap",
  type: "post",
  dataType: "json",
  contentType: "application/json",
  data: JSON.stringify(data),
  success: resp => {
    console.log("Request server resolved.....");
    nextMapData = resp;
  },
  error: err => {
    console.log("Error");
    return resolve({ status: "error", data: err });
  }
});
// --------------------------------------------------------------------
var nextMapData = xl.utils.sheet_to_json(book.Sheets[nextMap]);
var urlMapData = xl;

function createButton() {
  var id = $(this).attr("id");
  console.log("Video ID : ", id);
  getURLs(id);
}
