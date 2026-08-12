const express = require("express");
const cors = require("cors");

const medicineRoutes = require("./routes/medicine.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/medicines", medicineRoutes);

module.exports = app;