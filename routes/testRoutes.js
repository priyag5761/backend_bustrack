import express from "express";
import { mysqlPool } from "../config/mysql.js";
import { Location } from "../models/locationModel.js";

const router = express.Router();

// Test MySQL: fetch buses
router.get("/buses", async (req, res) => {
  const [rows] = await mysqlPool.query("SELECT * FROM buses");
  res.json(rows);
});

// Test MongoDB: insert + fetch one location
router.post("/location", async (req, res) => {
  const { busId, lat, lon, speed } = req.body;
  const loc = new Location({ busId, coords: { lat, lon }, speed });
  await loc.save();
  res.json({ message: "Location saved", data: loc });
});

router.get("/locations", async (req, res) => {
  const data = await Location.find().sort({ timestamp: -1 }).limit(5);
  res.json(data);
});

export default router;
