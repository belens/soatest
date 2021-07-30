// @flow
import data from "../data/soatest.json";

type RawTimeslot = {
  place: string, // province
  appointment: string,
  free: string,
  day: string,
  daypart: string,
  hour: string,
  organisation: string, // testcenter
  address: string,
  telephone: string,
  email: string,
  website: string,
};

type Organisation = {
  province: string, // province
  name: String,
  free: Boolean,
  organisation: String,
  address: String,
  email: String,
  website: String,
};

var timeslots: [RawTimeslot] = data;

function removeSexProvinces(provinces: Provinces): [Provinces] {
  return provinces.reduce((arr, curr, i) => {
    if (curr.toLowerCase().includes("sex")) {
      return arr;
    }
    return [...arr, curr];
  }, []);
}
function getWeekDays(locale) {
  var baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
  var weekDays = [];
  for (var i = 0; i < 7; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, { weekday: "long" }));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}
var weekDays = getWeekDays("en-EN");

console.log(weekDays);
function getOrganisations(): [Organisation] {
  return timeslots.reduce((orgs, timeslot, i) => {
    var existingOrganisationIndex = orgs.findIndex(
      (ts) =>
        timeslot.organisation.toLocaleLowerCase() ===
        ts.organisation.toLocaleLowerCase()
    );
    // console.log(existingOrganisationIndex);
    // console.log(weekDays.indexOf(timeslot.day))
    var openingHours = {
      day: timeslot.day,
      weekday: weekDays.indexOf(timeslot.day),
      daypart: timeslot.daypart,
      hour: timeslot.hour,
      startTime: timeslot.startTime,
      endTime: timeslot.endTime,
      free: timeslot.free === "yes",
    };
    if (existingOrganisationIndex < 0) {
      var organisation = {
        province: timeslot.place,
        name: timeslot.organisation,
        free: timeslot.free === "yes",
        openingHours: [
          openingHours,
        ],
        organisation: timeslot.organisation,
        address: timeslot.address,
        email: timeslot.email,
        website: timeslot.website,
      };

      orgs = [...orgs, organisation];
    } else {
      orgs[existingOrganisationIndex].openingHours = [
        ...orgs[existingOrganisationIndex].openingHours,
        openingHours,
      ].sort((a, b) => (a.weekday > b.weekday) ? 1 : -1);
      // return orgs;
    }
    
    return orgs;
  }, []);
}
function getProvinces(isRemoveSexProvinces: Boolean = true): [Provinces] {
  var provinces = data.reduce((arr, curr, i) => {
    if (arr.indexOf(curr.place) > -1) {
      return arr;
    }
    return [curr.place, ...arr];
  }, []);

  if (isRemoveSexProvinces === true) {
    return removeSexProvinces(provinces);
  }
  return provinces;
}

var DataUtils: Timeslot = {
  getData: () => {
    return timeslots;
  },

  getProvinces: (): [Provinces] => {
    return getProvinces(true);
  },

  getOrganisationsByProvince: (province): [Organisation] => {
    var organisations = getOrganisations();

    var provinceOrganisations = organisations.filter(function (org) {
      return org.province === province;
    });
    return provinceOrganisations;
  },
};

export default DataUtils;
