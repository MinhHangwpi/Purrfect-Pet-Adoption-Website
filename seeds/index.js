const mongoose = require('mongoose');
const { petNames, genderValues, speciesValues, breedsValues, statusValues, descriptors, orgNames } = require('./seedHelpers');
const {cities} = require('./cities.js');

//import objects from

//import models pets.js and shelters.js
const Pet = require('../models/pets.js');
const Shelter = require('../models/shelters.js');


//create a mongoose.connection

mongoose.connect('mongodb://localhost:27017/purrfectApp');

const db = mongoose.connection;

//error handling function
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
})

//a function to choose sample
function sampleOne(array) {
    if (Array.isArray(array))
    return array[Math.floor(Math.random() * array.length)];
}

function sampleMany(array, n) {
    obj = []
    for (let i = 0; i < n; i++) {
        obj.push(sampleOne(array));
    }
    return obj
}

function parseImage(endPoint){
    fetch(endPoint)
    .then((response) => {
        return response.json().message
    })
}


//function to create seedDB

const seedDB = async () => {
    await Pet.deleteMany({});
    await Shelter.deleteMany({});

    //generate Shelter:
    for (let i = 0; i < 50; i++) {
        const aCity = sampleOne(cities);
        const shelter = new Shelter({
            name: `${aCity.city} ${sampleOne(descriptors)} ${sampleOne(orgNames)}`,
            location: `${aCity.city}, ${aCity.state}`,
            //list of Pets
        })
        await shelter.save();
    }

    //generate Pets:
    for (let i=0; i<50; i++){

        const aCity = sampleOne(cities);
        const pet = new Pet({
           name: sampleOne(petNames),
           gender: sampleOne(genderValues),
           age: Math.floor(Math.random()*14),
           spieces: sampleOne(speciesValues),
           breed: sampleOne(breedsValues),
           catFriendly: Math.random() < 0.5,
           dogFriendly: Math.random() < 0.5,
           description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
           status: sampleOne(statusValues),
           image: 'https://placedog.net/640/480?random',
           location: `${aCity.city}, ${aCity.state}`
           //to add shelter in here,
           //petShelter: db.shelters.findOne({})
        })
        await pet.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
