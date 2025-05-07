const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require("./routers/index")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fs = require("fs")
require("dotenv").config();
const PORT = process.env.PORT || 3000;

require("./confiq/connectionDB").connectDB();


app.use("/api/v1/", routes);
// app.use("api/v1/user",routes);
// app.use("api/v1/admin",routes);

// app.use("/api/v1/user",userRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong", error: process.env.NODE_ENV === 'development' ? err.message : undefined })
})


app.use((req, res) => {
    res.status(404).json({ message: "Route not found!" });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



const path = require('path');
console.log('Looking for routes at:', path.join(__dirname, 'routes', 'user.js'));
console.log('File exists:', require('fs').existsSync(path.join(__dirname, 'routes', 'user.js')));


module.exports = app;

