const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('config')

//@POST api/users
//@Register new user
//@Access public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;


    if(!name || !email || !password) {
        return res.status(400).json({err: 'Please enter all fields'});
    }

    //Check for existing email
    User.findOne({email : email})
        .then(user => { 
            if (user) {
                return res.status(400).json({err: 'Email is already used'});
            }        
            
            const newUser = new User({
                name,
                email,
                password
            });
        
            //Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => {
                            jwt.sign({id: user.id},
                                process.env.jwtSecret,
                                {expiresIn : 3600},
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token: token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                })
                        })
                })
            })
        })
});


router.post('/e', (req, res) => {
    User.findOne({email : req.body.email})
        .then(user => { 
            if (user) {
                return res.status(400).json({err: 'Email is already used'});
            }
            return res.status(200).json({msg: 'Email available'});
        })
})

module.exports = router;