const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// middlewares
app.use(cors());
app.use(bodyParser());

const auth = require('./routes/authRoute');
app.use('/announcement', auth);

app.listen(4000, () => {
    console.log('Running on port 4000');
})