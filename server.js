const express = require('express');
const mongoose = require('mongoose');
// const Report = require('./models/report');
const cors = require('cors');
require('dotenv').config();
require('./db/connectDB');
//express app
const app = express();

const checkRoutes = require('./routes/checks');


// email routes
const authRoutes = require('./routes/auth');
app.use(express.json());
app.use(cors())
//middelwares
app.use('/api', authRoutes);
app.use('/api/checks', checkRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
