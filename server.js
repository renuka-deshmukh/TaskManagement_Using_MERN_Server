const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const projectRoute = require('./routes/projectRoute')
const taskRoute = require('./routes/taskRoute')
const connectDB = require('./config/db')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:3000",      
  "http://localhost:5174",                               // Local frontend
  "https://task-management-using-mern-admin.vercel.app",      // Admin panel
  "https://taskmanagementmemberpanel.vercel.app"              // User panel
];

app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

connectDB();

app.use('/user', userRoute);
app.use('/download', express.static(path.join('uploads')));
app.use('/project', projectRoute);
app.use('/task', taskRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
