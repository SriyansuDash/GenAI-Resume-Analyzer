import mongoose from 'mongoose';
import dns from 'dns'
import config from '../config/config.js'
dns.setServers([
    '8.8.8.8',
    '1.1.1.1'
]);

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(config.MONGO_URI);
        console.log("Database Connected");

    }
    catch (error) {
        console.error(error);
        process.exit(1)
    }
}

export default connectDB