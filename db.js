const mongoose = require('mongoose');

const DATABASE_URI = process.env.DATABASE_URI;
const DATABASE_CONNECTION_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};
const CONNECTION_ACK = () => console.log('Database Connected Successfully');

const connect = async () => {
    try {
        await mongoose.connect(DATABASE_URI, DATABASE_CONNECTION_OPTIONS);
        CONNECTION_ACK();
    } catch (error) {
        console.log(`Error Ocurred: ${error.message}`);
        process.exit();
    }
};

module.exports = connect;
