// const express = require('express');
// const app = express();
// const port = 3000;

// // Middleware to read JSON from body
// app.use(express.json());

// const goalsRoute = require('./goals');
// app.use('goals', goalsRoute);

// const friendCapsuleRoute = require('./friendCapsule');
// app.use('/friendCapsule', friendCapsuleRoute);


// // Import and use the goalPlanner route
// const goalPlannerRoute = require('./goalPlanner');
// app.use('/goalPlanner', goalPlannerRoute);

// // app.get('/', (req, res) => {
// //   res.redirect('/goal-planner');
// // });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/capsules', require('./routes/capsules')); // email-based capsule routes
app.use('/friendCapsule', require('./routes/friendCapsule')); // friend-shared capsules
app.use('/goalPlanner', require('./routes/goalPlanner')); // AI planner mock

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});