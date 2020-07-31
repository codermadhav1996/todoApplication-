const mongoose = require('mongoose');
const schema = mongoose.Schema;


let user_details = new schema({
    fullName : { type : String },
    email : { type : String , unique : true},
    password : { type : String }
})


module.exports = mongoose.model('user_details', user_details);