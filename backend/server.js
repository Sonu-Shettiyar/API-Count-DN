const cors = require('cors');
const express = require('express');
const connectDB = require('./helper/db.js');
const dataRoutes = require('./routes/data.routes');
const countRoutes = require('./routes/count.route');
const { logStartTime } = require('./middleware/logStartTime.middleware.js')
const { logEndTime } = require('./middleware/logEndTime.middleware.js');

require('dotenv').config()
const app = express();

//using cors
app.use(cors());
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/data', logStartTime, dataRoutes, logEndTime);
app.use('/api/count', countRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
