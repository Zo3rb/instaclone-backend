const Post = require('../models/Post');

const createPost = async (req, res, next) => {
    try {

        if (!req.body.title || !req.body.body || !req.body.photo) {
            return res.status(400).json('Please Make Sure You Added All Fields');
        }
        const newPost = await Post.create({ ...req.body, author: req.user });
        res.status(201).json({
            message: "Created Successfully",
            post: newPost
        });

    } catch (error) {
        res.status(500).json('Internal Server Error or Required Data not Provided For This Endpoint');
    };
};

const getAllPosts = async (req, res, next) => {
    try {

        const posts = await Post.find().populate('author', 'username _id createdAt').populate('comments.owner', 'username');
        res.json({
            message: "Successfully Fetched Posts",
            posts_fetched: posts.length,
            posts,
        });

    } catch (error) {
        res.status(500).json('Internal Server Error or Required Data not Provided For This Endpoint');
    };
};

const getCurrentUserPosts = async (req, res, next) => {
    try {

        const userPosts = await Post.find({ author: req.user._id }).populate('author');
        res.json({
            message: "Successfully Fetched Posts",
            posts_fetched: userPosts.length,
            posts: userPosts
        });

    } catch (error) {
        res.status(500).json('Internal Server Error or Required Data not Provided For This Endpoint');
    };
};

const getSubPosts = async (req, res, next) => {
    try {

        const subPosts = await Post.find({ author: { $in: req.user.following } }).populate('author', '_id username');
        res.json({ message: "Successfully Fetch", subPosts });

    } catch (error) {
        res.status(500).json('Internal Server Error or Required Data not Provided For This Endpoint');
    };
};

const likePost = async (req, res, next) => {
    try {

        const like = await Post.findByIdAndUpdate(req.body.postId, { $addToSet: { likes: req.user._id } }, { new: true });
        if (!like) {
            return res.status(422).json("Failed to Like The Post");
        }
        res.json({
            message: "Successfully Liked",
            like
        });

    } catch (error) {
        res.status(500).json('Internal Server Error or Required Data not Provided For This Endpoint');
    }
};

const unlikePost = async (req, res, next) => {
    try {

        const like = await Post.findByIdAndUpdate(req.body.postId, { $pull: { likes: req.user._id } }, { new: true });
        if (!like) {
            return res.status(422).json("Failed to Unlike The Post");
        }
        res.json({
            message: "Successfully Unliked",
            like
        });

    } catch (error) {
        res.status(500).json('Internal Server Error or Required Data not Provided For This Endpoint');
    }
};

const addComment = async (req, res, next) => {
    try {

        await Post.findByIdAndUpdate(req.body.postId, {
            $push: { comments: { comment: req.body.comment, owner: req.user } }
        }).populate('comments.owner', 'username');
        res.json('Successfully Added');

    } catch (error) {
        res.status(500).json('Internal Server Error or Required Data not Provided For This Endpoint');
    }
};

const deletePost = async (req, res, next) => {
    try {

        const post = await Post.findByIdAndDelete(req.params.postId).populate('author', '_id');
        if (!post || post.author._id.toString() !== req.user._id.toString()) {
            return res.status(400).json("You're not The Owner of This Post or Bad Request");
        }
        res.json('Deleted Successfully');

    } catch (error) {
        res.status(500).json('Internal Server Error or Required Data not Provided For This Endpoint');
    }
};


module.exports = {
    createPost,
    getAllPosts,
    getCurrentUserPosts,
    likePost,
    unlikePost,
    addComment,
    deletePost,
    getSubPosts
};
