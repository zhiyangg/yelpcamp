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
            author: '64e8301bf581a72b5cfbd538',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`, // city, state
            title: `${sample(descriptors)} ${sample(places)}`, // descriptor, places
            description: 'lorem ipsum',
            price,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/de6e0wvfl/image/upload/v1693531550/YelpCamp/vkynirpzria02jqclaw3.jpg',
                  filename: 'YelpCamp/vkynirpzria02jqclaw3',
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})