// index.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const port = 4000;
const bodyParser = require('body-parser');
const path=require('path')
const session=require('express-session')
const passport=require('passport')
const FacebookStrategy=require('passport-facebook').Strategy;
const authRoutes = require('./routes/sellerAuthRoutes');
const carRoutes = require('./routes/sellerCarRoutes');

const fbRoutes = require('./routes/RegisterFacebook'); // Adjust the path to your authRoutes
const googleRoutes = require('./routes/RegisterGoogle'); // Adjust the path to your authRoutes
const mechanicRoutes = require('./routes/mechanicRoutes');
const mechanicauthRoutes = require('./routes/mechanicAuthRoute');
// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_DB_URL}`);

// Middlewares
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173'
];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization', 
    credentials: true 
}));

app.use(session({
    secret:process.env.client_id,
    resave :false,
    saveUninitialized: true,
    cookie : {
        maxAge:(1000 * 60 * 100)
    } 
    
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from the uploads folder

// Routes
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));

app.use('/api/seller', authRoutes);
app.use('/api/seller', carRoutes);

app.use('/api/mechanic', mechanicauthRoutes);

app.use('/api/mechanic', mechanicRoutes);

//login with google and fb
// Use authentication routes
app.use('/', fbRoutes);
app.use('/auth', googleRoutes);

// API's
app.get('/', (req, res) => {
    res.json({
          success: true,
          message: "Welcome to the API"
      })
})

// Start the server
app.listen(port, (error) => {
    if (error) {
        console.log('Something went wrong');
    }
    console.log(`Server running on port ${port}`);
});