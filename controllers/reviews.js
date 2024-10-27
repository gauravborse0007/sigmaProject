const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.newReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; //in "author" field (which is inside the review model), the new review is stored by it's id
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
    req.flash("success","Review added!");
    res.redirect(`/listings/${listing._id}`);
  }

module,exports.deleteReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); //pull operator removes from an array all insatances of a value that match condition 
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
  }