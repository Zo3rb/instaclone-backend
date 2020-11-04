const User = require('../models/User');
const jwt = require('jsonwebtoken');

const regUser = async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const newUser = await User.create(req.body);
            const token = await jwt.sign(newUser.id, process.env.APP_SECRET);
            return res.json({
                message: 'Successfully Created',
                newUser,
                token
            });
        }
        res.json('This User is Already Registered');

    } catch (error) {
        res.status(500).json('Internal Server Error or Required Data not Provided For This Endpoint');
    }
};

const loginUser = async (req, res, next) => {
    try {

        const loggedUser = await User.findByCredentials(req.body.email, req.body.password);
        const token = await jwt.sign(loggedUser.id, process.env.APP_SECRET);
        return res.json({
            message: 'Successfully Logged In',
            loggedUser,
            token
        });

    } catch (error) {
        res.status(500).json('Internal Server Error or Required Data not Provided For This Endpoint');
    }
};


module.exports = {
    regUser,
    loginUser,
};
