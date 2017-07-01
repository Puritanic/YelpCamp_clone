<<<<<<< HEAD
#YelpCamp

##Initial Setup
=======
### YelpCamp Clone
https://yelp-camp-fin.herokuapp.com/

## Initial Setup
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
   * Name
   * Image

<<<<<<< HEAD
##Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

##Creating New Campgrounds
=======
## Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

## Creating New Campgrounds
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

<<<<<<< HEAD
##Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

##Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

##Add Mongoose
=======
## Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

## Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

## Add Mongoose
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

<<<<<<< HEAD
##Show Page
=======
## Show Page
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

<<<<<<< HEAD
##Refactor Mongoose Code
=======
## Refactor Mongoose Code
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
* Create a models directory
* Use module.exports
* Require everything correctly!

<<<<<<< HEAD
##Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

##Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

##Comment New/Create
=======
## Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

## Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

## Comment New/Create
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

<<<<<<< HEAD
##Style Show Page
* Add sidebar to show page
* Display comments nicely

##Finish Styling Show Page
* Add public directory
* Add custom stylesheet

##Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model 

##Auth Pt. 2 - Register
=======
## Style Show Page
* Add sidebar to show page
* Display comments nicely

## Finish Styling Show Page
* Add public directory
* Add custom stylesheet

## Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model 

## Auth Pt. 2 - Register
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
* Configure Passport
* Add register routes
* Add register template

<<<<<<< HEAD
##Auth Pt. 3 - Login
* Add login routes
* Add login template

##Auth Pt. 4 - Logout/Navbar
=======
## Auth Pt. 3 - Login
* Add login routes
* Add login template

## Auth Pt. 4 - Logout/Navbar
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

<<<<<<< HEAD
##Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar 

##Refactor The Routes
* Use Express router to reoragnize all routes

##Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

##Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Editing Campgrounds
=======
## Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar 

## Refactor The Routes
* Use Express router to reoragnize all routes

## Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

## Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

## Editing Campgrounds
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route

<<<<<<< HEAD
#Deleting Campgrounds
* Add Destroy Route
* Add Delete button

#Authorization Part 1: Campgrounds
=======
## Deleting Campgrounds
* Add Destroy Route
* Add Delete button

## Authorization Part 1: Campgrounds
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

<<<<<<< HEAD
#Editing Comments
=======
## Editing Comments
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
* Add Edit route for comments
* Add Edit button
* Add Update route

<!--/campgrounds/:id/edit-->
<!--/campgrounds/:id/comments/:comment_id/edit-->

<<<<<<< HEAD
#Deleting Comments
* Add Destroy route
* Add Delete button

#Authorization Part 2: Comments
=======
## Deleting Comments
* Add Destroy route
* Add Delete button

## Authorization Part 2: Comments
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

<<<<<<< HEAD
#Adding in Flash!
=======
## Adding in Flash!
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header

<<<<<<< HEAD

RESTFUL ROUTES

name      url      verb    desc.
===============================================
INDEX   /dogs      GET   Display a list of all dogs
NEW     /dogs/new  GET   Displays form to make a new dog
CREATE  /dogs      POST  Add new dog to DB
SHOW    /dogs/:id  GET   Shows info about one dog

INDEX   /campgrounds
NEW     /campgrounds/new
CREATE  /campgrounds
SHOW    /campgrounds/:id

NEW     campgrounds/:id/comments/new    GET
CREATE  campgrounds/:id/comments      POST
=======
>>>>>>> 87a9c339e1faea75494a45ac0c60412f6aca3b61
