const express = require("express");
const router = express.Router(); //jevha file require karaychi asel tevha aasel tevha "./fileLocation" use karata (inshort jithe moduleexport use karto tithe "./" use karaych)
const wrapAsync = require("../utils/wrapAsync.js"); //here we are using ".." bcoz we are going in parent directory
const {listingSchema, reviewSchema} = require("../schema.js");//if we want to import the funcion, then it is written inside the {}
const Listing = require("../models/listing.js");
const { isLoggedIn, validateListing} = require("../middleware.js");//isLoggedIn is a also a function

const listingController = require("../controllers/listings.js");



//Index Route
router.get( "/",  wrapAsync(listingController.index));
  
  //New Route
  router.get("/new", isLoggedIn,listingController.renderNewForm);
  
  //Show Route
  router.get(
    "/:id", 
    wrapAsync(listingController.showListings)
  );
  
  //Create Route
  router.post(
    "/", 
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createNewListing)
  );
  
  //Edit Route
  router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.editListing)
  );
  
  //Update Route
  router.put(
    "/:id", 
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.updateLisitng));
  
  //Delete Route
  router.delete("/:id", wrapAsync(listingController.deleteLisitng)
);

module.exports = router;