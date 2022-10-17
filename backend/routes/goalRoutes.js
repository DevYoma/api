const express = require('express')
const router = express.Router();
const { getGoals, createGoal, deleteGoal, updateGoals } = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware')

// GET GOALS 
// router.get('/', getGoals)

// POST REQUEST(CREATE GOAL)
// router.post('/', createGoal)

// UPDATE
// router.put('/:id', updateGoals)

// DELETE   
// router.delete('/:id', deleteGoal)

// Chaining Verb methods (Combining line 6 & 9)
// for protected routes add prote
router.route('/').get(protect, getGoals).post(protect, createGoal) 

// Combining line 12 and 15
router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoal)


module.exports = router