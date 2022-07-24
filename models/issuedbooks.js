const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    book_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'books', 
    },

    borrower_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
    },
    issueDate : {type : Date, default : new Date()},
    returnDate : Date,
    isRenewed: {type: Boolean, default: false},
 });

module.exports = mongoose.model("issuedbooks", issueSchema);