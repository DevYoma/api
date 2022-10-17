const express = require('express')
const router = express.Router();
const { registerUser, getUserData, loginUser } = require('../controllers/userController')

// making a protected route
const { protect } = require('../middleware/authMiddleware');

// POST REQUEST TO ADD A USER
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect,  getUserData)

module.exports = router;