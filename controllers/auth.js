//Express & Express router
const express = require('express')
const router = express.Router()

//jsonwebtoken
const jwt = require('jsonwebtoken')

//B-crypt
const bcrypt = require('bcrypt')

//Model
const User = require('../models/user')



router.post('/sign-up', async (req, res)=>{
    try {
        const { username, password } = req.body;
        console.log(req.body);
        
        // make sure the user does not exist
        const userInDatabase = await User.findOne({ username });

        if (userInDatabase) {
            return res.status(409).json({err: 'Username or Password is invalid'})
        }
        // take the password and encrypt in some way.
        const hashPassword = bcrypt.hashSync(password, 10);
        req.body.password = hashPassword;

        //create user
        const user = await User.create(req.body)
        console.log(req.body);
        
        
        
        const payload = {
            username: user.username,
            _id: user._id
        }
        
        const token = jwt.sign({payload}, process.env.JWT_SECRET)
        console.log(payload)
        console.log(token)
        
        res.status(200).json({ token })
        console.log({token});
        
    } catch (error) {
        console.log(error); 
    }
})

router.post('/sign-in', async (req, res)=>{
    try {
        const { username, password } = req.body
        const userInDataBase = await User.findOne({username})
    
        //no user
        if(!userInDataBase){
            res.status(401).json({message: 'Ivalid login credentials'})
        }
    
        const isValidPass = bcrypt.compareSync(password, userInDataBase.password)
    
        //wrong pass
        if(!userInDataBase){
            res.status(401).json({message: 'Ivalid login credentials'})
        }

        const payload = {
            username: userInDataBase.username,
            _id: userInDataBase._id
        }

        const token = jwt.sign({payload}, process.env.JWT_SECRET)
        res.status(200).json({token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
})

module.exports = router