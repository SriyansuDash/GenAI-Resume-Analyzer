import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const register = async (req ,res) =>{
    try{

        const {username , email , password} = req.body;
    
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
            message : "Unable to register user" 
        });
    }
}

export const login = async (req , res)=>{
    const {email , password} = req.body

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            message : "Unauthorized ! Email not found"
        });
    }

    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid){
        return res.status(403).json({
            message : "Invalid password"
        });
    }

    const token = jwt.sign({
        id:user._id , username : user.username
    }, config.JWT_SECRET,{
        expiresIn:'1d'
    });

    res.cookie("token" , token);
    res.status(200).json({
        message:"User fetched Successfully",
        user:{
            username : user.username,
            email : user.email
        }
    });
}
