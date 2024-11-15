// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// require('dotenv').config();
// const connectionString = process.env.MONGO_CON
// mongoose = require('mongoose');
// mongoose.connect(connectionString);

// var carsRouter = require('./routes/cars');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var gridRouter = require('./routes/grid');
// var randomitemRouter = require('./routes/randomitem');
// var searchResultsRouter = require('./routes/searchresults');  // Correct import for searchResultsRouter
// var resourceRouter = require('./routes/resource'); //step 4
// var car = require("./models/car");
// //var Car = require('./models/car'); // Step exeperiment

// var app = express();


 
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
 
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
 
// // Define routes
// app.use('/', indexRouter);          // Home route
// app.use('/users', usersRouter);     // Users route
// app.use('/cars', carsRouter);
// app.use('/grid', gridRouter);           // Grid route
// app.use('/random', randomitemRouter);     // Random item route
// app.use('/searchresults', searchResultsRouter);  // Correct usage of searchResultsRouter
// app.use('/resource', resourceRouter)// step 4
// //app.use('/car', carRouter)


// const car = require('./models/car');

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
 
// // error handler
// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });
 
// module.exports = app;

// //Get the default connection
// var db = mongoose.connection;
// //Bind connection to error event
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once("open", function(){
// console.log("Connection to DB succeeded")});

// // We can seed the collection if needed on server start
// async function recreateDB(){
// // Delete everything
// await car.deleteMany();
// let instance1 = new car({car_name:"Camry", model:'sedan', power:200});
// let instance2 = new car({car_name:"F150", model:'truck', power:800});
// let instance3 = new car({car_name:"Wrangler", model:'SUV', power:400});
// instance1.save().then(doc=>{
// console.log("First object saved")}
// ).catch(err=>{
// console.error(err)
// });

// instance2.save().then(doc=>{
//   console.log("Second object saved")}
//   ).catch(err=>{
//   console.error(err)
//   });

// instance3.save().then(doc=>{
//   console.log("Third object saved")}
//   ).catch(err=>{
//   console.error(err)
//   });  
// }
// let reseed = true;
// if (reseed) {recreateDB();}

// app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const connectionString = process.env.MONGO_CON;

const mongoose = require('mongoose');

mongoose.connect(connectionString);

var db = mongoose.connection;

//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
  console.log("Connection to DB succeeded")
});

// Route imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
var randomitemRouter = require('./routes/randomitem');
var searchResultsRouter = require('./routes/searchresults');
const resourceRouter = require('./routes/resource');
const carsRouter = require('./routes/cars');

// Schema definition
const carschema = new mongoose.Schema({
  name: String,
  year: Number,
  inventor: String
});

const Car = mongoose.models.Car || mongoose.model('Car', carschema);

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
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', carsRouter);
app.use('/grid', gridRouter);
app.use('/random', randomitemRouter);    
app.use('/searchresults', searchResultsRouter);
app.use('/resource', resourceRouter);

// Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;