const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

// middlewares
app.use(cors());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/styles')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// routes
const auth = require('./routes/authRoute');
const user = require('./routes/userRoute');
app.use('/', auth);
app.use('/', user);

// prevents going back a protected page
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

app.listen(4000, () => {
    console.log('Running on port 4000');
})