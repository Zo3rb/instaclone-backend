const User = require('../models/User');
const Post = require('../models/Post');

// Fetching User With its ID
const getUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json('Not Found');
        };
        const userPosts = await Post.find({ author: user._id }).populate();
        res.json({
            message: "Successfully Found The User",
            user,
            userPosts
        });

    } catch (error) {
        res.status(500).json(error.message);
    }
};

const followUser = async (req, res, next) => {
    try {

        await User.findByIdAndUpdate(req.body.followerId, { $addToSet: { followers: req.user._id } }, {
            new: true
        });
        await User.findByIdAndUpdate(req.user._id, { $addToSet: { following: req.body.followerId } }, {
            new: true
        });
        res.json('Followed Successfully');

    } catch (error) {
        res.status(500).json('Error: ', error.message);
    }
};

const unfollowUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.followerId, { $pull: { followers: req.user._id } }, { new: true });
        await User.findByIdAndUpdate(req.user._id, { $pull: { following: req.body.followerId } }, { new: true });
        res.json('Un Followed Successfully');
    } catch (error) {
        res.status(500).json('Error: ', error.message);
    }
};

const changeProfileImg = async (req, res, next) => {
    try {

        await User.findByIdAndUpdate(req.user._id, { image: req.body.newImg }, { new: true });
        if (req.body.newImg === '' || !req.body.newImg) {
            return res.json("The New Image is Not Valid or Didn't Provide at All");
        }
        res.json("Successfully Changed the Profile Img");

    } catch (error) {
        res.status(500).json('Error: ', error.message);
    }
};

module.exports = {
    getUser,
    followUser,
    unfollowUser,
    changeProfileImg
};
