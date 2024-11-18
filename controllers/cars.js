// var Car = require('../models/cars');


// //step 5
// // List of all cars
// exports.car_list = async function(req, res) {
//     try{
//     theCar = await Car.find();
//     res.send(theCar);
//     }
//     catch(err){
//     res.status(500);
//     res.send(`{"error": ${err}}`);
//     }
//     };



// // VIEWS
// // Handle a show all view
// exports.car_view_all_Page = async function(req, res) {
//     try{
//     theCar = await Car.find();
//     res.render('car', { title: 'Car Search Results', results: theCar });
//     }
//     catch(err){
//     res.status(500);
//     res.send(`{"error": ${err}}`);
//     }
//     };

//    // Handle car create on POST.
// exports.car_create_post = async function(req, res) {
// console.log(req.body)
// let document = new Car();
// document.car_name = req.body.car_name;
// document.model = req.body.model;
// document.power = req.body.power;
// try{
// let result = await document.save();
// res.send(result);
// }
// catch(err){
// res.status(500);
// res.send(`{"error": ${err}}`);
// }
// };

// // for a specific car.
// // exports.car_detail = function(req, res) {
// // res.send('NOT IMPLEMENTED: Car detail: ' + req.params.id);
// // };

// // // Handle car delete from on DELETE.
// // exports.car_delete = function(req, res) {
// // res.send('NOT IMPLEMENTED: Car delete DELETE ' + req.params.id);
// // };
// // // Handle car update form on PUT.
// // exports.car_update_put = function(req, res) {
// // res.send('NOT IMPLEMENTED: Car update PUT' + req.params.id);
// // };

const Car = require('../models/cars');

exports.car_list = async function(req, res) {
  try {
      const cars = await Car.find();
      res.render('cars', { results: cars });
  } catch (err) {
      res.status(500).send(`Error: ${err}`);
  }
};
  
// exports.car_detail = function(req, res) {
//   res.send('NOT IMPLEMENTED: Car detail: ' + req.params.id);
// };

//read one
exports.car_detail = async function(req, res) {
    console.log("detail" + req.params.id);
    try {
        let result = await Car.findById(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
  };
  

exports.car_create_post = async function(req, res) {
  let document = new Car();
  document.car_name = req.body.car_name;
  document.model = req.body.model;
  document.power = req.body.power;
  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

exports.car_update_get = async function(req, res) {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            res.status(404).send('Car not found');
            return;
        }
        res.render('car_update', { car });
    } catch (err) {
        res.status(500).send(`Error: ${err}`);
    }
  };
  
//put one update
// Car controller (controllers/cars.js)
exports.car_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Car.findById(req.params.id);
        // Update properties
        if (req.body.car_name) toUpdate.car_name = req.body.car_name;
        if (req.body.model) toUpdate.model = req.body.model;
        if (req.body.power) toUpdate.power = req.body.power;
        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
  };
  
  exports.car_delete_get = async function(req, res) {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            res.status(404).send('Car not found');
            return;
        }
        res.render('car_delete', { car });
    } catch (err) {
        res.status(500).send(`Error: ${err}`);
    }
  };

//delete one
exports.car_delete = async function(req, res) {
    try {
        const result = await Car.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(404).send('Car not found');
            return;
        }
        res.send(`Car with id ${req.params.id} was deleted.`);
    } catch (err) {
        res.status(500).send(`Error: ${err}`);
    }
  };
    
// exports.car_delete = function(req, res) {
//   res.send('NOT IMPLEMENTED: Car delete DELETE ' + req.params.id);
// };

// exports.car_update_put = function(req, res) {
//   res.send('NOT IMPLEMENTED: Car update PUT ' + req.params.id);
// };