const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');

// Connecting to a database
const db = mongoose.connection;
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Directories
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, ()=> {
    console.log("serving on port 3000");
});