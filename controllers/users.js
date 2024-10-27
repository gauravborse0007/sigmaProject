const User = require("../models/user");

module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signup.ejs")  //done
}

module.exports.SignUp = async (req, res) => {//done
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser, (error) => {
            if (error) {
                return next(error);
            }
            req.flash("success", "Welcome to WanderLust");
            res.redirect("/listings");
        })
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs"); //done
}


module.exports.login = async (req, res) => {
    req.flash("success", "successfully login, Welcome back to WanderLust");
    res.redirect("/listings");
}

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are now Logged-Out!!!");
        res.redirect("/listings");
    })
}


