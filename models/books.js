const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
   category : String,
   title : String,
   author : String,
   ISBN : {type: String, unique: true},
   pages: Number,
   description : String, 
});

module.exports =  mongoose.model("books", bookSchema);