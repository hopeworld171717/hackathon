const express = require('express');
const router = express.Router();

// Dummy goal plans (mock AI)
const samplePlans = {
  fitness: [
    "Week 1: Walk 20 minutes every day",
    "Week 2: Jog 3 times a week",
    "Week 3: Go to the gym or do strength training",
  ],
  learning: [
    "Week 1: Choose a topic and read articles",
    "Week 2: Watch 2 tutorials",
    "Week 3: Build a mini project",
  ],
};

// Route: POST /goal-planner
router.post('/', (req, res) => {
  const { type } = req.body;

  if (!samplePlans[type]) {
    return res.status(400).json({ error: 'Invalid goal type' });
  }

  const timeline = samplePlans[type];
  const checklist = timeline.map((step) => ({ step, done: false }));

  res.json({ type, timeline, checklist });
});

module.exports = router;

