const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require("dotenv").config();


const baseURL = 'http://localhost:3000/download/'

async function register(req, res) {
    const { name, email, password } = req.body;
    const avatar = req.file ? req.file.filename : null;
    try {
        const existUser = await User.findOne({ email });
        if (existUser) return res.status(400).json({ msg: "Email already used" });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email, password: hashPassword, avatar });
        await newUser.save();

        console.log(newUser, "newUser");

        const avatarUrl = avatar ? `${baseURL}${avatar}` : "";

        res.status(200).json({
            msg: "Register successfully",
            success: true,
            user: {
                name: newUser.name,
                email: newUser.email,
                avatar: avatarUrl,
            },
        });
    } catch (error) {
        console.error("createUser error", error);
        res.status(500).json({ msg: "Server error" });
    }
}


async function login(req, res) {
    const { email, password } = req.body;
    try {
        const loggedUser = await User.findOne({ email })
        if (!loggedUser) return res.status(200).json({ message: "User not found" })

        const isMatch = await bcrypt.compare(password, loggedUser.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid Password" })

        const token = jwt.sign({ _id: loggedUser._id, role: loggedUser.role }, process.env.SECREATE_KEY, { expiresIn: '1d' })



        res.status(202).json({
            success: true,
            msg: "Login Successfull",
            token: token,
            name: loggedUser.name,
            user_id: loggedUser._id,
            role: loggedUser.role,
            avatar: loggedUser.avatar ? `${baseURL}${loggedUser.avatar}` : ''
        });
    } catch (error) {
        console.error('createUser error', error);
        res.status(500).json({ message: "Server error" });
    }
}

async function getUserInfo(req, res) {
    console.log(req.user, "req user")
    const Userid = req.user._id
    try {
        const userInfo = await User.findOne({ _id: Userid })

        const updateUser = {
            _id: userInfo._id,
            name: userInfo.userName,
            email: userInfo.email,
            role: userInfo.role,
            avatar: userInfo.avatar ? `${baseURL}${userInfo.avatar}` : ''
        }
        console.log(userInfo, "userInfo")
        res.status(200).json({ userInfo: updateUser, success: true })
    } catch (error) {
        console.error("createUser error", error);
        res.status(500).json({ message: "Server error" });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find()
        users.forEach(user => {
            if (user.avatar) {
                user.avatar = `http://localhost:3000/download/${user.avatar}`;
            }
        });
        res.status(200).json({ users: users, success: true })
    } catch (error) {
        console.error("getting task error", error);
        res.status(500).json({ message: "Server error" });
    }
}


module.exports = {
    register,
    login,
    getUserInfo,
    getAllUsers
}