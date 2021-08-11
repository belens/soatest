import moment from "moment";
import fs from "fs";
var organisationsText = fs
  .readFileSync("./tools/soatest-data-2.0-draft-organisations.tsv")
  .toString("utf-8");
var timeslotsText = fs
  .readFileSync("./tools/soatest-data-2.0-draft-timeslots.tsv")
  .toString("utf-8");

const defaultOpenPeriods = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
};

function getWeekDays(locale) {
  const baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
  const weekDays = [];
  for (var i = 0; i < 7; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, { weekday: "long" }));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}

const weekdays = getWeekDays("en-EN");

//var csv is the CSV file with headers
export function csvJSON(csv) {
  const lines = csv.split("\n");
  const result = [];

  const headers = lines[0].split("\t").map((value, index, arr) => {
    return value.trim();
  });

  for (var i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split("\t");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j].trim();
    }

    result.push(obj);
  }
  return result;
}

export function getMomentHours(timeslot) {
  var hour = timeslot.hour;
  const openingTime = hour.split(" - ").map((value, i) => {
    return value.toLowerCase();
  });
  if (openingTime.length !== 2) return; // skip invalid timeslots
  const startHourSplit = openingTime[0].split("h").map((value, i) => {
    return value || "00";
  });

  const endHourSplit = openingTime[1].split("h").map((value, i) => {
    return value || "00";
  });

  const hours = {
    startTime: moment()
      .set({
        day: timeslot.day,
        hour: startHourSplit[0],
        minutes: startHourSplit[1],
      })
      .toISOString(),
    endTime: moment()
      .set({
        day: timeslot.day,
        hour: endHourSplit[0],
        minutes: endHourSplit[1],
      })
      .toISOString(),
  };

  if (!hour) return; // throw out timeslots without filled in timeslot

  return {
    ...hours,
  };
}

export function getOpenPeriods(organisation, rawTimeslots) {
  var orgOpenPeriods = rawTimeslots.filter((timeslot) => {
    return timeslot.organisation === organisation.organisation; // imported title 'organisation'
  });
  orgOpenPeriods = orgOpenPeriods.map((openPeriod) => {
    openPeriod = {
      ...openPeriod,
      onAppointment: openPeriod.on_appointment,
      weekday: weekdays.indexOf(openPeriod.day),
      ...getMomentHours(openPeriod),
    };
    delete openPeriod.organisation;
    delete openPeriod.on_appointment;
    delete openPeriod.hour;
    delete openPeriod.day;

    return openPeriod;
  });

  const openPeriods = defaultOpenPeriods;

  var p = {};
  for (const [weekday, arr] of Object.entries(openPeriods)) {
    if (!p[weekday]) {
      p[weekday] = [];
    }
    console.log(weekday);

    const orgWeekdayOpenPeriods = orgOpenPeriods.filter((period) => {
      return weekday + "" === period.weekday + "";
    });
    p[weekday] = orgWeekdayOpenPeriods;
    console.log(p);
  }

  return p;
}

export function sanitizeJson(rawOrganisations, rawTimeslots) {
  // Sanitize Organisations
  const organisations = rawOrganisations.map((org) => {
    const coords = org.coords === "" ? undefined : JSON.parse(org.coords);
    const sanitizedOrg = {
      ...org,
      province: org.place,
      name: org.organisation,
      isAnonymous: org.is_anonymous === "yes",
      onAppointment: org.on_appointment === "yes",
      isFree: org.free === "yes",
      extraInfo: org.extra_info,
      appointmentUrl: org.appointment_url,
      websiteUrl: org.website_url,
      openPeriods: getOpenPeriods(org, rawTimeslots),
      coords,
    };

    delete sanitizedOrg.is_anonymous;
    delete sanitizedOrg.extra_info;
    delete sanitizedOrg.appointment_url;
    delete sanitizedOrg.organisation;
    delete sanitizedOrg.website_url;
    delete sanitizedOrg.place;

    return sanitizedOrg;
  });

  return organisations;
}

const rawOrganisations = csvJSON(organisationsText);
const rawTimeslots = csvJSON(timeslotsText);

console.log("Found:");
console.log(`${rawOrganisations.length} Organisations;`);
console.log(`${rawTimeslots.length} Timeslots;`);

const sanitizedJson = sanitizeJson(rawOrganisations, rawTimeslots);

fs.writeFile(
  "./src/data/organisations-2.0.json",
  JSON.stringify(sanitizedJson, null, 2),
  "utf8",
  () => {}
);
