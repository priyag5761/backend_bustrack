// import mongoose from "mongoose";

// const locationSchema = new mongoose.Schema({
//   busId: { type: String, required: true },
//   coords: {
//     lat: { type: Number, required: true },
//     lon: { type: Number, required: true }
//   },
//   speed: { type: Number, default: 0 },
//   timestamp: { type: Date, default: Date.now }
// });

// export const Location = mongoose.model("Location", locationSchema);

import mongoose from "mongoose";

/* ---------------------------------------------
   1) History collection: all GPS updates
   --------------------------------------------- */
const locationSchema = new mongoose.Schema({
  busId: { type: String, required: true, index: true },
  coords: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
  speed: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now, index: true }
});

export const Location = mongoose.model("Location", locationSchema);


/* ---------------------------------------------
   2) Latest Location collection: one document per bus
   --------------------------------------------- */
const latestSchema = new mongoose.Schema({
  busId: { type: String, required: true, unique: true, index: true },
  coords: {
    lat: Number,
    lon: Number
  },
  speed: Number,
  timestamp: Date
});

export const LatestLocation = mongoose.model("LatestLocation", latestSchema);
