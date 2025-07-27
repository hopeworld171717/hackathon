const express = require('express');
const router = express.Router();
const Capsule = require('../Backend/models/Capsule');
const nodemailer = require('nodemailer');

// POST /capsules/send-link
router.post('/send-link', async (req, res) => {
  try {
    const { email, letter, unlockTime } = req.body;

    // 1. Save capsule to MongoDB
    const capsule = new Capsule({
      email,
      letter,
      unlockTime,
    });

    await capsule.save();

    // 2. Generate unique link
    const link = `http://localhost:3000/hatch.html?id=${capsule._id}`;

    // 3. Send email with link
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your App Password
      },
    });

    await transporter.sendMail({
      from: `"HatchSpace 🐣" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your HatchSpace Capsule is Ready! 💌',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Your time capsule has arrived!</h2>
          <p>Click below to hatch your message:</p>
          <a href="${link}" style="display:inline-block; margin-top:10px; padding:10px 20px; background:#222; color:white; text-decoration:none; border-radius:5px;">Open Capsule</a>
          <p>If the link doesn’t work, copy and paste this in your browser:</p>
          <p>${link}</p>
        </div>
      `,
    });

    // 4. Done
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error("🔥 SEND-LINK ERROR:", err);
    res.status(500).json({
      message: "Something went wrong while sending the email",
      error: err.message
    });
  }
});

module.exports = router;
