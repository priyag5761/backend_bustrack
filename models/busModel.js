// CREATE TABLE buses (
//   bus_id VARCHAR(10) PRIMARY KEY,
//   route_id VARCHAR(10),
//   registration_no VARCHAR(20),
//   capacity INT
// );
// INSERT INTO buses VALUES ('BUS101','R01','KA01AB1234',40);

// models/busModel.js
import { mysqlPool } from "../config/mysql.js";

// Get all buses
export async function getAllBuses() {
  const [rows] = await mysqlPool.query("SELECT * FROM buses");
  return rows;
}

// Add a new bus
export async function addBus(bus_id, route_id, registration_no, capacity) {
  const query = "INSERT INTO buses (bus_id, route_id, registration_no, capacity) VALUES (?, ?, ?, ?)";
  await mysqlPool.query(query, [bus_id, route_id, registration_no, capacity]);
}
