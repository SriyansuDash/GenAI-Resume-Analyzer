import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


export const register = async (req ,res) =>{
    try{

        const [username , email , password] = req.body;
    
        const existingUser = await userModel.findOne({
            $or:[{username} , {email}]
        });
    
        if(existingUser){
            return res.status(201).json({
                message : "User Exist with this credential"
            });
        }
        
        const hash = await bcrypt.hash(password,10);
    
        const user = await userModel.create({
            username , email , password : hash
        });
        
        const token = jwt.sign({
            id : user._id,
            username : user.username
        }, config.JWT_SECRET,{
            expiresIn:"1d"
        });
    
        res.cookie("token",token);
        
        res.status(201).json({
            message:"User created",
            user:{
                username : user.username,
                email : user.email
            }
        });
    }catch(error){
        res.status(401).json({
            error,
            message : "Unable to register user" 
        });
    }
}

