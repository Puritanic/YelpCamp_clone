var express     = require('express'),
    User        = require('../models/user'),
    Campground  = require('../models/campground'),
    passport    = require('passport'),
    router      = express.Router();

//-----------------------------------------

// Show SignUp form
router.get('/register', function(req, res){
   res.render('register', {page: 'register'}); 
});

// Handle SignUp process

router.post('/register', function(req, res){
    
    var newUser = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            avatar: req.body.avatar
        });
        
    // eval(require('locus'));
    if(req.body.isAdmin === 'PuritanicMisantr0py') {
        newUser.isAdmin = true;
    }
    User.register(newUser , req.body.password, function(err, user){
       if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
       passport.authenticate('local')(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + user.username);
           res.redirect('/index');
       });
   });
});

router.get('/', function(req, res) {
    res.render('landing');
});


// Show LogIn form

router.get('/login', function(req, res){
    res.render('login', {page: 'login'});
});

// handling login process logic

router.post('/login', passport.authenticate('local', ({
    successRedirect: '/index',
    failureRedirect: '/login'
})), function(req, res){
   
});

// logout logic route

router.get('/logout', function(req, res){
   req.logout();    // built in method to logout by installed libs
   req.flash('warning', 'Logged you out!');
   res.redirect('/index');  
});

// User profile route

router.get('/users/:id', function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash('error', 'Something went wrong');
            res.redirect('/');
        }
        // find the campgrounds that user created 
        Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds){
            if(err){
            req.flash('error', 'Something went wrong');
            res.redirect('/');
            }
            res.render('users/show', {user: foundUser, campgrounds: campgrounds});
        });
    });
});


module.exports = router;