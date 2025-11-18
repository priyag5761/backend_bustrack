// routes/adminRoutes.js
import express from "express";
import { mysqlPool } from "../config/mysql.js";
import bcrypt from "bcryptjs"; // npm i bcryptjs

const router = express.Router();

// VERY SIMPLE demo auth - check a fixed password from .env
function checkAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Create bus
router.post("/bus", checkAdmin, async (req, res) => {
  try {
    const { bus_id, route_id, registration_no, capacity } = req.body;
    await mysqlPool.query(
      "INSERT INTO buses (bus_id, route_id, registration_no, capacity) VALUES (?, ?, ?, ?)",
      [bus_id, route_id, registration_no, capacity]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// Create driver (simple table assumed)
router.post("/driver", checkAdmin, async (req, res) => {
  try {
    const { driver_id, name, login_id, password } = req.body;
    // hash password for demo
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);
    await mysqlPool.query(
      "INSERT INTO drivers (driver_id, name, login_id, password_hash) VALUES (?, ?, ?, ?)",
      [driver_id, name, login_id, hash]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});


export default router;
