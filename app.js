const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

mongoose.connect('mongodb://localhost/flickrdb');
let db = mongoose.connection;

db.once('open', function(){
    console.log('Connected to MongoDB');
})

db.on('error', function(err){
console.log(err)
});

let User = require('./models/user')

const app = express();

//Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
//parse application/json
app.use(bodyParser.json());

//set Public foler
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Express Message Middleware
app.use(require('connect-flash')());
app.use((req,res,next) => {
    res.locals.message = require('express-messages')(req,res);
    next();
});

// Express validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//route files
let indexRouter = require('./routes/index');
let userRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/', userRouter);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
