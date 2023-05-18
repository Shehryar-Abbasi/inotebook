const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'sherryisagood$oy';

// ROUTE: 1 create a user using: POST "/api/auth/createuser" . No login required
                    /********************************/
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min : 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min : 5}),
] , async (req, res)=>{
    // if there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
    }
    try{
        // check whether user with this email exists already
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "Sorry a user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // creating new user
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    });
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    // res.json(user)
    res.json({authtoken})
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server Error");
}
})

//ROUTE : 2 authenticate a user using: POST "/api/auth/login" . No login required
                    /*************************************/
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
] , async (req, res)=>{
    // if there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json(authtoken)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
})

//ROUTE : 3 Get loggenin user details using: POST "/api/auth/getuser" . login required
                    /*************************************/
router.post('/getuser', fetchuser, async (req, res)=>{

try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server Error");
}
})
module.exports = router