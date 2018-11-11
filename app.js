const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
