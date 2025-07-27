// const express = require('express');
// const router = express.Router();

// // Simulated DB
// let capsules = [];

// router.post('/create', (req, res) => {
//   const { title, message, unlockDate, friendEmails } = req.body;

//   if (!title || !message || !unlockDate || !friendEmails) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   const capsule = {
//     id: capsules.length + 1,
//     title,
//     message,
//     unlockDate,
//     sharedWith: friendEmails,
//     type: 'friend',
//   };

//   capsules.push(capsule);
//   res.status(201).json({ success: true, capsule });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Capsule = require('../Backend/models/Capsule');

router.post('/', async (req, res) => {
  const { title, message, unlockDate, friendEmails } = req.body;

  if (!title || !message || !unlockDate || !friendEmails) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const capsule = await Capsule.create({
      title,
      message,
      unlockDate,
      sharedWith: friendEmails,
      type: 'friend',
    });

    res.status(201).json({ success: true, capsule });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create capsule' });
  }
});

module.exports = router;
