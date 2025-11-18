import express from "express";
import { mysqlPool } from "../config/mysql.js";
import { Location } from "../models/locationModel.js";



const router = express.Router();

// GET all buses with their latest location
router.get("/", async (req, res) => {
  try {
    const [buses] = await mysqlPool.query("SELECT * FROM buses");

    // For each bus, fetch its latest location from MongoDB
    const results = await Promise.all(
      buses.map(async (bus) => {
        const loc = await Location.findOne({ busId: bus.bus_id })
          .sort({ timestamp: -1 })
          .lean();
        return {
          ...bus,
          latestLocation: loc ? loc.coords : null,
          lastUpdated: loc ? loc.timestamp : null,
        };
      })
    );

    res.json(results);
  } catch (err) {
    console.error("Error fetching live buses:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
