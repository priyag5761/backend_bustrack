import express from "express";
import { mysqlPool } from "../config/mysql.js";

const router = express.Router();

// GET route info + assigned buses
router.get("/:id", async (req, res) => {
  try {
    const routeId = req.params.id;
    const [routeDetails] = await mysqlPool.query(
      "SELECT * FROM routes WHERE route_id = ?",
      [routeId]
    );

    const [buses] = await mysqlPool.query(
      "SELECT * FROM buses WHERE route_id = ?",
      [routeId]
    );

    if (!routeDetails.length)
      return res.status(404).json({ message: "Route not found" });

    res.json({
      route: routeDetails[0],
      buses,
    });
  } catch (err) {
    console.error("Error fetching route data:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
