const express = require('express');
const app = express();

const userRoute = require('./api/routes/user');
const attendanceRoute = require('./api/routes/attendance');


const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Define the MongoDB connection string and options
const dbURI = 'mongodb+srv://anujkumarchoudharyotusone:we8UzbnfJus6z8we@cluster0.qeylqm6.mongodb.net/data';
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose.connect(dbURI, dbOptions)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRoute);
app.use('/attendance', attendanceRoute);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Bad request!"
    });
});

module.exports = app;
