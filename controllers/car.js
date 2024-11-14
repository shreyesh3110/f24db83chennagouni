var Car = require('../models/car');
// List of all cars
exports.car_list = function(req, res) {
res.send('NOT IMPLEMENTED: Car list');
};
// for a specific car.
exports.car_detail = function(req, res) {
res.send('NOT IMPLEMENTED: Car detail: ' + req.params.id);
};
// Handle car create on POST.
exports.car_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: Car create POST');
};
// Handle car delete from on DELETE.
exports.car_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Car delete DELETE ' + req.params.id);
};
// Handle car update form on PUT.
exports.car_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: Car update PUT' + req.params.id);
};
