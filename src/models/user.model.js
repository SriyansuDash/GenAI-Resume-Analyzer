import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username required"],
        unique: [true, "username should be a unique value"]
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: [true, "email should be a unique value"]
    },
    password: {
        type: String,
        required: [true, "password required"]
    }
},
    {
        timestamps: true
    }
);

const userModel = mongoose.model('user', userSchema);

export default userModel