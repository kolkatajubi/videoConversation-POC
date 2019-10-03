// Dependencies
const express = require("express");
const app = express();

const bodyparser = require("body-parser");

app.use(
  bodyparser.urlencoded({
    extended: false
  })
);

// Defining IP-Address and PORT number
const ipaddress = "127.0.0.1";
const port = 2020;

// Listening to the IP-Address:PORT number
app.listen(port, ipaddress, () =>
  console.log(`Listening at ${ipaddress}:${port}...`)
);

// Body Parser will parse the HTML and return it in JSON format
app.use(bodyparser.json());

app.post("/map", (req, res) => {
  // Reading the excel file and creating JSON Objects
  console.log("JSON DATA");
  res.json({
    status: "success",
    nextMapData: nextMapData,
    urlMapData: urlMapData
  });
});
// app.get("/", (req, res) => {
//   // Reading the excel file and creating JSON Objects
// });

// ============================================================================= //

const xl = require("xlsx");
const book = xl.readFile("test.xlsx");
const sheetName = book.SheetNames;
const nextMap = sheetName[0];
const urlMap = sheetName[1];

// Reading the excel file and creating JSON Objects
var nextMapData = xl.utils.sheet_to_json(book.Sheets[nextMap]);
var urlMapData = xl.utils.sheet_to_json(book.Sheets[urlMap]);

console.log(nextMapData);
console.log("===========================================================");
console.log(urlMapData);

// --------------------------------------------------------------------------------------
//                            HOSTING FILES
// --------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/videoxls.html");
});
app.get("/thumbnail", (req, res) => {
  res.sendFile(__dirname + "/thumbnail.jpg");
});
app.get("/videofeed", (req, res) => {
  res.sendFile(__dirname + "/videofeed.js");
});
app.get("/css", (req, res) => {
  res.sendFile(__dirname + "/stylexls.css");
});
app.get("/start", (req, res) => {
  res.sendFile(__dirname + "/chunu.mp4");
});
app.get("/a", (req, res) => {
  res.sendFile(__dirname + "/A10.mp4");
});
app.get("/b", (req, res) => {
  res.sendFile(__dirname + "/B20.mp4");
});
app.get("/C", (req, res) => {
  res.sendFile(__dirname + "/C10.mp4");
});
app.get("/x", (req, res) => {
  res.sendFile(__dirname + "/E1.mp4");
});
app.get("/y", (req, res) => {
  res.sendFile(__dirname + "/E2.mp4");
});
app.get("/z", (req, res) => {
  res.sendFile(__dirname + "/E3.mp4");
});
app.get("/p", (req, res) => {
  res.sendFile(__dirname + "/E4.mp4");
});
app.get("/q", (req, res) => {
  res.sendFile(__dirname + "/E5.mp4");
});
app.get("/r", (req, res) => {
  res.sendFile(__dirname + "/E6.mp4");
});
app.get("/s", (req, res) => {
  res.sendFile(__dirname + "/chunu.mp4");
});
app.get("/ty", (req, res) => {
  res.sendFile(__dirname + "/TY.mp4");
});
// --------------------------------------------------------------------------------------
//                            END OF HOSTING
// --------------------------------------------------------------------------------------
