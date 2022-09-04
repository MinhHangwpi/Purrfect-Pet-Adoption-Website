const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pet = require('./pets');


const shelterSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
    },
    email: {
        type: String,
        required: false,
        match: /\w+[\._]?\w+@.+/
    },
    pets: [{
        type: [mongoose.Types.ObjectId],
        ref: 'Pet'
    }]
});

// //create a virtual to get shelter's URL
// //create a virtual for pet's URL
// petSchema.virtual('url').get(() => {
//     return `shelter/${this._id}`;
// })

module.exports = mongoose.model('Shelter', shelterSchema);