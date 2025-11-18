import adminRoutes from "./routes/adminRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";

 // serve backend/admin directory
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongo } from "./config/mongo.js";
import { mysqlPool } from "./config/mysql.js";
import testRoutes from "./routes/testRoutes.js";

import busRoutes from "./routes/busRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import etaRoutes from "./routes/etaRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// connect databases
connectMongo();
mysqlPool.getConnection().then(() => console.log("✅ Connected to MySQL")).catch(err => console.error(err));


app.use('/admin', express.static('admin'));

// routes
app.use("/api", testRoutes);

app.use("/api/buses", busRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/eta", etaRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/driver", driverRoutes);


app.get("/", (req, res) => res.send("Server running successfully"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));

// app.use("/api/buses", require("./routes/busRoutes"));
// app.use("/api/routes", require("./routes/routeRoutes"));
// app.use("/api/eta", require("./routes/etaRoutes"));
