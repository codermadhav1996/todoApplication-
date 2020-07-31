const express  = require('express');
const router = express.Router()

const user_controller = require('../controllers/user.controller');
const todo_controller = require('../controllers/todo.controller');


//users
router.post('/usersignup', user_controller.addUsersDetails);
router.post('/userlogin', user_controller.userLogIn);

//TO-DO
router.post('/addtask', todo_controller.addTaskTodo);
router.get('/gettodolistbyuserid', todo_controller.getTodoById);
router.put('/updatetodobyuserid/:id', todo_controller.updateTodoById);
router.delete('/deletetodobyuserid/:id', todo_controller.deleteTodoById);

//get All Tasks
router.get('/getalltasks', todo_controller.getAllTodo);


module.exports = router ;