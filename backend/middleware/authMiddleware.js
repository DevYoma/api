const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // checking for the authorization token and making sure it's a bearer token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // get token from Bearer Header 
            // BEARER TOKEN FORM => bearer token
            token = req.headers.authorization.split(' ')[1] // gives 'bearer'

            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token(CUZ TOKEN HAS THE USER ID AS A PAYLOAD) && we also want to assign it to req.user
            req.user = await User.findById(decoded.id).select('-password')

            next(); // calling the next piece of middleware
        } catch (error) {
            console.log(error)
            res.status(401) // unauthorized
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token')
    }
})

module.exports = {
    protect
}