var express = require('express'),
    Campground = require('../models/campground'),
    middleware = require('../middleware'),
    geocoder = require('geocoder'),
    router = express.Router();

//-----------------------------------------------
// Pagination

function paginate(req, res, next) {
    var noMatch = null;
	var perPage = 9;
	var page = req.params.page || 1;
	var output = {
		data: null,
		pages: {
			current: page,
			prev: 0,
			hasPrev: false,
			next: 0,
			hasNext: false,
			total: 0
		},
		items: {
        	begin: ((page * perPage) - perPage) + 1,
        	end: page * perPage,
        	total: 0
      	}
	};
	Campground
	.find()
	.sort({"name": 1})
	.skip((page - 1) * perPage)
    .limit(perPage)	
    .exec(function(err, allCampgrounds) {
      	if(err) return next(err);
      	Campground.count().exec(function(err, count) {
      		if(err) return next(err);
      		output.items.total = count;
      		output.data = allCampgrounds;
        	output.pages.total = Math.ceil(output.items.total / perPage);
      		if(output.pages.current < output.pages.total) {
      			output.pages.next = Number(output.pages.current) + 1;
      		} else {
      			output.pages.next = 0;
      		}      
      		output.pages.hasNext = (output.pages.next !== 0);
      		output.pages.prev = output.pages.current - 1;
     	 	output.pages.hasPrev = (output.pages.prev !== 0);
      		if (output.items.end > output.items.total) {
        		output.items.end = output.items.total;
      		}
      		res.render('campgrounds/index', {
    			campgrounds: allCampgrounds,
    			output: output,
    			noMatch: noMatch
    		});
      	});
    });
}

//  INDEX route - show all campgrounds
router.get('/', function(req, res, next) {
    // if there is a search
    if (req.query.search) {
        // https://stackoverflow.com/questions/38421664/fuzzy-searching-with-mongodb
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // get all campgrounds from db
        Campground.find({ name: regex }, function(error, allCampgrounds) {
            if (error) {
                req.flash('error', error.message);
				res.redirect('back');
            } 
            if (allCampgrounds.length < 1) {
                    req.flash('error', "Sorry no campgrounds found by that query.");
				    res.redirect('back');
                } else {
                    res.render('campgrounds/search', {
					campgrounds: allCampgrounds
				});
             }
        });
    } else {
        paginate(req, res, next);
    }
});

router.get('/page/:page', function(req, res, next){
	paginate(req, res, next);
});


// CREATE route -- create a new campground
router.post('/', middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    geocoder.geocode(req.body.location, function(err, data) {
        if (err) { console.log(err); }
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newCampground = { name: name, image: image, description: desc, price: price, author: author, location: location, lat: lat, lng: lng };
        // Create a new campground and save to Db
        Campground.create(newCampground, function(err, newlyCreated) {
            if (err) {
                console.log(err);
            } else {
                //redirect back to campgrounds page
                console.log(newlyCreated);
                res.redirect("/index");
            }
        });
    });
});

// NEW route - show form to create new camp
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});
// SHOW route - shows more info about one campground
router.get('/:id', function(req, res) {
    //find the campground with provided ID and populate it with comments
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // and then render show template with that campground
            res.render('campgrounds/show', {
                campground: foundCampground
            });
        }
    });
});

// Edit route 

router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {

    Campground.findById(req.params.id, function(err, foundCamp) {
        if (err) {
            console.log(err);
        }
        res.render('campgrounds/edit', {
            campground: foundCamp
        });
    });
});

// Update route

router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    geocoder.geocode(req.body.location, function(err, data) {
        if (err) { console.log(err); }
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = { name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng };
        Campground.findByIdAndUpdate(req.params.id, { $set: newData }, function(err, campground) {
            if (err) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                req.flash("success", "Successfully Updated!");
                res.redirect("/index/" + campground._id);
            }
        });
    });
});

// Delete route

router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, req.params.campground, function(err) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong');
            res.redirect('/index/:id');
        } else {
            req.flash('warning', 'Campground successfuly deleted');
            res.redirect('/index');
        }
    });
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;
