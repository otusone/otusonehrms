const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const routes = require("./routers/index");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const path = require('path');



app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


require("./confiq/connectionDB").connectDB();


app.use("/api/v1/", routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong", error: process.env.NODE_ENV === 'development' ? err.message : undefined });
});




const buildPath = path.join(__dirname, '../screens', 'dist')
app.use(express.static(buildPath))
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../screens', 'dist', "index.html"));
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found!" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
