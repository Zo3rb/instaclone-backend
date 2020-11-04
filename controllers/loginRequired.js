const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {

        if (!req.headers.authorization) {
            return res.status(401).json("You Must Be Logged In");
        }

        const token = req.headers.authorization.split('Bearer ')[1];
        const decodedToken = await jwt.verify(token, process.env.APP_SECRET);
        const user = await User.findById(decodedToken);
        req.user = user;
        next();

    } catch (error) {
        res.status(500).json('Internal Server Error or Required Data not Provided For This Endpoint');
    }
};
