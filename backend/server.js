require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db"); // MySQL connected

const userRoutes = require("./routes/userRoutes");
const artikelRoutes = require("./routes/artikelRoutes");
const podcastRoutes = require("./routes/podcastRoutes");


const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/artikel", artikelRoutes);
app.use("/api/podcast", podcastRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));