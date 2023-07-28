const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');

const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');

// Connecting to a database
const db = mongoose.connection;
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
});

// function for picking a random place and random descriptor
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        
        const rand1000 = Math.floor(Math.random() * 1000); 
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`, // city, state
            title: `${sample(descriptors)} ${sample(places)}`, // descriptor, places
            image: 'https://images.unsplash.com/photo-1461353789837-8eb180f968d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHw0ODQzNTF8fHx8fHx8MTY5MDU4MTgxMA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
            description: 'lorem ipsum',
            price
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})