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

const PORT = process.env.PORT || 4000; // Use the environment port if available, or default to 4000
const IP = process.env.IP || 'localhost'; // Use the environment IP if available, or default to localhost

app.listen(PORT, IP, () => {
    console.log(`Running on http://${IP}:${PORT}`);
});

