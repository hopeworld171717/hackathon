// routes/capsuleRoutes.js

const express = require('express');
const router = express.Router();
const Capsule = require('../Backend/models/Capsule');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

// Email transport setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST /api/send-link
router.post('/send-link', async (req, res) => {
  const { email, letter, unlockTime } = req.body;
  const capsuleId = uuidv4();

  try {
    const capsule = new Capsule({ email, letter, unlockTime, capsuleId });
    await capsule.save();

    const hatchLink = `${process.env.FRONTEND_URL}/hatch.html?id=${capsuleId}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎉 Your HatchSpace Capsule is Ready!',
      html: `
        <div style="font-family: sans-serif;">
          <h2>Your HatchSpace egg is ready to crack!</h2>
          <p><a href="${hatchLink}">🐣 Click here to Hatch!</a></p>
          <p>If the button doesn't work, paste this link into your browser:</p>
          <p>${hatchLink}</p>
        </div>
      `
    });

    res.status(200).json({ message: 'Capsule saved & email sent', capsuleId });
  } catch (err) {
    console.error("SEND ERROR:", err);
    res.status(500).json({ error: 'Failed to create capsule' });
  }
});

// GET /api/get-letter?id=...
router.get('/get-letter', async (req, res) => {
  const { id } = req.query;

  try {
    const capsule = await Capsule.findOne({ capsuleId: id });
    if (!capsule) return res.status(404).json({ error: 'Capsule not found' });

    if (new Date() < capsule.unlockTime) {
      return res.status(403).json({
        error: 'Too early to open!',
        timeLeft: capsule.unlockTime
      });
    }

    res.status(200).json({ letter: capsule.letter });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching capsule' });
  }
});

module.exports = router;
