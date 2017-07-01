var express     = require('express'),
    User        = require('../models/user'),
    Campground  = require('../models/campground'),
    nodemailer  = require('nodemailer'),
    passport    = require('passport'),
    async       = require('async'),
    crypto      = require('crypto'), // is a part of a node, so we just require it
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

// forgot password route

router.get('/forgot', function(req, res) {
  res.render('forgot');
});

router.post('/forgot', function(req, res, next) {
  async.waterfall([ // array of functions that are called one after another(PS: lookup https://caolan.github.io/async/)
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token); // this token will be sent to url, and users click on it to reset password
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) { // look for email that user has provided
          if (err) { // watch
              console.log(err);
          }
        if (!user) { // if no user, it will flash error message and reload page
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token; 
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {  // https://www.npmjs.com/package/dotenv
          user: 'morkdarkness@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'morkdarkness@gmail.com',
        subject: 'YelpCamp Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (err) { // watch
          console.log(err);
      }
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {token: req.params.token});
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (err) { // watch
          console.log(err);
            }
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
              if (err) {
                    console.log(err);
                }
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
                if (err) {
                console.log(err);
            }
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          });
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'morkdarkness@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'morkdarkness@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
      if (err) {
          console.log(err);
      }
    res.redirect('/index');
  });
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