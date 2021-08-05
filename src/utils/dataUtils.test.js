import DataUtils, { getData, getOrganisations } from "./DataUtils";

it("data must return something", () => {
  expect(DataUtils.getData()[0]).toBeTruthy();
});

it("getOrganisations must return something", () => {
  expect(getOrganisations()).toBeTruthy(); // is defined
  expect(Array.isArray(getOrganisations())).toBe(true); // is array
  const org = getOrganisations()[0];
  expect(org && typeof org === "object").toBe(true); // contains objects
});

it("getOrganisationsByProvince must return something", () => {
  const orgs = DataUtils.getOrganisationsByProvince("Brussels");
  expect(orgs).toBeTruthy(); // is defined
  expect(Array.isArray(orgs)).toBe(true); // is array
  const org = orgs[0];
  expect(org && typeof org === "object").toBe(true);
});

it("getOrganisationsByProvince must less than getOrganisations", () => {
  const provinceOrgs = DataUtils.getOrganisationsByProvince("Brussels");
  const orgs = getOrganisations();
  expect(provinceOrgs.length).toBeLessThan(orgs.length); // is less
});

it("getOrganisations objects should contain OpeningPeriods", () => {
  const provinceOrgs = DataUtils.getOrganisationsByProvince("Brussels");
  const orgs = getOrganisations();
  const org = orgs[0];

  expect(org.openPeriods).toBeTruthy();  
  // console.log(org.openPeriods);
  expect(Object.keys(org.openPeriods)).toBeTruthy();  
  // expect(Object.keys(org.openPeriods)).toMatch(["0","1","2","3","4","5","6"]);  
  // expect(org.openPeriods.keys().length).toEqual(7);  
  
});
