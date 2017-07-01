var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    data = [{
        name: 'Clouds peak',
        image: 'https://upload.wikimedia.org/wikipedia/en/5/51/Cloud_Peak_viewed_from_Paint_Rock_Creek.jpg',
        description: 'Cloud Peak is the highest peak within the Big Horn Mountains in the U.S. state of Wyoming. It rises to an elevation of 13,167 feet (4,013 m)[1] and provides onlookers with dramatic views and vistas. The mountain can be climbed most easily from the western side, accessed by either the Battle Park or West Tensleep trail-heads and is roughly 24 miles round-trip from both.'
    }, {
        name: 'Eagletail Mountains',
        image: 'http://www.fieldandstream.com/g00/2_d3d3LmZpZWxkYW5kc3RyZWFtLmNvbQ%3D%3D_/TU9SRVBIRVVTMTQkaHR0cDovL3d3dy5maWVsZGFuZHN0cmVhbS5jb20vc2l0ZXMvZmllbGRhbmRzdHJlYW0uY29tL2ZpbGVzL3N0eWxlcy9sYXJnZV8xeF8vcHVibGljL2ltcG9ydC8yMDE1L2dhbGxlcnkvMjAxNTA4LzA0X0VhZ2xldGFpbEFaLmpwZz9pdG9rPWlManJGa0t6JmkxMGMubWFyay5pbWFnZS50eXBl_$/$/$/$/$/$/$/$/$/$/$/$',
        description: 'Arizona’s Eagletail Mountains Wilderness encompasses nearly 100,000 acres of sawtooth ridges, monoliths, spires, natural arches, and colorful rock strata.'

    }, {
        name: 'Organ Mountains',
        image: 'http://www.fieldandstream.com/g00/2_d3d3LmZpZWxkYW5kc3RyZWFtLmNvbQ%3D%3D_/TU9SRVBIRVVTMTQkaHR0cDovL3d3dy5maWVsZGFuZHN0cmVhbS5jb20vc2l0ZXMvZmllbGRhbmRzdHJlYW0uY29tL2ZpbGVzL3N0eWxlcy94bF8xeF8vcHVibGljL2ltcG9ydC8yMDE1L2dhbGxlcnkvMjAxNTA4LzA3X09yZ2FuTXRuc05NLmpwZz9pdG9rPVNOeEVLSUliJmkxMGMubWFyay5pbWFnZS50eXBl_$/$/$/$/$/$/$/$/$/$/$/$',
        description: 'East of Las Cruces, New Mexico, a brilliant moon rises beyond the Organ Mountains, blue in the dusk. The range peaks at 9,000 feet above the Chihuahuan Desert.'

    }, {
        name: 'Red Rock',
        image: 'http://www.fieldandstream.com/g00/2_d3d3LmZpZWxkYW5kc3RyZWFtLmNvbQ%3D%3D_/TU9SRVBIRVVTMTQkaHR0cDovL3d3dy5maWVsZGFuZHN0cmVhbS5jb20vc2l0ZXMvZmllbGRhbmRzdHJlYW0uY29tL2ZpbGVzL3N0eWxlcy9sYXJnZV8xeF8vcHVibGljL2ltcG9ydC8yMDE1L2dhbGxlcnkvMjAxNTA4LzExX1JlZFJvY2tDYW55b25OVi5qcGc%2FaXRvaz1QVVYxUklSbiZpMTBjLm1hcmsuaW1hZ2UudHlwZQ%3D%3D_$/$/$/$/$/$/$/$/$/$/$/$',
        description: 'Nevada’s Red Rock Canyon National Conservation Area is located just 17 miles outside the Las Vegas strip.'

    }];

function seedDb() {
    // remove campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('removed campgrounds');
        }
        // add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Campground added');
                    // create a few comments
                    Comment.create({
                        text: 'This place is great, but I wish there are less wolves and bears to run from...',
                        author: 'runForYourLives'
                    }, function(err, comment) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log('Created new comments');
                        }
                    });
                }
            });
        });
    });


}

module.exports = seedDb;
