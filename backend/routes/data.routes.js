// Import necessary modules
const express = require('express');
const router = express.Router();
const Todo = require('../models/data.model');

//For Reading Todo
router.get('/', async (req, res, next) => {
    try {
        const startTime = Date.now();

        const data = await Todo.find({});

        const endTime = Date.now();

        const executionTime = endTime - startTime;


        res.status(200).json({ data, executionTime });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
});

//For Adding Todo
router.post('/', async (req, res, next) => {
    try {
        const startTime = Date.now();
        const { todo, description } = req.body;
        const newData = new Todo({ todo, description });
        await newData.save();
        const endTime = Date.now();
        const executionTime = endTime - startTime;

        res.status(200).json({ newData, executionTime });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
});

// For Updating Todo
router.put('/:id', async (req, res, next) => {
    try {
        const startTime = Date.now();
        const { todo, description } = req.body;

        const updatedData = await Todo.findByIdAndUpdate(req.params.id, { todo, description }, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        const endTime = Date.now();
        const executionTime = endTime - startTime;


        res.status(200).json({ updatedData, executionTime });
    } catch (error) {

        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
});


router.delete('/:id', async (req, res) => {

    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'deleted successfully' })
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router;
