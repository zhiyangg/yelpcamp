const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');

const {places, descriptors, shuffledImages} = require('./seedHelpers')

// mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);

// Connecting to a database
const db = mongoose.connection;
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
});

// function for picking a random place and random descriptor
const sample = (array) => array[Math.floor(Math.random() * array.length)];

// function to shuffle an array using Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const rand1000 = Math.floor(Math.random() * 1000); 
        const price = Math.floor(Math.random() * 20) + 10;
        
        const camp = new Campground({
            author: '64fe2acdcdb9720053361e0c',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`, // city, state
            title: `${sample(descriptors)} ${sample(places)}`, // descriptor, places
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[rand1000].longitude, cities[rand1000].latitude]
            },
            images: shuffleArray(shuffledImages)
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})