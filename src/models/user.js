const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Provide your name"]
    },
    email:{
        type: String,
        required: [true, "Please Provide your email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please Provide your password"],
        minlength: 6,
    },
    role:{
        type: String,
        enum: ['jobseeker', 'manager', 'recruiter'],
        default: 'jobseeker'
    },
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);