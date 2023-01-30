const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

//@route        GET api/auth
//@desc         Test route
//@access       Public
router.get("/", auth, async (req, res) => {

    try {
        if (req.user && req.user.id) {
            const user = await User.findById(req.user.id).select("-password")
            res.json(user);
        }
        else {
            res.status(401).json({ message: "No user id found" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('server error');
    }
});

module.exports = router;
