// Dependencies
const express = require("express");
const app = express();

const bodyparser = require("body-parser");

//XLSX modules
const xl = require("xlsx");
const book = xl.readFile("test.xlsx");
const sheetName = book.SheetNames;
const nextMap = sheetName[0];
const urlMap = sheetName[1];
var nextMapData = xl.utils.sheet_to_json(book.Sheets[nextMap]);
var urlMapData = xl.utils.sheet_to_json(book.Sheets[urlMap]);

// Defining Path for URL Re-routes
var path = require("path");

// Body Parser will parse the HTML and return it in non-encoded format
app.use(
  bodyparser.urlencoded({
    extended: false
  })
);

// Body Parser will parse the HTML and return it in JSON format
app.use(bodyparser.json());

// Defining IP-Address and PORT number
const ipaddress = "127.0.0.1";
const port = 2020;

// Listening to the IP-Address:PORT number
app.listen(port, ipaddress, () =>
  console.log(`Listening at ${ipaddress}:${port}...`)
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/testingMultiplevideos.html");
});

app.get("/intro", (req, res) => {
  res.sendFile(__dirname + "/chunu.mp4");
});

app.get("/a", (req, res) => {
  res.sendFile(__dirname + "/A10.mp4");
});
app.get("/b", (req, res) => {
  res.sendFile(__dirname + "/B20.mp4");
});
app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/test.js");
});
app.get("/style", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});
app.get("/ty", (req, res) => {
  res.sendFile(__dirname + "/TY.mp4");
});

app.get("/xls", (req, res) => {
  res.sendFile(__dirname + "/xlsTest.js");
});
app.get("/feed", (req, res) => {
  res.sendFile(__dirname + "/videofeed.js");
});
app.post("/nextmap", (req, res) => {
  // Reading the excel file and creating JSON Objects
  res.json(nextMapData);
});
app.post("/urlmap", (req, res) => {
  // Reading the excel file and creating JSON Objects
  res.json(urlMapData);
});
