const mongoose = require('mongoose');

// connect to db
mongoose.connect(process.env.DATABASE).then(() => console.log('DB connected established'))
.catch(err => console.log('DB connection error: ', err));