const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

// @desc Register User 
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    //getting body data
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please add all Fields")
    }

    if(!email.includes("@")){
        res.status(400);
        throw new Error("Please enter a Valid Email Address")
    }

    // check if user exists
    const userExists = await User.findOne({ email })

    // throwing an error if the user already exists
    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }

    // PASSWORD HASHING
    const salt = await bcrypt.genSalt() // we generate a salt to generate password for hasing
    const hashedPassword = await bcrypt.hash(password, salt)

    // CREATING A USER
    const user = await User.create({
        name, 
        email, 
        password: hashedPassword
    })

    // CHECKING IF USER WAS CREATED
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email, 
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }

    // res.json({ message: "Register User" })
})

// @desc Login or Authenticate User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

    // Check for user using the email
    const user = await User.findOne({email})

    // comparing password in database with password from the user email
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error('Invalid Credentials')
    }

    // res.json({ message: "Login User" })
})

// @desc Get User Data
// @route GET /api/users/me
// @access Private 
// PROTECTED ROUTE
const getUserData = asyncHandler(async (req, res) => {
    // res.json({ message: 'User Data Display' })
    const { _id, name, email } = await User.findById(req.user.id) // we have access to this because we set it in the middleware

    res.status(200).json({
        id: _id, 
        name,
        email,
        message: "The above data contains user info"
    })
})

// GENERATE JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser, 
    getUserData,
    loginUser
}