const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./dbConfig/dbConfig');
const sequelizeUser = require('./dbConfig/userConfig');
const path = require('path');
const cors = require('cors');
const booksRouter = require('./routes/booksRoutes')
const methodOverride = require('method-override')
const passport = require('passport')
const Users = require('./model/userAuth')
const session = require('express-session')
const passportConfig = require('./passport-config')
const flash = require('express-flash')
const multer = require('multer')

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


app.set('view-engine', 'ejs');
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(express.static(path.join(__dirname, '../frontend/views')));
app.set('views', path.join(__dirname, '../frontend/views'));
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/frontend/views/script.js', (req, res) => {
    res.type('text/javascript');
    res.sendFile(path.join(__dirname, '../frontend/views/script.js'));
});


app.use('/api/books', booksRouter)

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs')
})
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('signup.ejs')
})

app.post('/signup', checkNotAuthenticated, async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await Users.create({ username, email, password });
        console.log(user)
        res.redirect('/login')
    } catch (error) {
        console.error('Error creating user:', error);
        res.redirect('/signup')
    }
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.delete('/logout', function (req, res, next) {
    //inbuilt passport fn to delete the data
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}


sequelizeUser.sync();
sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App is running on http://localhost:${process.env.PORT}`)
        })
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })
