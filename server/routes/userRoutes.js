const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
const authMiddleware = require("../middlewares/authMiddleware");

// Register a User
router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({email: req.body.email});
        
        if (userExists) {
            return res.status(400).json({success: false, message: "User Already Exists"});
        }

        const newUser = new User(req.body);
        await newUser.save();

         res.status(200).json({success: true, message: "Registration Successful"})
    } catch(err) {
        res.status(500).json({success: false, message: err.message });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist. Please, register."
            });
        }


        console.log(res.message);

        // Simply Password Validation
        if(req.body.password !== user.password) {
            return res.status(400).json({success: false, message: "Sorry, Invalide creditentials. Please, try again"});
        }

        // JWT Cofigration
        const token = jwt.sign({ userID: user._id }, process.env.jwt_secret, { expiresIn: "1d" });
        
        // Messages and token in messsage
        res.status(200).json({success: true, message: "You've successfully logged in.", data: token});
        
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
});

router.get("/get-current-user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userID).select("-password");
        // console.log("current", req.params);
        res.send({
            success: true,
            message: "User details fetched successfully!",
            data: user,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }

});

module.exports = router;