import { getOrganisations } from "./dataUtils.js";

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method

const fs = require("fs");
const fetch = require("node-fetch");

const organisations = getOrganisations();

// const url = "https://www.something.com/.../image.jpg";

function getOrgImageUrl(org) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${org.address}&zoom=16&scale=2&size=600x300&maptype=roadmap&key=AIzaSyAkPQV0B9yFdABkgrTUra4mx7sxAM9CQno&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C${org.address}`;
}

async function download(url, name) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFile(`./${name}.jpg`, buffer, () => console.log("finished downloading!"));
}

organisations.forEach((org) => {
  download(getOrgImageUrl(org), org.name);
});
