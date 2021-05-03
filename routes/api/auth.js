const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');
const bcrypt = require('bcrypt');

//@route post api/auth
//@register auth user
//@access Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({err : 'Please enter both fields'});

    }

    //check for existing user with email
    User.findOne({email : email})
        .then(user => { 
            if (!user) return res.status(400).json({errUser : 'User does not exist'});
                  
            //validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({errPassword : "Invalid password"});
                    
                    jwt.sign(
                        { id: user.id},
                        process.env.jwtSecret,
                        {expiresIn : 3600},
                        (err, token) => {
                            if(err) throw err;

                            res.json({
                                token: token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })

                        }
                    )
           
            })
        })
});



// @route get api/auth/usr
// @register aget user data
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});


module.exports = router;