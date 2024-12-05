
// const mongoose = require("mongoose");

// const carSchema = mongoose.Schema({
//   car_name: String,
//   model: String,
//   power: Number
// });

// module.exports = mongoose.model("Car", carSchema);

const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  car_name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  model: {
    type: String,
    required: true,
  },
  power: {
    type: Number,
    required: true,
    min: [100, 'Year must be at least 100'],
    max: [2000, 'Year must not exceed 2000']
  },
  
});

module.exports = mongoose.model("Car", carSchema);