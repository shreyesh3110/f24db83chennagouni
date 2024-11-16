// var express = require('express');
// const car_controlers= require('../controllers/car');
// var router = express.Router();
 
//  /* GET kites page */
//  router.get('/', function(req, res, next) {
//    // Define the results array with cars information
//    var results = [
//        { car_name: 'Camry', model: 'sedan', power: 200 },
//       { car_name: 'F150', model: 'truck', power: 800 },
//      { car_name: 'Wrangler', model: 'SUV', power: 400 },
//      { car_name: 'Audi', model: 'sedan', power: 200 }
// ];
 
//    // Render the kites.pug template and pass the results array to it
//    res.render('cars', { title: 'Search Results - Cars', results: results });
//  });


// /* GET Kettles. */
// router.get('/', car_controlers.car_view_all_Page ); 
// /* GET create kettle page */
// router.get('/create', car_controlers.car_create_post);

// module.exports = router;

var express = require('express');
var router = express.Router();
var car_controller = require('../controllers/cars');

router.get('/', car_controller.car_list);

router.post('/', car_controller.car_create_post);

router.get('/:id', car_controller.car_detail);

router.get('/:id', car_controller.car_update_get);

router.post('/', car_controller.car_create_post);

//router.get('/:id/update', car_controller.car_update_get);

//router.get('/:id/delete', car_controller.car_delete_get);

//router.post('/:id/update', car_controller.car_update_post);

//router.post('/:id/delete', car_controller.car_delete_post);

module.exports = router;