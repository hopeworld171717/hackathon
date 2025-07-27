const express = require('express');
const router = express.Router();
const Capsule = require('../models/Capsule');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST /api/send-link - Create capsule and send hatch email
router.post('/send-link', async (req, res) => {
  const { email, letter, unlockTime } = req.body;
  const capsuleId = uuidv4();

  try {
    const capsule = new Capsule({ email, letter, unlockTime, capsuleId });
    await capsule.save();

    const hatchLink = `${process.env.FRONTEND_URL}/hatch.html?id=${capsuleId}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎉 Your HatchSpace Capsule is Ready!',
      html: `<p>Your HatchSpace egg is ready to crack!</p>
             <a href="${hatchLink}">🐣 Click here to Hatch!</a>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error('Email error:', err);
      else console.log('Email sent:', info.response);
    });

    res.status(200).json({ message: 'Capsule saved & email sent', capsuleId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create capsule' });
  }
});

// GET /api/get-letter?id=... - Fetch letter when user clicks hatch link
router.get('/get-letter', async (req, res) => {
  const { id } = req.query;

  try {
    const capsule = await Capsule.findOne({ capsuleId: id });
    if (!capsule) return res.status(404).json({ error: 'Capsule not found' });

    const now = new Date();
    if (now < capsule.unlockTime) {
      return res.status(403).json({
        error: 'Too early!',
        timeLeft: capsule.unlockTime
      });
    }

    res.status(200).json({ letter: capsule.letter });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching capsule' });
  }
});

module.exports = router;
