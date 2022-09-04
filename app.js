const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Pet = require('./models/pets');
const Shelter = require('./models/shelters');
//catchAync middlewhere in utils

//ExpressError custom defined error class in the util
const methodOverride = require('method-override');
const app = express();

// connect to mongoose
try {
    mongoose.connect('mongodb://localhost:27017/purrfectApp');
} catch (error) {
    handleError(error);
}
const db = mongoose.connection;

//handle error after the initial connection
db.on('error', err => {
    logError(err);
})

//view engine setup
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set up middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// add a validate Pet/Shelter function here. params include req, res, next; if error => throw error, else: call next()


//Baseline REST routes.

/*
Routes for all pet pages
*/

app.get('/', (req, res) => {
    res.render('home')
})

//display all pets
app.get('/pets', async (req, res) => {
    const pets = await Pet.find();
    res.render('pets/index', { pets });
})

// //render a form to create a new pet (GET request)
app.get('/pets/new', async (req, res) => {
    res.render('pets/new');
})
// //submit the form to create a new pet (POST request)
app.post('/pets', async (req, res) => {
//     // get the req.body then save to the database
//     //redirect to a different page
    const pet = new Pet(req.body.pet);
    await pet.save();
    res.redirect(`/pets/${pet._id}`);
})

//display a particular pets
app.get('/pets/:id', async (req, res) => {
    const pet = await Pet.findById(req.params.id);
    res.render('pets/show', { pet })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})






