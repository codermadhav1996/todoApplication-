const USER_DETAILS = require('../models/user.model');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const jwt_decode = require('jwt-decode');
const environment = require('../environment');



//localhost:6000/todo/usersignup

exports.addUsersDetails = async(req, res) => {
    let data = {
        fullName : req.body.fullName,
        email : req.body.email,
        password : cryptr.encrypt(req.body.password)
    }
    try {
        let UserData = new USER_DETAILS(data)
        let result = await UserData.save()
        let token = jwt.sign( { data : result._id} , environment.data.jwtSecret , { expiresIn : "4w"})
        return res.status(200).json({
            status : "Success",
            message : "User Sign-up is Successfully done",
            token : token
        })
    } catch (error) {
        return res.status(400).json({
            status : "Error",
            message : "Error in User Signup",
            err : error
        })
    }
}


// localhost:6000/todo/userlogin

exports.userLogIn = async(req, res) => {
    let email = req.body.email
    if( validator.isEmail(email) ) {
        try {
            let result = await USER_DETAILS.find({ email : email})
            let user_password = cryptr.decrypt(result[0].password)
            if( user_password === req.body.password ) {
                let token = jwt.sign({ id : result[0]._id}, environment.data.jwtSecret , {expiresIn :"4w"})
                return res.status(200).json({ 
                    status: "Success", 
                    message:"User Login is Successfully Done.", 
                    token : token
                })
            } else {
                return res.status(400).json({message : "Incorect Password"})
            }
        } catch(error) {
            return res.status(400).json({status : "Error" , message : "Error in Users login.", err : error})
        }
    } else {
        return res.status(400).json({
            status : "Error",
            message : "Invalid E-mail address"
        })
    }
}