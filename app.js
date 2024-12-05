// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// require('dotenv').config();
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//   Account.findOne({ username: username })
//   .then(function (user){
//   if (err) { return done(err); }
//   if (!user) {
//   return done(null, false, { message: 'Incorrect username.' });
//   }
//   if (!user.validPassword(password)) {
//   return done(null, false, { message: 'Incorrect password.' });
//   }
//   return done(null, user);
//   })
//   .catch(function(err){
//   return done(err)
//   })
//   })
//   )

// const connectionString = process.env.MONGO_CON;

// const mongoose = require('mongoose');

// mongoose.connect(connectionString);

// var db = mongoose.connection;

// //Bind connection to error event
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once("open", function(){
//   console.log("Connection to DB succeeded")
// });

// // Route imports
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const gridRouter = require('./routes/grid');
// var randomitemRouter = require('./routes/randomitem');
// var searchResultsRouter = require('./routes/searchresults');
// const resourceRouter = require('./routes/resource');
// const carsRouter = require('./routes/cars');


// // Schema definition
// const carschema = new mongoose.Schema({
//   name: String,
//   year: Number,
//   inventor: String
// });

// const Car = mongoose.models.Car || mongoose.model('Car', carschema);

// // Database seeding function
// async function recreateDB() {
//   await Car.deleteMany();
  
//   let instance1 = new Car({ car_name:"Camry", model:'sedan', power:200 });
//   let instance2 = new Car({ car_name:"F150", model:'truck', power:800 });
//   let instance3 = new Car({ car_name:"Wrangler", model:'SUV', power:400 });

//   await instance1.save().then(doc => {
//     console.log("First object saved:", doc);
//   }).catch(err => {
//     console.error(err);
//   });

//   await instance2.save().then(doc => {
//     console.log("Second object saved:", doc);
//   }).catch(err => {
//     console.error(err);
//   });

//   await instance3.save().then(doc => {
//     console.log("Third object saved:", doc);
//   }).catch(err => {
//     console.error(err);
//   });
// }

// let reseed = true;
// if (reseed) {
//   recreateDB();
// }



// // Express app setup
// const app = express();

// // View engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// // Middleware
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/cars', carsRouter);
// app.use('/grid', gridRouter);
// app.use('/random', randomitemRouter);    
// app.use('/searchresults', searchResultsRouter);
// app.use('/resource', resourceRouter);

// app.use(require('express-session')({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false
//   }));
//   app.use(passport.initialize());
//   app.use(passport.session());

// // Error handling
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });

// // passport config
// // Use the existing connection
// // The Account model
// var Account =require('./models/account');
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

// module.exports = app;

// app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
require('dotenv').config();

const connectionString = process.env.MONGO_CON;

const mongoose = require('mongoose');

mongoose.connect(connectionString);

var db = mongoose.connection;

//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
});

// Route imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const randomitemRouter = require('./routes/randomitem');
const searchResultsRouter = require('./routes/searchresults');
const resourceRouter = require('./routes/resource');
const carsRouter = require('./routes/cars');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err)
      })
  })
)


// Schema definition
const carSchema = new mongoose.Schema({
  name: String,
  year: Number,
  inventor: String
});

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

// Database seeding function
async function recreateDB() {
  await Car.deleteMany();
  
    let instance1 = new Car({ car_name:"Camry", model:'sedan', power:200 });
    let instance2 = new Car({ car_name:"F150", model:'truck', power:800 });
    let instance3 = new Car({ car_name:"Wrangler", model:'SUV', power:400 });

  await instance1.save().then(doc => {
    console.log("First object saved:", doc);
  }).catch(err => {
    console.error(err);
  });

  await instance2.save().then(doc => {
    console.log("Second object saved:", doc);
  }).catch(err => {
    console.error(err);
  });

  await instance3.save().then(doc => {
    console.log("Third object saved:", doc);
  }).catch(err => {
    console.error(err);
  });
}

let reseed = true;
if (reseed) {
  recreateDB();
}

// Express app setup
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', carsRouter);
app.use('/grid', gridRouter);
app.use('/random', randomitemRouter);    
app.use('/searchresults', searchResultsRouter);
app.use('/resource', resourceRouter);

var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Error handling
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;