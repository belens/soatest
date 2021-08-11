// @flow
import data from "../data/organisations-2.0.json";

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

const timeslots: [RawTimeslot] = data;

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
  return data;
}

export function getOrganisationByName(name): Organisation {
  const organisations = getOrganisations();
  console.log(organisations);
  return organisations.find((org) => org.name === name);
}

function getProvinceProps(province) {
  const provinceIndex = provinceProps.findIndex((pr) => pr.name === province);
  if (provinceIndex > -1) {
    return provinceProps[provinceIndex];
  }
  return null;
}

function getProvinces(isRemoveSexProvinces: Boolean = true): [Provinces] {
  const provinces = data.reduce((arr, curr, i) => {
    if (arr.indexOf(curr.province) > -1) {
      return arr;
    }
    return [curr.province, ...arr];
  }, []);

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
};

export default DataUtils;
