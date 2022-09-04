const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//require shelters model
const Shelter = require('./shelters');


const petSchema = new Schema({
    //TODO: add Image properties. To find way to upload multiple images
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'unknown']
    },
    age: {
        type: Number,
        min: 0,
        max: 50
    },
    species: {
        type: String,
        enum: ['dog', 'cat', 'other']
    },
    breed: {
        type: String,
        default: 'mixed'
    },
    catFriendly: Boolean,
    dogFriendly: Boolean,
    description: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Pending Adoption', 'Adopted/Unavailable'],
        default: 'Adopted/Unavailable'
    },
    location: String,
    petShelter: {
        type: String,
        //ref: 'Shelter',
        required: false// to change to true later
    },
    image: String
})

// //create a virtual to get shelter's URL
//create a virtual for pet's URL
petSchema.virtual('url').get(() => {
    return `shelter/${this._id}`;
})


module.exports = mongoose.model('Pet', petSchema);