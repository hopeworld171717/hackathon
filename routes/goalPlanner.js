const express = require('express');
const router = express.Router();

router.post('/generate', (req, res) => {
  res.json({ message: 'Goal planner generated!' });
});

module.exports = router;
