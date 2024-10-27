const Listing = require("../models/listing");

module.exports.index = async (req, res) => { 
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };


module.exports.renderNewForm = (req, res) => {
    req.flash("success","You suuccfully logged-in!");
    res.render("listings/new.ejs");
  };

module.exports.showListings = async (req, res) => {
    let { id } = req.params;
      const listing = await Listing.findById(id)
      .populate({
        path:"reviews", //har ek review keliye uska ek author bhi aa jaye uske liye 
        populate:{  //nested populate use kiya hai 
          path:"author"  
        },
      })
      .populate("owner");
      res.render("listings/show.ejs", { listing });
      console.log(listing);
    };

module.exports.createNewListing= async(req, res,next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success","New listing Created!");
    res.redirect("/listings");
  };

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
      const listing = await Listing.findById(id);
      res.render("listings/edit.ejs", { listing });
    }

module.exports.updateLisitng = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
  }

module.exports.deleteLisitng = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing deleted");
    res.redirect("/listings");
  }