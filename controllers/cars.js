const Car = require('../models/cars');

// exports.car_list = async function(req, res) {
//   try {
//       const cars = await Car.find();
//       res.render('cars', { results: cars });
//   } catch (err) {
//       res.status(500).send(`Error: ${err}`);
//   }
// };
  
// // exports.car_detail = function(req, res) {
// //   res.send('NOT IMPLEMENTED: Car detail: ' + req.params.id);
// // };

// //read one
// exports.car_detail = async function (req, res) {
//     console.log("detail" + req.params.id);
//     try {
//         let result = await Car.findById(req.params.id);
//         res.send(result);
//     } catch (error) {
//         res.status(500);
//         res.send(`{"error": document for id ${req.params.id} not found`);
//     }
// };
  
// exports.car_create_post = async function(req, res) {
//   let document = new Car();
//   document.car_name = req.body.car_name;
//   document.model = req.body.model;
//   document.power = req.body.power;
//   try {
//     let result = await document.save();
//     res.send(result);
//   } catch (err) {
//     res.status(500);
//     res.send(`{"error": ${err}}`);
//   }
// };

// exports.car_update_get = async function(req, res) {
//     try {
//         const car = await Car.findById(req.params.id);
//         if (!car) {
//             res.status(404).send('Car not found');
//             return;
//         }
//         res.render('car_update', { car });
//     } catch (err) {
//         res.status(500).send(`Error: ${err}`);
//     }
//   };
  
// //put one update
// // Car controller (controllers/cars.js)
// exports.car_update_put = async function(req, res) {
//     console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
//     try {
//         let toUpdate = await Car.findById(req.params.id);
//         // Update properties
//         if (req.body.car_name) toUpdate.car_name = req.body.car_name;
//         if (req.body.model) toUpdate.model = req.body.model;
//         if (req.body.power) toUpdate.power = req.body.power;
//         let result = await toUpdate.save();
//         console.log("Success " + result);
//         res.send(result);
//     } catch (err) {
//         res.status(500);
//         res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
//     }
//   };
  
// //   exports.car_delete_get = async function(req, res) {
// //     try {
// //         const car = await Car.findById(req.params.id);
// //         if (!car) {
// //             res.status(404).send('Car not found');
// //             return;
// //         }
// //         res.render('car_delete', { car });
// //     } catch (err) {
// //         res.status(500).send(`Error: ${err}`);
// //     }
// //   };

// //delete one
// exports.car_delete = async function(req, res) {
//     try {
//         const result = await Car.findByIdAndDelete(req.params.id);
//         if (!result) {
//             res.status(404).send('Car not found');
//             return;
//         }
//         res.send(`Car with id ${req.params.id} was deleted.`);
//     } catch (err) {
//         res.status(500).send(`Error: ${err}`);
//     }
//   };
    
// // exports.car_delete = function(req, res) {
// //   res.send('NOT IMPLEMENTED: Car delete DELETE ' + req.params.id);
// // };

// // exports.car_update_put = function(req, res) {
// //   res.send('NOT IMPLEMENTED: Car update PUT ' + req.params.id);
// // };

// //single view
// exports.car_view_one_Page = async function (req, res) {
//     console.log("single view for id " + req.query.id);
//     try {
//         result = await Car.findById(req.query.id);
//         res.render('carsdetail',
//             { title: 'Car Detail', toShow: result });
//     } catch (err) {
//         res.status(500);
//         res.send(`{'error': '${err}'}`);
//     }
// };


//Get all Read
exports.car_list = async function (req, res) {
    try {
        const cars = await Car.find();
        res.render('cars', { results: cars });
    } catch (err) {
        res.status(500).send(`Error: ${err}`);
    }
};

//create one
exports.car_create_post = async function (req, res) {
    let document = new Car();
    document.car_name = req.body.car_name;
    document.power = req.body.power;
    document.model = req.body.model;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


exports.car_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Car delete DELETE ' + req.params.id);
};

//put one update
// Car controller (controllers/cars.js)
exports.car_update_put = async function (req, res) {
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

//read one
exports.car_detail = async function (req, res) {
    console.log("detail" + req.params.id);
    try {
        let result = await Car.findById(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

//delete one
exports.car_delete = async function (req, res) {
    console.log("delete " + req.params.id);
    try {
        const result = await Car.findByIdAndDelete(req.params.id);
        console.log("Removed " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": Error deleting ${err}}`);
    }
};

//single view
exports.car_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id);
    try {
        result = await Car.findById(req.query.id);
        res.render('carsdetail',
            { title: 'Car Detail', toShow: result });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

exports.car_create_Page = function (req, res) {
    console.log("create view");
    try {
        res.render('carscreate', { title: 'Car Create' });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
}

exports.car_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await Car.findById(req.query.id)
        res.render('carsupdate', { title: 'Cars Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.car_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await Car.findById(req.query.id)
        res.render('carsdelete', {
            title: 'Cars Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};