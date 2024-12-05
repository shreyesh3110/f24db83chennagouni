var express = require('express');
var router = express.Router();
var car_controller = require('../controllers/cars');
const passport = require('passport');

const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    }
// router.get('/', car_controller.car_list);

// router.post('/', car_controller.car_create_post);

// router.get('/:id', car_controller.car_detail);

// // router.get('/:id', car_controller.car_update_get);

// router.put('/cars:id', car_controller.car_update_put);

// // router.get('/:id', car_controller.car_delete_get);

// router.delete('car/:id', car_controller.car_delete);

// /* GET detail car page */
// router.get('/detail', car_controller.car_view_one_Page);

// router.get('/cars:id', car_controller.car_detail);

router.get('/', car_controller.car_list);

router.post('/', car_controller.car_create_post);

//router.get('/:id', car_controller.car_update_get);

//router.get('/:id', car_controller.car_delete_get);

router.put('/cars:id', car_controller.car_update_put);

router.delete('/cars:id', car_controller.car_delete);

router.get('/cars:id', car_controller.car_detail);

router.get('/detail', secured, car_controller.car_view_one_Page);

router.get('/create',car_controller.car_create_Page);

router.get('/update', secured, car_controller.car_update_Page);

router.get('/delete', secured, car_controller.car_delete_Page);

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

module.exports = router;