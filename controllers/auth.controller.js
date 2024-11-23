const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const {generateToken} = require('../utils/generatetoken.util');

module.exports.registerUser = async function(req,res){
    try{
        let { fullname, email, password} = req.body;
    
        let user = await userModel.findOne({email});
        if(user) {
            return res.status(500).send({error: 'User already registered'});
        }    
        bcrypt.genSalt(10, (error,salt)=>{
            bcrypt.hash(password, salt, async (error, hash)=>{
                let user = userModel.create({
                    fullname,
                    email,
                    password: hash,
                })
                let token = generateToken(user);
                res.cookie("token", token);
                res.send({message: 'User registered successfully'});
                res.redirect('/login');
            });
        })
    }
    catch(error){
        res.status(500).send({error: 'Error registering user'});
    }

}