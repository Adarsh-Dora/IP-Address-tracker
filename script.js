const adress = document.getElementById("adress");
const loc = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const btn = document.querySelector(".button");
const ipadress = document.querySelector(".ipadress");
const form = document.querySelector(".form-value");

var myIcon = L.icon({
  iconUrl: "../images/icon-location.svg",
  iconSize: [38, 44],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  // shadowUrl: "my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

const getipadress = async function (ipvalue) {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_aavQEDFeXGEEm6TsLTUqHQuQLJWSz&ipAddress=${ipvalue}`
  );
  const data = await response.json();
  showData(data);
  map.flyTo([data.location.lat, data.location.lng], 14);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  let marker = L.marker([data.location.lat, data.location.lng], {
    icon: myIcon,
  }).addTo(map);
};

const showData = function (data) {
  adress.textContent = data.ip;
  loc.textContent = `${data.location.country}, ${data.location.region}`;
  timezone.textContent = data.location.timezone;
  isp.textContent = data.isp;
};

let map = L.map("map").setView([22.12, 84.54], 13);

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  getipadress(ipadress.value);
});

getipadress("");
