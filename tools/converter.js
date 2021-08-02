import moment from 'moment';
import fs from 'fs';
var text = fs.readFileSync("./tools/soatest-data-1.0.tsv").toString("utf-8");

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

function refactorJSON(json) {
  var rJson = json.map((timeslot, i) => {
    var hour = timeslot.hour;
    // delete timeslot.hour;
    const openingTime = hour.split(" - ").map((value, i) => {
      return value.toLowerCase();
    });
    console.log(openingTime);
    if (openingTime.length != 2) return; // skip invalid timeslots
    const startHourSplit = openingTime[0].split("h").map((value, i) => {
      return value || '00';
    });

    const endHourSplit = openingTime[1].split("h").map((value, i) => {
      return value || '00';
    });

    // var mDay = moment().set({'day': timeslot.day, 'hour': 3});
    console.log(startHourSplit[1])
    const hours = {
      startTime: moment().set({'day': timeslot.day, 'hour': startHourSplit[0], 'minutes' : startHourSplit[1]}).toISOString() ,
      endTime: moment().set({'day': timeslot.day, 'hour': endHourSplit[0], 'minutes' : endHourSplit[1]}).toISOString() ,

    };

    if (!hour) return; // throw out timeslots without filled in timeslot

    return {
      ...timeslot,
      ...hours,
    };
  });
  // console.log(rJson)
  return rJson;
}

var rawJson = csvJSON(text);

var refactoredJson = refactorJSON(JSON.parse(rawJson));
refactoredJson = refactoredJson.filter(function (el) {
  return el != null;
});

fs.writeFile(
  "./src/data/soatest.json",
  JSON.stringify(refactoredJson, null, 2),
  "utf8",
  () => {}
);
