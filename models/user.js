let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    }
});

let User = module.exports = mongoose.model('User', userSchema);