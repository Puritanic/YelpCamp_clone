var mongoose = require('mongoose');


// Campground Schema setup ///////////////

var campgroundSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    location: String,   // google maps
    lat: Number,        // google maps
    lng: Number,        // google maps
    createdAt: { type: Date, default: Date.now }, // moment.js
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:  'User'
            },
        username: String
    },
    comments: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:  'Comment'
                }
        ]
});

module.exports = mongoose.model('Campground', campgroundSchema);