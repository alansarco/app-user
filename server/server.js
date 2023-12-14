const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path = require('path');

// middlewares
app.use(cors());
app.use(express.json()); // Use built-in express.json() middleware
app.use(express.urlencoded({ extended: true })); // Use built-in express.urlencoded() middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/styles')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
const auth = require('./routes/authRoute');
const user = require('./routes/userRoute');
app.use('/', auth);
app.use('/', user);

// prevents going back to a protected page
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});
