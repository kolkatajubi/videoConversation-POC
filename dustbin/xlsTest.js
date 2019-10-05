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
