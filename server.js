//server.js

//set up -------------
// get all the tools we need

var express			= require('express');
var app				= express();
var port			= process.env.PORT || 8080;
var mongoose		= require('mongoose');
var passport		= require('passport');
var flash			= require('connect-flash');

var morgan			= require('morgan');
var cookieParser	= require('cookie-parser');
var bodyParser		= require('body-parser');
var session			= require('express-session');

var configDB		= require('./config/database.js');

//configuration --------------
mongoose.connect(configDB.url);//connect to db

//gdr-------
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('todo okey');
});
//gdr-------

require('./config/passport')(passport); //pass passport for configuration



//set up our express application
app.use(morgan('dev'));//log every request to the console
app.use(cookieParser());//read cookies (needed for auth)
app.use(bodyParser.json()); //get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');//set up ejs for templating

//required for passport
app.use(session({ secret: 'ilovescotch' }));//session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login session
app.use(flash()); // use connect-flash for flash messages stored in session


//routes ----------
require('./app/routes.js')(app, passport); //load our routes pass in our app and fully configured passport

//launch ------------
app.listen(port);
console.log('The magic happens on port ' + port);




