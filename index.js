const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
const app = express();

const AuthRoute = require('./app/routes/authRoute');
const ImageToVideoRoute = require('./app/routes/imageToVideoRoute');

const connectDB = require('./config/db');

connectDB();


app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/upload', express.static('upload'));


app.use('/api/v1/auth/', AuthRoute);
app.use('/api/v1/file/', ImageToVideoRoute);



const port = process.env.PORT || 3005;



/// server running
app.listen(port, () => {
    console.log(`connected on port ${port}`);
})




