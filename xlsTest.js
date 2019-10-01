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

// Reading the nextMap Next Field and getting the URL

let current = "A";
getURLs(current);
function getURLs(current) {
  for (i in nextMapData) {
    if (nextMapData[i].Current === current) {
      currentNextNodes = nextMapData[i].Next.split(", ");
      console.log(currentNextNodes);
      for (i in currentNextNodes) {
        for (x in urlMapData) {
          if (currentNextNodes[i] === urlMapData[x].Nodes) {
            console.log(urlMapData[x].URL);
          }
        }
      }
      return;
    }
  }
}
