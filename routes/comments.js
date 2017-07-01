var express     = require('express'),
    Campground  = require('../models/campground'),
    Comment     = require('../models/comment'),
    middleware  = require('../middleware'),
    router = express.Router({mergeParams: true}); // merging params from campgrounds and comments
    
// ----------------------------------------------
    
// comments new

router.get('/new', middleware.isLoggedIn,  function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
    
});

// comments create

router.post('/', middleware.isLoggedIn, function(req, res ){
        // lookup campground using ID
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                console.log(err);
                req.flash('error', 'Something went wrong');
                res.redirect('/index');
            } else {
                // create new comment
                Comment.create(req.body.comment, function(err, comment){
                    if (err) {
                        console.log(err);
                        req.flash('error', 'Something went wrong');
                        res.redirect('/index');
                    } else {
                        // add username and id to a comment
                        comment.author.id       = req.user._id;
                        comment.author.username = req.user.username;
                        // save comment
                        comment.save();
                        // connect new comment to campground
                        campground.comments.push(comment);
                        campground.save();
                        console.log(comment);
                        // redirect to show page
                        req.flash('success', 'Comment successfuly created!');
                        res.redirect('/index/' + campground._id);
                    }
                });
            }
        });
});

// Comments edit route

router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// Comments update route

router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'Comment successfuly updated');
            res.redirect('/index/' + req.params.id);
        }
    });
});

// Comments delete route

router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, req.body.comment, function(err){
        if(err) {
            console.log(err);
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('warning', 'Comment successfuly deleted');
            res.redirect('/index/' + req.params.id);
        }
    });
});


module.exports = router;