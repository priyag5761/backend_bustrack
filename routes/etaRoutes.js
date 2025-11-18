import express from "express";
import { Location } from "../models/locationModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { busId, destinationLat, destinationLon } = req.query;

    const latest = await Location.findOne({ busId }).sort({ timestamp: -1 });

    if (!latest)
      return res.status(404).json({ message: "No location data for this bus" });

    const { lat, lon } = latest.coords;

    // Rough distance (Haversine formula)
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(destinationLat - lat);
    const dLon = toRad(destinationLon - lon);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat)) *
        Math.cos(toRad(destinationLat)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    const speed = latest.speed || 30; // default 30 km/h
    const eta = (distance / speed) * 60; // minutes

    res.json({ busId, distance_km: distance.toFixed(2), eta_minutes: eta.toFixed(1) });
  } catch (err) {
    console.error("Error calculating ETA:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
