const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require("dotenv").config();

async function register(req, res){
    const {name, email, password} = req.body;
    try {
        const existUser = await User.findOne({email});
        if(existUser) return res.status(400).json({message: "Email already used"});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({name, email, password:hashPassword});
        await newUser.save();

        console.log(newUser, "newUser")
        res.status(200).json({message:"Register successfully"})

    } catch (error) {
        console.error('createUser error', error);
        res.status(500).json({message:"Server error"});
    }
}

async function login(req, res){
    const {email, password} = req.body;
    try {
        const loggedUser = await User.findOne({email})
        if(!loggedUser) return res.status(200).json({message:"User not found"})

        const isMatch = await bcrypt.compare(password, loggedUser.password)
        if(!isMatch) return res.status(200).json({message:"Invalid Password"})

        const token = jwt.sign({ _id: loggedUser._id, role: loggedUser.role }, process.env.SECREATE_KEY, { expiresIn: '1d'})    
         res.status(202).json({
            msg: "Login Successfull",
            token: token,
            success: true
        }); 

    } catch (error) {
        console.error('createUser error', error);
        res.status(500).json({message:"Server error"});
    }
}

async function getUserInfo(req, res) {
    console.log(req.user, "req user")
    const Userid = req.user._id
  try {
    const userInfo = await User.findOne({_id:Userid})
    console.log(userInfo,"userInfo")
    res.status(200).json({userInfo:userInfo})
  } catch (error) {
    console.error("createUser error", error);
    res.status(500).json({ message: "Server error" });
  }
}




module.exports = {
    register,
    login,
    getUserInfo
}