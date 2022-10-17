const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel')

// @desc   Get goals.
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {

    // DB OPERATIONS
    const goals = await Goal.find({
        user: req.user.id //
    }); // getting goals in the database of a user, omo 🤕
    res.status(200).json(goals);
})

// @desc   Create / Set goals.
// @route POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field');
    }

    // DB OPERATIONS
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id // it's the user that's adding the goals
    })

    res.status(200).json(goal)
})

// @desc   Update goals.
// @route PUT /api/goals/:id
// @access Private
const updateGoals = asyncHandler(async (req, res) => {
    const {id} = req.params;

    // DB OPERATIONS
    const goal = await Goal.findById(id);

    if(!goal){
        res.status(400);
        throw new Error('Goal not found')
    }

    // getting the user
    const user = await User.findById(req.user.id)

    // check for user
    if(!user){
        res.status(401);
        throw new Error('User not found')
    }

    // checking if the loggedIn users id is not the same as the goals iser id
    if(goal.user.toString()  !== user.id){
        res.status(401);
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, {
        new: true
    })

    res.status(200).json(updatedGoal)
})

// @desc   Delete goals.
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // DB OPERATIONS
    const goal = await Goal.findById(id)

    if(!goal){
        res.status(400);
        throw new Error('Goal not found')
    }

     // getting the user
     const user = await User.findById(req.user.id)

     // check for user
     if(!user){
         res.status(401);
         throw new Error('User not found')
        }
 
     // checking if the loggedIn users id is not the same as the goals iser id
     if(goal.user.toString()  !== user.id){
         res.status(401);
         throw new Error('User not authorized')
     }

    await goal.remove();
    res.status(200).json({ id: id })
})

// @desc   Get goals.
// @route GET /api/goals
// @access Private
// const fetchSingleGaol = (req, res) => {
//     const { id } = req.params;
//     const foundUser = 
//     res.status(200).json({ message: 'Get goals' })
// }


module.exports = {
    getGoals,
    createGoal,
    deleteGoal,
    updateGoals
}