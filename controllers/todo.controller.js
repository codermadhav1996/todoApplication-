const TODO_COLLECTION = require('../models/todo.model');
const _ = require('lodash');
const moment = require('moment');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const { data } = require('../environment');
const environment = require('../environment');



// localhost:6000/todo/addtask

exports.addTaskTodo = async(req, res) => {
    let token = req.headers["token"]
    if (!token) { return res.status(400).json({message :"No token provided"}) }
    let decoded = jwt.verify(token, environment.data.jwtSecret, (err, decoded) => {
        if (err) { return res.status(400).json({message :"error in token"})}
        return decoded
    })
    let data = {
        Taskname : req.body.Taskname,
        creation_Timestamp : moment(new Date()).format(),
        expiry : req.body.expiry,                                 //expiry date format = YYYY/MM//DD
        createdBy : req.body.createdBy,
        completionStatus : req.body.completionStatus,             //completionStatus is Boolean value i.e true = complete 
        userId : decoded.id
    }
    try{
        let SavedTodo = new TODO_COLLECTION(data);
        let result = await SavedTodo.save()
        return res.status(200).json({
            status : "Success",
            message : "Successfully Task is Added to TODO list",
            data : result
        })
    }catch(error) {
        return res.status(400).json({
            status : "Error",
            message : "Failed to Adding the Task",
            err : Error
        })
    }
}




//localhost:6000/todo/gettodolistbyuserid

exports.getTodoById = async (req, res) => {
    let token = req.headers["token"]
    if (!token) { return res.status(400).json({message :"No token provided"}) }
    let decoded = jwt.verify(token, environment.data.jwtSecret , (err, decoded) => {
        if (err) { return res.status(400).json({message :"error in token"})}
        return decoded
    })
    try{
        let result = await TODO_COLLECTION.find( {userId : decoded.id })
        if ( result == 0 ) { return res.status(404).json({ status:"Error" , message : 'Document is not found'})}
        return res.status(200).json({
            status : "Success",
            message : "Successfully Fetch the TODO list By UserID",
            data : result
        })
    } catch(error) {
        return res.status(400).json({
            status : "Error",
            message : "Error in Fetching the TODO list By UserID"
        })
    }
}




//localhost:6000/todo/updatetodobyuserid/task_id

exports.updateTodoById = async(req, res) => {
    let task_id = req.params.id
    let data = {
        Taskname : req.body.Taskname,
        edit_Timestamp : moment(new Date()).format(),
        expiry : req.body.expiry,
        createdBy : req.body.createdBy,
        completionStatus : req.body.completionStatus
    }
    try{
        let result = await TODO_COLLECTION.findById(task_id)
        if ( !result ) { return res.status(404).json({ status:"Error" , message : 'Document is not found'})}
        let update = _.merge(result, data)
        let UpdatedResult = await update.save()
        return res.status(200).json({
            status : "Success",
            message : "Successfully Update the TODO list By UserID",
            data : UpdatedResult
        })
    } catch(error) {
        return res.status(400).json({
            status : "Error",
            message : "Error in Update the TODO list By UserID",
            err : Error
        })
    }
}




//localhost:6000/todo/deletetodobyuserid/task_id

exports.deleteTodoById = async(req, res) => {
    let task_id = req.params.id
    try{
        let data = await TODO_COLLECTION.findById(task_id)
        if ( !data ) { return res.status(404).json({ status:"Error" , message : 'Document is not found'})}
        let result = await data.remove()
        return res.status(200).json({
            status : "Success",
            message : "Successfully Delete the TODO list By UserID"
        })
    } catch(error) {
        return res.status(400).json({
            status : "Error",
            message : "Error in delete the TODO list By UserID",
            err : error
        })
    }

}



// //localhost:6000/todo/getalltasks

exports.getAllTodo = async(req, res) => {
    try{
        let result = await TODO_COLLECTION.find().sort({ creation_Timestamp : 1})
        if ( result == 0 ) { return res.status(404).json({ status:"Error" , message : 'Documents is not found'})}
        return res.status(200).json({
            status : "Success",
            message : "Successfully fetched the all tasks",
            data : result
        })
    } catch(error) {
        return res.status(400).json({
            status : "Error",
            message : "Failed to fetching all the tasks",
            err : error
        })
    }
}