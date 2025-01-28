const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const crypto = require('crypto');

const handleSignup = async(req, res)=>{
    const {name, email, password} = req.body;

    try {
        if(!name||!email||!password){
            return res.status(400).json({error:"All fields are mandatory!"});
        }

        const hashedPassword = crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });

        return res.status(201).json({message:"User created successfully!", user:user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error!"});
    }
};

const handleLogin = async(req, res)=>{
    const {email, password} = req.body;

    try {
        if(!email||!password){
            return res.status(400).json({error:"All fields are mandatory!"});
        }

        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({error:"User not found!"});
        }

        const hashedPassword = crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
        if(user.password!==hashedPassword){
            return res.status(401).json({error:"Wrong Password!"});
        }
        const payload = {
            _id:user._id,
            name:user.name,
            email:email,
            role:user.role
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"1d"});

        return res.status(200).json({message:"User logged in successfully!", token:token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error!"});
    }
};

module.exports = {
    handleLogin,
    handleSignup
}