import axios from "axios";

const BUS_ID = "BUS101";
let lat = 12.9716;
let lon = 77.5946;

setInterval(async () => {
  lat += 0.0002;
  lon += 0.0002;

  try {
    const res = await axios.post("http://localhost:4000/api/driver/location", {
      busId: BUS_ID,
      lat,
      lon,
      speed: 35
    });
    console.log("Sent:", lat.toFixed(6), lon.toFixed(6));
  } catch (err) {
    console.error("Error:", err.message);
  }
}, 5000); // Sends update every 5 seconds
