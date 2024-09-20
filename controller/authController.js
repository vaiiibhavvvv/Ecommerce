// const { JsonWebTokenError } = require('jsonwebtoken');
 import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController =  async(req,res)  => {

    try {
        const {name,email,password,phone,address} = req.body
        //validations
        if(!name){
            return res.send({error: 'Name is requried'})
        }
        if(!email){
            return res.send({error: 'email is requried'})
        }if(!password){
            return res.send({error: 'password is requried'})
        }if(!phone){
            return res.send({error: 'phone is requried'})
        }
        if(!address){
            return res.send({error: 'address is requried'})
        }
        
        //check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message: 'Already registered please login',
            })

        }
        //register user
        const hashedPassword = await hashPassword(password)
        //save

        const user = await new userModel({
            name,email,phone,address,password:hashedPassword
        }).save();

        res.status(201).send({
            success:true,
            message: 'User register successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in registration',
            error
        })
    }

};

// POST LOGIN
 export const loginController = async (req,res) => {

    try {
        
        const {email,password} = req.body
        //validation
        if(!email||!password){
            return res.status(404).send({
                success:false,
                message: 'Invalid email or password'
            })
        }

    // check user
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).send({
            success:false,
            message: 'Email is not registered'
        })
    }
    const match = await comparePassword(password,user.password)
    if(!match){
        return res.status(200).send({
            success:false,
            message: 'Invalid password'
        });
    }
    //token
    const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET,{
        expiresIm: "7d"
    });


    res.status(200).send({
        success:true,
        message: "login successfully",
        user: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
        }

    });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error in login',
            error

        })
        
    }

}

//Test controller
export const testController = (req,res) =>{
    console.log("Protected Route");
};



export default {registerController};

