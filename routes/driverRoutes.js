// import express from "express";
// import { Location, LatestLocation } from "../models/locationModel.js";

// const router = express.Router();

// router.post("/location", async (req, res) => {
//   try {
//     const { busId, lat, lon, speed } = req.body;

//     if (!busId || lat == null || lon == null) {
//       return res.status(400).json({ error: "Missing fields" });
//     }

//     // Save to MongoDB: history
//     const saved = await Location.create({
//       busId,
//       coords: { lat, lon },
//       speed,
//       timestamp: new Date()
//     });

//     // Update latest location (upsert)
//     await LatestLocation.findOneAndUpdate(
//       { busId },
//       {
//         coords: { lat, lon },
//         speed,
//         timestamp: new Date()
//       },
//       { upsert: true }
//     );

//     return res.json({ message: "Location saved", latest: saved });
//   } catch (err) {
//     console.error("Location Save Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;
import express from "express";
import { Location, LatestLocation } from "../models/locationModel.js";

const router = express.Router();

// TEST ROUTE
router.get("/test", (req, res) => {
  res.send("Driver route working!");
});

// MAIN LOCATION POST API
router.post("/location", async (req, res) => {
  try {
    const { busId, lat, lon, speed } = req.body;

    if (!busId || lat == null || lon == null) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Save in history collection
    const saved = await Location.create({
      busId,
      coords: { lat, lon },
      speed,
      timestamp: new Date()
    });

    // Update or insert latest location
    await LatestLocation.findOneAndUpdate(
      { busId },
      {
        coords: { lat, lon },
        speed,
        timestamp: new Date()
      },
      { upsert: true }
    );

    return res.json({ message: "Location saved", data: saved });

  } catch (err) {
    console.error("Location Save Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;

