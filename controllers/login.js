const express = require('express');
const { findOne } = require('../models/user');
const router = express.Router();
const userModel = require('../models/user');

router.get('/', (req, res)=>{
    res.render('login.ejs', {message: ''});
});

router.post('/', (req, res)=>{

    let query = {
        email: req.body.email,
        password: req.body.password
    };
    // console.log("wait! we are logging you in");
    userModel.findOne(query, (err, user) => {
        if(err || !user) {
            res.render('login', {message: 'Invalid emailid or password'});
        }
        else if(user.userType === 'Admin') {
            req.session.admin = user._id;
            // console.log(req.session.admin);
            res.redirect('/admin/home');
        }
        else if(user.userType === 'Borrower') {
            req.session.borrower = user._id;
            // console.log(req.session.borrower);
            res.redirect('/borrower/home');
        }
        else {
            res.render('login', {message: 'Invalid emailid or password'});
        }
    });
});

module.exports = router;
