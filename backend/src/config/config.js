import dotenv from 'dotenv'
dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error('MONGO_URI is not defined in the environment variables');
}
if(!process.env.JWT_SECRET){
    throw new Error('MONGO_URI is not defined in the environment variables');
}
if(!process.env.GOOGLE_API_KEY){
    throw new Error('GOOGLE_API_KEY is not defined in the enviroment variables');
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    GOOGLE_API_KEY : process.env.GOOGLE_API_KEY
};

export default config
