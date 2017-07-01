// Middleware

var Campground  = require('../models/campground'),
    Comment     = require('../models/comment');


var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next) {

            if (req.isAuthenticated()) {
                Comment.findById(req.params.comment_id, function(err, foundComment) {
                    if (err) {
                        console.log(err);
                        req.flash('error', 'Something went wrong');
                        res.redirect('back');
                    }
                    else {
                        // if so, does the user own the comment
                        if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                            next();
                        }
                        else {
                            req.flash('error', 'You dont have permissions to do that');
                            res.redirect('back');
                        }
                    }
                });
            }
            else {
                req.flash('error', 'You need to be logged in to do that');
                res.redirect('back'); // redirects user back to the previous page
            }
};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
        
            if (req.isAuthenticated()) {
                Campground.findById(req.params.id, function(err, foundCamp) {
                    if (err) {
                        console.log(err);
                        req.flash('error', 'Campground not found');
                        res.redirect('back');
                    }
                    else {
                        // if so, does the user own the campground
                        if (foundCamp.author.id.equals(req.user._id) || req.user.isAdmin) {
                            next();
                        }
                        else {
                            req.flash('error', 'You dont have permissions to do that');
                            res.redirect('back');
                        }
                    }
                });
            }
            else {
                req.flash('error', 'You need to be logged in to do that');
                res.redirect('back'); // redirects user back to the previous page
            }
};

middlewareObj.isLoggedIn = function(req, res, next) {
        
            if (req.isAuthenticated()) { // checks if user is logged in
                return next(); // and if yes moves out to the next thing ('route', isLoggedIn, function() -> is next in this context)
            }
            req.flash('error', 'You need to be logged in to do that'); // this must be stated before redirect to work
            res.redirect('/login');
};

module.exports = middlewareObj;
