const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const environment = require('./environment');


const app = express();
const todolist = require('./routers/router');


//enable cors
app.use(cors());

app.use(bodyParser.json())

//connection of Mongodb
mongoose.set('useCreateIndex', true)
mongoose.connect(environment.data.url, {useNewUrlParser: true, useUnifiedTopology: true}).
then(result =>{
    console.log('mongodb connection is succeded')
}).catch(Error =>{
    console.log('Error in Connection of mongodb')
})


app.use('/todo', todolist)


let port = environment.data.port  || process.env.PORT;
app.listen(port, () =>{
    console.log("Server is running on port number " + port)
})