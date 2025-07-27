const express = require('express');
const app = express();
const port = 3000;

// Middleware to read JSON from body
app.use(express.json());

const goalsRoute = require('./goals');
app.use('goals', goalsRoute);

const friendCapsuleRoute = require('./friendCapsule');
app.use('/friendCapsule', friendCapsuleRoute);


// Import and use the goalPlanner route
const goalPlannerRoute = require('./goalPlanner');
app.use('/goalPlanner', goalPlannerRoute);

// app.get('/', (req, res) => {
//   res.redirect('/goal-planner');
// });

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
