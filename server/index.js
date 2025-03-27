const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
require("./config/db");

app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello, world !");
});

app.listen(3001, () => {
    console.log("Server is running")
});
