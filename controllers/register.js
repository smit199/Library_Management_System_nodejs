const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

router.get('/', (req, res)=>{
    res.render('register.ejs', {message: ''});
});

router.post('/', (req, res)=>{

    let data = {
      fullName: req.body.name,
      email: req.body.email,
      address: req.body.address,
      userType: "Borrower",
      password: req.body.password,
      gender: req.body.gender
    };
    // console.log("user registeration request");
    const user = new userModel(data);
    user.save((err) => {
        if(err)
            res.render('register', {message: 'registration unsuccessful. Maybe user already exists try with different emailid.'});
        // console.log("1 user registered");
        res.render('login', {message: 'Registration successful. login with emailid and password to use system'});
    });
});

module.exports = router;
