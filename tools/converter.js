var fs = require("fs");
var text = fs.readFileSync("./tools/soatest.tsv").toString("utf-8");

//var csv is the CSV file with headers
function csvJSON(csv) {
  var lines = csv.split("\n");

  var result = [];

  var headers = lines[0].split("\t").map((value, index, arr) => {
    return value.trim();
  });

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split("\t");
    
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j].trim();
    }

    result.push(obj);
  }

  return JSON.stringify(result, null, 2); //JSON
}

var json = csvJSON(text);

fs.writeFile("./src/data/soatest.json", json, "utf8", () => {});
