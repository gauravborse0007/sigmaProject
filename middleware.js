const Lisitng = require("./models/listing")
const Review = require("./models/review")
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");

// for each of the CRUD opertions we need to loggedin so we had created another file miidleware.js 
// and we had passed it all routes CRUD

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a New Listing!");
        return res.redirect("/login");
      }
      next();  
};



module.exports.validateListing = (req,res,next)=>{
  let {error} = listingSchema.validate(req.body);

  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  } else{
    next();
  }
};


module.exports.validateReview = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);

  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  } else{
    next();
  }
};


module.exports.isReviewAuthor = async(req,res,next)=>{
  let {id, reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","Sorry You are NOT permitted to delete this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}