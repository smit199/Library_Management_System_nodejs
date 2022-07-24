const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bookModel = require('../models/books');
const issuedBooksModel = require('../models/issuedbooks');
let admin_id;

router.get('/home', (req, res)=> {
    admin_id = req.session.admin;
    return res.render('admin/home');
});

router.get('/profile', (req, res)=> {
    // const query = {_id: req.session.admin};
    userModel.findById(admin_id, (err, result) => {
        return (err ? res.end("you are logged out") : res.render('admin/profile', {res: result}));
    });
});

router.get('/profile/edit', (req, res)=> {
    // const query = {_id: req.session.admin};
    userModel.findById(admin_id, (err, result) => {
        return (err ? res.end("you are logged out") : res.render('admin/profile-edit', {res: result}));
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

    userModel.findByIdAndUpdate(admin_id, data, (err) => {
        return (err ? res.end("you are logged out") : res.redirect('/admin/profile'));
    });
});

router.get('/changepassword', (req, res)=> {
    userModel.findById(admin_id, (err, result) => {
        if(result) {
            return (res.render('admin/change-password', {errs: [], res: result, success: []})); 
        }
    });
});

router.put('/changepassword', (req, res)=> {
    if(req.body.newPassword === req.body.confirmPassword) {
        userModel.findByIdAndUpdate(admin_id, {password: req.body.newPassword}, (err) => {
            if(err) {
                return res.end("you are logged out");
            }
            else {
                return res.render('admin/change-password', {errs:[], success: [{message: "Password changed successfully"}]});
            }
        });
    }
    else{
        return res.render('admin/change-password', {errs:[{message: "Your new passwords don't match!"}], success: []});
    }
});

router.get('/borrowers', (req, res)=> {

    userModel.find({}, (err, result) => {
        if(err)
            return res.end("not valid");
        else
            return res.render('admin/borrowers', {res: result, errs: []});
    });
});

router.post('/borrowers', (req, res)=> {
    const searchBy = req.body.searchBy;
    const word = req.body.word;
    let query = {};
    query[searchBy] = word;
    userModel.find(query, (err, result) => {
        if(err || result.length === 0)
            return res.render('admin/borrowers', {res: [], errs: [{message: "No results found!"}]});
        else
            return res.render('admin/borrowers', {res: result, errs: []});
    });
});

router.delete('/borrowers/delete/:id', (req, res)=> {
    const id = req.params.id;
    userModel.findByIdAndDelete(id, (err) => {
        if(err) 
            return res.end('invalid');
        else {
            return res.redirect('/admin/borrowers');
        }
    });
});

router.get('/books', (req, res)=> {
    bookModel.find({}, (err, result) => {
        if(err)
            return res.end("not valid");
        else
            return res.render('admin/books', {res: result, errs: []});
    });
});

router.post('/books', (req, res)=> {
    const searchBy = req.body.searchBy;
    const word = req.body.word;
    let query = {};
    query[searchBy] = word;
    bookModel.find(query, (err, result) => {
        if(err || result.length === 0)
            return res.render('admin/books', {res: [], errs: [{message: "No results found!"}]});
        else
            return res.render('admin/books', {res: result, errs: []});
    });
});

router.get('/books/add', (req, res)=> {
    return res.render('admin/books-add', {errs: [], success: []});
});

router.post('/books/add', (req, res)=> {
    const data = {
        category: req.body.category,
        title: req.body.title,
        author: req.body.author,
        ISBN: req.body.ISBN,
        pages: req.body.pages,
        description: req.body.description,
    };

    const book = new bookModel(data);
    book.save((err) => {
        if(err)
            return res.render('admin/books-add', {errs: [{message: "Book is not added. maybe book with this ISBN already exist"}], success: []});
        return res.render('admin/books-add', {errs: [], success: [{message: "Book added successfully!"}]});
    });
    
});

router.get('/books/edit/:id', (req, res)=> {
    const book_id = req.params.id;
    bookModel.findById(book_id, (err, result) => {
        if(err)
            return res.end("invalid");
        else
            return res.render('admin/books-edit', {res: result, errs: [], success: []});
    });
});

router.put('/books/edit/:id', (req, res)=> {
    const data = {
        category: req.body.category,
        title: req.body.title,
        author: req.body.author,
        ISBN: req.body.ISBN,
        pages: +req.body.pages,
        description: req.body.description,
    };
    console.log("updating book details");
    const book_id = req.params.id;

    bookModel.findByIdAndUpdate(book_id, data, (err) => {
        if(err) {
            console.log("error occured");
            return res.end("invalid");
        }
        else {
            console.log("updated book details");
            return res.render('admin/books-edit', {res: [], errs:[], success: [{message: "Book updated successfully!"}]});
        }
    });
});

router.delete('/books/delete/:id', (req, res)=> {
    const book_id = req.params.id;
    bookModel.findByIdAndDelete(book_id, (err) => {
        if(err) 
            return res.end('invalid');
        else {
            return res.redirect('/admin/books');
        }
    });
});

router.get('/books/issued', (req, res)=> {
    issuedBooksModel.find().populate('book_id borrower_id').exec((err, result) => {
        if(!result){
            return res.end("Invalid!");
        }
        else {
            // console.log(result);
            return res.render('admin/issued-books', {res: result});
        }
    });
});

router.delete('/books/unissue/:id', (req, res) => {
    issuedBooksModel.findByIdAndDelete(req.params.id, (err, result) => {
        if(err)
            return res.end('unable to unissue book');
        else
            return res.redirect('/admin/books/issued');
    });
});

module.exports = router;
