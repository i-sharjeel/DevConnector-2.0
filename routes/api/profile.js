const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile")
const User = require("../../models/User")
const { check, validationResult } = require("express-validator/check");

//@route        GET api/profile/me
//@desc         Get current users profile
//@access       private (need token)
router.get("/me", auth, async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ message: 'There is no profile for this user.' });
        }
        res.json(profile)
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }

});

//@route        POST api/profile
//@desc         Create or update a user profile
//@access       private (need token)

router.post('/', [auth, check('status', 'Status is required').not().isEmpty(), check('skills', 'Skills is required').not().isEmpty()], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { company, website, location, bio, status, githubUsername, skills, social } = req.body;

    // build user profile object

    const profileFields = {};

    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubUsername) profileFields.githubUsername = githubUsername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // social obj

    profileFields.social = {}

    if (social && Object.keys(social).length > 0) {
        profileFields.social = social;
    }

    try {
        let profile = await Profile.findOne({ user: req.user.id })

        // if exists
        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile)
        }
        // if not
        else {
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        }

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }

})

//@route        GET api/profile
//@desc         Get all profiles
//@access       Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//@route        GET api/profile/user/:user_id
//@desc         Get user by ID
//@access       Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            res.status(404).json({ message: "No profile found!" });
        }

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        if (error.kind == "ObjectId") {
            res.status(400).json({ message: "Profile not found!" });
        }
        res.status(500).send("server error");
    }
})

//@route        DELETE api/profile
//@desc         Delete profile, user & posts
//@access       Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todos - remove users posts also
        // remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // remove user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: "User deleted" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//@route        PUT api/profile/experience
//@desc         Add profile experience
//@access       Private
router.put('/experience', [auth, [
    check('title', 'title is required').not().isEmpty()
], [
        check('company', 'company is required').not().isEmpty()
    ], [
        check('from', 'From date is required').not().isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        const { title, company, location, from, to, current, description } = req.body;
        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExp);
            await profile.save();
            res.json(profile);

        } catch (error) {
            console.error(error.message)
            res.status(500).send("server error");
        }

    })

//@route        Delete api/profile/experience/:exp_id
//@desc         Delete profile experience
//@access       Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error");
    }

})

//@route        PUT api/profile/education
//@desc         Add profile education
//@access       Private
router.put('/education', [auth, [
    check('school', 'school is required').not().isEmpty()
], [
        check('degree', 'degree is required').not().isEmpty()
    ], [
        check('from', 'From date is required').not().isEmpty()
    ], [
        check('fieldOfStudy', 'fieldOfStudy is required').not().isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        const { school, degree, fieldOfStudy, from, to, description } = req.body;
        const newEdu = {
            school,
            degree,
            fieldOfStudy,
            from,
            to,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.education.unshift(newEdu);
            await profile.save();
            res.json(profile);

        } catch (error) {
            console.error(error.message)
            res.status(500).send("server error");
        }

    })

//@route        Delete api/profile/experience/:edu_id
//@desc         Delete profile experience
//@access       Private

router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error");
    }

})

module.exports = router;
