const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});


//create user without email account activation
exports.signup = (req, res) => {
    console.log(req.body);
    const {name, email, password} = req.body;
    User.findOne({email}).exec((err, user) => {
        if(user){
            return res.status(400).json({error: "User with this email already exists."});
        }
        
        const token = jwt.sign({name, email, password}, process.env.JWT_ACC_ACTIVATE, {expiresIn: '20m'});

        const data = {
            from: 'aya@gmail.com',
            to: email,
            subject: 'Acount Activation Link',
            html: `
                <h2>Please click on given link to activate you account</h2>
                <p>This is your token: ${token}</p>
            `
        };
        mg.messages().send(data, function (error, body) {
            if(error) {
                return res.json({
                    error: err.message
                })
            }
            return res.json ({message: "Email has been sent, kindly activate your account"});
            console.log(body);
        });
        
        
        
        
    });
}

exports.activateAccount = (req, res) => {
    const {token} = req.body;
    console.log(token);
    if(token) {
        jwt.verify(token, process.env.JWT_ACC_ACTIVATE, function(err, decodedToken){
            if(err){
                return res.status(400).json({error: "Incorrect or Expire link."})
            }
            const {name, email, password} = decodedToken;
            User.findOne({email}).exec((err, user) => {
                if(user){
                    return res.status(400).json({error: "User with this email already exists."});
                }
                let newUser = new User({name, email, password});
                newUser.save((err, success) => {
                    if(err){
                        console.log("Error in signup while account activation: ", err);
                        return res.status(400), json({error: 'error activation account'})
                    }
                    res.json({
                        message: "Signup success!"
                    })
                })
            });
        })
    } 
    else{
        return res.json({error: "Sonething want wrong!!!"})
    }
}

//login user
exports.login = async(req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    //check if the email is valid
    const user = await User.findOne({ email: req.body.email });
    if(!user)
        return res.status(400).send('Email is not found');
    // password is correct
    if(user.password != req.body.password){
        return res.status(400).send('Invalid password')
    }

    // create token
    const token = jwt.sign({email, password}, process.env.JWT_ACC_ACTIVATE, {expiresIn: '120m'});
    res.header('auth-login-token', token).send(token);
}