//declaration
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

//common controllers
const register = require('./controllers/register');
const login = require('./controllers/login');
const logout = require('./controllers/logout');

//admin controllers
const admin = require('./controllers/admin');


//customer controllers
const borrower = require('./controllers/borrower');

//configure
app.set('view engine', 'ejs');

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: process.env.SECRETKEY, resave: true, saveUninitialized: true}));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/controllers', express.static(__dirname + '/controllers'));

app.use(methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

app.use(methodOverride((req) => {
    if(req.query._method) return req.query._method;
}, { methods: ["GET"] }));

mongoose.connect(process.env.MONGODB_URL, (err) => {
	if(err) throw err;
	console.log("connected with database");
});

app.use('*', function(req, res, next){

	if(req.originalUrl == '/login' || req.originalUrl == '/register')
	{
		next();
	}
	else
	{
		if(!req.session.admin && !req.session.borrower)
		{
			res.redirect('/login');
			return;
		}
		next();
	}
});

//routes
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);

//admin routes
app.use('/admin', admin);


//borrower routes
app.use('/borrower', borrower);

//server start
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});
