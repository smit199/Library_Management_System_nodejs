const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bookModel = require('../models/books');
const issuedBooksModel = require('../models/issuedbooks');
let borrower_id;

router.get('/home', (req, res)=> {
    borrower_id = req.session.borrower;
    return res.render('borrower/home');
});

router.get('/profile', (req, res)=> {
    // const query = {_id: req.session.admin};
    userModel.findById(borrower_id, (err, result) => {
       return (err ? res.end("you are logged out") : res.render('borrower/profile', {res: result}));
    });
});

router.get('/profile/edit', (req, res)=> {
    // const query = {_id: req.session.admin};
    userModel.findById(borrower_id, (err, result) => {
       return (err ? res.end("you are logged out") : res.render('borrower/profile-edit', {res: result}));
    });
});

router.put('/profile/edit', (req, res)=> {
    
    const data = {
        fullName: req.body.name,
        email: req.body.email,
        address: req.body.address,
        gender: req.body.gender
    };
    // const query = {_id: admin_id};

    userModel.findByIdAndUpdate(borrower_id, data, (err) => {
       return (err ? res.end("you are logged out") : res.redirect('/borrower/profile'));
    });
});

router.get('/changepassword', (req, res)=> {
    userModel.findById(borrower_id, (err, result) => {
        if(result) {
            return res.render('borrower/change-password', {errs: [], res: result, success: []}); 
        }
    });
});

router.put('/changepassword', (req, res)=> {
    if(req.body.newPassword === req.body.confirmPassword) {
        userModel.findByIdAndUpdate(borrower_id, {password: req.body.newPassword}, (err) => {
            if(err) {
                return res.end("you are logged out");
            }
            else {
                return res.render('borrower/change-password', {errs:[], success: [{message: "Password changed successfully"}]});
            }
        });
    }
    else{
        return res.render('borrower/change-password', {errs:[{message: "Your new passwords don't match!"}], success: []});
    }
});

router.get('/books', (req, res)=> {
    bookModel.find({}, (err, result) => {
        if(err)
            return res.end("invalid");
        else {
            return res.render('borrower/books', {res: result, errs: []});
        }
    });
});

router.post('/books', (req, res)=> {
    const searchBy = req.body.searchBy;
    const word = req.body.word;
    let query = {};
    query[searchBy] = word;
    bookModel.find(query, (err, result) => {
        if(err)
            return res.end("invalid");
        else {
            return res.render('borrower/books', {res: result, errs: []});
        }
    });
});

router.get('/books/borrowed', (req, res)=> {
    const query = {borrower_id,};
    issuedBooksModel.find(query).populate('book_id').exec((err, result) => {
        if(err) { console.log(err); return res.end("invalid"); }
        else {
            return res.render('borrower/borrowed-books', {res: result});
        }
    });
});

router.get('/issueBook/:id', (req, res) => {
    const book_id = req.params.id;
    const query = {book_id, borrower_id,};
    issuedBooksModel.findOne(query, (err, result) => {
        if(result) {
            return res.render('borrower/issue-book', {errs: [], isIssued: true, success: []});
        }
        return res.render('borrower/issue-book', {errs: [], isIssued: false, success: []});
    });
});

router.post('/issueBook/:id', (req, res) => {
    const book_id = req.params.id;
    let date = Date.now();
    let ret_date = new Date(date + (req.body.days)*24*60*60*1000);
    const data = {
        book_id,
        borrower_id,
        returnDate: ret_date,
    };
    const issuedBook = new issuedBooksModel(data);
    issuedBook.save((err) => {
        if(err) {
            console.log(err);
            return res.render('borrower/issue-book', {errs: [{message: 'unable to issue book'}]});
        }
        return res.redirect('/borrower/books');
    });
});

router.get('/renewBook/:id', (req, res) => {
    return res.render('borrower/renew-book', {errs: []});
});

router.put('/renewBook/:id', (req, res) => {
    const issue_id = req.params.id;
    let date = Date.now();
    let ret_date = new Date(date + (req.body.days)*24*60*60*1000);

    const data = {
        returnDate: ret_date,
        isRenewed: true,
    }

    issuedBooksModel.findByIdAndUpdate(issue_id, data, (err, result) => {
        if(err)
            return res.render('borrower/renew-book', {errs: {message: "unable to renew book, try again"}});
        else
            return res.redirect('/borrower/books/borrowed');
    })
});

router.delete('/returnBook/:id', (req, res) => {
    const issue_id = req.params.id;
    issuedBooksModel.findByIdAndDelete(issue_id, (err, result) => {
        if(err)
            return res.end('unable to return book');
        else
            return res.redirect('/borrower/books/borrowed');
    })
});

module.exports = router;
