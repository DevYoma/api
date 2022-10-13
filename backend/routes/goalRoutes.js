const express = require('express')
const router = express.Router();
const { getGoals, createGoal, deleteGoal, updateGoals } = require('../controllers/goalController')

// GET GOALS 
// router.get('/', getGoals)

// POST REQUEST(CREATE GOAL)
// router.post('/', createGoal)

// UPDATE
// router.put('/:id', updateGoals)

// DELETE   
// router.delete('/:id', deleteGoal)

// Chaining Verb methods (Combining line 6 & 9)
router.route('/').get(getGoals).post(createGoal)

// Combining line 12 and 15
router.route('/:id').put(updateGoals).delete(deleteGoal)


module.exports = router