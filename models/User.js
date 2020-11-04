const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dqyayf3rf/image/upload/v1604224355/312-3120300_default-profile-hd-png-download_cvbbrd.png'
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});

UserSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 8);
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.log(`Error Ocurred: ${error.message}`);
    }
});

UserSchema.statics.findByCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Unable to Authenticated");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Unable to Authenticated");
        }
        return user;
    } catch (error) {
        console.log(`Error Ocurred: ${error.message}`);
    }
};

UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
