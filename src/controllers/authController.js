const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (user)=>{
    return jwt.sign(
        {id: user._id, role:user.role},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );
};


// This function is used to register a new user


exports.registerUser = async(req, res)=>{
    const {name, email , password, role} = req.body;

    try{
        let user = await User.findOne({email});

        if(user) return res.status(400).json({message: 'User already exists'});

        user = new User({
            name, email, password, role
        });
        await user.save();
    
        const token = generateToken(user);
    
        res.status(201).json({ user: { id: user._id, name, email, role }, token });

    }catch(err){
        res.status(500).json({message: err.message});
    }
};

// This function is used to login a user
exports.loginUser = async(req, res)=>{
    const {email, password} = req.body;

    try{

        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message: 'Invalid credentials'});

        const isMatch = await user.matchPassword(password);

        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

        const token = generateToken(user);

        res.status(200).json({ user: { id: user._id, name: user.name, email, role: user.role }, token });
        
    }catch(err){
        res.status(500).json({message: err.message});
    }
};
