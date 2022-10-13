const asyncHandler = require('express-async-handler')

// @desc   Get goals.
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get goals' })
})

// @desc   Create / Set goals.
// @route POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
    // console.log(req.body);
    if(!req.body.text){
        // res.status(400).json({ message: 'Please add a field text' }) [use EXPRESS ERROR HANDLER]
        res.status(400);
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: 'Create goal' })
})

// @desc   Update goals.
// @route PUT /api/goals/:id
// @access Private
const updateGoals = asyncHandler(async (req, res) => {
    const {id} = req.params;
    res.status(200).json({ message: `Updated Goal for id ${id}` })
})

// @desc   Delete goals.
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Deleted Goal for id ${id}` })
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