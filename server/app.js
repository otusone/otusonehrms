const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routers=require("./routers/index");
const fs=require("fs")

const dbURI = 'mongodb+srv://simranotusonellp:1l1Qg9rvSkVNKAsm@cluster0.nkm7dy9.mongodb.net/HRMS';
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(dbURI, dbOptions)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use((req, res, next) => {
    res.status(404).json({
        message: "Route not found!"
    });
});

app.use("/api/v1",routers);

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({
        message:"Something went wrong",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
})


app.use((req, res) => {
    res.status(404).json({ message: "Route not found!" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



const path = require('path');
console.log('Looking for routes at:', path.join(__dirname, 'routes', 'user.js'));
console.log('File exists:', require('fs').existsSync(path.join(__dirname, 'routes', 'user.js')));


module.exports = app;
