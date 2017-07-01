var methodOverride  = require('method-override'), 
    LocalStrategy   = require('passport-local'),    // Auth
    Campground      = require('./models/campground'),
    bodyParser      = require('body-parser'),
    passport        = require('passport'),          // Auth
    mongoose        = require('mongoose'),
    geocoder        = require('geocoder'),
    express         = require('express'),
    Comment         = require('./models/comment'),
    seedDb          = require('./seeds'),
    flash           = require('connect-flash'),
    User            = require('./models/user'),
    app             = express();

    // configure dotenv
    require('dotenv').load();
    
    // routes
var campgroundsRoutes = require('./routes/campgrounds'),
    commentRoutes     = require('./routes/comments'),
    authRoutes        = require('./routes/auth');

// express-session Auth config 
app.use(require('express-session')({
    secret: 'Yelpcamp secret code',
    resave: false,
    saveUninitialized: false
}));

mongoose.Promise = global.Promise;
var url = process.env.DATABASEURL || 'mongodb://localhost/yelp-camp-database';
mongoose.connect(url);  
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.locals.moment = require('moment'); // moment is available for use in all of your view files via the variable named moment

// Passport.js config

app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// light read about password http://toon.io/understanding-passportjs-authentication-flow/

app.use(function(req, res, next){   
    res.locals.currentUser = req.user;  // callbacking this func on all routes
    res.locals.error       = req.flash('error');
    res.locals.success     = req.flash('success');
    res.locals.warning     = req.flash('warning');
    next();
});

// seedDb(); // seed the database with info

app.use('/', authRoutes);
app.use('/index', campgroundsRoutes); // '/index' takes all campground routes and inserts /index before them
app.use('/index/:id/comments', commentRoutes);



app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Your server has started');
});
