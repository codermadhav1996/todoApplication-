const mongoose = require('mongoose');
const schema = mongoose.Schema;

let todo_list =  new schema ({
    Taskname : { type : String },
    creation_Timestamp : { type : Date },
    edit_Timestamp : { type : Date },
    expiry : { type : Date },
    completionStatus :  { type : Boolean }, 
    createdBy : { type : String},
    userId : { type: schema.Types.ObjectId , ref : 'user_details'}
});


module.exports = mongoose.model('todo_data',  todo_list);