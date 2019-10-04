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

app.get("/map", (req, res) => {
  // Reading the excel file and creating JSON Objects
  console.log("JSON DATA");
  res.json({
    status: "success",
    nextMapData: nextMapData,
    urlMapData: urlMapData
  });
});

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
app.get("/playImg", (req, res) => {
  res.sendFile(__dirname + "/play.png");
});
app.get("/videofeed", (req, res) => {
  res.sendFile(__dirname + "/videofeed.js");
});
app.get("/css", (req, res) => {
  res.sendFile(__dirname + "/stylexls.css");
});

app.use(express.static(__dirname + "/videos"));
// --------------------------------------------------------------------------------------
//                            END OF HOSTING
// --------------------------------------------------------------------------------------
