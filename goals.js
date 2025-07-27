const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { type } = req.body;

  const dummyPlan = {
    fitness: {
      timeline: '4 weeks',
      checklist: [
        'Week 1: Walk daily',
        'Week 2: Gym twice a week',
        'Week 3: Yoga',
        'Week 4: Reflection',
      ],
    },
    learning: {
      timeline: '4 weeks',
      checklist: [
        'Week 1: Pick a topic',
        'Week 2: Watch tutorials',
        'Week 3: Try exercises',
        'Week 4: Build something',
      ],
    },
  };

  if (!dummyPlan[type]) {
    return res.status(400).json({ error: 'Unknown goal type' });
  }

  res.json({ plan: dummyPlan[type] });
});

module.exports = router;
