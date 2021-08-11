// @flow
import organisationsJson from "../data/organisations-2.0.json";

type Period = {
  weekday: number,
  startTime: string,
  endTime: string,
};
type Organisation = {
  address: string,
  telephone: string,
  email: string,
  coords: {
    lat: number,
    lng: number,
  },
  free: boolean,
  province: string,
  name: string,
  isAnonymous: true,
  onAppointment: true,
  isFree: false,
  extraInfo: string,
  appointmentUrl: string,
  websiteUrl: string,
  openPeriods: {
    "0": [Period],
    "1": [Period],
    "2": [Period],
    "3": [Period],
    "4": [Period],
    "5": [Period],
    "6": [Period],
  },
};
type Province = {
  name: String,
  zoom: number,
  coords: { lat: number, lng: number },
};
const provinceProps: [Province] = [
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
  return organisationsJson;
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
  const provinces = organisationsJson.reduce((arr, curr, i) => {
    if (arr.indexOf(curr.province) > -1) {
      return arr;
    }
    return [curr.province, ...arr];
  }, []);

  return provinces;
}

const DataUtils = {
  getData: () => {
    return organisationsJson;
  },

  getProvinces: (): [Province] => {
    return getProvinces(true);
  },

  getOrganisationsByProvince: (provinceName): [Organisation] => {
    if (!provinceName) return [];
    const organisations = getOrganisations();

    const provinceOrganisations = organisations.filter(function (org) {
      return org.province === provinceName;
    });
    return provinceOrganisations;
  },
  getProvinceProps(provinceName) {
    if (!provinceName) return null;
    return getProvinceProps(provinceName);
  },
};

export default DataUtils;
