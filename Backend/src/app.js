const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

const medicationRoutes = require("./routes/medications.routes");

app.use("/api/medications", medicationRoutes);

module.exports = app;
//hace que reciba desde el front las peticiones