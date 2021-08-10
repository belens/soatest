// @flow
import data2 from "../data/soatest-2.0.json";

type RawTimeslot = {
  place: string, // province
  on_appointment: string,
  free: string,
  day: string,
  daypart: string,
  hour: string,
  organisation: string, // testcenter
  address: string,
  telephone: string,
  email: string,
  website_url: string,
  appointment_url: string,
};

type Organisation = {
  province: string, // province
  name: String,
  free: Boolean,
  onAppointment: String,
  organisation: String,
  address: String,
  email: String,
  website: String,
};

const timeslots: [RawTimeslot] = data2;

const provinceProps = [
  {
    name: "Brussels",
    zoom: 11,
    coords: { lat: 50.8465573, lng: 4.351697 },
  },
  {
    name: "Antwerp",
    zoom: 11,
    coords: { lat: 51.2194475, lng: 4.4024643 },
  },
];

export function getOrganisations(): [Organisation] {
  // const organisations = timeslots.reduce((orgs, timeslot, i) => {
  //   const existingOrgIndex = orgs.findIndex(
  //     (ts) =>
  //       timeslot.organisation.toLocaleLowerCase() ===
  //       ts.organisation.toLocaleLowerCase()
  //   );
  //   // const openPeriods = {
  //   //   day: timeslot.day,
  //   //   weekday: weekDays.indexOf(timeslot.day),
  //   //   daypart: timeslot.daypart,
  //   //   hour: timeslot.hour,
  //   //   startTime: timeslot.startTime,
  //   //   endTime: timeslot.endTime,
  //   //   free: timeslot.free === "yes",
  //   // };
  //   if (existingOrgIndex < 0) {
  //     const organisation = {
  //       ...timeslot,
  //       // province: timeslot.place,
  //       // name: timeslot.organisation,
  //       // free: timeslot.free === "yes",
  //       // organisation: timeslot.organisation,
  //       // address: timeslot.address,
  //       // email: timeslot.email,
  //       // websiteUrl: timeslot.website_url,
  //       // telephone: timeslot.telephone,
  //       // appointmentUrl: timeslot.appointment_url,
  //       // onAppointment: timeslot.on_appointment === "yes",
  //       // ...getOrganisationProps(timeslot.organisation), // temp
  //     };
  //     // organisation.openPeriods = {
  //     //   ...defaultOpenPeriods,
  //     //   // [openPeriods.weekday]: [openPeriods],
  //     // };
  //     // console.log(organisation.openPeriods);
  //     orgs = [...orgs, organisation];
  //   } else {
  //     // const existingOrg = orgs[existingOrgIndex];
  //     // existingOrg.openPeriods = {
  //     //   ...existingOrg.openPeriods,
  //     //   // [openPeriods.weekday]: [...existingOrg.openPeriods[openPeriods.weekday], openPeriods],
  //     // };
  //     // .sort((a, b) => (a.weekday > b.weekday ? 1 : -1));
  //   }

  //   return orgs;
  // }, []);
  return data2;
  // return organisations.map((org) => {
  //   // org.openPeriods.reduce((prev, org, arr) => {});
  //   return org;
  // });
}

function getProvinceProps(province) {
  const provinceIndex = provinceProps.findIndex((pr) => pr.name === province);
  if (provinceIndex > -1) {
    return provinceProps[provinceIndex];
  }
  return null;
}

// function getOrganisationProps(organisation) {
//   const organisationIndex = organisationProps.findIndex(
//     (pr) => pr.name === organisation
//   );
//   if (organisationIndex > -1) {
//     return organisationProps[organisationIndex];
//   }
//   return null;
// }

function getProvinces(isRemoveSexProvinces: Boolean = true): [Provinces] {
  const provinces = data2.reduce((arr, curr, i) => {
    if (arr.indexOf(curr.province) > -1) {
      return arr;
    }
    return [curr.province, ...arr];
  }, []);

  // if (isRemoveSexProvinces === true) {
  //   return removeSexProvinces(provinces);
  // }
  return provinces;
}

const DataUtils: Timeslot = {
  getData: () => {
    return timeslots;
  },

  getProvinces: (): [Provinces] => {
    return getProvinces(true);
  },

  getOrganisationsByProvince: (province): [Organisation] => {
    const organisations = getOrganisations();

    const provinceOrganisations = organisations.filter(function (org) {
      return org.province === province;
    });
    return provinceOrganisations;
  },
  getProvinceProps(province) {
    return getProvinceProps(province);
  },
  // organisationProps(organisation) {
  //   return organisationProps(organisation);
  // },
};

export default DataUtils;
