const express = require('express');
const router = express.Router();
const Count = require('../models/count.model');

router.get('/', async (req, res) => {
  try {
    const counts = await Count.findOne();
    res.json(counts);
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/add', async (req, res) => {
  try {
    await Count.findOneAndUpdate({}, { $inc: { addCount: 1 } }, { upsert: true });
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating add count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/update', async (req, res) => {
  try {
    await Count.findOneAndUpdate({}, { $inc: { updateCount: 1 } }, { upsert: true });
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating update count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
